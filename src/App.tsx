import React from 'react';
import { useState } from 'react';
import { useAuth } from './hooks/useAuth';
import { LoginForm } from './components/auth/LoginForm';
import { DisclaimerModal } from './components/auth/DisclaimerModal';
import { CompanySelectModal } from './components/auth/CompanySelectModal';
import { Header } from './components/layout/Header';
import Sidebar from './components/layout/Sidebar';
import { Dashboard } from './components/dashboard/Dashboard';
import { GeneralLedgerForm } from './components/forms/GeneralLedgerForm';
import { CustomerForm } from './components/forms/CustomerForm';
import { SupplierForm } from './components/forms/SupplierForm';
import { ExchangeRateForm } from './components/forms/ExchangeRateForm';
import { VATForm } from './components/forms/VATForm';
import { InvoiceForm } from './components/forms/InvoiceForm';
import { CreditNoteForm } from './components/forms/CreditNoteForm';
import { NewCompanyForm } from './components/forms/NewCompanyForm';

function App() {
  const auth = useAuth();
  const [showDisclaimer, setShowDisclaimer] = useState(false);
  const [showCompanySelect, setShowCompanySelect] = useState(false);
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [showGeneralLedger, setShowGeneralLedger] = useState(false);
  const [showCustomer, setShowCustomer] = useState(false);
  const [showSupplier, setShowSupplier] = useState(false);
  const [showExchangeRate, setShowExchangeRate] = useState(false);
  const [showVAT, setShowVAT] = useState(false);
  const [showInvoice, setShowInvoice] = useState(false);
  const [showCreditNote, setShowCreditNote] = useState(false);
  const [showNewCompany, setShowNewCompany] = useState(false);

  const handleLogin = async (credentials: { username: string; password: string }) => {
    setIsLoading(true);
    const result = await auth.login(credentials);
    setIsLoading(false);
    
    if (result.success) {
      setShowDisclaimer(true);
    }
    
    return result;
  };

  const handleDisclaimerAccept = () => {
    setShowDisclaimer(false);
    setShowCompanySelect(true);
  };

  const handleCompanySelect = (companyId: string) => {
    if (auth.selectCompany(companyId)) {
      setShowCompanySelect(false);
    }
  };

  const handleChangeCompany = () => {
    setShowCompanySelect(true);
  };

  const handleShowGeneralLedger = () => {
    setShowGeneralLedger(true);
  };

  const handleShowCustomer = () => {
    setShowCustomer(true);
  };

  const handleShowSupplier = () => {
    setShowSupplier(true);
  };

  const handleShowExchangeRate = () => {
    setShowExchangeRate(true);
  };

  const handleShowVAT = () => {
    setShowVAT(true);
  };

  const handleShowInvoice = () => {
    setShowInvoice(true);
  };

  const handleShowCreditNote = () => {
    setShowCreditNote(true);
  };

  const handleShowNewCompany = () => {
    setShowNewCompany(true);
  };

  // Show login if not authenticated or no company selected
  if (!auth.isAuthenticated || !auth.company) {
    return (
      <>
        <LoginForm
          onLogin={handleLogin}
          onShowDisclaimer={() => setShowDisclaimer(true)}
          isLoading={isLoading}
        />
        
        <DisclaimerModal
          isOpen={showDisclaimer}
          onClose={() => setShowDisclaimer(false)}
          onAccept={handleDisclaimerAccept}
        />
        
        <CompanySelectModal
          isOpen={showCompanySelect}
          onClose={() => setShowCompanySelect(false)}
          onSelect={handleCompanySelect}
          companies={auth.companies}
        />
      </>
    );
  }

  // Show main application
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Header
        onToggleSidebar={() => setSidebarExpanded(!sidebarExpanded)}
        onLogout={auth.logout}
        company={auth.company}
      />
      
      <div className="flex flex-1">
        <Sidebar
          isExpanded={sidebarExpanded}
          onToggle={() => setSidebarExpanded(!sidebarExpanded)}
          onChangeCompany={handleChangeCompany}
          onShowGeneralLedger={handleShowGeneralLedger}
          onShowCustomer={handleShowCustomer}
          onShowSupplier={handleShowSupplier}
          onShowExchangeRate={handleShowExchangeRate}
          onShowVAT={handleShowVAT}
          onShowInvoice={handleShowInvoice}
          onShowCreditNote={handleShowCreditNote}
          onShowNewCompany={handleShowNewCompany}
          user={auth.user!}
        />
        
        <Dashboard />
      </div>
      
      <CompanySelectModal
        isOpen={showCompanySelect}
        onClose={() => setShowCompanySelect(false)}
        onSelect={handleCompanySelect}
        companies={auth.companies}
      />
      
      {showGeneralLedger && (
        <GeneralLedgerForm onClose={() => setShowGeneralLedger(false)} />
      )}
      
      {showCustomer && (
        <CustomerForm onClose={() => setShowCustomer(false)} />
      )}
      
      {showSupplier && (
        <SupplierForm onClose={() => setShowSupplier(false)} />
      )}
      
      {showExchangeRate && (
        <ExchangeRateForm onClose={() => setShowExchangeRate(false)} />
      )}
      
      {showVAT && (
        <VATForm onClose={() => setShowVAT(false)} />
      )}
      
      {showInvoice && (
        <InvoiceForm onClose={() => setShowInvoice(false)} />
      )}
      
      {showCreditNote && (
        <CreditNoteForm onClose={() => setShowCreditNote(false)} />
      )}
      
      {showNewCompany && (
        <NewCompanyForm onClose={() => setShowNewCompany(false)} />
      )}
    </div>
  );
}

export default App;
