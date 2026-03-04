import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  
  // Check if user is logged in
  const isLoggedIn = localStorage.getItem("loggedIn") === "true";
  const phoneNumber = localStorage.getItem("phoneNumber") || "";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Close mobile menu when route changes
    setIsMobileMenuOpen(false);
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("phoneNumber");
    navigate("/");
  };

  const navLinks = [
    { to: "/", label: "Home", icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" },
    { to: "/main", label: "Dashboard", icon: "M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" }
  ];

  const formatPhoneNumber = (phone) => {
    if (!phone) return "";
    // Simple formatting - show last 4 digits
    return `•••• ${phone.slice(-4)}`;
  };

  return (
    <header 
      className={`
        fixed top-0 left-0 right-0 z-50 transition-all duration-300
        ${isScrolled 
          ? 'bg-black/90 backdrop-blur-lg border-b border-red-600/20 py-3' 
          : 'bg-black/50 backdrop-blur-sm border-b border-transparent py-4'
        }
      `}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo and Brand */}
          <Link 
            to="/" 
            className="flex items-center gap-3 group"
          >
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-red-800 rounded-lg flex items-center justify-center transform group-hover:rotate-3 transition-transform duration-300">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                </svg>
              </div>
              <div className="absolute -inset-0.5 bg-red-600 rounded-lg opacity-0 group-hover:opacity-30 blur transition-opacity duration-300"></div>
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-white to-red-200 bg-clip-text text-transparent">
                YouBloom
              </h1>
              <p className="text-xs text-gray-400">Explorer</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`
                  relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300
                  flex items-center gap-2 group
                  ${location.pathname === link.to 
                    ? 'text-red-400 bg-red-600/10' 
                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }
                `}
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d={link.icon} />
                </svg>
                {link.label}
                {location.pathname === link.to && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-red-600 to-red-400 rounded-full"></span>
                )}
              </Link>
            ))}
          </nav>

          {/* User Menu & Mobile Toggle */}
          <div className="flex items-center gap-4">
            {isLoggedIn && (
              <div className="hidden md:flex items-center gap-3">
                {/* User Badge */}
                <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-lg border border-white/10">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm text-gray-300">
                    {formatPhoneNumber(phoneNumber)}
                  </span>
                </div>
                
                {/* Logout Button */}
                <button
                  onClick={handleLogout}
                  className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-600/10 rounded-lg transition-all duration-300 group relative"
                  title="Logout"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                </button>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-all"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div 
          className={`
            md:hidden fixed inset-x-0 top-[73px] bg-black/95 backdrop-blur-lg border-t border-red-600/20
            transition-all duration-300 transform
            ${isMobileMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-2 opacity-0 pointer-events-none'}
          `}
        >
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`
                    px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300
                    flex items-center gap-3
                    ${location.pathname === link.to 
                      ? 'text-red-400 bg-red-600/10 border border-red-600/20' 
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                    }
                  `}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d={link.icon} />
                  </svg>
                  {link.label}
                </Link>
              ))}
              
              {isLoggedIn && (
                <>
                  <div className="my-2 border-t border-white/10"></div>
                  
                  {/* Mobile User Info */}
                  <div className="px-4 py-3 bg-white/5 rounded-lg">
                    <p className="text-sm text-gray-400">Logged in as</p>
                    <p className="text-white font-mono">{formatPhoneNumber(phoneNumber)}</p>
                  </div>
                  
                  {/* Mobile Logout */}
                  <button
                    onClick={handleLogout}
                    className="px-4 py-3 rounded-lg text-red-400 hover:text-red-300 hover:bg-red-600/10 transition-all flex items-center gap-3"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Logout
                  </button>
                </>
              )}
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}