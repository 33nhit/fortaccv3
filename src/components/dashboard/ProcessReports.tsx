import React from 'react';
import { ProcessSection } from '../../types/dashboard';

interface ProcessReportsProps {
  sections: ProcessSection[];
}

export const ProcessReports: React.FC<ProcessReportsProps> = ({ sections }) => {
  return (
    <div>
      <h3 className="text-xl font-semibold text-gray-700 mb-4">Quick Access</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sections.map((section, index) => (
          <div key={index} className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
            {section.title && <h4 className="font-medium text-gray-800 mb-3">{section.title}</h4>}
            <ul className="space-y-2">
              {section.items.map((item, itemIndex) => (
                <li key={itemIndex}>
                  <a
                    href={item.href}
                    className="text-blue-600 hover:text-blue-800 text-sm transition-colors"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};