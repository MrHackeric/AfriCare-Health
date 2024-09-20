import Service from "./Service";
import bot from "../../../images/bot.jpeg";
import women from "../../../images/women.jpeg";
import hospital from "../../../images/hospital.jpeg";

const data = [
  {
    url: bot,
    title: "AI-Driven Guidance",
    text: "Instantly get maternal health advice anytime, anywhere. Our AI-powered chatbot offers support for mothers and families throughout their health journey.",
    cta: "Learn More",
  },
  {
    url: women,
    title: "Community Support Network",
    text: "Join a vibrant community of mothers where you can share experiences, receive advice, and offer support in a safe and empowering environment.",
    cta: "Get Started",
  },
  {
    url: hospital,
    title: "Emergency Assistance",
    text: "Quickly find nearby hospitals and pharmacies using our geolocation services. We're here to ensure you get emergency care when needed.",
    cta: "Explore",
  },
];

function Services() {
  return (
    <section className="flex justify-center px-4 pb-8 pt-8 bg-gradient-to-r from-pink-50 via-purple-50 to-pink-100">
      <div className="max-w-[1200px] flex flex-wrap gap-6 justify-center">
        {/* Section Title */}
        <h2 className="w-full text-4xl font-bold text-center mb-4 text-pink-700 relative">
          Our Services
          <span className="block w-20 h-[3px] bg-pink-600 mx-auto mt-2"></span>
        </h2>
        
        {/* Subtitle */}
        <h3 className="w-full text-2xl font-semibold text-center text-pink-600 mb-8">
          Explore Our Comprehensive Services Designed to Support Your Maternal Health Journey
        </h3>
        
        {/* Service Cards */}
        {data.map((service, index) => (
          <Service
            key={index}
            url={service.url}
            title={service.title}
            text={service.text}
            cta={service.cta}  // Passing the CTA button
          />
        ))}
      </div>
    </section>
  );
}

export default Services;