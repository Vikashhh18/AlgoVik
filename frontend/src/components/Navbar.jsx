import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { HiOutlineX } from 'react-icons/hi';
import { IoReorderThreeOutline } from 'react-icons/io5';
import { FaVimeoSquare } from 'react-icons/fa';
import { SignedIn, SignedOut, SignInButton, useClerk, UserButton } from '@clerk/clerk-react';

const links = [
  { label: 'Home', to: '/' },
  { label: 'DSA', to: '/dsa' },
  { label: 'About', to: '/about' },
  { label: 'Notes', to: '/notes' },
  { label: 'Todo-list', to: '/todo' }
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { user } = useClerk();

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-sm shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
      
        <NavLink to="/" className="flex items-center space-x-2">
          <FaVimeoSquare className="h-8 w-8 text-indigo-600" />
          <span className="text-xl font-semibold text-gray-800">algoVik</span>
        </NavLink>

        <ul className="hidden md:flex items-center space-x-6 text-gray-700">
          {links.map(({ label, to }) => (
            <li key={label}>
              <NavLink
                to={to}
                className={({ isActive }) =>
                  `font-medium text-lg transition-colors ${
                    isActive ? 'text-indigo-600 underline' : 'hover:text-indigo-600'
                  }`
                }
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="hidden md:flex items-center gap-3">
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

    <span className="text-gray-700 ">|</span>

    <NavLink to="/deshboard">
      <button className="px-4 py-2 text-sm font-medium rounded-full bg-indigo-600 text-white shadow-md hover:bg-indigo-700 transition-all duration-200">
        Student Dashboard
      </button>
    </NavLink>
  </div>
</SignedIn>
        </div>

        <button
          onClick={() => setOpen((o) => !o)}
          className="md:hidden text-gray-700"
          aria-label="Toggle menu"
        >
          {open ? <HiOutlineX className="h-8 w-8" /> : <IoReorderThreeOutline className="h-8 w-8" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-white/95 animate-slide-down">
          <ul className="flex flex-col space-y-4 px-6 py-4 text-gray-700">
            {links.map(({ label, to }) => (
              <li key={label}>
                <NavLink
                  to={to}
                  onClick={() => setOpen(false)}
                  className="block font-medium text-lg hover:text-indigo-600 transition"
                >
                  {label}
                </NavLink>
              </li>
            ))}

            <li className="pt-2">
              <SignedOut>
                <SignInButton mode="modal">
                  <button className="w-full px-6 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition shadow-md">
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
                    <button className="text-xs rounded bg-indigo-500 text-white py-2 px-3 hover:bg-indigo-600 transition">
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
