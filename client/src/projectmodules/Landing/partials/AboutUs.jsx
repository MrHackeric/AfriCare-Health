import React from 'react';

function AboutUs() {
  return (
    <section className="bg-gradient-to-r from-pink-100 via-purple-100 to-pink-200 py-12">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-pink-700 mb-4 text-center">
          About Us
        </h2>
        <p className="text-lg text-gray-600 mb-8 text-center">
          AfriCare is dedicated to improving maternal healthcare across the continent. Our mission is to provide support, education, and resources to expectant mothers and healthcare providers, ensuring that every child is born into a safe and nurturing environment.
        </p>
        <p className="text-gray-600 mb-4">
          Founded by a group of passionate healthcare professionals, we believe that every mother deserves access to quality healthcare and information. Our programs include educational workshops, community outreach, and partnerships with local healthcare facilities to ensure that maternal health remains a priority in our communities.
        </p>
        <p className="text-gray-600">
          Join us on our mission to empower mothers and improve healthcare outcomes for generations to come.
        </p>
      </div>
    </section>
  );
}

export default AboutUs;
