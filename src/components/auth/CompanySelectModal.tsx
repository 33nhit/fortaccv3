import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Company } from '../../types/auth';

interface CompanySelectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (companyId: string) => void;
  companies: Company[];
}

export const CompanySelectModal: React.FC<CompanySelectModalProps> = ({
  isOpen,
  onClose,
  onSelect,
  companies,
}) => {
  const [selectedCompanyId, setSelectedCompanyId] = useState<string>('');
  const [error, setError] = useState<string>('');

  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  const handleConnect = () => {
    if (!selectedCompanyId) {
      setError('Please select a company');
      return;
    }
    
    setError('');
    onSelect(selectedCompanyId);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40"
      onClick={handleBackdropClick}
      onKeyDown={handleKeyDown}
      tabIndex={-1}
    >
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md m-4">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-800">Select Company</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 p-1"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          
          <div className="mb-6">
            <select
              value={selectedCompanyId}
              onChange={(e) => {
                setSelectedCompanyId(e.target.value);
                setError('');
              }}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="" disabled>
                Select a company
              </option>
              {companies.map((company) => (
                <option key={company.id} value={company.id}>
                  {company.name}
                </option>
              ))}
            </select>
            
            {error && (
              <div className="text-red-600 text-sm mt-2">{error}</div>
            )}
          </div>
          
          <div className="flex justify-end">
            <button
              onClick={handleConnect}
              className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Connect
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};