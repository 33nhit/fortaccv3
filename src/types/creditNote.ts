export interface CreditNoteLineItem {
  id: string;
  date: string;
  customerNumber: string; // Auto-generated primary key
  customerCode: string; // Links to customer
  customerName: string; // Auto-populated from customer
  vatNo: string; // Auto-populated from customer
  accountCode: string;
  description: string;
  vatType: string; // Links to VAT saved
  exclusive: number;
  vat: number;
  total: number;
}

export interface CreditNote {
  id: string;
  creditNoteNumber: string;
  lineItems: CreditNoteLineItem[];
  createdAt: string;
  updatedAt: string;
}

export interface CreditNoteFormData {
  lineItems: CreditNoteLineItem[];
}

export interface CustomerOption {
  code: string;
  name: string;
  vatNo: string;
  accountCode: string;
}

export interface VATOption {
  code: string;
  name: string;
  percentage: number;
}