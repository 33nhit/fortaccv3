import React from 'react';
import { Menu, LogOut, Calculator } from 'lucide-react';
import { Company } from '../../types/auth';

interface HeaderProps {
  onToggleSidebar: () => void;
  onLogout: () => void;
  company: Company | null;
}

export const Header: React.FC<HeaderProps> = ({ onToggleSidebar, onLogout, company }) => {
  return (
    <nav className="bg-blue-800 text-white shadow-md">
      <div className="flex justify-between items-center px-4 py-3">
        <div className="flex items-center space-x-4">
          <button
            onClick={onToggleSidebar}
            className="text-white focus:outline-none hover:bg-blue-700 p-2 rounded-md transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex items-center space-x-2">
            <Calculator className="w-6 h-6 text-white" />
            <span className="font-semibold text-xl">FortAcc</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <span className="font-medium">
            {company ? company.name : 'No Company Selected'}
          </span>
          <button
            onClick={onLogout}
            className="bg-blue-700 hover:bg-blue-600 px-4 py-1 rounded-md flex items-center space-x-2 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </nav>
  );
};