import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { HiOutlineX, HiMoon, HiSun, HiHome, HiChip, HiChat, HiInformationCircle, HiClipboardList } from 'react-icons/hi';
import { IoReorderThreeOutline } from 'react-icons/io5';
import { FaVimeoSquare } from 'react-icons/fa';
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';

const links = [
  { label: 'Home', to: '/', icon: HiHome },
  { label: 'DSA', to: '/dsa', icon: HiChip },
  { label: "Ask AI", to: "/interview", icon: HiChat },
  { label: 'About', to: '/about', icon: HiInformationCircle },
  { label: 'Todo-list', to: '/todo', icon: HiClipboardList }
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('darkMode') === 'true';
  });
  const location = useLocation();
  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  // Close menu when route changes
  useEffect(() => {
    setOpen(false);
  }, [location]);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu when clicking outside or on a link
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (open && 
          menuRef.current && 
          !menuRef.current.contains(event.target) &&
          buttonRef.current &&
          !buttonRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
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

  // Toggle mobile menu
  const toggleMenu = () => {
    setOpen(prev => !prev);
  };

  // Close menu when a link is clicked
  const handleLinkClick = () => {
    setOpen(false);
  };

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-white/95 dark:bg-gray-900/95 shadow-lg backdrop-blur-md' 
        : 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm shadow-sm'
    }`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 py-3">
        {/* Logo */}
        <NavLink 
          to="/" 
          className="flex items-center space-x-2 transition-transform hover:scale-105 active:scale-95"
          onClick={handleLinkClick}
        >
          <div className="relative">
            <FaVimeoSquare className="h-7 w-7 text-indigo-600 dark:text-indigo-400" />
            <div className="absolute -inset-1 bg-indigo-100 dark:bg-indigo-900/30 rounded-full blur-sm opacity-50 -z-10"></div>
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
            algoVik
          </span>
        </NavLink>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex items-center space-x-1">
          {links.map(({ label, to, icon: Icon }) => (
            <li key={label}>
              <NavLink
                to={to}
                className={({ isActive }) =>
                  `flex items-center space-x-1 px-4 py-2 rounded-full font-medium text-sm transition-all ${
                    isActive 
                      ? 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 shadow-inner' 
                      : 'text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`
                }
              >
                <Icon className="h-4 w-4" />
                <span>{label}</span>
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Desktop Right Section */}
        <div className="hidden md:flex items-center gap-3">
          {/* Dark mode toggle button */}
          <button
            onClick={toggleDarkMode}
            className="p-2.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-yellow-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200 shadow-sm hover:shadow"
            aria-label="Toggle dark mode"
          >
            {darkMode ? <HiSun className="h-4 w-4" /> : <HiMoon className="h-4 w-4" />}
          </button>

          <SignedOut>
            <SignInButton mode="modal">
              <button className="px-5 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
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
                    avatarBox: "w-8 h-8 border-2 border-indigo-100 dark:border-indigo-900/50",
                  },
                }}
              />

              <NavLink to="/deshboard">
                <button className="px-4 py-2 text-sm font-medium rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 transform hover:-translate-y-0.5">
                  Dashboard
                </button>
              </NavLink>
            </div>
          </SignedIn>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-3">
          <button
            onClick={toggleDarkMode}
            className="p-2.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-yellow-300 tap-highlight-transparent"
            aria-label="Toggle dark mode"
          >
            {darkMode ? <HiSun className="h-4 w-4" /> : <HiMoon className="h-4 w-4" />}
          </button>
          
          <button
            ref={buttonRef}
            onClick={toggleMenu}
            className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors tap-highlight-transparent"
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            {open ? <HiOutlineX className="h-6 w-6" /> : <IoReorderThreeOutline className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div 
        ref={menuRef}
        className={`md:hidden bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg border-t border-gray-200 dark:border-gray-800 transition-all duration-300 ease-in-out overflow-hidden ${
          open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <ul className="flex flex-col space-y-1 px-4 py-3">
          {links.map(({ label, to, icon: Icon }) => (
            <li key={label}>
              <NavLink
                to={to}
                onClick={handleLinkClick}
                className={({ isActive }) =>
                  `flex items-center space-x-3 px-4 py-3 rounded-xl font-medium transition-all tap-highlight-transparent ${
                    isActive 
                      ? 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300' 
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`
                }
              >
                <Icon className="h-5 w-5" />
                <span>{label}</span>
              </NavLink>
            </li>
          ))}

          <li className="pt-3 mt-3 border-t border-gray-200 dark:border-gray-800">
            <SignedOut>
              <SignInButton mode="modal">
                <button 
                  onClick={handleLinkClick}
                  className="w-full px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-md tap-highlight-transparent"
                >
                  Get Started
                </button>
              </SignInButton>
            </SignedOut>

            <SignedIn>
              <div className="flex items-center justify-between">
                <UserButton
                  afterSignOutUrl="/"
                  appearance={{
                    elements: {
                      avatarBox: "w-10 h-10 border-2 border-indigo-100 dark:border-indigo-900/50",
                    },
                  }}
                />
                <NavLink to="/deshboard" onClick={handleLinkClick}>
                  <button className="px-4 py-2 text-sm font-medium rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md hover:from-indigo-700 hover:to-purple-700 transition-all duration-300">
                    Dashboard
                  </button>
                </NavLink>
              </div>
            </SignedIn>
          </li>
        </ul>
      </div>
    </nav>
  );
}