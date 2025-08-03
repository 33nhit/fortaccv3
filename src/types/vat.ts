export interface VAT {
  id: string;
  vatId: string; // Primary Key
  code: string; // e.g., 1.1, 1.4
  name: string;
  percentage: number;
  vatReportPeriod: 'Monthly' | 'Quarterly';
}

export interface VATFormData {
  vatId: string;
  code: string;
  name: string;
  percentage: number;
  vatReportPeriod: 'Monthly' | 'Quarterly';
}