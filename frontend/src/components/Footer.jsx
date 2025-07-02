import React from 'react'
import { FaGithub, FaTwitter, FaLinkedin, FaVimeoSquare } from 'react-icons/fa'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-12">
      <div className="max-w-screen-2xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 pb-8">
      
        <div>
          <div className="flex gap-2">
          <FaVimeoSquare className="h-8 w-6 text-indigo-600" />
          <h3 className="text-2xl font-bold text-white"> algoVik</h3>
          </div>
          <p className="mt-2 text-gray-400">
            Empowering your journey through data structures and algorithms with Quick Notes and mock interview.
          </p>
        </div>

        <div>
          <h4 className="text-xl font-semibold text-white mb-4">Quick Links</h4>
          <ul className="space-y-2">
            <li><a href="/" className="hover:text-white transition">Home</a></li>
            <li><a href="/dsa" className="hover:text-white transition">DSA Library</a></li>
            <li><a href="/notes" className="hover:text-white transition">Notes</a></li>
            <li><a href="/mock-interview" className="hover:text-white transition">Mock Interview Hub</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xl font-semibold text-white mb-4">Resources</h4>
          <ul className="space-y-2">
            <li><a href="/blog" className="hover:text-white transition">Blog</a></li>
            <li><a href="/faqs" className="hover:text-white transition">FAQs</a></li>
            <li><a href="/community" className="hover:text-white transition">Community Forum</a></li>
            <li><a href="/docs" className="hover:text-white transition">Documentation</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xl font-semibold text-white mb-4">Connect with Us</h4>
          <div className="flex space-x-4 mb-4">
            <a href="https://github.com/your-repo" aria-label="GitHub" className="hover:text-white transition"><FaGithub className="h-6 w-6" /></a>
            <a href="https://twitter.com/your-handle" aria-label="Twitter" className="hover:text-white transition"><FaTwitter className="h-6 w-6" /></a>
            <a href="https://linkedin.com/company/your-page" aria-label="LinkedIn" className="hover:text-white transition"><FaLinkedin className="h-6 w-6" /></a>
          </div>
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} algoVik. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
