import React from 'react';
import { FaBookMedical } from 'react-icons/fa';

function Recommendations() {
  const recommendations = [
    { title: 'Healthy Diet Tips for Pregnant Women', link: '/article/diet-tips' },
    { title: 'Exercises to Stay Fit During Pregnancy', link: '/article/exercise-tips' }
  ];

  return (
    <div className="bg-gradient-to-r from-pink-100 via-purple-100 to-pink-200 shadow-sm rounded-xl p-6 mt-6">
      <h2 className="text-xl font-semibold text-pink-800 mb-4">
        Personalized Recommendations
      </h2>
      <ul>
        {recommendations.map((rec, index) => (
          <li key={index} className="flex items-center mb-4">
            <FaBookMedical className="text-2xl text-indigo-500 mr-4" />
            <div>
              <a href={rec.link} className="text-lg font-bold text-pink-600 hover:underline">
                {rec.title}
              </a>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Recommendations;
