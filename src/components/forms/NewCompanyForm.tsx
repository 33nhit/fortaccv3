import React, { useState } from 'react';
import { X, Save } from 'lucide-react';
import { CompanyFormData, BusinessNature } from '../../types/company';

interface NewCompanyFormProps {
  onClose: () => void;
}

export const NewCompanyForm: React.FC<NewCompanyFormProps> = ({ onClose }) => {
  const businessNatureOptions: BusinessNature[] = [
    { id: '1', name: 'Manufacturing' },
    { id: '2', name: 'Trading' },
    { id: '3', name: 'Services' },
    { id: '4', name: 'Construction' },
    { id: '5', name: 'Technology' },
    { id: '6', name: 'Healthcare' },
    { id: '7', name: 'Education' },
    { id: '8', name: 'Finance' },
    { id: '9', name: 'Real Estate' },
    { id: '10', name: 'Transportation' },
    { id: '11', name: 'Agriculture' },
    { id: '12', name: 'Tourism' },
    { id: '13', name: 'Other' },
  ];

  const [formData, setFormData] = useState<CompanyFormData>({
    companyFileNum: '',
    companyName: '',
    companyRegisteredAddress: '',
    brn: '',
    vatNumber: '',
    telephone: '',
    businessNature: '',
    yearEnded: new Date().getFullYear().toString(),
    multiCurrency: false,
    directors: '',
  });

  const handleSave = () => {
    // Validate required fields
    if (!formData.companyFileNum || !formData.companyName || !formData.companyRegisteredAddress) {
      alert('Please fill in all required fields (Company File Number, Company Name, and Registered Address)');
      return;
    }

    if (!formData.brn || !formData.vatNumber || !formData.telephone) {
      alert('Please fill in BRN, VAT Number, and Telephone');
      return;
    }

    if (!formData.businessNature || !formData.yearEnded) {
      alert('Please select Business Nature and Year Ended');
      return;
    }

    // Here you would implement the actual save logic
    console.log('Saving company data:', formData);
    alert('Company created successfully!');
    onClose();
  };

  const handleCancel = () => {
    if (window.confirm('Are you sure you want to cancel? All unsaved changes will be lost.')) {
      onClose();
    }
  };

  const generateYearOptions = () => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let i = currentYear; i >= currentYear - 10; i--) {
      years.push(i.toString());
    }
    return years;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden m-4">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-800">New Company</h2>
            <button
              onClick={handleCancel}
              className="text-gray-500 hover:text-gray-700 p-1"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Company File Number */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Company File Number *
              </label>
              <input
                type="text"
                value={formData.companyFileNum}
                onChange={(e) => setFormData({ ...formData, companyFileNum: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter company file number"
              />
            </div>

            {/* Company Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Company Name *
              </label>
              <input
                type="text"
                value={formData.companyName}
                onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter company name"
              />
            </div>

            {/* BRN */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                BRN *
              </label>
              <input
                type="text"
                value={formData.brn}
                onChange={(e) => setFormData({ ...formData, brn: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter BRN"
              />
            </div>

            {/* VAT Number */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                VAT Number *
              </label>
              <input
                type="text"
                value={formData.vatNumber}
                onChange={(e) => setFormData({ ...formData, vatNumber: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter VAT number"
              />
            </div>

            {/* Telephone */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Telephone *
              </label>
              <input
                type="tel"
                value={formData.telephone}
                onChange={(e) => setFormData({ ...formData, telephone: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter telephone number"
              />
            </div>

            {/* Business Nature */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Business Nature *
              </label>
              <select
                value={formData.businessNature}
                onChange={(e) => setFormData({ ...formData, businessNature: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select business nature</option>
                {businessNatureOptions.map((option) => (
                  <option key={option.id} value={option.name}>
                    {option.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Year Ended */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Year Ended *
              </label>
              <select
                value={formData.yearEnded}
                onChange={(e) => setFormData({ ...formData, yearEnded: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {generateYearOptions().map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>

            {/* Multi-Currency */}
            <div className="flex items-center">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={formData.multiCurrency}
                  onChange={(e) => setFormData({ ...formData, multiCurrency: e.target.checked })}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm font-medium text-gray-700">Multi-Currency</span>
              </label>
            </div>

            {/* Company Registered Address */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Company Registered Address *
              </label>
              <textarea
                value={formData.companyRegisteredAddress}
                onChange={(e) => setFormData({ ...formData, companyRegisteredAddress: e.target.value })}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter company registered address"
              />
            </div>

            {/* Directors */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Directors
              </label>
              <textarea
                value={formData.directors}
                onChange={(e) => setFormData({ ...formData, directors: e.target.value })}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter directors information (names, positions, etc.)"
              />
            </div>
          </div>
        </div>

        {/* Bottom Action Buttons */}
        <div className="p-6 border-t border-gray-200 bg-gray-50">
          <div className="flex justify-end space-x-3">
            <button
              onClick={handleCancel}
              className="px-6 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center space-x-2"
            >
              <Save className="w-4 h-4" />
              <span>Save</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};