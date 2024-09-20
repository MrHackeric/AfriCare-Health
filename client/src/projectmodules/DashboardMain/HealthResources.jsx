import React from 'react';

function HealthResources() {
  const resources = [
    { title: 'How to manage prenatal anxiety', link: '#' },
    { title: 'Postnatal recovery tips', link: '#' }
  ];

  return (
    <div className="bg-white dark:bg-gray-800 shadow-sm rounded-xl p-6 mb-6">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Health Resources</h2>
      <ul>
        {resources.map((resource, index) => (
          <li key={index} className="mb-2">
            <a href={resource.link} className="text-blue-500 dark:text-blue-300 hover:underline">
              {resource.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default HealthResources;
