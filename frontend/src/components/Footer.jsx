import React from 'react'
import { FaGithub, FaTwitter, FaLinkedin, FaVimeoSquare } from 'react-icons/fa'

export default function Footer() {
  return (
    <footer className="bg-gray-800 dark:bg-gray-900 text-gray-300 pt-12">
      <div className="max-w-6xl mx-auto px-4">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-8">
          {/* Brand Section */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <FaVimeoSquare className="h-6 w-6 text-indigo-400" />
              <h3 className="text-2xl font-bold text-white">AlgoVik</h3>
            </div>
            <p className="text-gray-400 leading-relaxed">
              Master data structures and algorithms with curated resources, mock interviews, and community support.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-3">
              <li><a href="/" className="hover:text-white transition-colors duration-300">Home</a></li>
              <li><a href="/dsa" className="hover:text-white transition-colors duration-300">DSA Library</a></li>
              <li><a href="/notes" className="hover:text-white transition-colors duration-300">Notes</a></li>
              <li><a href="/mockhub" className="hover:text-white transition-colors duration-300">Mock Interviews</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Resources</h4>
            <ul className="space-y-3">
              <li><a href="/" className="hover:text-white transition-colors duration-300">Blog</a></li>
              <li><a href="/" className="hover:text-white transition-colors duration-300">FAQs</a></li>
              <li><a href="/" className="hover:text-white transition-colors duration-300">Community</a></li>
              <li><a href="/" className="hover:text-white transition-colors duration-300">Documentation</a></li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Connect</h4>
            <div className="flex space-x-4 mb-6">
              <a 
                href="https://github.com/Vikashhh18" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-white transition-colors duration-300"
                aria-label="GitHub"
              >
                <FaGithub className="h-5 w-5" />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-white transition-colors duration-300"
                aria-label="Twitter"
              >
                <FaTwitter className="h-5 w-5" />
              </a>
              <a 
                href="https://www.linkedin.com/in/vikash-sharma-080907288" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-white transition-colors duration-300"
                aria-label="LinkedIn"
              >
                <FaLinkedin className="h-5 w-5" />
              </a>
            </div>
            <p className="text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} AlgoVik. All rights reserved.
            </p>
          </div>
        </div>

        {/* Bottom Border */}
        <div className="border-t border-gray-700 pt-6 pb-6">
          <p className="text-center text-gray-400 text-sm">
            Made with ❤️ for the developer community
          </p>
        </div>
      </div>
    </footer>
  )
}