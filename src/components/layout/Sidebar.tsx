import React from 'react';
import { 
  LayoutDashboard, 
  FileText, 
  Settings, 
  Users, 
  TrendingUp, 
  ChevronDown, 
  ChevronRight,
  User,
  Building2,
  Calculator,
  DollarSign,
  Truck
} from 'lucide-react';

interface SidebarProps {
  isExpanded: boolean;
  onToggle: () => void;
  onChangeCompany: () => void;
  onShowGeneralLedger: () => void;
  onShowCustomer: () => void;
  onShowSupplier: () => void;
  onShowExchangeRate: () => void;
  onShowVAT: () => void;
  onShowInvoice: () => void;
  onShowCreditNote: () => void;
  onShowNewCompany: () => void;
  user: {
    name: string;
    role: string;
    company: string;
  };
}

export default function Sidebar({ 
  isExpanded, 
  onToggle, 
  onChangeCompany, 
  onShowGeneralLedger,
  onShowCustomer,
  onShowSupplier,
  onShowExchangeRate,
  onShowVAT,
  onShowInvoice,
  onShowCreditNote,
  onShowNewCompany,
  user 
}: SidebarProps) {
  const [expandedMenus, setExpandedMenus] = React.useState<string[]>(['dashboard']);

  const toggleMenu = (menuId: string) => {
    setExpandedMenus(prev => 
      prev.includes(menuId) 
        ? prev.filter(id => id !== menuId)
        : [...prev, menuId]
    );
  };

  const menuItems = [
    {
      id: 'file',
      label: 'File',
      icon: FileText,
      hasSubmenu: true,
      submenu: [
        { label: 'Change Company', icon: Building2, onClick: onChangeCompany },
        { label: 'New Company', icon: Building2, onClick: onShowNewCompany },
        { label: 'Backup', icon: FileText },
        { label: 'Restore', icon: FileText },
        { label: 'Printer Setup', icon: Settings },
        { label: 'Invoice Design', icon: FileText },
      ]
    },
    {
      id: 'edit',
      label: 'Edit',
      icon: Settings,
      hasSubmenu: true,
      submenu: [
        { label: 'General Ledger', icon: Calculator, onClick: onShowGeneralLedger },
        { label: 'Customers', icon: Users, onClick: onShowCustomer },
        { label: 'Suppliers', icon: Truck, onClick: onShowSupplier },
        { label: 'Exchange Rates', icon: DollarSign, onClick: onShowExchangeRate },
        { label: 'VAT', icon: FileText, onClick: onShowVAT },
      ]
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: Settings,
      hasSubmenu: true,
      submenu: [
        { label: 'Company Parameters', icon: Building2 },
        { label: 'Lock / Unlock Accounting Period', icon: Settings },
        { label: 'User Management', icon: Users },
      ]
    },
    {
      id: 'process',
      label: 'Process',
      icon: TrendingUp,
      hasSubmenu: true,
      submenu: [
        { 
          label: 'Sales', 
          icon: DollarSign, 
          hasNestedSubmenu: true,
          nestedSubmenu: [
            { label: 'Invoice', icon: FileText },
            { label: 'Credit Note', icon: FileText, onClick: onShowCreditNote },
          ]
        },
        { 
          label: 'Purchases', 
          icon: Truck, 
          hasNestedSubmenu: true,
          nestedSubmenu: [
            { label: 'Supplier Bills', icon: FileText },
            { label: 'Return to Supplier', icon: FileText },
          ]
        },
        { 
          label: 'Cashbook', 
          icon: Calculator, 
          hasNestedSubmenu: true,
          nestedSubmenu: [
            { label: 'Receipts', icon: FileText },
            { label: 'Payment', icon: FileText },
            { label: 'Bank Reconciliation', icon: FileText },
          ]
        },
        { 
          label: 'Journal', 
          icon: FileText, 
          hasNestedSubmenu: true,
          nestedSubmenu: [
            { label: 'General', icon: FileText },
            { label: 'Customer', icon: Users },
            { label: 'Supplier', icon: Truck },
          ]
        },
        { 
          label: 'Revaluation', 
          icon: TrendingUp, 
          hasNestedSubmenu: true,
          nestedSubmenu: [
            { label: 'Bank', icon: Building2 },
            { label: 'Customer', icon: Users },
            { label: 'Supplier', icon: Truck },
          ]
        },
        { label: 'Fixed Asset Register', icon: Building2 },
      ]
    },
    {
      id: 'reports',
      label: 'Reports',
      icon: FileText,
      hasSubmenu: true,
      submenu: [
        { label: 'Trial Balance', icon: Calculator },
        { label: 'Income Statement', icon: TrendingUp },
        { label: 'Statement of Financial Position', icon: FileText },
        { label: 'General Ledger', icon: Calculator },
        { label: 'General Ledger by entry type', icon: Calculator },
        { label: 'Customers Ageing', icon: Users },
        { label: 'Customer Statement of account', icon: Users },
        { label: 'Suppliers Ageing', icon: Truck },
        { label: 'Customers Details Analysis', icon: Users },
        { label: 'Suppliers Details Analysis', icon: Truck },
        { label: 'Fixed Assets Register', icon: Building2 },
        { label: 'VAT Report', icon: FileText },
        { label: 'Goods & Services Statements', icon: FileText },
        { label: 'Financials as per CTX', icon: TrendingUp },
        { label: 'Financials as per SME', icon: TrendingUp },
        { label: 'Audit Trail', icon: FileText },
      ]
    },
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
      hasSubmenu: false,
    },
  ];

  return (
    <div className={`bg-gray-900 text-white transition-all duration-300 flex flex-col h-full ${
      isExpanded ? 'w-64' : 'w-16'
    }`}>
      {/* Header */}
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Building2 className="w-8 h-8 text-blue-400" />
            <div className="flex flex-col">
              <span className="font-semibold text-white">{user.name}</span>
              <span className="text-xs text-gray-400">{user.role}</span>
            </div>
          </div>
        </div>
        <div className="mt-2">
          <button
            onClick={onChangeCompany}
            className="text-xs text-blue-400 hover:text-blue-300 transition-colors"
          >
            {user.company}
          </button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => item.hasSubmenu ? toggleMenu(item.id) : undefined}
                className="w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-gray-800 transition-colors text-left"
              >
                <div className="flex items-center space-x-3">
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </div>
                {item.hasSubmenu && (
                  expandedMenus.includes(item.id) ? (
                    <ChevronDown className="w-4 h-4" />
                  ) : (
                    <ChevronRight className="w-4 h-4" />
                  )
                )}
              </button>
              
              {item.hasSubmenu && expandedMenus.includes(item.id) && (
                <ul className="mt-2 ml-6 space-y-1">
                  {item.submenu?.map((subItem, index) => (
                    <li key={index}>
                      {subItem.hasNestedSubmenu ? (
                        <div>
                          <button
                            onClick={() => toggleMenu(`${item.id}-${index}`)}
                            className="w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-gray-800 transition-colors text-left text-sm text-gray-300 hover:text-white"
                          >
                            <div className="flex items-center space-x-3">
                              <subItem.icon className="w-4 h-4" />
                              <span>{subItem.label}</span>
                            </div>
                            {expandedMenus.includes(`${item.id}-${index}`) ? (
                              <ChevronDown className="w-3 h-3" />
                            ) : (
                              <ChevronRight className="w-3 h-3" />
                            )}
                          </button>
                          {expandedMenus.includes(`${item.id}-${index}`) && (
                            <ul className="mt-1 ml-6 space-y-1">
                              {subItem.nestedSubmenu?.map((nestedItem, nestedIndex) => (
                                <li key={nestedIndex}>
                                  <button
                                    onClick={() => {
                                      if (nestedItem.label === 'Invoice') {
                                        onShowInvoice();
                                      } else if (nestedItem.label === 'Credit Note') {
                                        onShowCreditNote();
                                      } else if (nestedItem.onClick) {
                                        nestedItem.onClick();
                                      }
                                    }}
                                    className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-800 transition-colors text-left text-xs text-gray-400 hover:text-white"
                                  >
                                    <nestedItem.icon className="w-3 h-3" />
                                    <span>{nestedItem.label}</span>
                                  </button>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      ) : (
                        <button
                          onClick={subItem.onClick}
                          className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-800 transition-colors text-left text-sm text-gray-300 hover:text-white"
                        >
                          <subItem.icon className="w-4 h-4" />
                          <span>{subItem.label}</span>
                        </button>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </nav>

      {/* Toggle Button */}
      <div className="p-4 border-t border-gray-700">
        <button
          onClick={onToggle}
          className="w-full flex items-center justify-center px-3 py-2 rounded-lg hover:bg-gray-800 transition-colors"
        >
          <span className="text-sm">
            {isExpanded ? '←' : '→'}
          </span>
        </button>
      </div>
    </div>
  );
}