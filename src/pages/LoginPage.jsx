import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [phone, setPhone] = useState("");
  const [countryCode, setCountryCode] = useState("+1");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const countryCodes = [
    { code: "+1", country: "US/CA" },
    { code: "+44", country: "UK" },
    { code: "+91", country: "India" },
    { code: "+254", country: "Kenya" },
    { code: "+234", country: "Nigeria" },
  ];

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");
    
    if (phone.replace(/\s/g, '').length < 4) {
      setError("Please enter a valid phone number");
      return;
    }

    setLoading(true);
    
    setTimeout(() => {
      localStorage.setItem("loggedIn", "true");
      localStorage.setItem("phoneNumber", countryCode + phone);
      navigate("/main");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-red-600 rounded-lg flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-white">Welcome to YouBloom</h1>
          <p className="text-gray-400 mt-2">Sign in to continue</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="bg-gray-900 rounded-lg p-6 border border-gray-800">
          <div className="space-y-4">
            {/* Country Code */}
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Country Code
              </label>
              <select
                value={countryCode}
                onChange={(e) => setCountryCode(e.target.value)}
                className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-red-600 transition-colors"
              >
                {countryCodes.map(({ code, country }) => (
                  <option key={code} value={code}>
                    {code} ({country})
                  </option>
                ))}
              </select>
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/[^\d]/g, ''))}
                placeholder="712345678"
                className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-red-600 transition-colors"
                disabled={loading}
              />
              {error && (
                <p className="text-red-500 text-sm mt-2">{error}</p>
              )}
            </div>

            {/* Full number preview */}
            {phone.length > 0 && !error && (
              <p className="text-sm text-gray-500">
                Full number: <span className="text-gray-400">{countryCode} {phone}</span>
              </p>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-red-600 hover:bg-red-700 rounded-lg text-white font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Signing in...
                </span>
              ) : (
                'Sign In'
              )}
            </button>
          </div>
        </form>

        {/* Footer */}
        <p className="text-center text-gray-500 text-sm mt-6">
          By signing in, you agree to our Terms and Privacy Policy
        </p>
      </div>
    </div>
  );
}