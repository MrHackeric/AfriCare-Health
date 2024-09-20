import React from 'react';

function CallToAction() {
  return (
    <section className="bg-gradient-to-r from-pink-50 via-purple-50 to-pink-100 py-12">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl font-bold text-pink-700 mb-4">
          Take Action Today!
        </h2>
        <p className="text-lg text-gray-600 mb-8">
          Empower yourself and access the support you need for a healthier maternal journey.
        </p>
        <div className="flex flex-col md:flex-row justify-center gap-6">
          <a href="/support-groups">
            <button className="btn bg-pink-600 text-white px-6 py-3 rounded-full hover:bg-white hover:text-pink-600 transition duration-300 border-2 border-pink-600">
              Join a Support Group
            </button>
          </a>
          <a href="/chatbot">
            <button className="btn bg-pink-600 text-white px-6 py-3 rounded-full hover:bg-white hover:text-pink-600 transition duration-300 border-2 border-pink-600">
              Ask the AI Chatbot
            </button>
          </a>
          <a href="/emergency-assistance">
            <button className="btn bg-pink-600 text-white px-6 py-3 rounded-full hover:bg-white hover:text-pink-600 transition duration-300 border-2 border-pink-600">
              Find Emergency Assistance
            </button>
          </a>
          <a href="/mental-health-resources">
            <button className="btn bg-pink-600 text-white px-6 py-3 rounded-full hover:bg-white hover:text-pink-600 transition duration-300 border-2 border-pink-600">
              Access Mental Health Resources
            </button>
          </a>
        </div>
      </div>
    </section>
  );
}

export default CallToAction;
