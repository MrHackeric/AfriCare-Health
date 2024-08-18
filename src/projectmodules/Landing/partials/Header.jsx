

function Header({ sidebarOpen, setSidebarOpen }) {
  return (
    <header className="flex items-center justify-between p-4 bg-white shadow-md dark:bg-gray-900">
      {/* Logo */}
      <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100">Logo</h2>

      {/* Button Container */}
      <div className="flex space-x-4">

      <a href="/SignUp">
        <button className="btn bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition duration-300">
          Sign Up
        </button>
      </a>

      <a href="/SignIn">
        <button className="btn bg-transparent border border-blue-500 text-blue-500 px-6 py-2 rounded hover:bg-blue-500 hover:text-white transition duration-300">
          Log In
        </button>
      </a>

      </div>
    </header>
  );
}

export default Header;
