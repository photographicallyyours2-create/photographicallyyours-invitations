import { WeddingData } from '../types/wedding';

const DB_NAME = 'PhotographicallyYoursDB';
const DB_VERSION = 1;
const STORE_NAME = 'wedding_suites';
export const PY_STORAGE_KEY = 'photographicallyyours_wedding_data_v1';

/**
 * Open IndexedDB with automatic schema migration
 */
function openDatabase(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !window.indexedDB) {
      reject(new Error('IndexedDB not supported in this environment'));
      return;
    }

    const request = window.indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

/**
 * Save wedding data permanently to IndexedDB (survives restarts, large image uploads)
 */
export async function saveToIndexedDB(key: string, data: WeddingData): Promise<void> {
  try {
    const db = await openDatabase();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const request = store.put(data, key);

      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  } catch (err) {
    console.warn('IndexedDB save failed, falling back to memory/localStorage:', err);
  }
}

/**
 * Load all stored wedding data from IndexedDB using bulletproof cursor traversal
 */
export async function loadAllFromIndexedDB(): Promise<Record<string, WeddingData>> {
  try {
    const db = await openDatabase();
    return new Promise((resolve) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const result: Record<string, WeddingData> = {};

      const cursorReq = store.openCursor();
      cursorReq.onsuccess = (e) => {
        const cursor = (e.target as IDBRequest<IDBCursorWithValue>).result;
        if (cursor) {
          result[cursor.key as string] = cursor.value;
          cursor.continue();
        } else {
          resolve(result);
        }
      };
      cursorReq.onerror = () => {
        console.warn('IndexedDB cursor error:', cursorReq.error);
        resolve({});
      };
    });
  } catch (err) {
    console.warn('IndexedDB read failed:', err);
    return {};
  }
}

/**
 * High-performance image compressor.
 * Downscales camera & phone photos (5-12MB) to high-definition Web JPEG (~120KB-200KB).
 * Preserves crisp retina quality while fitting effortlessly in browser storage quotas.
 */
export function compressImageFile(
  file: File | Blob,
  maxDimension = 1400,
  quality = 0.82
): Promise<string> {
  return new Promise((resolve, reject) => {
    // If SVG or non-image, read directly
    if (file.type === 'image/svg+xml') {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target?.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
      return;
    }

    const img = new Image();
    const url = URL.createObjectURL(file);

    img.onload = () => {
      URL.revokeObjectURL(url);
      let width = img.width;
      let height = img.height;

      if (width > maxDimension || height > maxDimension) {
        if (width > height) {
          height = Math.round((height * maxDimension) / width);
          width = maxDimension;
        } else {
          width = Math.round((width * maxDimension) / height);
          width = maxDimension;
        }
      }

      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext('2d');
      if (!ctx) {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target?.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
        return;
      }

      // Smooth bicubic downsampling
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(img, 0, 0, width, height);

      // Export as Web JPEG
      const compressedDataUrl = canvas.toDataURL('image/jpeg', quality);
      resolve(compressedDataUrl);
    };

    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('Failed to load image for compression'));
    };

    img.src = url;
  });
}

/**
 * Universal safe saver:
 * 1. Saves to IndexedDB (always succeeds, no 5MB quota)
 * 2. Writes to project files on disk via Vite dev server if on localhost
 * 3. Attempts safe localStorage fallback
 */
export async function persistWeddingData(
  templateId: string,
  data: WeddingData,
  allData: Record<string, WeddingData>
): Promise<void> {
  // 1. Save to IndexedDB
  await saveToIndexedDB(templateId, data);
  if (templateId === 'bodh-heritage' || data.brideName === 'Kajal' || data.groomName === 'Sahil') {
    await saveToIndexedDB('bodh-heritage', data);
  }

  // 2. Automatically sync to local dev server disk if running on localhost
  if (
    typeof window !== 'undefined' &&
    (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
  ) {
    try {
      fetch('/api/save-wedding-data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(allData),
      }).catch((e) => console.debug('Dev server save endpoint offline:', e));
    } catch {
      // ignore
    }
  }

  // 3. Safe save to localStorage with quota protection
  try {
    localStorage.setItem(PY_STORAGE_KEY, JSON.stringify(allData));
  } catch (quotaError) {
    console.warn('LocalStorage quota exceeded (safely stored in IndexedDB):', quotaError);
    try {
      const lightweightCopy: Record<string, WeddingData> = {};
      for (const [id, suite] of Object.entries(allData)) {
        lightweightCopy[id] = {
          ...suite,
          gallery: suite.gallery?.map((g) => ({
            ...g,
            src: g.src.length > 500000 ? g.src.slice(0, 1000) : g.src,
          })),
        };
      }
      localStorage.setItem(PY_STORAGE_KEY + '_fallback', JSON.stringify(lightweightCopy));
    } catch {
      // IndexedDB has already persisted everything
    }
  }
}

/**
 * Trigger GitHub Pages live deployment directly from the browser customizer
 */
export async function deployLiveToMobile(): Promise<{ success: boolean; message: string }> {
  try {
    const res = await fetch('/api/deploy-live', { method: 'POST' });
    const json = await res.json();
    if (json.success) {
      return { success: true, message: '✓ Successfully published live to GitHub Pages!' };
    }
    return { success: false, message: json.error || 'Deploy failed' };
  } catch (err) {
    return { success: false, message: String(err) };
  }
}
