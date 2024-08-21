

function Header({ sidebarOpen, setSidebarOpen }) {
  return (
    <header className="flex items-center justify-between p-4 bg-[#874c78] shadow-md dark:bg-[#874c78]">
      {/* Logo */}
      <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100">
        <img src="src/images/AfriCare.png" alt="AfriCare Logo" className="h-12 w-auto" />
      </h2>

      {/* Button Container */}
      <div className="flex space-x-4">

      <a href="/SignUp">
        <button className="btn bg-[white] text-[#874c78] px-4 py-2 rounded hover:bg-transparent hover:border-[#f2b1de] border-2 hover:text-[white] transition duration-300">
          Sign Up
        </button>
      </a>

      <a href="/SignIn">
        <button className="btn bg-transparent border-2 border-[#f2b1de] text-[white] px-6 py-2 rounded hover:bg-[white] hover:text-[#874c78] hover:border-transparent transition duration-300">
          Log In
        </button>
      </a>

      </div>
    </header>
  );
}

export default Header;
