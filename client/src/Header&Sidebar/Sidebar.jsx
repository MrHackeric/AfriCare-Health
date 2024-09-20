import React, { useState, useEffect, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { FaTachometerAlt, FaComments, FaUsers, FaExclamationTriangle, FaMap } from "react-icons/fa"; // Importing the FaTachometerAlt icon
import SidebarLinkGroup from "./SidebarLinkGroup";

function Sidebar({
  sidebarOpen,
  setSidebarOpen,
  variant = 'default',
}) {
  const location = useLocation();
  const { pathname } = location;

  const trigger = useRef(null);
  const sidebar = useRef(null);

  const storedSidebarExpanded = localStorage.getItem("sidebar-expanded");
  const [sidebarExpanded, setSidebarExpanded] = useState(storedSidebarExpanded === null ? false : storedSidebarExpanded === "true");

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!sidebar.current || !trigger.current) return;
      if (!sidebarOpen || sidebar.current.contains(target) || trigger.current.contains(target)) return;
      setSidebarOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  useEffect(() => {
    localStorage.setItem("sidebar-expanded", sidebarExpanded);
    if (sidebarExpanded) {
      document.querySelector("body").classList.add("sidebar-expanded");
    } else {
      document.querySelector("body").classList.remove("sidebar-expanded");
    }
  }, [sidebarExpanded]);

  return (
    <div className="min-w-fit">
      {/* Sidebar backdrop (mobile only) */}
      <div
        className={`fixed inset-0 bg-gray-900 bg-opacity-30 z-40 lg:hidden lg:z-auto transition-opacity duration-200 ${
          sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden="true"
      ></div>

      {/* Sidebar */}
      <div
        id="sidebar"
        ref={sidebar}
        className={`flex lg:!flex flex-col absolute z-40 left-0 top-0 lg:static lg:left-auto lg:top-auto lg:translate-x-0 h-[100dvh] overflow-y-scroll lg:overflow-y-auto no-scrollbar w-64 lg:w-20 lg:sidebar-expanded:!w-64 2xl:!w-64 shrink-0 bg-gradient-to-r from-pink-100 to-pink-200 p-4 transition-all duration-200 ease-in-out ${sidebarOpen ? "translate-x-0" : "-translate-x-64"} ${variant === 'v2' ? 'border-r border-gray-200 dark:border-gray-700/60' : 'rounded-r-2xl shadow-sm'}`}
      >
        {/* Sidebar header */}
        <div className="flex justify-between mb-10 pr-3 sm:px-2">
          {/* Close button */}
          <button
            ref={trigger}
            className="lg:hidden text-gray-500 hover:text-gray-400"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-controls="sidebar"
            aria-expanded={sidebarOpen}
          >
            <span className="sr-only">Close sidebar</span>
            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M10.7 18.7l1.4-1.4L7.8 13H20v-2H7.8l4.3-4.3-1.4-1.4L4 12z" />
            </svg>
          </button>
          <img src="src/images/AfriCare.png" width={100} height={100}/>
        </div>

        {/* Links */}
        <div className="space-y-8">
          {/* Pages group */}
          <div>
            <h3 className="text-xs uppercase text-pink-800 font-semibold pl-3">
              <span className="hidden lg:block lg:sidebar-expanded:hidden 2xl:hidden text-center w-6" aria-hidden="true">
                •••
              </span>
              <span className="lg:hidden lg:sidebar-expanded:block 2xl:block">Pages</span>
            </h3>
            <ul className="mt-3">

              {/* Dashboard */}
              <li className="pl-4 pr-3 py-3 rounded-xl mb-1 last:mb-0 bg-pink-900">
                <NavLink
                  end
                  to="/Dashboard"
                  className="block text-white truncate transition duration-200"
                >
                  <div className="flex items-center">
                    {/* Replaced the SVG with react-icons FaTachometerAlt */}
                    <FaTachometerAlt
                      className="shrink-0 text-white"
                      size={16} // Setting size as 16 to match the previous icon
                    />
                    <span className="w-48 h-8 rounded-full px-4 py-1">
                      Dashboard
                    </span>
                  </div>
                </NavLink>
              </li>

             {/* Chatbot */}
            <li className={`pl-4 pr-3 py-3 rounded-xl mb-1 last:mb-0 bg-pink-800`}>
              <NavLink
                end
                to="/Chatbot"
                className={`flex items-center text-white truncate transition duration-150`}
              >
                {/* Replaced the SVG with react-icons FaComments */}
                <FaComments
                  className="shrink-0 text-white"
                  size={16} // Setting size to 16 to match the original icon
                />
                <span className="w-48 h-8 rounded-full px-4 py-1">
                  Chatbot
                </span>
              </NavLink>
            </li>

            {/* Community */}
            <li className={`pl-4 pr-3 py-3 rounded-xl mb-1 last:mb-0 bg-pink-800`}>
              <NavLink
                end
                to="/Community"
                className={`flex items-center text-white truncate transition duration-150`}
              >
                {/* Replaced the SVG with react-icons FaUsers */}
                <FaUsers
                  className="shrink-0 text-white"
                  size={16} // Setting size to 16 to match the original icon
                />
                <span className="w-48 h-8 rounded-full px-4 py-1">
                Community
                </span>
              </NavLink>
            </li>

            {/* Emergency Page */}
            <li className={`pl-4 pr-3 py-3 rounded-xl mb-1 last:mb-0 bg-pink-800`}>
              <NavLink
                end
                to="/EmergencyPage"
                className={`flex items-center text-white truncate transition duration-150`}
              >
                {/* Replaced the SVG with react-icons FaExclamationTriangle */}
                <FaExclamationTriangle
                  className="shrink-0 text-white"
                  size={16} // Setting size to 16 to match the original icon
                />
                <span className="w-48 h-8 rounded-full px-4 py-1">
                Emergency Page
                </span>
              </NavLink>
            </li>

            {/* Maps Page */}
            <li className={`pl-4 pr-3 py-3 rounded-xl mb-1 last:mb-0 bg-pink-900`}>
              <NavLink
                end
                to="/MapsPage"
                className={`flex items-center text-white truncate transition duration-150`}
              >
                {/* Replaced the SVG with react-icons FaMap */}
                <FaMap
                  className="shrink-0 text-white"
                  size={16} // Setting size to 16 to match the original icon
                />
                <span className="w-48 h-8 rounded-full px-4 py-1">
                Maps Page
                </span>
              </NavLink>
            </li>

              {/* Settings */}
                <SidebarLinkGroup activecondition={pathname.includes("settings")}>
                  {(handleClick, open) => {
                    return (
                      <React.Fragment>
                        <a
                          href="#0"
                          className={`block text-pink-700 dark:text-pink-200 truncate transition duration-150 ${
                            pathname.includes("settings") ? "" : "hover:text-pink-600 dark:hover:text-pink-100"
                          }`}
                          onClick={(e) => {
                            e.preventDefault();
                            handleClick();
                            setSidebarExpanded(true);
                          }}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <svg className={`shrink-0 fill-current ${pathname.includes('settings') ? 'text-pink-800' : 'text-pink-800'}`} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                                <path d="M10.5 1a3.502 3.502 0 0 1 3.355 2.5H15a1 1 0 1 1 0 2h-1.145a3.502 3.502 0 0 1-6.71 0H1a1 1 0 0 1 0-2h6.145A3.502 3.502 0 0 1 10.5 1ZM9 4.5a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM5.5 9a3.502 3.502 0 0 1 3.355 2.5H15a1 1 0 1 1 0 2H8.855a3.502 3.502 0 0 1-6.71 0H1a1 1 0 1 1 0-2h1.145A3.502 3.502 0 0 1 5.5 9ZM4 12.5a1.5 1.5 0 1 0 3 0 1.5 1.5 0 0 0-3 0Z" fillRule="evenodd" />
                              </svg>
                              <span className="text-sm text-pink-800 font-medium ml-4 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                Settings
                              </span>
                            </div>
                            {/* Icon */}
                            <div className="flex shrink-0 ml-2">
                              <svg className={`w-3 h-3 shrink-0 ml-1 fill-current text-pink-800 ${open && "rotate-180"}`} viewBox="0 0 12 12">
                                <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                              </svg>
                            </div>
                          </div>
                        </a>
                        <div className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                          <ul className={`pl-8 mt-1 ${!open && "hidden"}`}>
                            <li className="mb-1 last:mb-0">
                              <NavLink
                                end
                                to="/Account"
                                className={({ isActive }) =>
                                  "block transition duration-150 truncate " + (isActive ? "text-pink-600" : "text-pink-600 hover:text-pink-900")
                                }
                              >
                                <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                  My Account
                                </span>
                              </NavLink>
                            </li>
                          </ul>
                        </div>
                      </React.Fragment>
                    );
                  }}
                </SidebarLinkGroup>
            </ul>
          </div>
        </div>

        {/* Expand / collapse button */}
        <div className="pt-3 hidden lg:inline-flex 2xl:hidden justify-end mt-auto">
          <div className="w-12 pl-4 pr-3 py-2">
            <button className="text-pink-800 hover:text-pink-800" onClick={() => setSidebarExpanded(!sidebarExpanded)}>
              <span className="sr-only">Expand / collapse sidebar</span>
              <svg className="shrink-0 fill-current text-pink-800 sidebar-expanded:rotate-180" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                <path d="M15 16a1 1 0 0 1-1-1V1a1 1 0 1 1 2 0v14a1 1 0 0 1-1 1ZM8.586 7H1a1 1 0 1 0 0 2h7.586l-2.793 2.793a1 1 0 1 0 1.414 1.414l4.5-4.5A.997.997 0 0 0 12 8.01M11.924 7.617a.997.997 0 0 0-.217-.324l-4.5-4.5a1 1 0 0 0-1.414 1.414L8.586 7M12 7.99a.996.996 0 0 0-.076-.373Z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
