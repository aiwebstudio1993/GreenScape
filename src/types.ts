export interface Service {
  id: string;
  title: string;
  category: 'fencing' | 'decking' | 'patios' | 'landscaping' | 'gates';
  description: string;
  features: string[];
  image: string;
  basePricePerUnit: number;
  unitLabel: string;
}

export interface Testimonial {
  id: string;
  author: string;
  location: string;
  serviceType: string;
  date: string;
  rating: number;
  comment: string;
  reply?: string;
  projectImages?: {
    before: string;
    after: string;
  };
  verified?: boolean;
}

export interface GalleryItem {
  id: string;
  category: string;
  title: string;
  description: string;
  image: string;
}

export interface ContactInquiry {
  name: string;
  email: string;
  phone: string;
  location: string;
  serviceType: string;
  message: string;
  estimatedCostMin?: number;
  estimatedCostMax?: number;
}
