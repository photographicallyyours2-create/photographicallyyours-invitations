export interface CustomerEnquiryData {
  brideName: string;
  groomName: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  weddingDate: string;
  guestCount: string;
  destinationCity: string;
  preferredTemplateId: string;
  servicesNeeded: string[];
  notes?: string;
}

export interface EnquirySubmissionState {
  isSubmitted: boolean;
  data: CustomerEnquiryData | null;
  submittedAt: string;
}
