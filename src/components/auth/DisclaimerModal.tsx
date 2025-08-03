import React from 'react';
import { X } from 'lucide-react';

interface DisclaimerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAccept: () => void;
}

export const DisclaimerModal: React.FC<DisclaimerModalProps> = ({ isOpen, onClose, onAccept }) => {
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

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40"
      onClick={handleBackdropClick}
      onKeyDown={handleKeyDown}
      tabIndex={-1}
    >
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[80vh] overflow-y-auto m-4">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-800">FortAcc Disclaimer</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 p-1"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          
          <div className="text-gray-700 space-y-4">
            <p>
              FortAcc is an accounting system designed to facilitate business and financial recordkeeping. 
              While every effort has been made to ensure the accuracy, reliability, and functionality of the system, 
              FortAcc and its developers make no warranties, express or implied, regarding the completeness or 
              accuracy of financial data processed through the platform.
            </p>
            
            <p>
              FortAcc shall not be held liable for any loss, damage, or liability arising from the use of the 
              system or reliance on its outputs. Users are solely responsible for the accuracy of the information 
              they input and are advised to seek professional accounting or legal advice before making any business 
              decisions based on the system's data.
            </p>
            
            <h3 className="font-bold text-lg mt-6">Data Protection Notice:</h3>
            
            <p>
              In line with the Mauritius Data Protection Act 2017, FortAcc is committed to safeguarding the 
              personal and financial data of all users and entities registered on the system. Data collected 
              by FortAcc is used strictly for accounting, reporting, and business management purposes.
            </p>
            
            <ul className="list-disc pl-6 space-y-2">
              <li>
                Access to user and company data is restricted to authorized users based on role-based 
                permissions.
              </li>
              <li>
                FortAcc implements secure protocols and encryption to protect against unauthorized access, 
                alteration, or loss of data.
              </li>
              <li>
                By using FortAcc, you consent to the collection and processing of your data as outlined 
                in our internal privacy policy.
              </li>
              <li>
                You retain the right to access, rectify, or request deletion of your personal data at any time.
              </li>
            </ul>
            
            <p>
              To exercise these rights or to raise a concern about data privacy, please contact the FortAcc 
              Data Protection Officer at:{' '}
              <a href="mailto:dpo@fortacc.com" className="text-blue-600 hover:text-blue-800">
                dpo@fortacc.com
              </a>
              .
            </p>
          </div>
          
          <div className="mt-6 flex justify-end">
            <button
              onClick={onAccept}
              className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              I Accept
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};