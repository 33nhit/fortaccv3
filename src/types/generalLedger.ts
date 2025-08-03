export interface GeneralLedgerAccount {
  id: string;
  accountCode: string;
  accountName: string;
  accountType: 'Asset' | 'Liability' | 'Equity' | 'Revenue' | 'Expense';
  groupType: 'Current Asset' | 'Non-Current Asset' | 'Current Liability' | 'Non-Current Liability' | 'Equity' | 'Operating Revenue' | 'Non-Operating Revenue' | 'Operating Expense' | 'Non-Operating Expense';
}

export interface GeneralLedgerFormData {
  accountCode: string;
  accountName: string;
  accountType: string;
  groupType: string;
}