export type ServiceCategory =
  | 'stamped-concrete'
  | 'concrete'
  | 'interlock'
  | 'driveways'
  | 'patios'
  | 'stairs-walkways';

export interface ProjectImage {
  url: string;
  alt: string;
  caption?: string;
  tag?: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  slug: string;
  category: ServiceCategory;
  serviceType: string;
  location: string;
  year?: string;
  heroImage: string;
  images: ProjectImage[];
  beforeAfter?: {
    beforeUrl: string;
    beforeLabel: string;
    afterUrl: string;
    afterLabel: string;
    description: string;
  };
  shortDescription: string;
  fullDescription: string;
  scope: string[];
  specs?: {
    material: string;
    patternOrStyle?: string;
    colorOrFinish?: string;
    subBase?: string;
  };
}

export interface ServiceDetail {
  id: string;
  title: string;
  slug: string;
  tagline: string;
  shortDescription: string;
  fullDescription: string;
  heroImage: string;
  features: {
    title: string;
    description: string;
  }[];
  specifications: {
    label: string;
    value: string;
  }[];
  applications: string[];
  faqs: {
    question: string;
    answer: string;
  }[];
}

export interface ProcessStep {
  number: string;
  title: string;
  subtitle: string;
  timeline: string;
  description: string;
  technicalHighlights: string[];
  image: string;
}

export interface PhotoPreview {
  name: string;
  size: string;
  previewUrl: string;
}

export interface QuoteFormData {
  projectTypes: string[];
  projectScope: string;
  estimatedArea: string;
  locationPostal: string;
  projectAddress: string;
  timeline: string;
  photos: PhotoPreview[];
  customerName: string;
  phone: string;
  email: string;
  preferredContact: 'phone' | 'email' | 'either';
  notes: string;
}
