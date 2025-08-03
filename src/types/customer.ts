export interface Customer {
  id: string;
  customerId: string; // Primary Key
  customerName: string;
  customerCategory: string;
  brn: string;
  vat: string;
  address: string;
  contactDetails: string;
  currency: string;
  balance: number;
  accountCode: string; // Links to General Ledger
}

export interface CustomerFormData {
  customerId: string;
  customerName: string;
  customerCategory: string;
  brn: string;
  vat: string;
  address: string;
  contactDetails: string;
  currency: string;
  balance: number;
  accountCode: string;
}

export interface CustomerCategory {
  id: string;
  name: string;
}

export interface Currency {
  code: string;
  name: string;
}