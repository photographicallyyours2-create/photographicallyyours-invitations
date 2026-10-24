import React, { useState, useEffect, useCallback, useRef } from 'react';
import { GalleryPhoto } from '../types/wedding';
import { RoyalDivider } from './JaaliDecor';
import { RoyalImage } from './RoyalImage';
import { compressImageFile } from '../utils/storage';
import {
  X,
  ChevronLeft,
  ChevronRight,
  Camera,
  Maximize2,
  GripVertical,
  UploadCloud,
  RotateCcw,
  Sparkles,
  Check,
  ArrowLeft,
  ArrowRight,
} from 'lucide-react';

interface PhotoGalleryProps {
  photos: GalleryPhoto[];
  title?: string;
  subtitle?: string;
  onPhotosChange?: (photos: GalleryPhoto[]) => void;
  allowDragAndDrop?: boolean;
}

export const PhotoGallery: React.FC<PhotoGalleryProps> = ({
  photos,
  title = "Cherished Memories",
  subtitle = "A celebration of love, laughter, and timeless memories captured in every frame.",
  onPhotosChange,
  allowDragAndDrop = true,
}) => {
  const [items, setItems] = useState<GalleryPhoto[]>(photos);
  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const [isDraggingFiles, setIsDraggingFiles] = useState<boolean>(false);
  const [notification, setNotification] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Synchronize internal items if external photos prop changes significantly
  useEffect(() => {
    if (photos && photos.length > 0) {
      setItems(photos);
    }
  }, [photos]);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  // Lightbox handlers
  const activePhoto = activePhotoIndex !== null ? items[activePhotoIndex] : null;

  const handleNext = useCallback(() => {
    if (activePhotoIndex !== null) {
      setActivePhotoIndex((prev) => (prev! + 1) % items.length);
    }
  }, [activePhotoIndex, items.length]);

  const handlePrev = useCallback(() => {
    if (activePhotoIndex !== null) {
      setActivePhotoIndex((prev) => (prev! - 1 + items.length) % items.length);
    }
  }, [activePhotoIndex, items.length]);

  const handleClose = useCallback(() => {
    setActivePhotoIndex(null);
  }, []);

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (activePhotoIndex === null) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [activePhotoIndex, handleClose, handleNext, handlePrev]);

  // Read and compress dropped or selected image files
  const processFiles = async (files: FileList | File[], targetIndex?: number) => {
    const imageFiles = Array.from(files).filter((file) => file.type.startsWith('image/'));
    if (imageFiles.length === 0) return;

    showNotification(`Optimizing & saving ${imageFiles.length} photo${imageFiles.length > 1 ? 's' : ''}...`);

    const newItems = [...items];

    for (let fIdx = 0; fIdx < imageFiles.length; fIdx++) {
      const file = imageFiles[fIdx];
      try {
        const compressedDataUrl = await compressImageFile(file, 1400, 0.82);
        const cleanName = file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ');
        const newPhoto: GalleryPhoto = {
          id: `photo-drop-${Date.now()}-${fIdx}`,
          src: compressedDataUrl,
          alt: cleanName,
          caption: cleanName.charAt(0).toUpperCase() + cleanName.slice(1),
          location: 'Celebration Moments',
          spanClass: 'aspect-[4/5]',
        };

        if (targetIndex !== undefined && targetIndex < newItems.length) {
          // Replace specific photo slot
          newItems[targetIndex] = newPhoto;
        } else {
          // Replace or add up to 10
          if (newItems.length < 10) {
            newItems.push(newPhoto);
          } else {
            newItems[fIdx % 10] = newPhoto;
          }
        }
      } catch (err) {
        console.warn('Error compressing photo:', err);
      }
    }

    // Ensure at most 10 items
    const finalPhotos = newItems.slice(0, 10);
    setItems(finalPhotos);
    onPhotosChange?.(finalPhotos);
    showNotification(`✓ Saved ${imageFiles.length} photo${imageFiles.length > 1 ? 's' : ''} to gallery permanently!`);
  };

  // HTML5 Drag and drop reordering handlers
  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', `${index}`);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    e.stopPropagation();
    if (draggedIndex !== null && draggedIndex !== index) {
      setDragOverIndex(index);
    }
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, targetIndex: number) => {
    e.preventDefault();
    e.stopPropagation();

    // Check if external files dropped directly on a card
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFiles(e.dataTransfer.files, targetIndex);
      setDraggedIndex(null);
      setDragOverIndex(null);
      return;
    }

    // Otherwise reorder the cards
    if (draggedIndex !== null && draggedIndex !== targetIndex) {
      const updated = [...items];
      const [movedItem] = updated.splice(draggedIndex, 1);
      updated.splice(targetIndex, 0, movedItem);
      setItems(updated);
      onPhotosChange?.(updated);
      showNotification(`Reordered photo #${draggedIndex + 1} to #${targetIndex + 1}`);
    }

    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  // Quick arrow reordering (great for mobile/touch or quick sorting)
  const handleMoveItem = (index: number, direction: 'left' | 'right') => {
    const target = direction === 'left' ? index - 1 : index + 1;
    if (target < 0 || target >= items.length) return;

    const updated = [...items];
    const [moved] = updated.splice(index, 1);
    updated.splice(target, 0, moved);
    setItems(updated);
    onPhotosChange?.(updated);
  };

  // Reset to original 10 photos
  const handleResetToDefault = () => {
    setItems(photos);
    onPhotosChange?.(photos);
    showNotification('Restored original curated 10 photos');
  };

  return (
    <section
      id="gallery-section"
      className="py-14 sm:py-20 px-3 sm:px-6 md:px-8 max-w-7xl mx-auto"
      onDragEnter={(e) => {
        if (e.dataTransfer.types.includes('Files')) {
          setIsDraggingFiles(true);
        }
      }}
      onDragLeave={(e) => {
        // Only trigger if leaving the section container
        if (!e.currentTarget.contains(e.relatedTarget as Node)) {
          setIsDraggingFiles(false);
        }
      }}
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => {
        e.preventDefault();
        setIsDraggingFiles(false);
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
          processFiles(e.dataTransfer.files);
        }
      }}
    >
      {/* Section Header */}
      <div className="text-center mb-8 sm:mb-12">
        <div className="flex items-center justify-center space-x-2 text-gold-600 mb-2">
          <Camera className="w-4 h-4 text-[#C29B38]" />
          <span className="font-sans text-xs uppercase tracking-[0.25em] font-semibold text-[#4B5A2B]">
            Visual Chronicle
          </span>
          <Camera className="w-4 h-4 text-[#C29B38]" />
        </div>
        <h2 className="font-serif-royal text-2xl sm:text-4xl md:text-5xl text-burgundy-900 mt-1 mb-2 sm:mb-3 break-words">
          {title}
        </h2>
        <p className="text-xs sm:text-base text-charcoal-800/70 max-w-lg mx-auto font-sans font-light">
          {subtitle}
        </p>
        <RoyalDivider />

        {/* 10 Photos & Drag-and-Drop Capability Control Bar */}
        {allowDragAndDrop && (
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs">
            <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-gold-100/90 text-burgundy-900 border border-gold-300 font-serif font-medium">
              <Sparkles className="w-3 h-3 text-gold-700" />
              <span>{items.length} Photographs • Drag &amp; Drop to Reorder</span>
            </span>

            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#FCFAF5] border border-gold-400 text-burgundy-900 hover:bg-gold-50 transition-colors shadow-2xs font-sans text-xs"
              title="Upload your own photos from your computer"
            >
              <UploadCloud className="w-3.5 h-3.5 text-gold-700" />
              <span>Upload / Drop Photos</span>
            </button>

            <button
              type="button"
              onClick={handleResetToDefault}
              className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full border border-gold-300/70 text-charcoal-800/70 hover:bg-cream-200/60 transition-colors text-[11px]"
              title="Reset gallery back to default curated 10 photos"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>

            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                if (e.target.files) processFiles(e.target.files);
              }}
            />
          </div>
        )}

        {/* Feedback notification toast */}
        {notification && (
          <div className="mt-3 inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full bg-emerald-900 text-emerald-100 text-xs shadow-md animate-fade-in font-sans">
            <Check className="w-3.5 h-3.5 text-emerald-300" />
            <span>{notification}</span>
          </div>
        )}
      </div>

      {/* Global Drag & Drop Zone Overlay */}
      {isDraggingFiles && (
        <div className="mb-6 p-6 sm:p-10 rounded-3xl border-2 border-dashed border-gold-500 bg-gold-100/80 text-center animate-pulse flex flex-col items-center justify-center space-y-2">
          <UploadCloud className="w-10 h-10 text-gold-700 animate-bounce" />
          <h4 className="font-serif-royal text-xl sm:text-2xl text-burgundy-950 font-semibold">
            Drop Photos Here to Update the 10 Gallery Frames
          </h4>
          <p className="text-xs text-charcoal-800/80">
            Release to instantly preview your wedding celebration photographs.
          </p>
        </div>
      )}

      {/* Interactive 10-Photo Responsive Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 md:gap-5">
        {items.map((photo, index) => {
          const isBeingDragged = draggedIndex === index;
          const isTargeted = dragOverIndex === index;

          return (
            <div
              key={photo.id}
              draggable={allowDragAndDrop}
              onDragStart={(e) => handleDragStart(e, index)}
              onDragOver={(e) => handleDragOver(e, index)}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, index)}
              onDragEnd={handleDragEnd}
              tabIndex={0}
              role="button"
              aria-label={`View photo ${index + 1}: ${photo.caption}. Drag to reorder.`}
              onClick={() => {
                if (draggedIndex === null) setActivePhotoIndex(index);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setActivePhotoIndex(index);
                }
              }}
              className={`group relative overflow-hidden rounded-2xl cursor-grab active:cursor-grabbing border transition-all duration-300 aspect-[4/5] bg-cream-100/50 ${
                isBeingDragged
                  ? 'opacity-40 ring-2 ring-gold-500 scale-95 shadow-inner'
                  : isTargeted
                  ? 'ring-2 ring-gold-500 scale-[1.03] shadow-gold-glow border-gold-500'
                  : 'border-gold-300/70 shadow-sm hover:shadow-royal hover:-translate-y-1'
              }`}
            >
              <RoyalImage
                src={photo.src}
                alt={photo.alt}
                fallbackTitle={photo.caption}
                className="w-full h-full object-cover transform duration-500 ease-out group-hover:scale-105 pointer-events-none"
                containerClassName="w-full h-full"
              />

              {/* Number Badge Top Left (01, 02... 10) */}
              <div className="absolute top-2 left-2 z-10 bg-burgundy-950/80 backdrop-blur-xs text-gold-200 text-[10px] sm:text-[11px] font-serif font-bold px-2 py-0.5 rounded-full border border-gold-400/50 shadow-xs pointer-events-none">
                {String(index + 1).padStart(2, '0')}
              </div>

              {/* Drag Handle Top Right */}
              {allowDragAndDrop && (
                <div
                  className="absolute top-2 right-2 z-10 w-7 h-7 rounded-full bg-burgundy-950/70 text-gold-200 flex items-center justify-center opacity-75 group-hover:opacity-100 transition-opacity border border-gold-400/40 shadow-xs"
                  title="Drag and drop to reorder"
                >
                  <GripVertical className="w-3.5 h-3.5 text-gold-300" />
                </div>
              )}

              {/* Mobile / Touch Arrow Reorder Controls (Top or Bottom Hover) */}
              {allowDragAndDrop && (
                <div className="absolute bottom-2 left-2 z-10 flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  {index > 0 && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleMoveItem(index, 'left');
                      }}
                      className="w-6 h-6 rounded-full bg-burgundy-900/90 text-gold-200 hover:bg-gold-500 hover:text-burgundy-950 flex items-center justify-center shadow-xs transition-colors"
                      title="Move photo left"
                    >
                      <ArrowLeft className="w-3 h-3" />
                    </button>
                  )}
                  {index < items.length - 1 && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleMoveItem(index, 'right');
                      }}
                      className="w-6 h-6 rounded-full bg-burgundy-900/90 text-gold-200 hover:bg-gold-500 hover:text-burgundy-950 flex items-center justify-center shadow-xs transition-colors"
                      title="Move photo right"
                    >
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  )}
                </div>
              )}

              {/* Elegant overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-burgundy-950/85 via-burgundy-950/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3 sm:p-4 text-cream-50 pointer-events-none">
                <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.2em] text-gold-300 font-sans font-semibold truncate">
                  {photo.location}
                </span>
                <p className="font-serif text-xs sm:text-sm font-medium leading-snug mt-0.5 line-clamp-2">
                  {photo.caption}
                </p>
                <div className="mt-1.5 flex items-center space-x-1 text-[10px] text-gold-200">
                  <Maximize2 className="w-3 h-3" />
                  <span className="font-sans uppercase tracking-wider">Tap to View</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Lightbox Modal */}
      {activePhoto && activePhotoIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Image gallery lightbox"
          className="fixed inset-0 z-50 flex items-center justify-center bg-burgundy-950/95 backdrop-blur-md p-3 sm:p-4 animate-fade-in"
        >
          {/* Close Button */}
          <button
            onClick={handleClose}
            aria-label="Close photo preview"
            className="absolute top-3 right-3 sm:top-5 sm:right-5 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-cream-50/15 hover:bg-cream-50/25 text-cream-50 flex items-center justify-center transition-colors focus:outline-none z-50 border border-gold-400/40"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Navigation Controls */}
          <button
            onClick={handlePrev}
            aria-label="Previous photograph"
            className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-12 sm:h-12 rounded-full bg-cream-50/15 hover:bg-cream-50/25 text-cream-50 flex items-center justify-center transition-colors focus:outline-none border border-gold-400/40 z-50"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          <button
            onClick={handleNext}
            aria-label="Next photograph"
            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-12 sm:h-12 rounded-full bg-cream-50/15 hover:bg-cream-50/25 text-cream-50 flex items-center justify-center transition-colors focus:outline-none border border-gold-400/40 z-50"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* Image Container */}
          <div className="max-w-4xl max-h-[85vh] flex flex-col items-center justify-center text-center px-4 sm:px-0">
            <div className="relative rounded-xl sm:rounded-2xl overflow-hidden border border-gold-400/50 shadow-2xl bg-black/40 max-h-[65vh] sm:max-h-[70vh]">
              <RoyalImage
                src={activePhoto.src}
                alt={activePhoto.alt}
                fallbackTitle={activePhoto.caption}
                className="max-h-[65vh] sm:max-h-[70vh] w-auto object-contain mx-auto"
                containerClassName="max-h-[65vh] sm:max-h-[70vh] min-h-[220px] sm:min-h-[300px]"
              />
            </div>

            {/* Photo details */}
            <div className="mt-3 sm:mt-4 text-cream-50 max-w-xl">
              <span className="text-[11px] sm:text-xs font-sans tracking-widest uppercase text-gold-300">
                {activePhoto.location} • Photo {activePhotoIndex + 1} of {items.length}
              </span>
              <p className="font-serif-royal text-lg sm:text-2xl mt-1 text-cream-100">
                {activePhoto.caption}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
