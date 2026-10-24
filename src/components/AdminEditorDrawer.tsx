import React, { useState, useEffect } from 'react';
import { WeddingData, WeddingEvent, GalleryPhoto, StoryChapter } from '../types/wedding';
import { couplePresets, getTemplateDefaultData } from '../data/weddingData';
import {
  X,
  Sliders,
  RefreshCw,
  Check,
  Calendar,
  Image as ImageIcon,
  BookOpen,
  Plus,
  Trash2,
  Sparkles,
  Info,
  UploadCloud,
  ArrowUp,
  ArrowDown,
  GripVertical,
  Share2,
  Download,
  Upload,
} from 'lucide-react';
import { RoyalDivider } from './JaaliDecor';

interface AdminEditorDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  data: WeddingData;
  activeTemplateId?: string;
  onUpdateData: (newData: WeddingData) => void;
}

type EditorTab = 'general' | 'events' | 'gallery' | 'story' | 'presets';

const ensureValidData = (incoming?: WeddingData): WeddingData => {
  return {
    brideName: incoming?.brideName || 'Kajal',
    groomName: incoming?.groomName || 'Sahil',
    monogram: incoming?.monogram || 'S & K',
    weddingDateFormatted: incoming?.weddingDateFormatted || 'November 20 – 22, 2026',
    weddingDateIso: incoming?.weddingDateIso || '2026-11-20T19:00:00+05:30',
    venueCity: incoming?.venueCity || 'New Delhi',
    primaryVenue: incoming?.primaryVenue || 'Andaaj Mansion Banquet & Hotel Surya Grand',
    hashtag: incoming?.hashtag || '#SahilWedsKajal',
    rsvpDeadline: incoming?.rsvpDeadline || 'November 10, 2026',
    invocation: incoming?.invocation || '॥ श्री गणेशाय नमः ॥',
    welcomeNote: incoming?.welcomeNote || 'Destiny brought them together and now love will seal their bond......forever. We warmly request your auspicious presence and blessings as Sahil & Kajal unite in sacred matrimony.',
    quote: incoming?.quote || 'Destiny brought them together and now love will seal their bond......forever',
    parentsBride: incoming?.parentsBride || 'Daughter of Smt. Veena & Sh. Jagdish Tuteja',
    parentsGroom: incoming?.parentsGroom || 'Son of Smt. Sunila & Sh. Rajeev Arora',
    grandparentsGroom: incoming?.grandparentsGroom || 'Grand S/o Late Smt. Raj Kumari & Late Sh. Vishnu Bhagwan',
    residenceAddress: incoming?.residenceAddress || 'H. No.- C-96, Moti Nagar, New Delhi-110015',
    invitationOpening: incoming?.invitationOpening || 'With the divine blessings of our revered ancestors and elders, we cordially invite you to celebrate the wedding ceremonies of',
    complimentsFrom: incoming?.complimentsFrom || 'With Best Compliments From: Narang Family, All Relatives & Friends',
    shlokas: Array.isArray(incoming?.shlokas) && incoming.shlokas.length > 0
      ? incoming.shlokas
      : [
          'वक्रतुण्ड महाकाय सूर्यकोटि समप्रभः । निर्विघ्नं कुरुमे देव सर्वकार्येषु सर्वदा ॥',
          'विघ्न हरण मंगल करण, श्री गणपति महाराज । प्रथम निमंत्रण आपको, पूरन करियो काज ॥',
        ],
    events: Array.isArray(incoming?.events) ? incoming.events : [],
    gallery: Array.isArray(incoming?.gallery) ? incoming.gallery : [],
    story: Array.isArray(incoming?.story) ? incoming.story : [],
    rsvpContacts: Array.isArray(incoming?.rsvpContacts) ? incoming.rsvpContacts : [],
    contactPhone: incoming?.contactPhone || '+91 99102 62576',
    contactEmail: incoming?.contactEmail || 'arora.tuteja.weddings@gmail.com',
  };
};

