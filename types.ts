
export interface OrderFormData {
  name: string;
  email: string;
  phone: string;
  faculty: string;
  period: string;
  class: string;
  jacketModel: 'normal' | 'veteran';
  veteranConfirmation: boolean;
  size: string;
  paymentOption: 'first_batch' | 'regular' | 'installments';
  installmentsPlan: '2x' | '3x' | '';
  extras: string;
}

// This file is used to provide type definitions for Vite environment variables.
// By defining ImportMetaEnv and ImportMeta, we ensure TypeScript recognizes
// `import.meta.env` and its properties, resolving compilation errors.

interface ImportMetaEnv {
  /**
   * The API Key for the Google Gemini AI service.
   * This is loaded from a .env file (e.g., VITE_API_KEY=your_key_here).
   */
  readonly VITE_API_KEY?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
