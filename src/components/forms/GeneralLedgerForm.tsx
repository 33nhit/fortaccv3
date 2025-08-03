import React, { useState } from 'react';
import { Plus, Edit2, Trash2, X, Save } from 'lucide-react';
import { GeneralLedgerAccount, GeneralLedgerFormData } from '../../types/generalLedger';

interface GeneralLedgerFormProps {
  onClose: () => void;
}

export const GeneralLedgerForm: React.FC<GeneralLedgerFormProps> = ({ onClose }) => {
  const [accounts, setAccounts] = useState<GeneralLedgerAccount[]>([
    {
      id: '1',
      accountCode: '1000',
      accountName: 'Cash at Bank',
      accountType: 'Asset',
      groupType: 'Current Asset',
    },
    {
      id: '2',
      accountCode: '1100',
      accountName: 'Accounts Receivable',
      accountType: 'Asset',
      groupType: 'Current Asset',
    },
    {
      id: '3',
      accountCode: '2000',
      accountName: 'Accounts Payable',
      accountType: 'Liability',
      groupType: 'Current Liability',
    },
  ]);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingAccount, setEditingAccount] = useState<GeneralLedgerAccount | null>(null);
  const [formData, setFormData] = useState<GeneralLedgerFormData>({
    accountCode: '',
    accountName: '',
    accountType: '',
    groupType: '',
  });

  const accountTypes = ['Asset', 'Liability', 'Equity', 'Revenue', 'Expense'];
  const groupTypes = [
    'Current Asset',
    'Non-Current Asset',
    'Current Liability',
    'Non-Current Liability',
    'Equity',
    'Operating Revenue',
    'Non-Operating Revenue',
    'Operating Expense',
    'Non-Operating Expense',
  ];

  const handleAdd = () => {
    setEditingAccount(null);
    setFormData({
      accountCode: '',
      accountName: '',
      accountType: '',
      groupType: '',
    });
    setIsFormOpen(true);
  };

  const handleEdit = (account: GeneralLedgerAccount) => {
    setEditingAccount(account);
    setFormData({
      accountCode: account.accountCode,
      accountName: account.accountName,
      accountType: account.accountType,
      groupType: account.groupType,
    });
    setIsFormOpen(true);
  };

  const handleDelete = (accountId: string) => {
    if (window.confirm('Are you sure you want to delete this account?')) {
      setAccounts(accounts.filter(account => account.id !== accountId));
    }
  };

  const handleSave = () => {
    if (!formData.accountCode || !formData.accountName || !formData.accountType || !formData.groupType) {
      alert('Please fill in all fields');
      return;
    }

    if (editingAccount) {
      // Update existing account
      setAccounts(accounts.map(account =>
        account.id === editingAccount.id
          ? {
              ...account,
              accountCode: formData.accountCode,
              accountName: formData.accountName,
              accountType: formData.accountType as any,
              groupType: formData.groupType as any,
            }
          : account
      ));
    } else {
      // Add new account
      const newAccount: GeneralLedgerAccount = {
        id: Date.now().toString(),
        accountCode: formData.accountCode,
        accountName: formData.accountName,
        accountType: formData.accountType as any,
        groupType: formData.groupType as any,
      };
      setAccounts([...accounts, newAccount]);
    }

    setIsFormOpen(false);
    setEditingAccount(null);
  };

  const handleCancel = () => {
    setIsFormOpen(false);
    setEditingAccount(null);
    setFormData({
      accountCode: '',
      accountName: '',
      accountType: '',
      groupType: '',
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-6xl max-h-[90vh] overflow-hidden m-4">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-800">General Ledger</h2>
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

          {/* Accounts Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                    Account Code
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                    Account Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                    Account Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                    Group Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {accounts.map((account) => (
                  <tr key={account.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 border-b">
                      {account.accountCode}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 border-b">
                      {account.accountName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 border-b">
                      {account.accountType}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 border-b">
                      {account.groupType}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 border-b">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEdit(account)}
                          className="text-blue-600 hover:text-blue-800 p-1"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(account.id)}
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
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md m-4">
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  {editingAccount ? 'Edit Account' : 'Add New Account'}
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Account Code
                    </label>
                    <input
                      type="text"
                      value={formData.accountCode}
                      onChange={(e) => setFormData({ ...formData, accountCode: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter account code"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Account Name
                    </label>
                    <input
                      type="text"
                      value={formData.accountName}
                      onChange={(e) => setFormData({ ...formData, accountName: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter account name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Account Type
                    </label>
                    <select
                      value={formData.accountType}
                      onChange={(e) => setFormData({ ...formData, accountType: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select account type</option>
                      {accountTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Group Type
                    </label>
                    <select
                      value={formData.groupType}
                      onChange={(e) => setFormData({ ...formData, groupType: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select group type</option>
                      {groupTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
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