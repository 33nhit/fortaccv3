export interface InvoiceLineItem {
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

export interface Invoice {
  id: string;
  invoiceNumber: string;
  lineItems: InvoiceLineItem[];
  createdAt: string;
  updatedAt: string;
}

export interface InvoiceFormData {
  lineItems: InvoiceLineItem[];
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