import React, { useState } from 'react';
import { Plus, Edit2, Trash2, X, Save } from 'lucide-react';
import { ExchangeRate, ExchangeRateFormData, CurrencyOption } from '../../types/exchangeRate';

interface ExchangeRateFormProps {
  onClose: () => void;
}

export const ExchangeRateForm: React.FC<ExchangeRateFormProps> = ({ onClose }) => {
  const currencyOptions: CurrencyOption[] = [
    { code: 'USD', name: 'United States Dollar', symbol: '$' },
    { code: 'EUR', name: 'Euro', symbol: '€' },
    { code: 'GBP', name: 'British Pound Sterling', symbol: '£' },
    { code: 'JPY', name: 'Japanese Yen', symbol: '¥' },
    { code: 'AUD', name: 'Australian Dollar', symbol: 'A$' },
    { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$' },
    { code: 'CHF', name: 'Swiss Franc', symbol: 'CHF' },
    { code: 'CNY', name: 'Chinese Yuan', symbol: '¥' },
    { code: 'INR', name: 'Indian Rupee', symbol: '₹' },
    { code: 'ZAR', name: 'South African Rand', symbol: 'R' },
  ];

  const [exchangeRates, setExchangeRates] = useState<ExchangeRate[]>([
    {
      id: '1',
      currencyId: 'USD001',
      code: 'USD',
      date: '2024-01-15',
      name: 'United States Dollar',
      symbol: '$',
      exchangeRateToHome: 43.50,
      isMonthly: true,
    },
    {
      id: '2',
      currencyId: 'EUR001',
      code: 'EUR',
      date: '2024-01-15',
      name: 'Euro',
      symbol: '€',
      exchangeRateToHome: 47.25,
      isMonthly: true,
    },
    {
      id: '3',
      currencyId: 'GBP001',
      code: 'GBP',
      date: '2024-01-15',
      name: 'British Pound Sterling',
      symbol: '£',
      exchangeRateToHome: 54.80,
      isMonthly: false,
    },
  ]);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingRate, setEditingRate] = useState<ExchangeRate | null>(null);
  const [formData, setFormData] = useState<ExchangeRateFormData>({
    currencyId: '',
    code: '',
    date: new Date().toISOString().split('T')[0],
    name: '',
    symbol: '',
    exchangeRateToHome: 0,
    isMonthly: true,
  });

  const handleAdd = () => {
    setEditingRate(null);
    setFormData({
      currencyId: '',
      code: '',
      date: new Date().toISOString().split('T')[0],
      name: '',
      symbol: '',
      exchangeRateToHome: 0,
      isMonthly: true,
    });
    setIsFormOpen(true);
  };

  const handleEdit = (rate: ExchangeRate) => {
    setEditingRate(rate);
    setFormData({
      currencyId: rate.currencyId,
      code: rate.code,
      date: rate.date,
      name: rate.name,
      symbol: rate.symbol,
      exchangeRateToHome: rate.exchangeRateToHome,
      isMonthly: rate.isMonthly,
    });
    setIsFormOpen(true);
  };

  const handleDelete = (rateId: string) => {
    if (window.confirm('Are you sure you want to delete this exchange rate?')) {
      setExchangeRates(exchangeRates.filter(rate => rate.id !== rateId));
    }
  };

  const handleCurrencyChange = (code: string) => {
    const currency = currencyOptions.find(c => c.code === code);
    if (currency) {
      setFormData({
        ...formData,
        code: currency.code,
        name: currency.name,
        symbol: currency.symbol,
        currencyId: formData.currencyId || `${currency.code}${Date.now().toString().slice(-3)}`,
      });
    }
  };

  const handleSave = () => {
    if (!formData.currencyId || !formData.code || !formData.name || !formData.date || formData.exchangeRateToHome <= 0) {
      alert('Please fill in all required fields');
      return;
    }

    if (editingRate) {
      // Update existing rate
      setExchangeRates(exchangeRates.map(rate =>
        rate.id === editingRate.id
          ? {
              ...rate,
              currencyId: formData.currencyId,
              code: formData.code,
              date: formData.date,
              name: formData.name,
              symbol: formData.symbol,
              exchangeRateToHome: formData.exchangeRateToHome,
              isMonthly: formData.isMonthly,
            }
          : rate
      ));
    } else {
      // Add new rate
      const newRate: ExchangeRate = {
        id: Date.now().toString(),
        currencyId: formData.currencyId,
        code: formData.code,
        date: formData.date,
        name: formData.name,
        symbol: formData.symbol,
        exchangeRateToHome: formData.exchangeRateToHome,
        isMonthly: formData.isMonthly,
      };
      setExchangeRates([...exchangeRates, newRate]);
    }

    setIsFormOpen(false);
    setEditingRate(null);
  };

  const handleCancel = () => {
    setIsFormOpen(false);
    setEditingRate(null);
    setFormData({
      currencyId: '',
      code: '',
      date: new Date().toISOString().split('T')[0],
      name: '',
      symbol: '',
      exchangeRateToHome: 0,
      isMonthly: true,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-7xl max-h-[90vh] overflow-hidden m-4">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-800">Exchange Rate Management</h2>
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

          {/* Exchange Rates Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                    Currency ID
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                    Code
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                    Date
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                    Name
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                    Symbol
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                    Exchange Rate
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                    Monthly
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {exchangeRates.map((rate) => (
                  <tr key={rate.id} className="hover:bg-gray-50">
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 border-b">
                      {rate.currencyId}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 border-b">
                      {rate.code}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 border-b">
                      {new Date(rate.date).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 border-b">
                      {rate.name}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 border-b">
                      {rate.symbol}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 border-b">
                      {rate.exchangeRateToHome.toFixed(4)}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 border-b">
                      <span className={`px-2 py-1 rounded-full text-xs ${rate.isMonthly ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                        {rate.isMonthly ? 'Monthly' : 'Daily'}
                      </span>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 border-b">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEdit(rate)}
                          className="text-blue-600 hover:text-blue-800 p-1"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(rate.id)}
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
                  {editingRate ? 'Edit Exchange Rate' : 'Add New Exchange Rate'}
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Currency ID *
                    </label>
                    <input
                      type="text"
                      value={formData.currencyId}
                      onChange={(e) => setFormData({ ...formData, currencyId: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter currency ID"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Currency Code *
                    </label>
                    <select
                      value={formData.code}
                      onChange={(e) => handleCurrencyChange(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select currency</option>
                      {currencyOptions.map((currency) => (
                        <option key={currency.code} value={currency.code}>
                          {currency.code} - {currency.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Date *
                    </label>
                    <input
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Currency Name *
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter currency name"
                      readOnly={!!formData.code}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Symbol *
                    </label>
                    <input
                      type="text"
                      value={formData.symbol}
                      onChange={(e) => setFormData({ ...formData, symbol: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter currency symbol"
                      readOnly={!!formData.code}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Exchange Rate to Home Currency *
                    </label>
                    <input
                      type="number"
                      step="0.0001"
                      value={formData.exchangeRateToHome}
                      onChange={(e) => setFormData({ ...formData, exchangeRateToHome: parseFloat(e.target.value) || 0 })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter exchange rate"
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={formData.isMonthly}
                        onChange={(e) => setFormData({ ...formData, isMonthly: e.target.checked })}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-sm font-medium text-gray-700">Monthly Rate</span>
                    </label>
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