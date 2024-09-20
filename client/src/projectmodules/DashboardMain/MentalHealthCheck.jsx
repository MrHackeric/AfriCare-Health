import React from 'react';

function MentalHealthCheck() {
  return (
    <div className="bg-gradient-to-r from-pink-100 via-purple-100 to-pink-200 shadow-sm rounded-xl p-6 mt-6">
      <h2 className="text-xl font-semibold text-pink-800 mb-4">Mental Health Check-In</h2>
      <p className="text-pink-600 mb-4">How are you feeling today?</p>
      <div className="flex space-x-4">
        <button className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:ring-4 focus:ring-green-300">
          Great
        </button>
        <button className="bg-yellow-500 text-white py-2 px-4 rounded-md hover:bg-yellow-600 focus:ring-4 focus:ring-yellow-300">
          Okay
        </button>
        <button className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 focus:ring-4 focus:ring-red-300">
          Stressed
        </button>
      </div>
    </div>
  );
}

export default MentalHealthCheck;
