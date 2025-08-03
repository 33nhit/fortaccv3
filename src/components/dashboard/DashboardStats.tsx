import React from 'react';
import { DollarSign, Receipt, TrendingUp, Percent } from 'lucide-react';
import { DashboardStats as StatsType } from '../../types/dashboard';

interface DashboardStatsProps {
  stats: StatsType;
}

export const DashboardStats: React.FC<DashboardStatsProps> = ({ stats }) => {
  const statItems = [
    {
      label: 'Total Revenue',
      value: `$${stats.totalRevenue.toLocaleString()}`,
      icon: <DollarSign className="w-6 h-6" />,
      bgColor: 'bg-blue-50',
      iconBg: 'bg-blue-100',
      textColor: 'text-blue-600',
      valueColor: 'text-blue-800',
      borderColor: 'border-blue-100',
    },
    {
      label: 'Total Expenses',
      value: `$${stats.totalExpenses.toLocaleString()}`,
      icon: <Receipt className="w-6 h-6" />,
      bgColor: 'bg-green-50',
      iconBg: 'bg-green-100',
      textColor: 'text-green-600',
      valueColor: 'text-green-800',
      borderColor: 'border-green-100',
    },
    {
      label: 'Profit',
      value: `$${stats.profit.toLocaleString()}`,
      icon: <TrendingUp className="w-6 h-6" />,
      bgColor: 'bg-purple-50',
      iconBg: 'bg-purple-100',
      textColor: 'text-purple-600',
      valueColor: 'text-purple-800',
      borderColor: 'border-purple-100',
    },
    {
      label: 'VAT Due',
      value: `$${stats.vatDue.toLocaleString()}`,
      icon: <Percent className="w-6 h-6" />,
      bgColor: 'bg-yellow-50',
      iconBg: 'bg-yellow-100',
      textColor: 'text-yellow-600',
      valueColor: 'text-yellow-800',
      borderColor: 'border-yellow-100',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {statItems.map((item, index) => (
        <div
          key={index}
          className={`${item.bgColor} p-4 rounded-lg border ${item.borderColor}`}
        >
          <div className="flex justify-between items-center">
            <div>
              <p className={`text-sm ${item.textColor}`}>{item.label}</p>
              <p className={`text-2xl font-bold ${item.valueColor}`}>{item.value}</p>
            </div>
            <div className={`${item.iconBg} p-3 rounded-full`}>
              <div className={item.textColor}>{item.icon}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};