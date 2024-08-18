import React, { useState } from 'react';

import Sidebar from '../../Header&Sidebar/Sidebar';
import Header from '../../Header&Sidebar/Header';

function BillingPlans() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedPlan) {
      setSubmissionStatus('Please select a billing plan.');
      return;
    }

    setIsSubmitting(true);

    // Simulate successful form submission
    setTimeout(() => {
      setSubmissionStatus(`You have selected the ${selectedPlan} plan successfully!`);
      setIsSubmitting(false);
    }, 1000); // Simulate delay
  };

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
            {/* Paragraph Section */}
            <div className="p-4 mb-6 max-w-md mx-auto bg-gray-100 dark:bg-gray-700 shadow-sm rounded-lg">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Choose a billing plan that suits your needs. We offer flexible options to fit any budget, with discounts available for longer commitments.
              </p>
            </div>

            {/* Billing Plans Form */}
            <div className="p-4 max-w-md mx-auto bg-white dark:bg-gray-800 shadow-sm rounded-lg flex flex-col">
              <h2 className="text-lg font-semibold mb-4">Select a Billing Plan</h2>
              {submissionStatus && <p className="mb-4 text-red-600 text-sm">{submissionStatus}</p>}
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <div className="flex items-center">
                    <input
                      id="monthly"
                      type="radio"
                      value="Monthly"
                      checked={selectedPlan === 'Monthly'}
                      onChange={(e) => setSelectedPlan(e.target.value)}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                    />
                    <label htmlFor="monthly" className="ml-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Monthly Plan - $10/month
                    </label>
                  </div>
                  <div className="ml-6 text-xs text-gray-500 dark:text-gray-400">
                    Billed monthly, no discount.
                  </div>
                </div>

                <div className="mb-3">
                  <div className="flex items-center">
                    <input
                      id="quarterly"
                      type="radio"
                      value="Quarterly"
                      checked={selectedPlan === 'Quarterly'}
                      onChange={(e) => setSelectedPlan(e.target.value)}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                    />
                    <label htmlFor="quarterly" className="ml-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Quarterly Plan - $27/quarter
                    </label>
                  </div>
                  <div className="ml-6 text-xs text-gray-500 dark:text-gray-400">
                    Billed every 3 months, 10% discount.
                  </div>
                </div>

                <div className="mb-3">
                  <div className="flex items-center">
                    <input
                      id="annual"
                      type="radio"
                      value="Annual"
                      checked={selectedPlan === 'Annual'}
                      onChange={(e) => setSelectedPlan(e.target.value)}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                    />
                    <label htmlFor="annual" className="ml-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Annual Plan - $96/year
                    </label>
                  </div>
                  <div className="ml-6 text-xs text-gray-500 dark:text-gray-400">
                    Billed annually, 20% discount.
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex justify-center py-1 px-3 border border-transparent shadow-sm text-xs font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  {isSubmitting ? 'Submitting...' : 'Select Plan'}
                </button>
              </form>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default BillingPlans;
