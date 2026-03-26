/**
 * Navbar.jsx
 *
 * Improved to blend with page sections:
 * - Transparent at top, transitions to solid on scroll
 * - Border fades in on scroll (not always visible)
 * - Background matches section bg (white/gray-950) so it doesn't feel disconnected
 * - Subtle page-edge shadow only when scrolled
 */

import React, { useState, useEffect, useRef, useCallback } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  HiOutlineX, HiMoon, HiSun, HiHome, HiChip, HiChat,
  HiInformationCircle, HiClipboardList,
} from "react-icons/hi";
import { IoReorderThreeOutline } from "react-icons/io5";
import { FaVimeoSquare, FaRobot, FaArrowRight } from "react-icons/fa";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";

const NAV_LINKS = [
  { label: "Home",         to: "/",                     icon: HiHome             },
  { label: "DSA Practice", to: "/dsa",                  icon: HiChip             },
  { label: "Ask AI",       to: "/askAi",                icon: HiChat             },
  { label: "Experiences",  to: "/interview-expereience",icon: HiClipboardList    },
  { label: "Todo",         to: "/todo",                 icon: HiClipboardList    },
  { label: "About",        to: "/about",                icon: HiInformationCircle },
];

function NavItem({ to, icon: Icon, label, onClick }) {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        `flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors duration-150
        ${isActive
          ? "bg-indigo-600 text-white"
          : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
        }`
      }
    >
      <Icon className="h-3.5 w-3.5 flex-shrink-0" aria-hidden="true" />
      {label}
    </NavLink>
  );
}

