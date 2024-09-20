import React from 'react';

function HealthResources() {
  const resources = [
    { title: 'How to manage prenatal anxiety', link: '#' },
    { title: 'Postnatal recovery tips', link: '#' }
  ];

  return (
    <div className="bg-gradient-to-r from-pink-100 via-purple-100 to-pink-200 shadow-sm rounded-xl p-6 mb-6">
      <h2 className="text-xl font-semibold text-pink-800 mb-4">Health Resources</h2>
      <ul>
        {resources.map((resource, index) => (
          <li key={index} className="mb-2">
            <a href={resource.link} className="text-blue-800 hover:underline">
              {resource.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default HealthResources;
