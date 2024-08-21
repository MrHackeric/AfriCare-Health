import React, { useState } from 'react';

import Help from './DropdownHelp';
import UserMenu from './DropdownProfile';

function Header({
  sidebarOpen,
  setSidebarOpen,
  variant = 'default',
}) {

  return (
    <header className={`sticky top-0 before:absolute before:inset-0 before:backdrop-blur-md max-lg:before:bg-white/90 before:-z-10 z-30 ${variant === 'v2' || variant === 'v3' ? 'before:bg-white after:absolute after:h-px after:inset-x-0 after:top-full after:bg-gray-200 after:-z-10' : 'max-lg:shadow-sm lg:before:bg-[#fff]'} ${variant === 'v2' ? '' : ''} ${variant === 'v3' ? '' : ''}`}>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className={`flex items-center justify-between h-16 ${variant === 'v2' || variant === 'v3' ? '' : 'lg:border-b border-[#a06e91]'}`}>
          {/* Header: Left side */}
          <div className="flex">
            {/* Hamburger button */}
            <button
              className="text-[#a06e91] hover:text-[#a06e91] lg:hidden"
              aria-controls="sidebar"
              aria-expanded={sidebarOpen}
              onClick={(e) => { e.stopPropagation(); setSidebarOpen(!sidebarOpen); }}
            >
              <span className="sr-only">Open sidebar</span>
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <rect x="4" y="5" width="16" height="2" />
                <rect x="4" y="11" width="16" height="2" />
                <rect x="4" y="17" width="16" height="2" />
              </svg>
            </button>
          </div>
          {/* Header: Right side */}
          <div className="flex items-center space-x-3">
            <Help align="right" />
            {/*  Divider */}
            <hr className="w-px h-6 bg-[#874c78] border-none" />
            <UserMenu align="right" />
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;