import React from 'react';

function SupportGroupActivity() {
  const discussions = [
    { title: 'Managing prenatal stress', date: '2 hours ago' },
    { title: 'Best postnatal recovery tips', date: '1 day ago' }
  ];

  return (
    <div className="bg-gradient-to-r from-pink-100 via-purple-100 to-pink-200 shadow-sm rounded-xl p-6 mb-6 mt-6">
      <h2 className="text-xl font-semibold text-pink-800 mb-4">Support Group Activity</h2>
      <ul>
        {discussions.map((discussion, index) => (
          <li key={index} className="mb-2">
            <a href="#" className="text-blue-800 hover:underline">
              {discussion.title}
            </a>
            <p className="text-sm text-pink-600">{discussion.date}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SupportGroupActivity;
