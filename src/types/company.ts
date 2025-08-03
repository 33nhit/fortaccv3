export interface CompanyData {
  id: string;
  companyFileNum: string; // Primary Key
  companyName: string;
  companyRegisteredAddress: string;
  brn: string;
  vatNumber: string;
  telephone: string;
  businessNature: string;
  yearEnded: string;
  multiCurrency: boolean;
  directors: string;
}

export interface CompanyFormData {
  companyFileNum: string;
  companyName: string;
  companyRegisteredAddress: string;
  brn: string;
  vatNumber: string;
  telephone: string;
  businessNature: string;
  yearEnded: string;
  multiCurrency: boolean;
  directors: string;
}

export interface BusinessNature {
  id: string;
  name: string;
}