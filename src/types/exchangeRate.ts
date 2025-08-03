export interface ExchangeRate {
  id: string;
  currencyId: string; // Primary Key
  code: string; // e.g., USD, EUR
  date: string;
  name: string; // e.g., United States Dollar
  symbol: string; // e.g., $, €
  exchangeRateToHome: number; // Exchange rate to home currency
  isMonthly: boolean; // Monthly rate flag
}

export interface ExchangeRateFormData {
  currencyId: string;
  code: string;
  date: string;
  name: string;
  symbol: string;
  exchangeRateToHome: number;
  isMonthly: boolean;
}

export interface CurrencyOption {
  code: string;
  name: string;
  symbol: string;
}