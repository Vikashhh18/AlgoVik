import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { HiOutlineX, HiMoon, HiSun } from 'react-icons/hi';
import { IoReorderThreeOutline } from 'react-icons/io5';
import { FaVimeoSquare } from 'react-icons/fa';
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';

const links = [
  { label: 'Home', to: '/' },
  { label: 'DSA', to: '/dsa' },
  { label: "Ask Ai", to: "/interview" },
  { label: 'About', to: '/about' },
  { label: 'Todo-list', to: '/todo' }
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    // Initialize with the stored preference, default to light mode
    return localStorage.getItem('darkMode') === 'true';
  });

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (open && !event.target.closest('nav')) {
        setOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [open]);


  // Apply dark mode on mount and when it changes
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
      
        <NavLink to="/" className="flex items-center space-x-2">
          <FaVimeoSquare className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
          <span className="text-xl font-semibold text-gray-800 dark:text-white">algoVik</span>
        </NavLink>

        <ul className="hidden md:flex items-center space-x-6 text-gray-700 dark:text-gray-300">
          {links.map(({ label, to }) => (
            <li key={label}>
              <NavLink
                to={to}
                className={({ isActive }) =>
                  `font-medium text-lg transition-colors ${
                    isActive 
                      ? 'text-indigo-600 dark:text-indigo-400 underline' 
                      : 'hover:text-indigo-600 dark:hover:text-indigo-400'
                  }`
                }
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="hidden md:flex items-center gap-4">
          {/* Dark mode toggle button */}
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-yellow-300 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            aria-label="Toggle dark mode"
          >
            {darkMode ? <HiSun className="h-5 w-5" /> : <HiMoon className="h-5 w-5" />}
          </button>

          <SignedOut>
            <SignInButton mode="modal">
              <button className="px-6 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition shadow-md">
                Get Started
              </button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <div className="flex items-center space-x-3">
              <UserButton
                afterSignOutUrl="/"
                appearance={{
                  elements: {
                    avatarBox: "w-9 h-9",
                  },
                }}
              />

              <span className="text-gray-700 dark:text-gray-300">|</span>

              <NavLink to="/deshboard">
                <button className="px-4 py-2 text-sm font-medium rounded-full bg-indigo-600 text-white shadow-md hover:bg-indigo-700 transition-all duration-200">
                  Student Dashboard
                </button>
              </NavLink>
            </div>
          </SignedIn>
        </div>

        <div className="flex md:hidden items-center gap-4">
          {/* Mobile dark mode toggle */}
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-yellow-300 tap-highlight-transparent"
            aria-label="Toggle dark mode"
          >
            {darkMode ? <HiSun className="h-5 w-5" /> : <HiMoon className="h-5 w-5" />}
          </button>
          
          <button
            onClick={() => setOpen((o) => !o)}
            className="text-gray-700 dark:text-gray-300 tap-highlight-transparent"
            aria-label="Toggle menu"
          >
            {open ? <HiOutlineX className="h-8 w-8" /> : <IoReorderThreeOutline className="h-8 w-8" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden bg-white/95 dark:bg-gray-900/95 animate-slide-down">
          <ul className="flex flex-col space-y-4 px-6 py-4 text-gray-700 dark:text-gray-300">
            {links.map(({ label, to }) => (
              <li key={label}>
                <NavLink
                  to={to}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `block font-medium text-lg transition tap-highlight-transparent ${
                      isActive 
                        ? 'text-indigo-600 dark:text-indigo-400' 
                        : 'hover:text-indigo-600 dark:hover:text-indigo-400'
                    }`
                  }
                >
                  {label}
                </NavLink>
              </li>
            ))}

            <li className="pt-2 border-t border-gray-200 dark:border-gray-700">
              <SignedOut>
                <SignInButton mode="modal">
                  <button className="w-full px-6 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition shadow-md tap-highlight-transparent">
                    Get Started
                  </button>
                </SignInButton>
              </SignedOut>

              <SignedIn>
                <div className="flex items-center gap-3 mt-2">
                  <UserButton
                    afterSignOutUrl="/"
                    appearance={{
                      elements: {
                        avatarBox: "w-9 h-9",
                      },
                    }}
                  />
                  <NavLink to="/deshboard" onClick={() => setOpen(false)}>
                    <button className="text-xs rounded bg-indigo-500 text-white py-2 px-3 hover:bg-indigo-600 transition tap-highlight-transparent">
                      Student Dashboard
                    </button>
                  </NavLink>
                </div>
              </SignedIn>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}