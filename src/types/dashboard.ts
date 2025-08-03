export interface DashboardStats {
  totalRevenue: number;
  totalExpenses: number;
  profit: number;
  vatDue: number;
}


export interface ProcessSection {
  title: string;
  items: ProcessItem[];
}

export interface ProcessItem {
  name: string;
  href: string;
}