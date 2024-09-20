import React from 'react';
import A2SVLogo from '../../../images/A2SVLogo.png'; // Update with the correct logo file name

function PartnerLogos() {
  const partners = [
    {
      name: 'A2SV',
      logo: A2SVLogo, // Local image import
      website: 'https://www.a2sv.org', // Replace with A2SV website URL
    },
    // You can add more partners here
  ];

  return (
    <section className="hero px-4 py-8 sm:px-6 lg:px-8 bg-gradient-to-r from-pink-100 via-purple-100 to-pink-200">
      <div className="max-w-[1200px] mx-auto">
        <h2 className="text-4xl font-bold text-pink-700 mb-4 text-center">
          Our Partners
        </h2>
        <p className="text-lg text-gray-600 mb-8 text-center">
          Building credibility through collaboration.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {partners.map((partner, index) => (
            <a key={index} href={partner.website} target="_blank" rel="noopener noreferrer">
              <div className="flex justify-center items-center p-4 bg-white rounded-lg shadow-lg">
                <img src={partner.logo} alt={partner.name} className="max-h-20 object-contain" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

export default PartnerLogos;
