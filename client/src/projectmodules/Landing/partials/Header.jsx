function Header({ sidebarOpen, setSidebarOpen }) {
  return (
    <header className="flex items-center justify-between p-4 bg-gradient-to-r from-pink-300 to-purple-300 shadow-md">
      {/* Logo */}
      <h2 className="text-lg font-bold text-pink-700">
        <img src="src/images/AfriCare.png" alt="AfriCare Logo" className="h-12 w-auto" />
      </h2>

      {/* Button Container */}
      <div className="flex space-x-4">
        <a href="/SignUp">
          <button className="btn bg-pink-600 text-white px-8 py-3 rounded-full hover:bg-white hover:text-pink-600 transition duration-300 border-2 border-pink-600">
        Sign Up
          </button>
        </a>

        <a href="/SignIn">
          <button className="btn bg-white text-pink-600 px-8 py-3 rounded-full hover:bg-pink-600 hover:text-white transition duration-300 border-2 border-pink-600">
        Log In
          </button>
        </a>
      </div>
    </header>
  );
}

export default Header;