function AIRoadmapButton({ onClick, className = "", children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group relative flex items-center gap-2 rounded-full text-white font-semibold
        transition-all duration-300 hover:scale-105 active:scale-95 overflow-hidden ${className}`}
      style={{
        background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
        boxShadow: "0 0 12px rgba(99,102,241,0.4), 0 0 24px rgba(139,92,246,0.15)",
      }}
    >
      <span
        aria-hidden="true"
        className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 pointer-events-none"
        style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent)" }}
      />
      {children}
    </button>
  );
}

function IconButton({ onClick, label, children, refProp }) {
  return (
    <button
      ref={refProp}
      type="button"
      onClick={onClick}
      aria-label={label}
      className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
    >
      {children}
    </button>
  );
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled,  setScrolled]  = useState(false);
  const [darkMode,  setDarkMode]  = useState(
    () => localStorage.getItem("darkMode") === "true"
  );

  const location = useLocation();
  const navigate  = useNavigate();
  const menuRef   = useRef(null);
  const btnRef    = useRef(null);

  useEffect(() => { setMenuOpen(false); }, [location]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const handler = (e) => {
      if (
        menuRef.current?.contains(e.target) === false &&
        btnRef.current?.contains(e.target) === false
      ) setMenuOpen(false);
    };
    document.addEventListener("mousedown", handler);
    document.addEventListener("touchstart", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("touchstart", handler);
    };
  }, [menuOpen]);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  const toggleDark  = useCallback(() => setDarkMode((d) => !d), []);
  const toggleMenu  = useCallback(() => setMenuOpen((o) => !o), []);
  const closeMenu   = useCallback(() => setMenuOpen(false), []);
  const goToRoadmap = useCallback(() => navigate("/generate-roadmap"), [navigate]);

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300
        ${scrolled
          /* scrolled: solid bg that matches page sections + subtle bottom border */
          ? "bg-white dark:bg-gray-950 shadow-[0_1px_0_0_rgba(0,0,0,0.06)] dark:shadow-[0_1px_0_0_rgba(255,255,255,0.04)] backdrop-blur-md"
          /* top of page: fully transparent — section bg shows through */
          : "bg-transparent"
        }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 lg:px-12 h-14">

        {/* Logo */}
        <NavLink to="/" className="flex items-center gap-2 group flex-shrink-0">
          <FaVimeoSquare className="h-5 w-5 text-indigo-600 dark:text-indigo-400" aria-hidden="true" />
          <span className="text-base font-bold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
            AlgoVik
          </span>
        </NavLink>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-0.5" role="list">
          {NAV_LINKS.map(({ label, to, icon }) => (
            <li key={label}>
              <NavItem to={to} icon={icon} label={label} />
            </li>
          ))}
        </ul>

        {/* Desktop right */}
        <div className="hidden md:flex items-center gap-2">
          <AIRoadmapButton onClick={goToRoadmap} className="px-4 py-1.5 text-sm">
            <span className="relative z-10 flex items-center justify-center w-5 h-5 rounded-full bg-white/20">
              <FaRobot className="text-[10px]" aria-hidden="true" />
            </span>
            <span className="relative z-10 whitespace-nowrap">AI Roadmap</span>
            <span className="relative z-10 flex items-center justify-center w-4 h-4 rounded-full bg-white/20 group-hover:bg-white/30 transition-colors">
              <FaArrowRight className="text-[8px] group-hover:translate-x-0.5 transition-transform duration-200" aria-hidden="true" />
            </span>
          </AIRoadmapButton>

          <IconButton onClick={toggleDark} label="Toggle dark mode">
            {darkMode
              ? <HiSun  className="h-4 w-4" aria-hidden="true" />
              : <HiMoon className="h-4 w-4" aria-hidden="true" />
            }
          </IconButton>

          <SignedOut>
            <SignInButton mode="modal">
              <button
                type="button"
                className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition-colors shadow-sm"
              >
                Get Started
              </button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <div className="flex items-center gap-2">
              <UserButton
                afterSignOutUrl="/"
                appearance={{ elements: { avatarBox: "w-8 h-8 border-2 border-indigo-100 dark:border-indigo-900/50" } }}
              />
              <NavLink
                to="/dashboard"
                className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition-colors shadow-sm"
              >
                Dashboard
              </NavLink>
            </div>
          </SignedIn>
        </div>

        {/* Mobile controls */}
        <div className="flex md:hidden items-center gap-1.5">
          <AIRoadmapButton onClick={goToRoadmap} className="px-3 py-1.5 text-xs gap-1.5">
            <FaRobot className="text-[10px] relative z-10" aria-hidden="true" />
            <span className="relative z-10">AI Roadmap</span>
          </AIRoadmapButton>

          <IconButton onClick={toggleDark} label="Toggle dark mode">
            {darkMode
              ? <HiSun  className="h-4 w-4" aria-hidden="true" />
              : <HiMoon className="h-4 w-4" aria-hidden="true" />
            }
          </IconButton>

          <IconButton onClick={toggleMenu} label="Toggle menu" refProp={btnRef}>
            {menuOpen
              ? <HiOutlineX            className="h-5 w-5" aria-hidden="true" />
              : <IoReorderThreeOutline className="h-5 w-5" aria-hidden="true" />
            }
          </IconButton>
        </div>
      </div>

      {/* Mobile dropdown */}
      <div
        ref={menuRef}
        className={`md:hidden border-t border-gray-100 dark:border-gray-800
          bg-white dark:bg-gray-950 backdrop-blur-lg overflow-hidden transition-all duration-250
          ${menuOpen ? "max-h-[420px] opacity-100" : "max-h-0 opacity-0"}`}
        aria-hidden={!menuOpen}
      >
        <ul className="flex flex-col gap-0.5 px-4 py-3" role="list">
          {NAV_LINKS.map(({ label, to, icon }) => (
            <li key={label}>
              <NavItem to={to} icon={icon} label={label} onClick={closeMenu} />
            </li>
          ))}

          <li className="pt-2 mt-1 border-t border-gray-100 dark:border-gray-800">
            <SignedOut>
              <SignInButton mode="modal">
                <button
                  type="button"
                  onClick={closeMenu}
                  className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-xl transition-colors"
                >
                  Get Started
                </button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <div className="flex items-center justify-between px-1">
                <UserButton afterSignOutUrl="/" appearance={{ elements: { avatarBox: "w-9 h-9" } }} />
                <NavLink
                  to="/dashboard"
                  onClick={closeMenu}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-xl transition-colors"
                >
                  Dashboard
                </NavLink>
              </div>
            </SignedIn>
          </li>
        </ul>
      </div>
    </nav>
  );
}