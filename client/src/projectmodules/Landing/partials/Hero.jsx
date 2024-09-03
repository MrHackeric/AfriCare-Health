import img from "../../../images/illustration.png";

function Hero() {
  return (
    <section className="hero px-4 py-8 sm:px-6 lg:px-8 bg-white dark:bg-gray-700">
      <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row items-center md:items-center text-center md:text-left">
        {/* Text Content */}
        <div className="md:w-1/2 mb-8 md:mb-0 flex flex-col justify-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-200 mb-4">
            Welcome to Africare, where we Transform Maternal Health, One Community at a Time
          </h1>
          <p className="text-m text-gray-700 dark:text-gray-300 mb-6">
            Empowering mothers with essential healthcare and support. Discover how Africare is making a difference and how you can be a part of the change. 
            <span className="block">Join us in our mission to improve lives.</span>
          </p>
        
        <a href="/SignUp">
          <button className="btn bg-blue-800 text-white px-8 py-3 rounded hover:bg-white hover:text-blue-800 transition duration-300 border-2 border-transparent dark:bg-blue-800 dark:hover:bg-white dark:hover:text-blue-800 dark:border-transparent">
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
