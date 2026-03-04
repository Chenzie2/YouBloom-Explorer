import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [phone, setPhone] = useState("");
  const [countryCode, setCountryCode] = useState("+1");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Common country codes
  const countryCodes = [
    { code: "+1", country: "US/CA" },
    { code: "+44", country: "UK" },
    { code: "+91", country: "India" },
    { code: "+254", country: "Kenya" },
    { code: "+234", country: "Nigeria" },
    { code: "+27", country: "South Africa" },
    { code: "+61", country: "Australia" },
    { code: "+49", country: "Germany" },
    { code: "+33", country: "France" },
    { code: "+81", country: "Japan" },
    { code: "+86", country: "China" },
    { code: "+55", country: "Brazil" },
  ];

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");
    
    const fullNumber = countryCode + phone.replace(/\s/g, '');
    
    // Basic validation - at least 4 digits after country code
    if (phone.replace(/\s/g, '').length < 4) {
      setError("Please enter a valid phone number");
      return;
    }

    setIsLoading(true);
    
    // Mock login with delay to show loading state
    setTimeout(() => {
      localStorage.setItem("loggedIn", "true");
      localStorage.setItem("phoneNumber", fullNumber);
      navigate("/main");
    }, 1000);
  };

  const handlePhoneChange = (e) => {
    // Allow only numbers and spaces
    const value = e.target.value.replace(/[^\d\s]/g, '');
    setPhone(value);
    if (error) setError("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 flex items-center justify-center p-4">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      {/* Login Card */}
      <div className="relative w-full max-w-md">
        {/* Decorative top bar */}
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"></div>
        
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-white/20 animate-fadeIn">
          {/* Logo/Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center shadow-lg">
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
              </svg>
            </div>
          </div>

          <h1 className="text-3xl font-bold text-white mb-2 text-center tracking-tight">
            Welcome Back
          </h1>
          <p className="text-gray-300 text-center mb-8 text-sm">
            Enter your phone number to continue to YouBloom Explorer
          </p>

          <form onSubmit={handleLogin} className="space-y-6">
            {/* Country Code Selector */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-200 ml-1">
                Country Code
              </label>
              <select
                value={countryCode}
                onChange={(e) => setCountryCode(e.target.value)}
                className="w-full p-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-200 appearance-none cursor-pointer"
                style={{ backdropFilter: 'blur(10px)' }}
              >
                {countryCodes.map(({ code, country }) => (
                  <option key={code} value={code} className="bg-gray-800">
                    {code} ({country})
                  </option>
                ))}
              </select>
            </div>

            {/* Phone Number Input */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-200 ml-1">
                Phone Number
              </label>
              <div className="relative">
                <input
                  type="tel"
                  value={phone}
                  onChange={handlePhoneChange}
                  placeholder="712 345 678"
                  className={`w-full p-3 bg-white/10 border ${
                    error ? 'border-red-400' : 'border-white/20'
                  } rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-200`}
                  style={{ backdropFilter: 'blur(10px)' }}
                  disabled={isLoading}
                />
                {!error && phone.length > 0 && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                    </svg>
                  </div>
                )}
              </div>
              {error && (
                <p className="text-red-400 text-sm mt-1 flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
                  </svg>
                  {error}
                </p>
              )}
            </div>

            {/* Full number preview */}
            {phone.length > 0 && !error && (
              <div className="text-sm text-gray-300 text-center">
                Full number: <span className="text-purple-300 font-mono">{countryCode} {phone}</span>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white py-3 rounded-xl font-semibold text-lg transform transition-all duration-200 hover:scale-[1.02] hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Logging in...
                </>
              ) : (
                'Continue to Explorer'
              )}
            </button>

            {/* Footer Links */}
            <div className="text-center text-sm text-gray-400">
              <p>
                By continuing, you agree to our{' '}
                <a href="#" className="text-purple-300 hover:text-purple-200 transition-colors">
                  Terms
                </a>{' '}
                and{' '}
                <a href="#" className="text-purple-300 hover:text-purple-200 transition-colors">
                  Privacy Policy
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}