import React, { useState } from 'react';
import { Plus, Edit2, Trash2, X, Save } from 'lucide-react';
import { Supplier, SupplierFormData, SupplierCategory, Currency } from '../../types/supplier';
import { GeneralLedgerAccount } from '../../types/generalLedger';

interface SupplierFormProps {
  onClose: () => void;
}

export const SupplierForm: React.FC<SupplierFormProps> = ({ onClose }) => {
  // Mock General Ledger accounts for dropdown
  const mockGLAccounts: GeneralLedgerAccount[] = [
    {
      id: '1',
      accountCode: '2000',
      accountName: 'Accounts Payable',
      accountType: 'Liability',
      groupType: 'Current Liability',
    },
    {
      id: '2',
      accountCode: '2100',
      accountName: 'Trade Creditors',
      accountType: 'Liability',
      groupType: 'Current Liability',
    },
    {
      id: '3',
      accountCode: '2200',
      accountName: 'Other Payables',
      accountType: 'Liability',
      groupType: 'Current Liability',
    },
  ];

  const supplierCategories: SupplierCategory[] = [
    { id: '1', name: 'Local Supplier' },
    { id: '2', name: 'International Supplier' },
    { id: '3', name: 'Service Provider' },
    { id: '4', name: 'Raw Material Supplier' },
  ];

  const currencies: Currency[] = [
    { code: 'MUR', name: 'Mauritian Rupee' },
    { code: 'USD', name: 'US Dollar' },
    { code: 'EUR', name: 'Euro' },
    { code: 'GBP', name: 'British Pound' },
  ];

  const [suppliers, setSuppliers] = useState<Supplier[]>([
    {
      id: '1',
      supplierId: 'SUPP001',
      supplierName: 'Tech Solutions Ltd',
      supplierCategory: 'Service Provider',
      brn: 'C98765432',
      vat: 'V98765432',
      address: '789 Business Park, Ebene, Mauritius',
      contactDetails: 'Tel: +230 456 7890, Email: info@techsolutions.com',
      currency: 'MUR',
      balance: -25000,
      accountCode: '2000',
    },
    {
      id: '2',
      supplierId: 'SUPP002',
      supplierName: 'Global Materials Inc',
      supplierCategory: 'Raw Material Supplier',
      brn: 'C11223344',
      vat: 'V11223344',
      address: '321 Industrial Zone, Port Louis, Mauritius',
      contactDetails: 'Tel: +230 654 3210, Email: orders@globalmaterials.com',
      currency: 'USD',
      balance: -12500,
      accountCode: '2100',
    },
  ]);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingSupplier, setEditingSupplier] = useState<Supplier | null>(null);
  const [formData, setFormData] = useState<SupplierFormData>({
    supplierId: '',
    supplierName: '',
    supplierCategory: '',
    brn: '',
    vat: '',
    address: '',
    contactDetails: '',
    currency: 'MUR',
    balance: 0,
    accountCode: '',
  });

  const handleAdd = () => {
    setEditingSupplier(null);
    setFormData({
      supplierId: '',
      supplierName: '',
      supplierCategory: '',
      brn: '',
      vat: '',
      address: '',
      contactDetails: '',
      currency: 'MUR',
      balance: 0,
      accountCode: '',
    });
    setIsFormOpen(true);
  };

  const handleEdit = (supplier: Supplier) => {
    setEditingSupplier(supplier);
    setFormData({
      supplierId: supplier.supplierId,
      supplierName: supplier.supplierName,
      supplierCategory: supplier.supplierCategory,
      brn: supplier.brn,
      vat: supplier.vat,
      address: supplier.address,
      contactDetails: supplier.contactDetails,
      currency: supplier.currency,
      balance: supplier.balance,
      accountCode: supplier.accountCode,
    });
    setIsFormOpen(true);
  };

  const handleDelete = (supplierId: string) => {
    if (window.confirm('Are you sure you want to delete this supplier?')) {
      setSuppliers(suppliers.filter(supplier => supplier.id !== supplierId));
    }
  };

  const handleSave = () => {
    if (!formData.supplierId || !formData.supplierName || !formData.supplierCategory || !formData.accountCode) {
      alert('Please fill in all required fields');
      return;
    }

    if (editingSupplier) {
      // Update existing supplier
      setSuppliers(suppliers.map(supplier =>
        supplier.id === editingSupplier.id
          ? {
              ...supplier,
              supplierId: formData.supplierId,
              supplierName: formData.supplierName,
              supplierCategory: formData.supplierCategory,
              brn: formData.brn,
              vat: formData.vat,
              address: formData.address,
              contactDetails: formData.contactDetails,
              currency: formData.currency,
              balance: formData.balance,
              accountCode: formData.accountCode,
            }
          : supplier
      ));
    } else {
      // Add new supplier
      const newSupplier: Supplier = {
        id: Date.now().toString(),
        supplierId: formData.supplierId,
        supplierName: formData.supplierName,
        supplierCategory: formData.supplierCategory,
        brn: formData.brn,
        vat: formData.vat,
        address: formData.address,
        contactDetails: formData.contactDetails,
        currency: formData.currency,
        balance: formData.balance,
        accountCode: formData.accountCode,
      };
      setSuppliers([...suppliers, newSupplier]);
    }

    setIsFormOpen(false);
    setEditingSupplier(null);
  };

  const handleCancel = () => {
    setIsFormOpen(false);
    setEditingSupplier(null);
    setFormData({
      supplierId: '',
      supplierName: '',
      supplierCategory: '',
      brn: '',
      vat: '',
      address: '',
      contactDetails: '',
      currency: 'MUR',
      balance: 0,
      accountCode: '',
    });
  };

  const getAccountDisplayName = (accountCode: string) => {
    const account = mockGLAccounts.find(acc => acc.accountCode === accountCode);
    return account ? `${account.accountCode} - ${account.accountName}` : accountCode;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-7xl max-h-[90vh] overflow-hidden m-4">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-800">Supplier Management</h2>
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

          {/* Suppliers Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                    Supplier ID
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                    Supplier Name
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                    Category
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                    BRN
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                    VAT
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                    Currency
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                    Balance
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                    Account Code
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {suppliers.map((supplier) => (
                  <tr key={supplier.id} className="hover:bg-gray-50">
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 border-b">
                      {supplier.supplierId}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 border-b">
                      {supplier.supplierName}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 border-b">
                      {supplier.supplierCategory}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 border-b">
                      {supplier.brn}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 border-b">
                      {supplier.vat}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 border-b">
                      {supplier.currency}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 border-b">
                      {supplier.balance.toLocaleString()}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 border-b">
                      {getAccountDisplayName(supplier.accountCode)}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 border-b">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEdit(supplier)}
                          className="text-blue-600 hover:text-blue-800 p-1"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(supplier.id)}
                          className="text-red-600 hover:text-red-800 p-1"
                        >
                          <Trash2 className="w-4 h-4" />
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
            <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl m-4 max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  {editingSupplier ? 'Edit Supplier' : 'Add New Supplier'}
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Supplier ID *
                    </label>
                    <input
                      type="text"
                      value={formData.supplierId}
                      onChange={(e) => setFormData({ ...formData, supplierId: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter supplier ID"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Supplier Name *
                    </label>
                    <input
                      type="text"
                      value={formData.supplierName}
                      onChange={(e) => setFormData({ ...formData, supplierName: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter supplier name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Supplier Category *
                    </label>
                    <select
                      value={formData.supplierCategory}
                      onChange={(e) => setFormData({ ...formData, supplierCategory: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select category</option>
                      {supplierCategories.map((category) => (
                        <option key={category.id} value={category.name}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      BRN
                    </label>
                    <input
                      type="text"
                      value={formData.brn}
                      onChange={(e) => setFormData({ ...formData, brn: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter BRN"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      VAT
                    </label>
                    <input
                      type="text"
                      value={formData.vat}
                      onChange={(e) => setFormData({ ...formData, vat: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter VAT number"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Currency
                    </label>
                    <select
                      value={formData.currency}
                      onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {currencies.map((currency) => (
                        <option key={currency.code} value={currency.code}>
                          {currency.code} - {currency.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Balance
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={formData.balance}
                      onChange={(e) => setFormData({ ...formData, balance: parseFloat(e.target.value) || 0 })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter balance"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Account Code *
                    </label>
                    <select
                      value={formData.accountCode}
                      onChange={(e) => setFormData({ ...formData, accountCode: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select account</option>
                      {mockGLAccounts.map((account) => (
                        <option key={account.id} value={account.accountCode}>
                          {account.accountCode} - {account.accountName}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Address
                    </label>
                    <textarea
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter address"
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Contact Details
                    </label>
                    <textarea
                      value={formData.contactDetails}
                      onChange={(e) => setFormData({ ...formData, contactDetails: e.target.value })}
                      rows={2}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter contact details"
                    />
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