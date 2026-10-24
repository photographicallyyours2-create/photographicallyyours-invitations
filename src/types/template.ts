export type TemplateCategory = 'indian-heritage' | 'royal-destination' | 'minimal-editorial';

export type TemplateStatus = 'live' | 'preview';

export interface ColorSwatch {
  name: string;
  hex: string;
}

export interface TemplateDefinition {
  id: string;
  number: string;
  name: string;
  subtitle: string;
  category: TemplateCategory;
  categoryLabel: string;
  description: string;
  palette: ColorSwatch[];
  thumbnail: string;
  aestheticMood: string;
  typographyPairing: string;
  status: TemplateStatus;
  accentBadge?: string;
  features: string[];
}
