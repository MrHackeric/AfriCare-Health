import Service from "./Service";
import bot from "../../../images/bot.jpeg";
import women from "../../../images/women.jpeg";
import hospital from "../../../images/hospital.jpeg";

const data = [
  {
    url: bot,
    title: "AI Chatbot",
    text: "Get instant answers to your maternal health questions anytime, anywhere. Our AI-powered chatbot is here to provide support and guidance at your fingertips.",
  },
  {
    url: women,
    title: "Community Forum",
    text: "Connect with other women, share experiences, and learn from each other in a safe, supportive environment. Join the conversation and empower one another.",
  },
  {
    url: hospital,
    title: "Emergencies",
    text: "Access vital emergency contacts and find the nearest healthcare facilities on our interactive map. We're here to ensure you get the help you need, fast.",
  },
];

function Services() {
  return (
    <section className="flex justify-center px-4 pb-8 pt-8">
      <div className="max-w-[1200px] flex flex-wrap gap-6 justify-center">
        <h2 className="w-full text-4xl font-bold text-center mb-8 text-gray-100 relative">
          Our Services
          <span className="block w-20 h-[3px] bg-gray-200 mx-auto mt-2"></span>
        </h2>
        <h3 className="text-2xl font-semibold text-center text-slate-200 mb-4">
          Explore Our Comprehensive Services Designed to Support Your Maternal Health Journey
        </h3>
        {data.map((service, index) => (
          <Service
            key={index}
            url={service.url}
            title={service.title}
            text={service.text}
          />
        ))}
      </div>
    </section>
  );
}

export default Services;