export const AdminEditorDrawer: React.FC<AdminEditorDrawerProps> = ({
  isOpen,
  onClose,
  data,
  activeTemplateId = 'royal-heirloom',
  onUpdateData,
}) => {
  const [formData, setFormData] = useState<WeddingData>(() => ensureValidData(data));
  const [activeTab, setActiveTab] = useState<EditorTab>('general');
  const [showSavedFeedback, setShowSavedFeedback] = useState<boolean>(false);
  const [feedbackMessage, setFeedbackMessage] = useState<string>('Live changes applied!');
  const [draggedPhotoIndex, setDraggedPhotoIndex] = useState<number | null>(null);
  const [dragOverPhotoIndex, setDragOverPhotoIndex] = useState<number | null>(null);
  const [copiedShareLink, setCopiedShareLink] = useState<boolean>(false);
  const backupFileInputRef = React.useRef<HTMLInputElement>(null);

  // Sync internal form data when incoming data changes
  useEffect(() => {
    if (data) {
      setFormData(ensureValidData(data));
    }
  }, [data]);

  if (!isOpen) return null;

  const handleGeneralChange = (field: keyof WeddingData, value: string) => {
    setFormData((prev) => {
      const updated = { ...prev, [field]: value };
      onUpdateData(updated);
      return updated;
    });
  };

  // Event handlers
  const handleEventChange = (index: number, field: keyof WeddingEvent, value: string) => {
    setFormData((prev) => {
      const updatedEvents = [...(prev.events || [])];
      updatedEvents[index] = { ...updatedEvents[index], [field]: value };
      const updated = { ...prev, events: updatedEvents };
      onUpdateData(updated);
      return updated;
    });
  };

  const handleAddEvent = () => {
    const newEvent: WeddingEvent = {
      id: `event-${Date.now()}`,
      title: 'New Wedding Celebration',
      hindiTitle: 'शुभ उत्सव',
      subTitle: 'Ceremony & Gatherings',
      date: 'Saturday, December 20, 2026',
      time: '06:00 PM onwards',
      venueName: 'The Heritage Courtyard',
      venueAddress: 'Main Resort Lawns',
      attire: 'Festive Indian Regal',
      attireColorHint: 'Gold, Ivory & Pastels',
      description: 'Family gathering with traditional rituals, fine dining, and music.',
      mapQuery: 'Heritage Resort',
      calendarDateStart: '20261220T123000Z',
      calendarDateEnd: '20261220T180000Z',
    };
    setFormData((prev) => {
      const updated = { ...prev, events: [...(prev.events || []), newEvent] };
      onUpdateData(updated);
      return updated;
    });
  };

  const handleRemoveEvent = (index: number) => {
    if ((formData.events || []).length <= 1) {
      alert('You must have at least one wedding event.');
      return;
    }
    setFormData((prev) => {
      const updated = {
        ...prev,
        events: (prev.events || []).filter((_, i) => i !== index),
      };
      onUpdateData(updated);
      return updated;
    });
  };

  // Gallery handlers
  const handleGalleryChange = (index: number, field: keyof GalleryPhoto, value: string) => {
    setFormData((prev) => {
      const updatedGallery = [...(prev.gallery || [])];
      updatedGallery[index] = { ...updatedGallery[index], [field]: value };
      const updated = { ...prev, gallery: updatedGallery };
      onUpdateData(updated);
      return updated;
    });
  };

  const handleAddPhoto = (sampleUrl?: string, sampleCaption?: string) => {
    const newPhoto: GalleryPhoto = {
      id: `photo-${Date.now()}`,
      src: sampleUrl || 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=80',
      alt: 'Wedding Celebration Photo',
      caption: sampleCaption || 'Captured Moments — Sacred union and joyful memories',
      location: formData.venueCity || 'Heritage Grounds',
      spanClass: 'md:col-span-1 md:row-span-1',
    };
    setFormData((prev) => {
      const updated = { ...prev, gallery: [...(prev.gallery || []), newPhoto] };
      onUpdateData(updated);
      return updated;
    });
  };

  const handleRemovePhoto = (index: number) => {
    if ((formData.gallery || []).length <= 1) {
      alert('You must have at least one photo in the gallery.');
      return;
    }
    setFormData((prev) => {
      const updated = {
        ...prev,
        gallery: (prev.gallery || []).filter((_, i) => i !== index),
      };
      onUpdateData(updated);
      return updated;
    });
  };

  const drawerFileInputRef = React.useRef<HTMLInputElement>(null);

  const handleFilesDropInDrawer = (files: FileList | File[]) => {
    const imageFiles = Array.from(files).filter((f) => f.type.startsWith('image/'));
    if (imageFiles.length === 0) return;
    imageFiles.forEach((file, idx) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        if (!result) return;
        const cleanName = file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ');
        const newPhoto: GalleryPhoto = {
          id: `photo-drawer-${Date.now()}-${idx}`,
          src: result,
          alt: cleanName,
          caption: cleanName.charAt(0).toUpperCase() + cleanName.slice(1),
          location: formData.venueCity || 'Wedding Gallery',
          spanClass: 'md:col-span-1 md:row-span-1',
        };
        setFormData((prev) => ({
          ...prev,
          gallery: [...prev.gallery, newPhoto].slice(0, 10),
        }));
      };
      reader.readAsDataURL(file);
    });
  };

  const handleMovePhoto = (idx: number, direction: 'up' | 'down') => {
    const target = direction === 'up' ? idx - 1 : idx + 1;
    if (target < 0 || target >= formData.gallery.length) return;
    const updated = [...formData.gallery];
    const [moved] = updated.splice(idx, 1);
    updated.splice(target, 0, moved);
    setFormData((prev) => ({ ...prev, gallery: updated }));
  };

  // Card Drag and Drop Reordering Handlers
  const handlePhotoCardDragStart = (e: React.DragEvent, index: number) => {
    setDraggedPhotoIndex(index);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', `${index}`);
  };

  const handlePhotoCardDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    if (dragOverPhotoIndex !== index) {
      setDragOverPhotoIndex(index);
    }
  };

  const handlePhotoCardDragLeave = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (dragOverPhotoIndex === index) {
      setDragOverPhotoIndex(null);
    }
  };

  const handlePhotoCardDrop = (e: React.DragEvent, targetIndex: number) => {
    e.preventDefault();
    setDragOverPhotoIndex(null);

    // If external files dropped directly on this card, replace image
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const imageFile = Array.from(e.dataTransfer.files).find((f) => f.type.startsWith('image/'));
      if (imageFile) {
        const reader = new FileReader();
        reader.onload = (ev) => {
          const res = ev.target?.result as string;
          if (!res) return;
          setFormData((prev) => {
            const updatedGallery = [...(prev.gallery || [])];
            updatedGallery[targetIndex] = { ...updatedGallery[targetIndex], src: res };
            const updated = { ...prev, gallery: updatedGallery };
            onUpdateData(updated);
            return updated;
          });
          setFeedbackMessage(`✓ Photo #${targetIndex + 1} updated with uploaded image!`);
          setShowSavedFeedback(true);
          setTimeout(() => setShowSavedFeedback(false), 3000);
        };
        reader.readAsDataURL(imageFile);
        return;
      }
    }

    // Reorder cards
    if (draggedPhotoIndex === null || draggedPhotoIndex === targetIndex) {
      setDraggedPhotoIndex(null);
      return;
    }

    setFormData((prev) => {
      const updatedGallery = [...(prev.gallery || [])];
      const [moved] = updatedGallery.splice(draggedPhotoIndex, 1);
      updatedGallery.splice(targetIndex, 0, moved);
      const updated = { ...prev, gallery: updatedGallery };
      onUpdateData(updated);
      return updated;
    });

    setFeedbackMessage(`✓ Reordered photo #${draggedPhotoIndex + 1} to position #${targetIndex + 1}`);
    setShowSavedFeedback(true);
    setTimeout(() => setShowSavedFeedback(false), 2500);
    setDraggedPhotoIndex(null);
  };

  const handlePhotoCardDragEnd = () => {
    setDraggedPhotoIndex(null);
    setDragOverPhotoIndex(null);
  };

  // Story handlers
  const handleStoryChange = (index: number, field: keyof StoryChapter, value: string) => {
    setFormData((prev) => {
      const updatedStory = [...(prev.story || [])];
      updatedStory[index] = { ...updatedStory[index], [field]: value };
      const updated = { ...prev, story: updatedStory };
      onUpdateData(updated);
      return updated;
    });
  };

  const handleAddStoryChapter = () => {
    const newChapter: StoryChapter = {
      year: `${new Date().getFullYear()}`,
      title: 'A New Milestone',
      text: 'Our journey continued to unfold with love, laughter, and family blessings.',
    };
    setFormData((prev) => {
      const updated = { ...prev, story: [...(prev.story || []), newChapter] };
      onUpdateData(updated);
      return updated;
    });
  };

  const handleRemoveStoryChapter = (index: number) => {
    if ((formData.story || []).length <= 1) {
      alert('You must have at least one story chapter.');
      return;
    }
    setFormData((prev) => {
      const updated = {
        ...prev,
        story: (prev.story || []).filter((_, i) => i !== index),
      };
      onUpdateData(updated);
      return updated;
    });
  };

  // Presets
  const handleLoadPreset = (presetData: WeddingData, presetName: string) => {
    setFormData({ ...presetData });
    onUpdateData({ ...presetData });
    setFeedbackMessage(`Loaded ${presetName} profile into live preview!`);
    setShowSavedFeedback(true);
    setTimeout(() => setShowSavedFeedback(false), 3000);
  };

  const handleResetToTemplateDefault = () => {
    const defaultData = getTemplateDefaultData(activeTemplateId);
    setFormData({ ...defaultData });
    onUpdateData({ ...defaultData });
    setFeedbackMessage(`Reset to default data for this template suite!`);
    setShowSavedFeedback(true);
    setTimeout(() => setShowSavedFeedback(false), 3000);
  };

  const handleSave = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    onUpdateData(formData);
    // Explicitly write to localStorage under PY key to guarantee permanent persistence
    try {
      const PY_STORAGE_KEY = 'photographicallyyours_wedding_data_v1';
      const existing = localStorage.getItem(PY_STORAGE_KEY);
      const parsed = existing ? JSON.parse(existing) : {};
      parsed[activeTemplateId] = formData;
      if (formData.brideName === 'Kajal' || formData.groomName === 'Sahil') {
        parsed['bodh-heritage'] = formData;
      }
      localStorage.setItem(PY_STORAGE_KEY, JSON.stringify(parsed));
    } catch (err) {
      console.warn('Error saving to localStorage:', err);
    }
    setFeedbackMessage('✓ Changes Saved Permanently! Your gallery order, texts, and events will remain saved even after refreshing.');
    setShowSavedFeedback(true);
    setTimeout(() => setShowSavedFeedback(false), 4000);
  };

  const handleCopyClientShareLink = () => {
    const isSahilKajal =
      activeTemplateId === 'bodh-heritage' ||
      (formData.brideName === 'Kajal' && formData.groomName === 'Sahil');
    const cleanRoute = isSahilKajal
      ? '#/photographicallyyours/sahil-kajal'
      : `#/template/${activeTemplateId}`;
    const fullUrl = `${window.location.origin}${window.location.pathname}${cleanRoute}`;
    navigator.clipboard.writeText(fullUrl).then(() => {
      setCopiedShareLink(true);
      setTimeout(() => setCopiedShareLink(false), 3000);
    });
  };

  const handleExportBackup = () => {
    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
      JSON.stringify(formData, null, 2)
    )}`;
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', jsonString);
    downloadAnchor.setAttribute(
      'download',
      `${formData.groomName.toLowerCase()}-${formData.brideName.toLowerCase()}-wedding-invitation-backup.json`
    );
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleImportBackup = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (parsed && (parsed.brideName || parsed.groomName)) {
          setFormData(parsed);
          onUpdateData(parsed);
          setFeedbackMessage('✓ Successfully loaded wedding invitation backup!');
          setShowSavedFeedback(true);
          setTimeout(() => setShowSavedFeedback(false), 3500);
        }
      } catch (err) {
        alert('Invalid backup JSON file.');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="admin-drawer-title"
      className="fixed inset-0 z-50 flex justify-end bg-burgundy-950/70 backdrop-blur-sm animate-fade-in"
    >
      <div className="w-full max-w-2xl bg-cream-50 h-full overflow-y-auto p-4 sm:p-7 border-l-2 border-gold-400 shadow-2xl flex flex-col justify-between">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-3 sm:pb-4 border-b border-gold-300">
            <div className="flex items-center space-x-2.5">
              <div className="w-9 h-9 rounded-full bg-gold-200 text-burgundy-900 flex items-center justify-center shadow-xs">
                <Sliders className="w-4 h-4 text-burgundy-900" />
              </div>
              <div>
                <h3 id="admin-drawer-title" className="font-serif-royal text-lg sm:text-2xl text-burgundy-950 font-semibold break-words">
                  Invitation Content &amp; Media Editor
                </h3>
                <span className="text-[10px] uppercase font-sans tracking-widest text-gold-800 font-bold">
                  Live Customizer • {formData.brideName} &amp; {formData.groomName}
                </span>
              </div>
            </div>
            <button
              onClick={onClose}
              aria-label="Close customizer"
              className="w-9 h-9 rounded-full bg-cream-200 text-charcoal-800 flex items-center justify-center hover:bg-gold-200 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Preset Quick Select Banner */}
          <div className="my-3 p-3 rounded-xl bg-amber-50/90 border border-gold-300 text-xs flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div className="flex items-center space-x-2 text-amber-950">
              <Sparkles className="w-4 h-4 text-gold-700 flex-shrink-0" />
              <span className="font-serif font-medium">
                Quick Switch Presets:
              </span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {couplePresets.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => handleLoadPreset(p.data, p.name)}
                  className={`px-2.5 py-1 rounded-full text-[11px] font-serif transition-colors border ${
                    formData.brideName === p.data.brideName
                      ? 'bg-burgundy-900 text-gold-200 border-gold-500 font-bold'
                      : 'bg-white text-charcoal-800 border-gold-300 hover:bg-gold-100'
                  }`}
                >
                  {p.name}
                </button>
              ))}
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex border-b border-gold-300 overflow-x-auto space-x-1 sm:space-x-2 pb-1 scrollbar-none my-3">
            <button
              type="button"
              onClick={() => setActiveTab('general')}
              className={`px-3 py-2 rounded-t-lg text-xs font-serif font-semibold whitespace-nowrap transition-colors flex items-center space-x-1.5 ${
                activeTab === 'general'
                  ? 'bg-burgundy-900 text-gold-200 border-t-2 border-gold-400'
                  : 'text-charcoal-800/80 hover:bg-gold-100/70'
              }`}
            >
              <Info className="w-3.5 h-3.5" />
              <span>General Info</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('events')}
              className={`px-3 py-2 rounded-t-lg text-xs font-serif font-semibold whitespace-nowrap transition-colors flex items-center space-x-1.5 ${
                activeTab === 'events'
                  ? 'bg-burgundy-900 text-gold-200 border-t-2 border-gold-400'
                  : 'text-charcoal-800/80 hover:bg-gold-100/70'
              }`}
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Events ({(formData.events || []).length})</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('gallery')}
              className={`px-3 py-2 rounded-t-lg text-xs font-serif font-semibold whitespace-nowrap transition-colors flex items-center space-x-1.5 ${
                activeTab === 'gallery'
                  ? 'bg-burgundy-900 text-gold-200 border-t-2 border-gold-400'
                  : 'text-charcoal-800/80 hover:bg-gold-100/70'
              }`}
            >
              <ImageIcon className="w-3.5 h-3.5" />
              <span>Gallery ({(formData.gallery || []).length})</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('story')}
              className={`px-3 py-2 rounded-t-lg text-xs font-serif font-semibold whitespace-nowrap transition-colors flex items-center space-x-1.5 ${
                activeTab === 'story'
                  ? 'bg-burgundy-900 text-gold-200 border-t-2 border-gold-400'
                  : 'text-charcoal-800/80 hover:bg-gold-100/70'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Story ({(formData.story || []).length})</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('presets')}
              className={`px-3 py-2 rounded-t-lg text-xs font-serif font-semibold whitespace-nowrap transition-colors flex items-center space-x-1.5 ${
                activeTab === 'presets'
                  ? 'bg-burgundy-900 text-gold-200 border-t-2 border-gold-400'
                  : 'text-charcoal-800/80 hover:bg-gold-100/70'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>All Presets</span>
            </button>
          </div>

          {/* Form Content */}
          <form onSubmit={handleSave} className="space-y-4 my-4 text-xs">
            {/* 1. GENERAL TAB */}
            {activeTab === 'general' && (
              <div className="space-y-3.5 animate-fade-in">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block uppercase tracking-wider text-charcoal-800 font-semibold mb-1">
                      Bride's Name
                    </label>
                    <input
                      type="text"
                      value={formData.brideName}
                      onChange={(e) => handleGeneralChange('brideName', e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-gold-300 bg-white text-charcoal-800 text-base sm:text-xs focus:ring-1 focus:ring-gold-500"
                    />
                  </div>

                  <div>
                    <label className="block uppercase tracking-wider text-charcoal-800 font-semibold mb-1">
                      Groom's Name
                    </label>
                    <input
                      type="text"
                      value={formData.groomName}
                      onChange={(e) => handleGeneralChange('groomName', e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-gold-300 bg-white text-charcoal-800 text-base sm:text-xs focus:ring-1 focus:ring-gold-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block uppercase tracking-wider text-charcoal-800 font-semibold mb-1">
                      Monogram Badge
                    </label>
                    <input
                      type="text"
                      value={formData.monogram}
                      onChange={(e) => handleGeneralChange('monogram', e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-gold-300 bg-white text-charcoal-800 text-base sm:text-xs focus:ring-1 focus:ring-gold-500"
                    />
                  </div>

                  <div>
                    <label className="block uppercase tracking-wider text-charcoal-800 font-semibold mb-1">
                      Wedding Hashtag
                    </label>
                    <input
                      type="text"
                      value={formData.hashtag}
                      onChange={(e) => handleGeneralChange('hashtag', e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-gold-300 bg-white text-charcoal-800 text-base sm:text-xs focus:ring-1 focus:ring-gold-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block uppercase tracking-wider text-charcoal-800 font-semibold mb-1">
                      Wedding Date Text
                    </label>
                    <input
                      type="text"
                      value={formData.weddingDateFormatted}
                      onChange={(e) => handleGeneralChange('weddingDateFormatted', e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-gold-300 bg-white text-charcoal-800 text-base sm:text-xs focus:ring-1 focus:ring-gold-500"
                    />
                  </div>

                  <div>
                    <label className="block uppercase tracking-wider text-charcoal-800 font-semibold mb-1">
                      Countdown Target Date (ISO)
                    </label>
                    <input
                      type="text"
                      value={formData.weddingDateIso}
                      onChange={(e) => handleGeneralChange('weddingDateIso', e.target.value)}
                      placeholder="2026-12-19T17:00:00+05:30"
                      className="w-full px-3 py-2 rounded-lg border border-gold-300 bg-white text-charcoal-800 text-base sm:text-xs focus:ring-1 focus:ring-gold-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block uppercase tracking-wider text-charcoal-800 font-semibold mb-1">
                      Primary Venue
                    </label>
                    <input
                      type="text"
                      value={formData.primaryVenue}
                      onChange={(e) => handleGeneralChange('primaryVenue', e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-gold-300 bg-white text-charcoal-800 text-base sm:text-xs focus:ring-1 focus:ring-gold-500"
                    />
                  </div>

                  <div>
                    <label className="block uppercase tracking-wider text-charcoal-800 font-semibold mb-1">
                      City &amp; State
                    </label>
                    <input
                      type="text"
                      value={formData.venueCity}
                      onChange={(e) => handleGeneralChange('venueCity', e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-gold-300 bg-white text-charcoal-800 text-base sm:text-xs focus:ring-1 focus:ring-gold-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block uppercase tracking-wider text-charcoal-800 font-semibold mb-1">
                      Divine Invocation
                    </label>
                    <input
                      type="text"
                      value={formData.invocation}
                      onChange={(e) => handleGeneralChange('invocation', e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-gold-300 bg-white text-charcoal-800 text-base sm:text-xs focus:ring-1 focus:ring-gold-500"
                    />
                  </div>

                  <div>
                    <label className="block uppercase tracking-wider text-charcoal-800 font-semibold mb-1">
                      RSVP Deadline
                    </label>
                    <input
                      type="text"
                      value={formData.rsvpDeadline}
                      onChange={(e) => handleGeneralChange('rsvpDeadline', e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-gold-300 bg-white text-charcoal-800 text-base sm:text-xs focus:ring-1 focus:ring-gold-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block uppercase tracking-wider text-charcoal-800 font-semibold mb-1">
                      Bride's Parents
                    </label>
                    <input
                      type="text"
                      value={formData.parentsBride}
                      onChange={(e) => handleGeneralChange('parentsBride', e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-gold-300 bg-white text-charcoal-800 text-base sm:text-xs focus:ring-1 focus:ring-gold-500"
                    />
                  </div>

                  <div>
                    <label className="block uppercase tracking-wider text-charcoal-800 font-semibold mb-1">
                      Groom's Parents
                    </label>
                    <input
                      type="text"
                      value={formData.parentsGroom}
                      onChange={(e) => handleGeneralChange('parentsGroom', e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-gold-300 bg-white text-charcoal-800 text-base sm:text-xs focus:ring-1 focus:ring-gold-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block uppercase tracking-wider text-charcoal-800 font-semibold mb-1">
                    Welcome Story Note
                  </label>
                  <textarea
                    rows={3}
                    value={formData.welcomeNote}
                    onChange={(e) => handleGeneralChange('welcomeNote', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-gold-300 bg-white text-charcoal-800 text-base sm:text-xs focus:ring-1 focus:ring-gold-500"
                  />
                </div>
              </div>
            )}

            {/* 2. EVENTS TAB */}
            {activeTab === 'events' && (
              <div className="space-y-4 animate-fade-in">
                <div className="flex items-center justify-between">
                  <p className="text-xs text-charcoal-800/80 font-serif">
                    Add, edit, or customize wedding itinerary events.
                  </p>
                  <button
                    type="button"
                    onClick={handleAddEvent}
                    className="px-3 py-1.5 rounded-full bg-burgundy-900 text-gold-200 text-xs font-serif flex items-center space-x-1.5 hover:bg-burgundy-800 shadow-xs"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Event</span>
                  </button>
                </div>

                {(formData.events || []).map((event, idx) => (
                  <div
                    key={event.id || idx}
                    className="p-3.5 sm:p-4 rounded-xl bg-white border border-gold-300/80 shadow-xs space-y-3"
                  >
                    <div className="flex items-center justify-between border-b border-gold-200 pb-2">
                      <div className="flex items-center space-x-2">
                        <span className="w-6 h-6 rounded-full bg-gold-200 text-burgundy-900 font-serif font-bold text-xs flex items-center justify-center">
                          {idx + 1}
                        </span>
                        <h4 className="font-serif font-bold text-sm text-burgundy-950">
                          {event.title || 'Untitled Event'}
                        </h4>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveEvent(idx)}
                        title="Delete this event"
                        className="text-red-600 hover:text-red-800 p-1 rounded hover:bg-red-50 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      <div>
                        <label className="block text-[11px] font-semibold text-charcoal-800 mb-0.5">
                          Event Title (English)
                        </label>
                        <input
                          type="text"
                          value={event.title}
                          onChange={(e) => handleEventChange(idx, 'title', e.target.value)}
                          className="w-full px-2.5 py-1.5 rounded border border-gold-300 text-base sm:text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-charcoal-800 mb-0.5">
                          Hindi / Traditional Title (Optional)
                        </label>
                        <input
                          type="text"
                          value={event.hindiTitle || ''}
                          onChange={(e) => handleEventChange(idx, 'hindiTitle', e.target.value)}
                          placeholder="e.g. शुभ विवाह"
                          className="w-full px-2.5 py-1.5 rounded border border-gold-300 text-base sm:text-xs"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      <div>
                        <label className="block text-[11px] font-semibold text-charcoal-800 mb-0.5">
                          Date
                        </label>
                        <input
                          type="text"
                          value={event.date}
                          onChange={(e) => handleEventChange(idx, 'date', e.target.value)}
                          className="w-full px-2.5 py-1.5 rounded border border-gold-300 text-base sm:text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-charcoal-800 mb-0.5">
                          Time
                        </label>
                        <input
                          type="text"
                          value={event.time}
                          onChange={(e) => handleEventChange(idx, 'time', e.target.value)}
                          className="w-full px-2.5 py-1.5 rounded border border-gold-300 text-base sm:text-xs"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      <div>
                        <label className="block text-[11px] font-semibold text-charcoal-800 mb-0.5">
                          Venue Name
                        </label>
                        <input
                          type="text"
                          value={event.venueName}
                          onChange={(e) => handleEventChange(idx, 'venueName', e.target.value)}
                          className="w-full px-2.5 py-1.5 rounded border border-gold-300 text-base sm:text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-charcoal-800 mb-0.5">
                          Venue Address
                        </label>
                        <input
                          type="text"
                          value={event.venueAddress}
                          onChange={(e) => handleEventChange(idx, 'venueAddress', e.target.value)}
                          className="w-full px-2.5 py-1.5 rounded border border-gold-300 text-base sm:text-xs"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      <div>
                        <label className="block text-[11px] font-semibold text-charcoal-800 mb-0.5">
                          Dress Code / Attire
                        </label>
                        <input
                          type="text"
                          value={event.attire}
                          onChange={(e) => handleEventChange(idx, 'attire', e.target.value)}
                          className="w-full px-2.5 py-1.5 rounded border border-gold-300 text-base sm:text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-charcoal-800 mb-0.5">
                          Subtitle
                        </label>
                        <input
                          type="text"
                          value={event.subTitle}
                          onChange={(e) => handleEventChange(idx, 'subTitle', e.target.value)}
                          className="w-full px-2.5 py-1.5 rounded border border-gold-300 text-base sm:text-xs"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-charcoal-800 mb-0.5">
                        Description
                      </label>
                      <textarea
                        rows={2}
                        value={event.description}
                        onChange={(e) => handleEventChange(idx, 'description', e.target.value)}
                        className="w-full px-2.5 py-1.5 rounded border border-gold-300 text-base sm:text-xs"
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* 3. GALLERY TAB */}
            {activeTab === 'gallery' && (
              <div className="space-y-4 animate-fade-in">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-serif font-bold text-sm text-burgundy-950">
                      Photo Gallery Management
                    </h4>
                    <p className="text-[11px] text-charcoal-800/70">
                      Edit URLs, update captions, or add custom imagery.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleAddPhoto()}
                    className="px-3 py-1.5 rounded-full bg-burgundy-900 text-gold-200 text-xs font-serif flex items-center space-x-1.5 hover:bg-burgundy-800 shadow-xs"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Photo</span>
                  </button>
                </div>

                {/* Drag & Drop File Upload Zone */}
                <div
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => {
                    e.preventDefault();
                    if (e.dataTransfer.files) handleFilesDropInDrawer(e.dataTransfer.files);
                  }}
                  onClick={() => drawerFileInputRef.current?.click()}
                  className="p-3.5 sm:p-4 rounded-xl border-2 border-dashed border-gold-400 bg-gold-50/70 text-center hover:bg-gold-100/80 cursor-pointer transition-colors"
                >
                  <UploadCloud className="w-5 h-5 text-gold-700 mx-auto mb-1" />
                  <p className="text-xs font-serif font-semibold text-burgundy-950">
                    Drag &amp; Drop Photos Here from Your Computer
                  </p>
                  <p className="text-[10px] text-charcoal-800/70 mt-0.5">
                    Drop up to 10 photos or tap to browse files
                  </p>
                  <input
                    ref={drawerFileInputRef}
                    type="file"
                    multiple
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files) handleFilesDropInDrawer(e.target.files);
                    }}
                  />
                </div>

                {/* Quick Add Presets */}
                <div className="p-3 bg-cream-200/60 rounded-xl border border-gold-300/80">
                  <span className="block text-[11px] font-serif font-bold text-burgundy-950 mb-1.5">
                    Quick Sample Photo Suggestions:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    <button
                      type="button"
                      onClick={() =>
                        handleAddPhoto(
                          'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=80',
                          'Regal Royal Couple Portrait'
                        )
                      }
                      className="px-2 py-1 rounded bg-white border border-gold-300 hover:bg-gold-50 text-[10px]"
                    >
                      + Royal Couple
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        handleAddPhoto(
                          'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
                          'Intricate Bridal Mehendi Motifs'
                        )
                      }
                      className="px-2 py-1 rounded bg-white border border-gold-300 hover:bg-gold-50 text-[10px]"
                    >
                      + Bridal Henna
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        handleAddPhoto(
                          'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80',
                          'Sun-Drenched Palace Arches'
                        )
                      }
                      className="px-2 py-1 rounded bg-white border border-gold-300 hover:bg-gold-50 text-[10px]"
                    >
                      + Palace Arches
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        handleAddPhoto(
                          'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
                          'Starlit Twilight Toast'
                        )
                      }
                      className="px-2 py-1 rounded bg-white border border-gold-300 hover:bg-gold-50 text-[10px]"
                    >
                      + Candlelit Canopy
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        handleAddPhoto(
                          'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80',
                          'Traditional Brass Urli & Diyas'
                        )
                      }
                      className="px-2 py-1 rounded bg-white border border-gold-300 hover:bg-gold-50 text-[10px]"
                    >
                      + Brass Urli & Flowers
                    </button>
                  </div>
                </div>

                {/* Photo List Header & Instructions */}
                <div className="p-2.5 rounded-lg bg-gold-100/80 border border-gold-300 text-[11px] font-serif text-burgundy-950 flex flex-col xs:flex-row xs:items-center xs:justify-between gap-1.5">
                  <div className="flex items-center space-x-1.5">
                    <GripVertical className="w-4 h-4 text-gold-700 flex-shrink-0" />
                    <span>
                      <strong>Interactive Drag &amp; Drop:</strong> Grab any card by the handle to reorder photos, or drop image files onto any card to replace it.
                    </span>
                  </div>
                  <span className="font-bold text-gold-900 text-[11px] whitespace-nowrap self-end xs:self-auto px-2 py-0.5 rounded bg-white/70 border border-gold-300">
                    {formData.gallery.length} Photos
                  </span>
                </div>

                {/* Draggable Photo List */}
                <div className="space-y-3">
                  {formData.gallery.map((photo, idx) => (
                    <div
                      key={photo.id || idx}
                      draggable
                      onDragStart={(e) => handlePhotoCardDragStart(e, idx)}
                      onDragOver={(e) => handlePhotoCardDragOver(e, idx)}
                      onDragLeave={(e) => handlePhotoCardDragLeave(e, idx)}
                      onDrop={(e) => handlePhotoCardDrop(e, idx)}
                      onDragEnd={handlePhotoCardDragEnd}
                      className={`p-3 rounded-xl bg-white border transition-all flex flex-col sm:flex-row gap-3 items-start relative select-none ${
                        draggedPhotoIndex === idx
                          ? 'opacity-40 border-gold-600 scale-[0.98]'
                          : dragOverPhotoIndex === idx
                          ? 'border-gold-600 bg-gold-50/90 ring-2 ring-gold-400 shadow-md scale-[1.01]'
                          : 'border-gold-300/80 shadow-xs hover:border-gold-400'
                      }`}
                    >
                      {/* Image Preview Thumbnail with file replace */}
                      <div className="w-full sm:w-28 h-28 rounded-lg overflow-hidden border border-gold-300 bg-cream-100 flex-shrink-0 relative group">
                        <img
                          src={photo.src}
                          alt={photo.alt || 'Wedding Gallery'}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.currentTarget as HTMLImageElement).src =
                              'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=400&q=80';
                          }}
                        />
                        <label
                          title="Click to replace this photo with a local file"
                          className="absolute inset-0 bg-burgundy-950/70 text-gold-200 text-[10px] font-sans flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer text-center p-1"
                        >
                          <Upload className="w-4 h-4 mb-0.5 text-gold-300" />
                          <span>Replace Photo</span>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                              const f = e.target.files?.[0];
                              if (f) {
                                const reader = new FileReader();
                                reader.onload = (ev) => {
                                  const res = ev.target?.result as string;
                                  if (res) handleGalleryChange(idx, 'src', res);
                                };
                                reader.readAsDataURL(f);
                              }
                            }}
                          />
                        </label>
                      </div>

                      {/* Fields & Controls */}
                      <div className="flex-1 w-full space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            {/* Drag handle */}
                            <div
                              className="flex items-center space-x-1 px-2 py-0.5 rounded bg-gold-100 border border-gold-300 text-burgundy-900 cursor-grab active:cursor-grabbing text-[11px] font-sans font-medium hover:bg-gold-200 transition-colors"
                              title="Click and drag to reorder this photo"
                            >
                              <GripVertical className="w-3.5 h-3.5 text-gold-800" />
                              <span>Photo #{idx + 1}</span>
                            </div>

                            {/* Accessible up / down buttons */}
                            <div className="flex items-center space-x-1">
                              {idx > 0 && (
                                <button
                                  type="button"
                                  onClick={() => handleMovePhoto(idx, 'up')}
                                  className="w-5 h-5 rounded bg-cream-200 text-charcoal-800 hover:bg-gold-200 flex items-center justify-center text-[10px]"
                                  title="Move photo up"
                                >
                                  <ArrowUp className="w-3 h-3" />
                                </button>
                              )}
                              {idx < formData.gallery.length - 1 && (
                                <button
                                  type="button"
                                  onClick={() => handleMovePhoto(idx, 'down')}
                                  className="w-5 h-5 rounded bg-cream-200 text-charcoal-800 hover:bg-gold-200 flex items-center justify-center text-[10px]"
                                  title="Move photo down"
                                >
                                  <ArrowDown className="w-3 h-3" />
                                </button>
                              )}
                            </div>
                          </div>

                          <button
                            type="button"
                            onClick={() => handleRemovePhoto(idx)}
                            title="Delete this photo"
                            className="text-red-600 hover:text-red-800 p-1 rounded hover:bg-red-50 transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <div>
                          <label className="block text-[10px] font-semibold text-charcoal-800">
                            Image URL or File Path
                          </label>
                          <input
                            type="text"
                            value={photo.src}
                            onChange={(e) => handleGalleryChange(idx, 'src', e.target.value)}
                            placeholder="https://images.unsplash.com/... or data:image/..."
                            className="w-full px-2 py-1 rounded border border-gold-300 text-base sm:text-xs font-mono"
                          />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          <div>
                            <label className="block text-[10px] font-semibold text-charcoal-800">
                              Caption
                            </label>
                            <input
                              type="text"
                              value={photo.caption}
                              onChange={(e) => handleGalleryChange(idx, 'caption', e.target.value)}
                              className="w-full px-2 py-1 rounded border border-gold-300 text-base sm:text-xs"
                            />
                          </div>

                          <div>
                            <label className="block text-[10px] font-semibold text-charcoal-800">
                              Location Tag
                            </label>
                            <input
                              type="text"
                              value={photo.location}
                              onChange={(e) => handleGalleryChange(idx, 'location', e.target.value)}
                              className="w-full px-2 py-1 rounded border border-gold-300 text-base sm:text-xs"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 4. STORY TAB */}
            {activeTab === 'story' && (
              <div className="space-y-4 animate-fade-in">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-serif font-bold text-sm text-burgundy-950">
                      Our Love Story Timeline
                    </h4>
                    <p className="text-[11px] text-charcoal-800/70">
                      Milestones of how the couple met, grew together, and chose forever.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleAddStoryChapter}
                    className="px-3 py-1.5 rounded-full bg-burgundy-900 text-gold-200 text-xs font-serif flex items-center space-x-1.5 hover:bg-burgundy-800 shadow-xs"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Chapter</span>
                  </button>
                </div>

                {(formData.story || []).map((chapter, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-white border border-gold-300/80 shadow-xs space-y-2.5"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="w-5 h-5 rounded-full bg-gold-200 text-burgundy-900 font-serif font-bold text-[11px] flex items-center justify-center">
                          {idx + 1}
                        </span>
                        <span className="font-serif font-bold text-xs text-burgundy-900">
                          Milestone Chapter
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveStoryChapter(idx)}
                        title="Delete this chapter"
                        className="text-red-600 hover:text-red-800 p-1 rounded hover:bg-red-50 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                      <div className="col-span-1">
                        <label className="block text-[10px] font-semibold text-charcoal-800 mb-0.5">
                          Year / Time
                        </label>
                        <input
                          type="text"
                          value={chapter.year || ''}
                          onChange={(e) => handleStoryChange(idx, 'year', e.target.value)}
                          placeholder="e.g. 2024"
                          className="w-full px-2 py-1 rounded border border-gold-300 text-base sm:text-xs"
                        />
                      </div>
                      <div className="col-span-2">
                        <label className="block text-[10px] font-semibold text-charcoal-800 mb-0.5">
                          Chapter Title
                        </label>
                        <input
                          type="text"
                          value={chapter.title}
                          onChange={(e) => handleStoryChange(idx, 'title', e.target.value)}
                          className="w-full px-2 py-1 rounded border border-gold-300 text-base sm:text-xs"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-semibold text-charcoal-800 mb-0.5">
                        Story Narrative
                      </label>
                      <textarea
                        rows={2}
                        value={chapter.text}
                        onChange={(e) => handleStoryChange(idx, 'text', e.target.value)}
                        className="w-full px-2 py-1 rounded border border-gold-300 text-base sm:text-xs"
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* 5. PRESETS TAB */}
            {activeTab === 'presets' && (
              <div className="space-y-4 animate-fade-in">
                <p className="text-xs text-charcoal-800/80 font-serif">
                  Select an authentic couple profile to populate complete names, dates, multi-day ceremonies, story chapters, and curated photography in one click:
                </p>

                <div className="grid grid-cols-1 gap-3">
                  {couplePresets.map((preset) => (
                    <div
                      key={preset.id}
                      className="p-4 rounded-xl bg-white border border-gold-300/80 shadow-xs hover:border-gold-500 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                    >
                      <div>
                        <div className="flex items-center space-x-2">
                          <h4 className="font-serif-royal font-bold text-base text-burgundy-950">
                            {preset.name}
                          </h4>
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-gold-100 text-gold-900 border border-gold-300 font-sans">
                            {preset.location}
                          </span>
                        </div>
                        <p className="text-xs text-charcoal-800/70 mt-1 font-light">
                          {preset.description}
                        </p>
                        <div className="text-[10px] text-burgundy-900 font-serif mt-1">
                          {(preset.data?.events || []).length} Events • {(preset.data?.gallery || []).length} Photos • {preset.data?.weddingDateFormatted}
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleLoadPreset(preset.data, preset.name)}
                        className="px-4 py-2 rounded-full bg-burgundy-900 text-gold-200 text-xs font-serif font-semibold hover:bg-burgundy-800 shadow-sm whitespace-nowrap self-start sm:self-auto"
                      >
                        Load This Couple
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <RoyalDivider />

            {/* Save & Client Controls */}
            <div className="space-y-3 pt-2">
              {/* Primary Save Changes Permanently Button */}
              <button
                type="submit"
                className="w-full min-h-[48px] inline-flex items-center justify-center space-x-2 py-3.5 px-4 rounded-full bg-burgundy-900 text-gold-200 font-serif text-sm sm:text-base hover:bg-burgundy-800 transition-all shadow-royal font-bold hover:shadow-gold-glow cursor-pointer border border-gold-400"
              >
                <Check className="w-5 h-5 text-gold-400" />
                <span>Save Changes Permanently</span>
              </button>

              {/* Utility Row: Copy Link, Backup JSON, Restore & Reset */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
                {/* 1. Copy Client Link */}
                <button
                  type="button"
                  onClick={handleCopyClientShareLink}
                  title="Copy clean client link (#/photographicallyyours/sahil-kajal)"
                  className="px-2.5 py-2 rounded-lg border border-gold-400/80 bg-white hover:bg-gold-50 text-burgundy-950 flex items-center justify-center space-x-1.5 transition-colors text-xs font-serif"
                >
                  {copiedShareLink ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-700 font-bold text-[11px]">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Share2 className="w-3.5 h-3.5 text-gold-700" />
                      <span className="text-[11px]">Share Link</span>
                    </>
                  )}
                </button>

                {/* 2. Download JSON Backup */}
                <button
                  type="button"
                  onClick={handleExportBackup}
                  title="Export all texts, events, and photos as an offline JSON backup"
                  className="px-2.5 py-2 rounded-lg border border-gold-400/80 bg-white hover:bg-gold-50 text-burgundy-950 flex items-center justify-center space-x-1.5 transition-colors text-xs font-serif"
                >
                  <Download className="w-3.5 h-3.5 text-gold-700" />
                  <span className="text-[11px]">Save Backup</span>
                </button>

                {/* 3. Restore JSON Backup */}
                <label
                  title="Load a previously exported wedding invitation JSON backup"
                  className="px-2.5 py-2 rounded-lg border border-gold-400/80 bg-white hover:bg-gold-50 text-burgundy-950 flex items-center justify-center space-x-1.5 transition-colors text-xs font-serif cursor-pointer text-center"
                >
                  <Upload className="w-3.5 h-3.5 text-gold-700" />
                  <span className="text-[11px]">Load Backup</span>
                  <input
                    ref={backupFileInputRef}
                    type="file"
                    accept=".json"
                    className="hidden"
                    onChange={handleImportBackup}
                  />
                </label>

                {/* 4. Reset to Default */}
                <button
                  type="button"
                  onClick={handleResetToTemplateDefault}
                  title="Reset to default data for this template suite"
                  className="px-2.5 py-2 rounded-lg border border-gold-300 bg-cream-100 hover:bg-cream-200 text-charcoal-700 flex items-center justify-center space-x-1.5 transition-colors text-xs font-serif"
                >
                  <RefreshCw className="w-3.5 h-3.5 text-gold-700" />
                  <span className="text-[11px]">Reset Defaults</span>
                </button>
              </div>
            </div>

            {showSavedFeedback && (
              <div className="mt-3 p-3.5 rounded-xl bg-emerald-50 border-2 border-emerald-400 text-emerald-950 text-center animate-fade-in font-serif text-xs font-semibold flex items-center justify-center space-x-2 shadow-sm">
                <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>{feedbackMessage}</span>
              </div>
            )}
          </form>
        </div>

        {/* Footer info */}
        <div className="pt-4 border-t border-gold-300 text-[11px] text-charcoal-800/70 text-center">
          The Atelier • Bespoke Wedding Invitation Customizer
        </div>
      </div>
    </div>
  );
};
