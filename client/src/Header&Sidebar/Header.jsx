import React, { useState } from 'react';
import Help from './DropdownHelp';
import UserMenu from './DropdownProfile';

function Header({
  sidebarOpen,
  setSidebarOpen,
  variant = 'default',
}) {

  return (
    <header className={`sticky top-0 before:absolute before:inset-0 before:backdrop-blur-lg before:bg-pink-50/70 before:-z-10 z-30 shadow-md rounded-b-lg transition-all ${variant === 'v2' || variant === 'v3' ? 'before:bg-pink-200/80 after:absolute after:h-px after:inset-x-0 after:top-full after:bg-gray-200 dark:after:bg-gray-700/60 after:-z-10' : 'before:bg-pink-100/90 dark:before:bg-gray-900/90'} ${variant === 'v2' ? 'dark:before:bg-gray-800' : ''} ${variant === 'v3' ? 'dark:before:bg-gray-900' : ''}`}>

      <div className="px-4 sm:px-6 lg:px-8">
        <div className={`flex items-center justify-between h-16 ${variant === 'v2' || variant === 'v3' ? '' : 'lg:border-b border-gray-200 dark:border-gray-700/60'}`}>
          
          {/* Header: Left side */}
          <div className="flex items-center space-x-4">
            {/* Hamburger button */}
            <button
              className="text-pink-500 hover:text-pink-700 transition-colors duration-300 lg:hidden"
              aria-controls="sidebar"
              aria-expanded={sidebarOpen}
              onClick={(e) => { e.stopPropagation(); setSidebarOpen(!sidebarOpen); }}
            >
              <span className="sr-only">Open sidebar</span>
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <rect x="4" y="5" width="16" height="2" rx="2" />
                <rect x="4" y="11" width="16" height="2" rx="2" />
                <rect x="4" y="17" width="16" height="2" rx="2" />
              </svg>
            </button>
          </div>

          {/* Header: Right side */}
          <div className="flex items-center space-x-4">
            <Help align="right" />
            {/* Divider */}
            <div className="w-px h-6 bg-pink-200 dark:bg-gray-500"></div>
            <UserMenu align="right" />
          </div>

        </div>
      </div>
    </header>
  );
}

export default Header;
