
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
