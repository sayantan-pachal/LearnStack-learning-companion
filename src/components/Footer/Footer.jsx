import React from 'react'
import { Github, Linkedin, Twitter, Mail } from "lucide-react"

function Footer() {
  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 dark:bg-black">
      <div className="max-w-7xl mx-auto px-6 py-12">

        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* Brand */}
          <div>
            <span className="flex flex-col items-start font-bold text-gray-900 dark:text-white leading-tight">
              <span className="text-xl">
                LearnStack
              </span>
              <span className="text-[11px] max-[900px]:text-[8px] text-gray-600 dark:text-gray-300 -mt-1">
                v.0.9.0
              </span>
            </span>
            <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
              LearnStack helps students master coding skills and access
              college-level learning resources in one place.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
              Resources
            </h3>
            <ul className="space-y-2 text-sm">
              <li className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white cursor-pointer">
                Courses
              </li>
              <li className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white cursor-pointer">
                Roadmaps
              </li>
              <li className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white cursor-pointer">
                Docs
              </li>
              <li className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white cursor-pointer">
                Practice
              </li>
            </ul>
          </div>

          {/* Community */}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
              Community
            </h3>
            <ul className="space-y-2 text-sm">
              <li className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white cursor-pointer">
                Blog
              </li>
              <li className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white cursor-pointer">
                Discord
              </li>
              <li className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white cursor-pointer">
                GitHub
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
              Connect
            </h3>
            <div className="flex space-x-4">
              <a className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white cursor-pointer">
                <Github className="w-5 h-5" />
              </a>
              <a className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white cursor-pointer">
                <Linkedin className="w-5 h-5" />
              </a>
              <a className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white cursor-pointer">
                <Twitter className="w-5 h-5" />
              </a>
              <a className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white cursor-pointer">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-10 pt-6 border-t border-gray-200 dark:border-gray-800
          flex flex-col md:flex-row items-center justify-between text-sm">
          <p className="text-gray-600 dark:text-gray-400">
            © {new Date().getFullYear()} LearnStack. All rights reserved.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <span className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white cursor-pointer">
              Privacy
            </span>
            <span className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white cursor-pointer">
              Terms
            </span>
          </div>
        </div>

      </div>
    </footer>
  )
}

export default Footer