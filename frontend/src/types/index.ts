export type CategoryPurpose = 0 | 1 | 2; 
export type TransactionType = 0 | 1; 

export interface User {
  id: number;
  name: string;
  age: number;
}

export interface Category {
  id: number;
  description: string;
  purpose: CategoryPurpose;
}

export interface Transaction {
  id: number;
  description: string;
  amount: number;
  type: TransactionType;
  categoryId: number;
  personId: number;
}

export interface SummaryDetail {
  id: number;
  name: string; 
  totalIncome: number;
  totalExpense: number;
  balance: number;
}

export interface SummaryOverall {
  income: number;
  expense: number;
  balance: number;
}

export interface SummaryResponse {
  details: SummaryDetail[];
  overall: SummaryOverall;
}