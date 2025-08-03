import React, { useState } from 'react';
import { Plus, Edit2, X, Save } from 'lucide-react';
import { VAT, VATFormData } from '../../types/vat';

interface VATFormProps {
  onClose: () => void;
}

export const VATForm: React.FC<VATFormProps> = ({ onClose }) => {
  const [vatRecords, setVatRecords] = useState<VAT[]>([
    {
      id: '1',
      vatId: 'VAT001',
      code: '1.1',
      name: 'Standard VAT',
      percentage: 15,
      vatReportPeriod: 'Monthly',
    },
    {
      id: '2',
      vatId: 'VAT002',
      code: '1.4',
      name: 'Zero Rated VAT',
      percentage: 0,
      vatReportPeriod: 'Quarterly',
    },
    {
      id: '3',
      vatId: 'VAT003',
      code: '2.1',
      name: 'Exempt VAT',
      percentage: 0,
      vatReportPeriod: 'Monthly',
    },
  ]);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingVAT, setEditingVAT] = useState<VAT | null>(null);
  const [formData, setFormData] = useState<VATFormData>({
    vatId: '',
    code: '',
    name: '',
    percentage: 0,
    vatReportPeriod: 'Monthly',
  });

  const handleAdd = () => {
    setEditingVAT(null);
    setFormData({
      vatId: '',
      code: '',
      name: '',
      percentage: 0,
      vatReportPeriod: 'Monthly',
    });
    setIsFormOpen(true);
  };

  const handleEdit = (vat: VAT) => {
    setEditingVAT(vat);
    setFormData({
      vatId: vat.vatId,
      code: vat.code,
      name: vat.name,
      percentage: vat.percentage,
      vatReportPeriod: vat.vatReportPeriod,
    });
    setIsFormOpen(true);
  };

  const handleSave = () => {
    if (!formData.vatId || !formData.code || !formData.name) {
      alert('Please fill in all required fields');
      return;
    }

    if (editingVAT) {
      // Update existing VAT record
      setVatRecords(vatRecords.map(vat =>
        vat.id === editingVAT.id
          ? {
              ...vat,
              vatId: formData.vatId,
              code: formData.code,
              name: formData.name,
              percentage: formData.percentage,
              vatReportPeriod: formData.vatReportPeriod,
            }
          : vat
      ));
    } else {
      // Add new VAT record
      const newVAT: VAT = {
        id: Date.now().toString(),
        vatId: formData.vatId,
        code: formData.code,
        name: formData.name,
        percentage: formData.percentage,
        vatReportPeriod: formData.vatReportPeriod,
      };
      setVatRecords([...vatRecords, newVAT]);
    }

    setIsFormOpen(false);
    setEditingVAT(null);
  };

  const handleCancel = () => {
    setIsFormOpen(false);
    setEditingVAT(null);
    setFormData({
      vatId: '',
      code: '',
      name: '',
      percentage: 0,
      vatReportPeriod: 'Monthly',
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-6xl max-h-[90vh] overflow-hidden m-4">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-800">VAT Management</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 p-1"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="p-6">
          {/* Action Buttons */}
          <div className="mb-6 flex space-x-4">
            <button
              onClick={handleAdd}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>Add</span>
            </button>
          </div>

          {/* VAT Records Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                    VAT ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                    Code
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                    Percentage
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                    VAT Report Period
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {vatRecords.map((vat) => (
                  <tr key={vat.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 border-b">
                      {vat.vatId}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 border-b">
                      {vat.code}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 border-b">
                      {vat.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 border-b">
                      {vat.percentage}%
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 border-b">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        vat.vatReportPeriod === 'Monthly' 
                          ? 'bg-blue-100 text-blue-800' 
                          : 'bg-green-100 text-green-800'
                      }`}>
                        {vat.vatReportPeriod}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 border-b">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEdit(vat)}
                          className="text-blue-600 hover:text-blue-800 p-1"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Add/Edit Form Modal */}
        {isFormOpen && (
          <div className="fixed inset-0 z-60 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md m-4 max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  {editingVAT ? 'Edit VAT Record' : 'Add New VAT Record'}
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      VAT ID *
                    </label>
                    <input
                      type="text"
                      value={formData.vatId}
                      onChange={(e) => setFormData({ ...formData, vatId: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter VAT ID"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Code *
                    </label>
                    <input
                      type="text"
                      value={formData.code}
                      onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g., 1.1, 1.4"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Name *
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter VAT name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Percentage
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      max="100"
                      value={formData.percentage}
                      onChange={(e) => setFormData({ ...formData, percentage: parseFloat(e.target.value) || 0 })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter percentage"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      VAT Report Period
                    </label>
                    <select
                      value={formData.vatReportPeriod}
                      onChange={(e) => setFormData({ ...formData, vatReportPeriod: e.target.value as 'Monthly' | 'Quarterly' })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="Monthly">Monthly</option>
                      <option value="Quarterly">Quarterly</option>
                    </select>
                  </div>
                </div>
                
                <div className="mt-6 flex justify-end space-x-3">
                  <button
                    onClick={handleCancel}
                    className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center space-x-2"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};