export interface Supplier {
  id: string;
  supplierId: string; // Primary Key
  supplierName: string;
  supplierCategory: string;
  brn: string;
  vat: string;
  address: string;
  contactDetails: string;
  currency: string;
  balance: number;
  accountCode: string; // Links to General Ledger
}

export interface SupplierFormData {
  supplierId: string;
  supplierName: string;
  supplierCategory: string;
  brn: string;
  vat: string;
  address: string;
  contactDetails: string;
  currency: string;
  balance: number;
  accountCode: string;
}

export interface SupplierCategory {
  id: string;
  name: string;
}

export interface Currency {
  code: string;
  name: string;
}