import React from 'react';
import { DashboardStats } from './DashboardStats';
import { ProcessReports } from './ProcessReports';
import { RecentActivity } from './RecentActivity';
import { DashboardStats as StatsType, ProcessSection, RecentActivity as ActivityType } from '../../types/dashboard';

const mockStats: StatsType = {
  totalRevenue: 125000,
  totalExpenses: 85000,
  profit: 40000,
  vatDue: 7500,
};

const mockProcessSections: ProcessSection[] = [
  {
    title: '',
    items: [
      { name: 'Invoices', href: '#' },
      { name: 'Credit Note', href: '#' },
      { name: 'Receipts', href: '#' },
      { name: 'Supplier bill', href: '#' },
      { name: 'Return to supplier', href: '#' },
      { name: 'Payment', href: '#' },
      { name: 'Bank reconciliation', href: '#' },
      { name: 'Journal', href: '#' },
      { name: 'Revaluation', href: '#' },
    ],
  },
];

const mockRecentActivity: ActivityType[] = [
  {
    id: '1',
    date: '2023-06-15',
    type: 'Invoice',
    reference: 'INV-2023-001',
    amount: 2500,
  },
  {
    id: '2',
    date: '2023-06-14',
    type: 'Payment',
    reference: 'PAY-2023-045',
    amount: 1200,
  },
  {
    id: '3',
    date: '2023-06-13',
    type: 'Journal',
    reference: 'JNL-2023-012',
    amount: 750,
  },
];

export const Dashboard: React.FC = () => {
  return (
    <div className="flex-1 p-6 bg-gray-100">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Dashboard</h2>
        
        <DashboardStats stats={mockStats} />
        <ProcessReports sections={mockProcessSections} />
      </div>
    </div>
  );
};