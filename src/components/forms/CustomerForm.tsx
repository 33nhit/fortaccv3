import React, { useState } from 'react';
import { Plus, Edit2, Trash2, X, Save } from 'lucide-react';
import { Customer, CustomerFormData, CustomerCategory, Currency } from '../../types/customer';
import { GeneralLedgerAccount } from '../../types/generalLedger';

interface CustomerFormProps {
  onClose: () => void;
}

export const CustomerForm: React.FC<CustomerFormProps> = ({ onClose }) => {
  // Mock General Ledger accounts for dropdown
  const mockGLAccounts: GeneralLedgerAccount[] = [
    {
      id: '1',
      accountCode: '1100',
      accountName: 'Accounts Receivable',
      accountType: 'Asset',
      groupType: 'Current Asset',
    },
    {
      id: '2',
      accountCode: '1110',
      accountName: 'Trade Debtors',
      accountType: 'Asset',
      groupType: 'Current Asset',
    },
    {
      id: '3',
      accountCode: '1120',
      accountName: 'Other Receivables',
      accountType: 'Asset',
      groupType: 'Current Asset',
    },
  ];

  const customerCategories: CustomerCategory[] = [
    { id: '1', name: 'Retail' },
    { id: '2', name: 'Wholesale' },
    { id: '3', name: 'Corporate' },
    { id: '4', name: 'Government' },
  ];

  const currencies: Currency[] = [
    { code: 'MUR', name: 'Mauritian Rupee' },
    { code: 'USD', name: 'US Dollar' },
    { code: 'EUR', name: 'Euro' },
    { code: 'GBP', name: 'British Pound' },
  ];

  const [customers, setCustomers] = useState<Customer[]>([
    {
      id: '1',
      customerId: 'CUST001',
      customerName: 'ABC Company Ltd',
      customerCategory: 'Corporate',
      brn: 'C12345678',
      vat: 'V12345678',
      address: '123 Main Street, Port Louis, Mauritius',
      contactDetails: 'Tel: +230 123 4567, Email: info@abc.com',
      currency: 'MUR',
      balance: 15000,
      accountCode: '1100',
    },
    {
      id: '2',
      customerId: 'CUST002',
      customerName: 'XYZ Trading',
      customerCategory: 'Wholesale',
      brn: 'C87654321',
      vat: 'V87654321',
      address: '456 Business Ave, Ebene, Mauritius',
      contactDetails: 'Tel: +230 987 6543, Email: contact@xyz.com',
      currency: 'USD',
      balance: 8500,
      accountCode: '1110',
    },
  ]);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);
  const [formData, setFormData] = useState<CustomerFormData>({
    customerId: '',
    customerName: '',
    customerCategory: '',
    brn: '',
    vat: '',
    address: '',
    contactDetails: '',
    currency: 'MUR',
    balance: 0,
    accountCode: '',
  });

  const handleAdd = () => {
    setEditingCustomer(null);
    setFormData({
      customerId: '',
      customerName: '',
      customerCategory: '',
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

  const handleEdit = (customer: Customer) => {
    setEditingCustomer(customer);
    setFormData({
      customerId: customer.customerId,
      customerName: customer.customerName,
      customerCategory: customer.customerCategory,
      brn: customer.brn,
      vat: customer.vat,
      address: customer.address,
      contactDetails: customer.contactDetails,
      currency: customer.currency,
      balance: customer.balance,
      accountCode: customer.accountCode,
    });
    setIsFormOpen(true);
  };

  const handleDelete = (customerId: string) => {
    if (window.confirm('Are you sure you want to delete this customer?')) {
      setCustomers(customers.filter(customer => customer.id !== customerId));
    }
  };

  const handleSave = () => {
    if (!formData.customerId || !formData.customerName || !formData.customerCategory || !formData.accountCode) {
      alert('Please fill in all required fields');
      return;
    }

    if (editingCustomer) {
      // Update existing customer
      setCustomers(customers.map(customer =>
        customer.id === editingCustomer.id
          ? {
              ...customer,
              customerId: formData.customerId,
              customerName: formData.customerName,
              customerCategory: formData.customerCategory,
              brn: formData.brn,
              vat: formData.vat,
              address: formData.address,
              contactDetails: formData.contactDetails,
              currency: formData.currency,
              balance: formData.balance,
              accountCode: formData.accountCode,
            }
          : customer
      ));
    } else {
      // Add new customer
      const newCustomer: Customer = {
        id: Date.now().toString(),
        customerId: formData.customerId,
        customerName: formData.customerName,
        customerCategory: formData.customerCategory,
        brn: formData.brn,
        vat: formData.vat,
        address: formData.address,
        contactDetails: formData.contactDetails,
        currency: formData.currency,
        balance: formData.balance,
        accountCode: formData.accountCode,
      };
      setCustomers([...customers, newCustomer]);
    }

    setIsFormOpen(false);
    setEditingCustomer(null);
  };

  const handleCancel = () => {
    setIsFormOpen(false);
    setEditingCustomer(null);
    setFormData({
      customerId: '',
      customerName: '',
      customerCategory: '',
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
            <h2 className="text-2xl font-bold text-gray-800">Customer Management</h2>
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

          {/* Customers Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                    Customer ID
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                    Customer Name
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
                {customers.map((customer) => (
                  <tr key={customer.id} className="hover:bg-gray-50">
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 border-b">
                      {customer.customerId}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 border-b">
                      {customer.customerName}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 border-b">
                      {customer.customerCategory}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 border-b">
                      {customer.brn}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 border-b">
                      {customer.vat}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 border-b">
                      {customer.currency}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 border-b">
                      {customer.balance.toLocaleString()}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 border-b">
                      {getAccountDisplayName(customer.accountCode)}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 border-b">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEdit(customer)}
                          className="text-blue-600 hover:text-blue-800 p-1"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(customer.id)}
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
                  {editingCustomer ? 'Edit Customer' : 'Add New Customer'}
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Customer ID *
                    </label>
                    <input
                      type="text"
                      value={formData.customerId}
                      onChange={(e) => setFormData({ ...formData, customerId: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter customer ID"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Customer Name *
                    </label>
                    <input
                      type="text"
                      value={formData.customerName}
                      onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter customer name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Customer Category *
                    </label>
                    <select
                      value={formData.customerCategory}
                      onChange={(e) => setFormData({ ...formData, customerCategory: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select category</option>
                      {customerCategories.map((category) => (
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