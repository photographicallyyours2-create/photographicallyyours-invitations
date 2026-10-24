export interface StoryChapter {
  title: string;
  year?: string;
  text: string;
}

export interface WeddingEvent {
  id: string;
  title: string;
  hindiTitle?: string;
  subTitle: string;
  date: string;
  time: string;
  venueName: string;
  venueAddress: string;
  attire: string;
  attireColorHint?: string;
  description: string;
  mapQuery: string;
  mapUrl?: string; // Direct Google Maps navigation URL
  note?: string; // Special program or procession note
  calendarDateStart: string; // ISO 8601 for calendar integration
  calendarDateEnd: string;
}

export interface GalleryPhoto {
  id: string;
  src: string;
  alt: string;
  caption: string;
  location: string;
  spanClass?: string;
}

export interface RsvpContactPerson {
  name: string;
  relation?: string;
  phone: string;
  whatsappMessage?: string;
}

export interface WeddingData {
  brideName: string;
  groomName: string;
  monogram: string;
  weddingDateFormatted: string;
  weddingDateIso: string; // Target for countdown
  venueCity: string;
  primaryVenue: string;
  hashtag: string;
  rsvpDeadline: string;
  invocation: string;
  invitationOpening: string;
  welcomeNote: string;
  parentsBride: string;
  parentsGroom: string;
  story: StoryChapter[];
  events: WeddingEvent[];
  gallery: GalleryPhoto[];
  contactPhone: string;
  contactEmail: string;

  // Authentic Card Traditional Blessings & Extended Lineage
  shlokas?: string[];
  quote?: string;
  grandparentsGroom?: string;
  grandparentsBride?: string;
  residenceAddress?: string;
  rsvpContacts?: RsvpContactPerson[];
  complimentsFrom?: string;
}

export interface RsvpFormData {
  fullName: string;
  email: string;
  phone: string;
  attending: 'attending' | 'declined';
  guestCount: number;
  attendingEvents: string[];
  dietaryRequirements: string;
  dietaryDetails?: string;
  message?: string;
}
