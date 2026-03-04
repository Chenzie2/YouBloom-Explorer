import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  const quickLinks = [
    { to: "/", label: "Home" },
    { to: "/main", label: "Dashboard" },
    { to: "/privacy", label: "Privacy Policy" },
    { to: "/terms", label: "Terms of Service" }
  ];

  const socialLinks = [
    { 
      icon: "M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879v-6.99h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.99C18.343 21.128 22 16.991 22 12z",
      label: "Facebook",
      color: "hover:text-blue-500"
    },
    {
      icon: "M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84",
      label: "Twitter",
      color: "hover:text-sky-400"
    },
    {
      icon: "M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z",
      label: "GitHub",
      color: "hover:text-gray-300"
    }
  ];

  return (
    <footer className="relative bg-gradient-to-b from-black to-gray-900 text-white border-t border-red-600/20">
      {/* Decorative Top Line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-red-600 to-transparent"></div>
      
      <div className="container mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-red-600 to-red-800 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                </svg>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-white to-red-200 bg-clip-text text-transparent">
                YouBloom
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Exploring the rhythm of data through beautiful interfaces and seamless experiences.
            </p>
            
            {/* Contact Info */}
            <div className="mt-4 space-y-2">
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                <span>support@youbloom.com</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                <span>+1 (555) 123-4567</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <span className="w-1 h-4 bg-red-600 rounded-full"></span>
              Quick Links
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-gray-400 hover:text-red-400 transition-colors duration-300 flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 bg-red-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <span className="w-1 h-4 bg-red-600 rounded-full"></span>
              Stay Updated
            </h3>
            <p className="text-gray-400 text-sm mb-4">
              Subscribe to our newsletter for the latest updates and features.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all"
              />
              <button className="px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white rounded-lg font-medium transition-all duration-300 hover:shadow-lg hover:shadow-red-600/20 whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/10"></div>
          </div>
          <div className="relative flex justify-center">
            <span className="px-4 bg-gradient-to-b from-black to-gray-900 text-gray-400 text-sm">
              Connect with us
            </span>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Copyright */}
          <p className="text-sm text-gray-400">
            &copy; {currentYear} YouBloom Explorer. All rights reserved.
            <span className="mx-2">•</span>
            <span className="text-xs">Made with ❤️ for music lovers</span>
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-3">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href="#"
                aria-label={social.label}
                className={`
                  p-2 bg-white/5 border border-white/10 rounded-lg
                  text-gray-400 ${social.color} hover:bg-white/10
                  transition-all duration-300 hover:scale-110
                `}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d={social.icon} />
                </svg>
              </a>
            ))}
          </div>

          {/* Back to Top Button */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="p-2 bg-red-600/20 hover:bg-red-600/40 border border-red-500/30 rounded-lg text-red-400 transition-all duration-300 hover:scale-110 group"
            title="Back to top"
          >
            <svg className="w-5 h-5 transform group-hover:-translate-y-1 transition-transform" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    </footer>
  );
}