import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { HiOutlineX, HiMoon, HiSun, HiHome, HiChip, HiChat, HiInformationCircle, HiClipboardList } from 'react-icons/hi';
import { IoReorderThreeOutline } from 'react-icons/io5';
import { FaVimeoSquare } from 'react-icons/fa';
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';

const links = [
  { label: 'Home', to: '/', icon: HiHome },
  { label: 'DSA Practice', to: '/dsa', icon: HiChip },
  { label: 'Ask AI', to: '/askAi', icon: HiChat },
  { label: 'Interview Experience', to: '/interview-expereience', icon: HiClipboardList },
  { label: 'Todo', to: '/todo', icon: HiClipboardList },
  { label: 'About', to: '/about', icon: HiInformationCircle },
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
        : 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm'
    }`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 py-3">
        {/* Logo */}
        <NavLink 
          to="/" 
          className="flex items-center space-x-2 transition-transform hover:scale-105"
          onClick={handleLinkClick}
        >
          <FaVimeoSquare className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
          <span className="text-xl font-bold text-gray-800 dark:text-white">
            AlgoVik
          </span>
        </NavLink>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex items-center space-x-1">
          {links.map(({ label, to, icon: Icon }) => (
            <li key={label}>
              <NavLink
                to={to}
                className={({ isActive }) =>
                  `flex items-center space-x-1 px-4 py-2 rounded-xl font-medium text-sm transition-all ${
                    isActive 
                      ? 'bg-indigo-600 text-white shadow-md' 
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
            className="p-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200"
            aria-label="Toggle dark mode"
          >
            {darkMode ? <HiSun className="h-5 w-5" /> : <HiMoon className="h-5 w-5" />}
          </button>

          <SignedOut>
            <SignInButton mode="modal">
              <button className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-medium transition-all duration-300 shadow-md">
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
                    avatarBox: "w-9 h-9 border-2 border-indigo-100 dark:border-indigo-900/50",
                  },
                }}
              />

              <NavLink to="/deshboard">
                <button className="px-4 py-2 text-sm font-medium rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white shadow-md transition-all duration-300">
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
            className="p-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300"
            aria-label="Toggle dark mode"
          >
            {darkMode ? <HiSun className="h-5 w-5" /> : <HiMoon className="h-5 w-5" />}
          </button>
          
          <button
            ref={buttonRef}
            onClick={toggleMenu}
            className="p-2 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
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
                  `flex items-center space-x-3 px-4 py-3 rounded-xl font-medium transition-all ${
                    isActive 
                      ? 'bg-indigo-600 text-white' 
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
                  className="w-full px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-medium transition-all duration-300 shadow-md"
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
                  <button className="px-4 py-2 text-sm font-medium rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white shadow-md transition-all duration-300">
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
