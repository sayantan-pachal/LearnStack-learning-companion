import React from 'react';
import { Github, Linkedin, Twitter, Mail, TerminalSquare } from "lucide-react";
import { Link } from "react-router-dom";
import Logo2 from "../../../public/Logo2";

export default function Footer() {
  // SaaS Categorization 1: Core Product Features
  const productLinks = [
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'My Learning', path: '/mylearning' },
    { name: 'Resume Builder', path: '/resume-builder' },
    { name: 'Achievements', path: '/achievements' },
  ];

  // SaaS Categorization 2: Educational Resources
  const resourceLinks = [
    { name: 'Course Library', path: '/courses' },
    { name: 'Learning Roadmaps', path: '/learningpaths' },
    { name: 'Exam Simulator', path: '/exam' },
    { name: 'Community Hub', path: '/community' },
  ];

  // SaaS Categorization 3: Help & Support
  const supportLinks = [
    { name: 'Help Desk Terminal', path: '/helpdesk', icon: TerminalSquare, badge: 'New' },
    { name: 'Report an Issue', path: 'https://github.com/sayantan-pachal', external: true },
    { name: 'Contact Support', path: 'mailto:pachalsayantan@gmail.com', external: true },
  ];

  const socialLinks = [
    { icon: Github, href: 'https://github.com/sayantan-pachal', label: "GitHub" },
    { icon: Linkedin, href: 'https://linkedin.com/in/sayantan-pachal', label: "LinkedIn" },
    { icon: Twitter, href: '#', label: "Twitter" },
    { icon: Mail, href: 'mailto:pachalsayantan@gmail.com', label: "Email" },
  ];

  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-black print:hidden">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-14 py-16">

        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8">

          {/* Brand & Mission (Takes up more space) */}
          <div className="md:col-span-12 lg:col-span-4 lg:pr-8">
            <Link to="/" className="inline-block">
              <Logo2 />
            </Link>
            <p className="mt-5 text-sm font-medium text-gray-500 dark:text-gray-400 leading-relaxed max-w-sm">
              The all-in-one collaborative learning platform. Master technical skills, track your progression, and build your professional portfolio seamlessly.
            </p>
            
            {/* Modern SaaS placement for socials: Under the brand description */}
            <div className="flex space-x-4 mt-8">
              {socialLinks.map((social) => (
                <a 
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-9 h-9 rounded-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 flex items-center justify-center text-gray-500 hover:text-theme-blue-600 hover:border-theme-blue-200 dark:hover:border-theme-blue-900 dark:hover:text-theme-blue-400 transition-all"
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Product Column */}
          <div className="md:col-span-4 lg:col-span-2 lg:col-start-6">
            <h3 className="font-bold text-gray-900 dark:text-white mb-5 text-sm tracking-wide">
              Product
            </h3>
            <ul className="space-y-3 text-sm font-medium">
              {productLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.path} 
                    className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Column */}
          <div className="md:col-span-4 lg:col-span-2">
            <h3 className="font-bold text-gray-900 dark:text-white mb-5 text-sm tracking-wide">
              Resources
            </h3>
            <ul className="space-y-3 text-sm font-medium">
              {resourceLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.path} 
                    className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Column */}
          <div className="md:col-span-4 lg:col-span-3">
            <h3 className="font-bold text-gray-900 dark:text-white mb-5 text-sm tracking-wide">
              Support
            </h3>
            <ul className="space-y-3 text-sm font-medium">
              {supportLinks.map((link) => (
                <li key={link.name}>
                  {link.external ? (
                    <a 
                      href={link.path}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors inline-flex items-center gap-2"
                    >
                      {link.name}
                    </a>
                  ) : (
                    <Link 
                      to={link.path} 
                      className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors inline-flex items-center gap-2 group"
                    >
                      {link.icon && <link.icon className="w-4 h-4 text-theme-blue-500 group-hover:animate-pulse" />}
                      {link.name}
                      {link.badge && (
                        <span className="ml-1 px-1.5 py-0.5 rounded-md bg-theme-blue-50 dark:bg-theme-blue-500/10 text-theme-blue-600 dark:text-theme-blue-400 text-[10px] font-black uppercase tracking-wider">
                          {link.badge}
                        </span>
                      )}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Bottom Bar: Legal & Copyright */}
        <div className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-800/60 flex flex-col md:flex-row items-center justify-between text-sm font-medium text-gray-500 dark:text-gray-500">
          <p>
            © {new Date().getFullYear()} LearnStack Inc. Engineered by Sayantan Pachal.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="#" className="hover:text-gray-900 dark:hover:text-white transition-colors">
              Status
            </Link>
            <Link to="/legal/#privacy" className="hover:text-gray-900 dark:hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link to="/legal/#terms" className="hover:text-gray-900 dark:hover:text-white transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}