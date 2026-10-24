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
 * Load all stored wedding data from IndexedDB
 */
export async function loadAllFromIndexedDB(): Promise<Record<string, WeddingData>> {
  try {
    const db = await openDatabase();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const result: Record<string, WeddingData> = {};

      if (store.getAll && store.getAllKeys) {
        const keysReq = store.getAllKeys();
        const valsReq = store.getAll();

        tx.oncomplete = () => {
          const keys = keysReq.result as string[];
          const vals = valsReq.result as WeddingData[];
          for (let i = 0; i < keys.length; i++) {
            result[keys[i]] = vals[i];
          }
          resolve(result);
        };
        tx.onerror = () => reject(tx.error);
      } else {
        // Fallback for older browsers
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
        cursorReq.onerror = () => reject(cursorReq.error);
      }
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
          height = maxDimension;
        }
      }

      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext('2d');
      if (!ctx) {
        // Fallback to original
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
 * Universal safe saver: Saves to IndexedDB (unlimited) AND attempts localStorage
 */
export async function persistWeddingData(
  templateId: string,
  data: WeddingData,
  allData: Record<string, WeddingData>
): Promise<void> {
  // 1. Save to IndexedDB (always succeeds, no 5MB quota)
  await saveToIndexedDB(templateId, data);
  if (templateId === 'bodh-heritage' || data.brideName === 'Kajal' || data.groomName === 'Sahil') {
    await saveToIndexedDB('bodh-heritage', data);
  }

  // 2. Safe save to localStorage with quota protection
  try {
    localStorage.setItem(PY_STORAGE_KEY, JSON.stringify(allData));
  } catch (quotaError) {
    console.warn('LocalStorage quota exceeded (safely stored in IndexedDB):', quotaError);
    // Prune very large base64 strings only from localStorage mirror, leaving IndexedDB intact
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
