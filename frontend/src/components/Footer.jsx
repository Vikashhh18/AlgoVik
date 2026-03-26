/**
 * Footer.jsx
 *
 * Site-wide footer with brand, quick links, resources, and email newsletter.
 * All link lists are data-driven for easy extension.
 */

import React from "react";
import { Link } from "react-router-dom";
import { FaGithub, FaTwitter, FaLinkedin, FaVimeoSquare } from "react-icons/fa";

// ─────────────────────────────────────────────────────────────────────────────
// Config
// ─────────────────────────────────────────────────────────────────────────────

const QUICK_LINKS = [
  { label: "Home",             to: "/"         },
  { label: "DSA Library",      to: "/dsa"      },
  { label: "Notes",            to: "/notes"    },
  { label: "Mock Interviews",  to: "/mockhub"  },
];

const RESOURCE_LINKS = [
  { label: "Blog",          to: "/" },
  { label: "FAQs",          to: "/" },
  { label: "Community",     to: "/" },
  { label: "Documentation", to: "/" },
];

const SOCIAL_LINKS = [
  { icon: <FaGithub />,   href: "https://github.com/Vikashhh18",                      label: "GitHub"   },
  { icon: <FaTwitter />,  href: "https://twitter.com",                                label: "Twitter"  },
  { icon: <FaLinkedin />, href: "https://www.linkedin.com/in/vikash-sharma-080907288", label: "LinkedIn" },
];

// ─────────────────────────────────────────────────────────────────────────────
// Sub-components
// ─────────────────────────────────────────────────────────────────────────────

/** Small column header used in link sections. */
function ColHeader({ children }) {
  return (
    <h4 className="text-xs font-semibold text-gray-300 uppercase tracking-widest mb-4">
      {children}
    </h4>
  );
}

/** Link list column. */
function LinkList({ links }) {
  return (
    <ul className="space-y-2.5">
      {links.map(({ label, to }) => (
        <li key={label}>
          <Link
            to={to}
            className="text-sm text-gray-500 hover:text-white transition-colors duration-200"
          >
            {label}
          </Link>
        </li>
      ))}
    </ul>
  );
}

/** Newsletter subscribe form. */
function NewsletterForm() {
  // In a real app this would submit to an email service.
  const handleSubmit = (e) => e.preventDefault();

  return (
    <form onSubmit={handleSubmit} className="flex gap-2" noValidate>
      <input
        type="email"
        placeholder="you@email.com"
        aria-label="Email address for newsletter"
        required
        className="flex-1 min-w-0 px-3 py-2 text-sm rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-600 focus:outline-none focus:border-indigo-500 transition-colors"
      />
      <button
        type="submit"
        className="px-4 py-2 rounded-lg text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-500 transition-colors flex-shrink-0"
      >
        Join
      </button>
    </form>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Main component
// ─────────────────────────────────────────────────────────────────────────────

export default function Footer() {
  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-gray-400">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        {/* Main grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 py-14">

          {/* Brand column */}
          <div className="lg:col-span-1">
            <Link to="/" className="inline-flex items-center gap-2 mb-4 group">
              <FaVimeoSquare className="h-5 w-5 text-indigo-400 group-hover:text-indigo-300 transition-colors" aria-hidden="true" />
              <span className="text-lg font-bold text-white group-hover:text-indigo-300 transition-colors">
                AlgoVik
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-gray-500">
              Master data structures and algorithms with curated resources,
              mock interviews, and community support.
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-3 mt-5">
              {SOCIAL_LINKS.map(({ icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-8 h-8 rounded-lg bg-gray-800 hover:bg-indigo-600 text-gray-400 hover:text-white flex items-center justify-center transition-all duration-200 text-sm"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <ColHeader>Quick Links</ColHeader>
            <LinkList links={QUICK_LINKS} />
          </div>

          {/* Resources */}
          <div>
            <ColHeader>Resources</ColHeader>
            <LinkList links={RESOURCE_LINKS} />
          </div>

          {/* Newsletter */}
          <div>
            <ColHeader>Stay Updated</ColHeader>
            <p className="text-sm text-gray-500 mb-4">
              Get tips, problems, and resources straight to your inbox.
            </p>
            <NewsletterForm />
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-800 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-600">
            © {new Date().getFullYear()} AlgoVik. All rights reserved.
          </p>
          <p className="text-xs text-gray-600">
            Made with ❤️ for the developer community
          </p>
        </div>
      </div>
    </footer>
  );
}