import React, { useState, useEffect } from 'react';
import { Plus, Trash2, X, Save, RotateCcw, Upload, Download } from 'lucide-react';
import { InvoiceLineItem, InvoiceFormData, CustomerOption, VATOption } from '../../types/invoice';

interface InvoiceFormProps {
  onClose: () => void;
}

export const InvoiceForm: React.FC<InvoiceFormProps> = ({ onClose }) => {
  // Mock customer data (would come from customer management)
  const customerOptions: CustomerOption[] = [
    {
      code: 'CUST001',
      name: 'ABC Company Ltd',
      vatNo: 'V12345678',
      accountCode: '1100',
    },
    {
      code: 'CUST002',
      name: 'XYZ Trading',
      vatNo: 'V87654321',
      accountCode: '1110',
    },
  ];

  // Mock VAT data (would come from VAT management)
  const vatOptions: VATOption[] = [
    { code: '1.1', name: 'Standard VAT', percentage: 15 },
    { code: '1.4', name: 'Zero Rated VAT', percentage: 0 },
    { code: '2.1', name: 'Exempt VAT', percentage: 0 },
  ];

  const [formData, setFormData] = useState<InvoiceFormData>({
    lineItems: [createEmptyLineItem()],
  });

  function createEmptyLineItem(): InvoiceLineItem {
    return {
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      date: new Date().toISOString().split('T')[0],
      customerNumber: generateCustomerNumber(),
      customerCode: '',
      customerName: '',
      vatNo: '',
      accountCode: '',
      description: '',
      vatType: '',
      exclusive: 0,
      vat: 0,
      total: 0,
    };
  }

  function generateCustomerNumber(): string {
    const timestamp = Date.now().toString();
    const random = Math.random().toString(36).substr(2, 4).toUpperCase();
    return `INV${timestamp.slice(-6)}${random}`;
  }

  const handleCustomerChange = (lineIndex: number, customerCode: string) => {
    const customer = customerOptions.find(c => c.code === customerCode);
    const updatedLineItems = [...formData.lineItems];
    
    if (customer) {
      updatedLineItems[lineIndex] = {
        ...updatedLineItems[lineIndex],
        customerCode: customer.code,
        customerName: customer.name,
        vatNo: customer.vatNo,
        accountCode: customer.accountCode,
      };
    } else {
      updatedLineItems[lineIndex] = {
        ...updatedLineItems[lineIndex],
        customerCode: '',
        customerName: '',
        vatNo: '',
        accountCode: '',
      };
    }

    setFormData({ lineItems: updatedLineItems });
  };

  const handleVATChange = (lineIndex: number, vatType: string) => {
    const vat = vatOptions.find(v => v.code === vatType);
    const updatedLineItems = [...formData.lineItems];
    const lineItem = updatedLineItems[lineIndex];
    
    lineItem.vatType = vatType;
    
    if (vat && lineItem.exclusive > 0) {
      const vatAmount = (lineItem.exclusive * vat.percentage) / 100;
      lineItem.vat = vatAmount;
      lineItem.total = lineItem.exclusive + vatAmount;
    }

    setFormData({ lineItems: updatedLineItems });
  };

  const handleExclusiveChange = (lineIndex: number, exclusive: number) => {
    const updatedLineItems = [...formData.lineItems];
    const lineItem = updatedLineItems[lineIndex];
    
    lineItem.exclusive = exclusive;
    
    if (lineItem.vatType) {
      const vat = vatOptions.find(v => v.code === lineItem.vatType);
      if (vat) {
        const vatAmount = (exclusive * vat.percentage) / 100;
        lineItem.vat = vatAmount;
        lineItem.total = exclusive + vatAmount;
      }
    } else {
      lineItem.vat = 0;
      lineItem.total = exclusive;
    }

    setFormData({ lineItems: updatedLineItems });
  };

  const handleLineItemChange = (lineIndex: number, field: keyof InvoiceLineItem, value: any) => {
    const updatedLineItems = [...formData.lineItems];
    updatedLineItems[lineIndex] = {
      ...updatedLineItems[lineIndex],
      [field]: value,
    };
    setFormData({ lineItems: updatedLineItems });
  };

  const addLineItem = () => {
    setFormData({
      lineItems: [...formData.lineItems, createEmptyLineItem()],
    });
  };

  const removeLineItem = (lineIndex: number) => {
    if (formData.lineItems.length > 1) {
      const updatedLineItems = formData.lineItems.filter((_, index) => index !== lineIndex);
      setFormData({ lineItems: updatedLineItems });
    }
  };

  const generateInvoice = (lineIndex: number) => {
    const lineItem = formData.lineItems[lineIndex];
    if (!lineItem.customerCode || !lineItem.description || lineItem.exclusive <= 0) {
      alert('Please fill in all required fields for this line item');
      return;
    }
    
    // Here you would implement the actual invoice generation logic
    alert(`Invoice generated for ${lineItem.customerName} - ${lineItem.description}`);
  };

  const handleUpdate = () => {
    // Validate all line items
    const invalidItems = formData.lineItems.filter(item => 
      !item.customerCode || !item.description || item.exclusive <= 0
    );
    
    if (invalidItems.length > 0) {
      alert('Please fill in all required fields for all line items');
      return;
    }
    
    // Here you would implement the update logic
    alert('Invoice updated successfully');
  };

  const handleClear = () => {
    if (window.confirm('Are you sure you want to clear all data?')) {
      setFormData({
        lineItems: [createEmptyLineItem()],
      });
    }
  };

  const handleImport = () => {
    // Here you would implement import functionality
    alert('Import functionality would be implemented here');
  };

  const handleExport = () => {
    // Here you would implement export functionality
    alert('Export functionality would be implemented here');
  };

  const getTotalExclusive = () => {
    return formData.lineItems.reduce((sum, item) => sum + item.exclusive, 0);
  };

  const getTotalVAT = () => {
    return formData.lineItems.reduce((sum, item) => sum + item.vat, 0);
  };

  const getTotalAmount = () => {
    return formData.lineItems.reduce((sum, item) => sum + item.total, 0);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-[95vw] max-h-[95vh] overflow-hidden m-4">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-800">Invoice Management</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 p-1"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="p-6 overflow-auto max-h-[calc(95vh-200px)]">
          {/* Add Line Item Button */}
          <div className="mb-4">
            <button
              onClick={addLineItem}
              className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 flex items-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>Add Line Item</span>
            </button>
          </div>

          {/* Invoice Line Items Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                    Date
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                    Customer Number
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                    Customer Code
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                    Customer Name
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                    VAT NO
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                    Account Code
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                    Description
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                    VAT Type
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                    Exclusive
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                    VAT
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                    Total
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {formData.lineItems.map((lineItem, index) => (
                  <tr key={lineItem.id} className="hover:bg-gray-50">
                    <td className="px-3 py-2 border-b">
                      <input
                        type="date"
                        value={lineItem.date}
                        onChange={(e) => handleLineItemChange(index, 'date', e.target.value)}
                        className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                    </td>
                    <td className="px-3 py-2 border-b">
                      <input
                        type="text"
                        value={lineItem.customerNumber}
                        readOnly
                        className="w-full px-2 py-1 text-sm border border-gray-300 rounded bg-gray-100"
                      />
                    </td>
                    <td className="px-3 py-2 border-b">
                      <select
                        value={lineItem.customerCode}
                        onChange={(e) => handleCustomerChange(index, e.target.value)}
                        className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                      >
                        <option value="">Select Customer</option>
                        {customerOptions.map((customer) => (
                          <option key={customer.code} value={customer.code}>
                            {customer.code}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="px-3 py-2 border-b">
                      <input
                        type="text"
                        value={lineItem.customerName}
                        readOnly
                        className="w-full px-2 py-1 text-sm border border-gray-300 rounded bg-gray-100"
                      />
                    </td>
                    <td className="px-3 py-2 border-b">
                      <input
                        type="text"
                        value={lineItem.vatNo}
                        readOnly
                        className="w-full px-2 py-1 text-sm border border-gray-300 rounded bg-gray-100"
                      />
                    </td>
                    <td className="px-3 py-2 border-b">
                      <input
                        type="text"
                        value={lineItem.accountCode}
                        readOnly
                        className="w-full px-2 py-1 text-sm border border-gray-300 rounded bg-gray-100"
                      />
                    </td>
                    <td className="px-3 py-2 border-b">
                      <input
                        type="text"
                        value={lineItem.description}
                        onChange={(e) => handleLineItemChange(index, 'description', e.target.value)}
                        className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                        placeholder="Enter description"
                      />
                    </td>
                    <td className="px-3 py-2 border-b">
                      <select
                        value={lineItem.vatType}
                        onChange={(e) => handleVATChange(index, e.target.value)}
                        className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                      >
                        <option value="">Select VAT</option>
                        {vatOptions.map((vat) => (
                          <option key={vat.code} value={vat.code}>
                            {vat.code} - {vat.name}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="px-3 py-2 border-b">
                      <input
                        type="number"
                        step="0.01"
                        value={lineItem.exclusive}
                        onChange={(e) => handleExclusiveChange(index, parseFloat(e.target.value) || 0)}
                        className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                        placeholder="0.00"
                      />
                    </td>
                    <td className="px-3 py-2 border-b">
                      <input
                        type="number"
                        step="0.01"
                        value={lineItem.vat.toFixed(2)}
                        readOnly
                        className="w-full px-2 py-1 text-sm border border-gray-300 rounded bg-gray-100"
                      />
                    </td>
                    <td className="px-3 py-2 border-b">
                      <input
                        type="number"
                        step="0.01"
                        value={lineItem.total.toFixed(2)}
                        readOnly
                        className="w-full px-2 py-1 text-sm border border-gray-300 rounded bg-gray-100"
                      />
                    </td>
                    <td className="px-3 py-2 border-b">
                      <div className="flex space-x-1">
                        <button
                          onClick={() => generateInvoice(index)}
                          className="bg-blue-600 text-white px-2 py-1 rounded text-xs hover:bg-blue-700"
                        >
                          Generate Invoice
                        </button>
                        {formData.lineItems.length > 1 && (
                          <button
                            onClick={() => removeLineItem(index)}
                            className="text-red-600 hover:text-red-800 p-1"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Totals Section */}
          <div className="mt-6 bg-gray-50 p-4 rounded-lg">
            <div className="grid grid-cols-3 gap-4 text-right">
              <div>
                <span className="font-medium text-gray-700">Total Exclusive: </span>
                <span className="font-bold text-lg">{getTotalExclusive().toFixed(2)}</span>
              </div>
              <div>
                <span className="font-medium text-gray-700">Total VAT: </span>
                <span className="font-bold text-lg">{getTotalVAT().toFixed(2)}</span>
              </div>
              <div>
                <span className="font-medium text-gray-700">Grand Total: </span>
                <span className="font-bold text-xl text-blue-600">{getTotalAmount().toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Action Buttons */}
        <div className="p-6 border-t border-gray-200 bg-gray-50">
          <div className="flex justify-end space-x-3">
            <button
              onClick={handleUpdate}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center space-x-2"
            >
              <Save className="w-4 h-4" />
              <span>Update</span>
            </button>
            <button
              onClick={handleClear}
              className="px-6 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 flex items-center space-x-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Clear</span>
            </button>
            <button
              onClick={handleImport}
              className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center space-x-2"
            >
              <Upload className="w-4 h-4" />
              <span>Import</span>
            </button>
            <button
              onClick={handleExport}
              className="px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 flex items-center space-x-2"
            >
              <Download className="w-4 h-4" />
              <span>Export</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};