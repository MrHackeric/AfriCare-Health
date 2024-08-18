import img from "../../../images/illustration.png";

function Hero() {
  return (
    <section className="hero px-4 py-8 sm:px-6 lg:px-8 bg-gray-800">
      <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row items-center md:items-center text-center md:text-left">
        {/* Text Content */}
        <div className="md:w-1/2 mb-8 md:mb-0 flex flex-col justify-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4">
            Welcome to Africare, where we Transform Maternal Health, One Community at a Time
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
            Empowering mothers with essential healthcare and support. Discover how Africare is making a difference and how you can be a part of the change. 
            <span className="block">Join us in our mission to improve lives.</span>
          </p>
        
        <a href="/SignUp">
          <button className="bg-blue-500 text-white w-72 mx-auto md:mx-0 px-6 py-3 rounded-[5px] hover:bg-blue-600 transition duration-300">
            Get Started
          </button>
        </a>

        </div>

        {/* Image */}
        <div className="md:w-1/2">
          <img src={img} alt="health care illustration" className="w-4/5 h-auto mx-auto md:ml-auto md:mr-0 rounded-lg shadow-md" />
        </div>
      </div>
    </section>
  );
}

export default Hero;
