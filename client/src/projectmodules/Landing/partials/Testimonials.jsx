import React from 'react';

// Testimonials Data
const testimonials = [
  {
    quote: "Africare has been a game-changer for me during my pregnancy. The AI advice and the support group kept me informed and less anxious.",
    name: "Grace",
    location: "Nairobi, Kenya",
    image: "https://ui-avatars.com/api/?name=Grace&background=FFB6C1&color=000000", // Placeholder image, replace with real one
  },
  {
    quote: "The emergency assistance provided by Africare during my labor saved both my life and my baby’s. I will always be grateful.",
    name: "Amina",
    location: "Accra, Ghana",
    image: "https://ui-avatars.com/api/?name=Amina&background=ADD8E6&color=000000", // Placeholder image, replace with real one
  },
  {
    quote: "As a first-time mother, I was nervous, but Africare’s community helped me prepare for childbirth and motherhood. It's been a blessing.",
    name: "Zanele",
    location: "Johannesburg, South Africa",
    image: "https://ui-avatars.com/api/?name=Zanele&background=90EE90&color=000000", // Placeholder image, replace with real one
  }
];

function Testimonials() {
  return (
    <section className="bg-gradient-to-r from-purple-50 via-pink-50 to-purple-100 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl font-extrabold text-pink-700 mb-12">
          Success Stories from Our Community
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white p-8 rounded-lg shadow-lg flex flex-col items-center transition-transform transform hover:scale-105">
              {/* Image */}
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="rounded-full w-24 h-24 object-cover mb-4"
              />
              {/* Quote */}
              <p className="text-gray-700 italic text-lg mb-4">“{testimonial.quote}”</p>
              {/* Name */}
              <p className="font-bold text-gray-900 text-lg">{testimonial.name}</p>
              {/* Location */}
              <p className="text-gray-500 text-sm">{testimonial.location}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
