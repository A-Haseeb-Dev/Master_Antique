export interface Product {
  name: string;
  era: "victorian" | "georgian" | "art-deco" | "mid-century" | string;
  label?: string;
  origin?: string;
  description?: string;
  provenance?: string;
  price: number;
  badge?: string;
  image: string;
  status: "available" | "sold";
}

export interface ChatResult {
  title: string;
  era?: string;
  price?: number;
  image?: string;
  badge?: string;
  type: string;
}

export interface AskResult {
  answer: string;
  results: ChatResult[];
}

export interface Inquiry {
  name: string;
  email: string;
  phone?: string;
  reference?: string;
  message: string;
  date: string;
  read: boolean;
}
