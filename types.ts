export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  avatarUrl: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  isStreaming?: boolean;
}

export enum SectionId {
  HOME = 'home',
  SERVICES = 'services',
  PRICING = 'pricing',
  ABOUT = 'about',
  TESTIMONIALS = 'testimonials',
  CONTACT = 'contact'
}