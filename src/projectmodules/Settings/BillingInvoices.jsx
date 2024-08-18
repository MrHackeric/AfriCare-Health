import React, { useState } from 'react';

import Sidebar from '../../Header&Sidebar/Sidebar';
import Header from '../../Header&Sidebar/Header';

function BillingInvoices() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentPlan, setCurrentPlan] = useState('Annual Plan - $96/year');
  const [invoices, setInvoices] = useState([
    { id: 1, date: '2024-01-15', amount: '$96', status: 'Paid', pdfLink: '/invoices/2024-01-15.pdf' },
    { id: 2, date: '2023-01-15', amount: '$96', status: 'Paid', pdfLink: '/invoices/2023-01-15.pdf' },
    { id: 3, date: '2022-01-15', amount: '$96', status: 'Paid', pdfLink: '/invoices/2022-01-15.pdf' },
  ]);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/* Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main className="grow">
          <div className="px-4 sm:px-6 lg:px-8 py-4 w-full max-w-6xl mx-auto">
            {/* Current Billing Plan */}
            <div className="p-4 mb-6 max-w-md mx-auto bg-gray-100 dark:bg-gray-700 shadow-sm rounded-lg">
              <h2 className="text-lg font-semibold mb-4">Current Billing Plan</h2>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                {currentPlan}
              </p>
            </div>

            {/* Invoice History */}
            <div className="p-4 max-w-4xl mx-auto bg-white dark:bg-gray-800 shadow-sm rounded-lg">
              <h2 className="text-lg font-semibold mb-4">Invoice History</h2>
              <table className="min-w-full table-auto text-sm">
                <thead>
                  <tr className="bg-gray-100 dark:bg-gray-700">
                    <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-300">Date</th>
                    <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-300">Amount</th>
                    <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-300">Status</th>
                    <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-300">Invoice</th>
                  </tr>
                </thead>
                <tbody>
                  {invoices.map((invoice) => (
                    <tr key={invoice.id} className="border-b dark:border-gray-700">
                      <td className="px-4 py-2 text-gray-700 dark:text-gray-300">{invoice.date}</td>
                      <td className="px-4 py-2 text-gray-700 dark:text-gray-300">{invoice.amount}</td>
                      <td className={`px-4 py-2 ${invoice.status === 'Paid' ? 'text-green-500' : 'text-red-500'}`}>
                        {invoice.status}
                      </td>
                      <td className="px-4 py-2">
                        <a
                          href={invoice.pdfLink}
                          className="text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Download PDF
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default BillingInvoices;
