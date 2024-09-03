function Header({ sidebarOpen, setSidebarOpen }) {
  return (
    <header className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 shadow-md">
      {/* Logo */}
      <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100">
        <img src="src/images/AfriCare.png" alt="AfriCare Logo" className="h-12 w-auto" />
      </h2>

      {/* Button Container */}
      <div className="flex space-x-4">
        <a href="/SignUp">
          <button className="btn bg-blue-800 text-white px-4 py-2 rounded hover:bg-white hover:text-blue-800 transition duration-300 border-2 border-transparent dark:bg-blue-800 dark:hover:bg-white dark:hover:text-blue-800 dark:border-transparent">
            Sign Up
          </button>
        </a>

        <a href="/SignIn">
        <button className="btn bg-white text-blue-800 px-4 py-2 rounded hover:bg-blue-800 hover:text-white transition duration-300 border-2 border-transparent dark:bg-white dark:hover:bg-blue-800 dark:hover:text-white dark:border-transparent">
        Log In
          </button>
        </a>
      </div>
    </header>
  );
}

export default Header;
