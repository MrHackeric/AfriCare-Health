import img from "../../../images/illustration.png";

function Hero() {
  return (
    <section className="hero px-4 py-8 sm:px-6 lg:px-8 bg-gradient-to-r from-pink-100 via-purple-100 to-pink-200">
      <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row items-center text-center md:text-left">
        {/* Text Content */}
        <div className="md:w-1/2 mb-8 md:mb-0 flex flex-col justify-center">
          <h1 className="md:text-5xl font-bold text-pink-700 mb-4">
            Welcome to AfriCare, Revolutionizing Maternal Health One Step at a Time!
          </h1>
          <h2 className="italic md:text-xl font-bold text-pink-600 mb-4">
            Healthier Mothers, Stronger Africa
          </h2>
          <p className="text-[15px] text-gray-700 mb-6">
            AfriCare is a platform dedicated to transforming maternal healthcare in Africa
            through AI-powered support, community-driven resources, and improved healthcare access.
            Join us in our mission to empower mothers and families across the continent.
          </p>

          <div className="flex space-x-4">
            <a href="/SignUp">
              <button className="btn bg-pink-600 text-white px-8 py-3 rounded-full hover:bg-white hover:text-pink-600 transition duration-300 border-2 border-pink-600">
                Get Started
              </button>
            </a>
          </div>
        </div>

        {/* Image */}
        <div className="md:w-1/2">
          <img src={img} alt="health care illustration" className="w-4/5 h-auto mx-auto md:ml-auto md:mr-0 rounded-lg shadow-lg border-2 border-pink-300" />
        </div>
      </div>
    </section>
  );
}

export default Hero;
