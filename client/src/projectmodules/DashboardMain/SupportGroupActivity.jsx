import React from 'react';

function SupportGroupActivity() {
  const discussions = [
    { title: 'Managing prenatal stress', date: '2 hours ago' },
    { title: 'Best postnatal recovery tips', date: '1 day ago' }
  ];

  return (
    <div className="bg-white dark:bg-gray-800 shadow-sm rounded-xl p-6 mb-6">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Support Group Activity</h2>
      <ul>
        {discussions.map((discussion, index) => (
          <li key={index} className="mb-2">
            <a href="#" className="text-blue-500 dark:text-blue-300 hover:underline">
              {discussion.title}
            </a>
            <p className="text-sm text-gray-600 dark:text-gray-400">{discussion.date}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SupportGroupActivity;
