import React, { useState } from 'react';

import Sidebar from '../../Header&Sidebar/Sidebar';
import Header from '../../Header&Sidebar/Header';

function FeedBackForm() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [agree, setAgree] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !email || !message || !agree) {
      setSubmissionStatus('Please fill all fields and agree to the privacy policy.');
      return;
    }

    setIsSubmitting(true);

    // Simulate successful form submission
    setTimeout(() => {
      setSubmissionStatus('Feedback sent successfully!');
      setName('');
      setEmail('');
      setMessage('');
      setAgree(false);
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
                We value your feedback and would love to hear your thoughts about our service. Please fill out the form below to share your experience or any suggestions you may have. Your feedback helps us improve and provide a better experience for all our users.
              </p>
            </div>

            {/* Feedback Form */}
            <div className="p-4 max-w-md mx-auto bg-white dark:bg-gray-800 shadow-sm rounded-lg flex flex-col">
              <h2 className="text-lg font-semibold mb-4">Feedback Form</h2>
              {submissionStatus && <p className="mb-4 text-red-600 text-sm">{submissionStatus}</p>}
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="block text-xs font-medium text-gray-700 dark:text-gray-300" htmlFor="name">
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-xs"
                  />
                </div>
                <div className="mb-3">
                  <label className="block text-xs font-medium text-gray-700 dark:text-gray-300" htmlFor="email">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-xs"
                  />
                </div>
                <div className="mb-3">
                  <label className="block text-xs font-medium text-gray-700 dark:text-gray-300" htmlFor="message">
                    Message
                  </label>
                  <textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-xs text-gray-900 dark:text-gray-100"
                    rows="3"
                  ></textarea>
                </div>
                <div className="flex items-center mb-3">
                  <input
                    id="agree"
                    type="checkbox"
                    checked={agree}
                    onChange={() => setAgree(!agree)}
                    required
                    className="h-3 w-3 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label htmlFor="agree" className="ml-2 block text-xs text-gray-700 dark:text-gray-300">
                    I agree to the <a href="/privacy-policy" className="text-indigo-600 hover:text-indigo-500">AfriCare privacy policy</a>
                  </label>
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex justify-center py-1 px-3 border border-transparent shadow-sm text-xs font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  {isSubmitting ? 'Submitting Feedback...' : 'Send Feedback'}
                </button>
              </form>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default FeedBackForm;
