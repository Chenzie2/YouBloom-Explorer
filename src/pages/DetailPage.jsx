import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function DetailPage() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("info");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `https://jsonplaceholder.typicode.com/users/${id}`
        );
        if (!res.ok) throw new Error("Failed to fetch user details");
        const data = await res.json();
        
        // Enhance user data with additional mock info for better visualization
        const enhancedData = {
          ...data,
          avatar: `https://ui-avatars.com/api/?name=${data.name}&background=dc2626&color=fff&size=256`,
          role: ['Admin', 'Editor', 'Viewer'][Math.floor(Math.random() * 3)],
          status: Math.random() > 0.3 ? 'active' : 'away',
          department: ['Engineering', 'Marketing', 'Sales', 'HR'][Math.floor(Math.random() * 4)],
          joinDate: new Date(2020, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28)).toLocaleDateString(),
          lastActive: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
          projects: ['Project Alpha', 'Project Beta', 'Project Gamma'].slice(0, Math.floor(Math.random() * 3) + 1),
          social: {
            twitter: `@${data.username}`,
            github: `${data.username}`,
            linkedin: `in/${data.username}`
          }
        };
        setUser(enhancedData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [id]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getInitials = (name) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-red-950/20 to-black flex items-center justify-center">
        <div className="relative">
          {/* Loading Animation */}
          <div className="w-24 h-24 border-4 border-red-600/20 border-t-red-600 rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-red-950/20 to-black flex items-center justify-center p-4">
        <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-red-600/30 text-center max-w-md">
          <svg className="w-20 h-20 text-red-500 mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"/>
          </svg>
          <h3 className="text-2xl font-bold text-white mb-2">Oops! Something went wrong</h3>
          <p className="text-red-400 mb-6">{error}</p>
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-3 bg-red-600 hover:bg-red-500 text-white rounded-xl font-semibold transition-all hover:scale-105"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-red-950/20 to-black">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-96 h-96 bg-red-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse-slow"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-red-800 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse-slow animation-delay-2000"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="group mb-6 inline-flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-red-600/20 border border-white/10 hover:border-red-500/50 rounded-xl text-white transition-all duration-300 backdrop-blur-sm"
        >
          <svg className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd"/>
          </svg>
          Back to Users
        </button>

        {/* User Profile Card */}
        <div className="backdrop-blur-lg bg-white/5 rounded-3xl border border-white/10 overflow-hidden">
          {/* Header Gradient */}
          <div className="h-32 bg-gradient-to-r from-red-600 to-red-800 relative">
            {/* Status Badge */}
            <div className="absolute top-4 right-4">
              <span className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2 ${
                user.status === 'active' 
                  ? 'bg-green-500/20 text-green-300 border border-green-500/30' 
                  : 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30'
              }`}>
                <span className={`w-2 h-2 rounded-full ${
                  user.status === 'active' ? 'bg-green-400 animate-pulse' : 'bg-yellow-400'
                }`}></span>
                {user.status === 'active' ? 'Active' : 'Away'}
              </span>
            </div>
          </div>

          {/* Profile Content */}
          <div className="px-8 pb-8">
            {/* Avatar and Basic Info */}
            <div className="flex flex-col md:flex-row items-start md:items-end gap-6 -mt-16 mb-8">
              <div className="relative">
                <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-red-500 to-red-700 p-1 shadow-2xl">
                  <div className="w-full h-full rounded-xl bg-black flex items-center justify-center overflow-hidden">
                    {user.avatar ? (
                      <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-3xl font-bold text-white">{getInitials(user.name)}</span>
                    )}
                  </div>
                </div>
                {/* Role Badge */}
                <div className="absolute -bottom-2 -right-2">
                  <span className={`
                    px-3 py-1 rounded-full text-xs font-bold border-2 border-black
                    ${user.role === 'Admin' ? 'bg-red-600 text-white' : 
                      user.role === 'Editor' ? 'bg-blue-600 text-white' : 
                      'bg-gray-600 text-white'}
                  `}>
                    {user.role}
                  </span>
                </div>
              </div>

              <div className="flex-1">
                <h1 className="text-4xl font-bold text-white mb-2">{user.name}</h1>
                <div className="flex flex-wrap gap-4 text-gray-300">
                  <span className="flex items-center gap-1">
                    <svg className="w-4 h-4 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                    {user.email}
                  </span>
                  <span className="flex items-center gap-1">
                    <svg className="w-4 h-4 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                    {user.phone}
                  </span>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="flex gap-2">
                <button className="p-3 bg-white/5 hover:bg-red-600/20 border border-white/10 rounded-xl text-white transition-all hover:scale-110">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                  </svg>
                </button>
                <button className="p-3 bg-white/5 hover:bg-red-600/20 border border-white/10 rounded-xl text-white transition-all hover:scale-110">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 mb-6 border-b border-white/10">
              {['info', 'company', 'social'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 text-sm font-medium capitalize transition-all relative ${
                    activeTab === tab
                      ? 'text-red-400'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {tab}
                  {activeTab === tab && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-500"></div>
                  )}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="grid md:grid-cols-2 gap-8">
              {/* Left Column - Main Info */}
              <div className="space-y-6">
                {activeTab === 'info' && (
                  <>
                    {/* Contact Information */}
                    <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                      <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                        <svg className="w-5 h-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                        </svg>
                        Contact Information
                      </h3>
                      <div className="space-y-3">
                        <DetailRow label="Email" value={user.email} />
                        <DetailRow label="Phone" value={user.phone} />
                        <DetailRow label="Website" value={user.website} isLink />
                        <DetailRow label="Username" value={`@${user.username}`} />
                      </div>
                    </div>

                    {/* Address */}
                    <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                      <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                        <svg className="w-5 h-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                        </svg>
                        Address
                      </h3>
                      <div className="space-y-2 text-gray-300">
                        <p>{user.address.street}</p>
                        <p>{user.address.suite}</p>
                        <p>{user.address.city}, {user.address.zipcode}</p>
                      </div>
                    </div>
                  </>
                )}

                {activeTab === 'company' && (
                  <>
                    {/* Company Info */}
                    <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                      <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                        <svg className="w-5 h-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 01-1 1h-2a1 1 0 01-1-1v-2a1 1 0 00-1-1H7a1 1 0 00-1 1v2a1 1 0 01-1 1H3a1 1 0 01-1-1V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clipRule="evenodd" />
                        </svg>
                        Company Details
                      </h3>
                      <div className="space-y-4">
                        <DetailRow label="Company Name" value={user.company.name} />
                        <DetailRow label="Catch Phrase" value={user.company.catchPhrase} />
                        <DetailRow label="Business Strategy" value={user.company.bs} />
                      </div>
                    </div>

                    {/* Department & Projects */}
                    <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                      <h3 className="text-lg font-semibold text-white mb-4">Department & Projects</h3>
                      <div className="space-y-4">
                        <DetailRow label="Department" value={user.department} />
                        <div>
                          <p className="text-sm text-gray-400 mb-2">Active Projects</p>
                          <div className="flex flex-wrap gap-2">
                            {user.projects.map((project, index) => (
                              <span key={index} className="px-3 py-1 bg-red-600/20 border border-red-500/30 rounded-full text-sm text-red-300">
                                {project}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {activeTab === 'social' && (
                  <>
                    {/* Social Links */}
                    <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                      <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                        <svg className="w-5 h-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                        </svg>
                        Social Profiles
                      </h3>
                      <div className="space-y-4">
                        <SocialLink 
                          platform="Twitter" 
                          handle={user.social.twitter}
                          icon="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"
                        />
                        <SocialLink 
                          platform="GitHub" 
                          handle={user.social.github}
                          icon="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                        />
                        <SocialLink 
                          platform="LinkedIn" 
                          handle={user.social.linkedin}
                          icon="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
                        />
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Right Column - Additional Info */}
              <div className="space-y-6">
                {/* Stats Cards */}
                <div className="grid grid-cols-2 gap-4">
                  <StatCard 
                    label="Member Since"
                    value={formatDate(user.joinDate)}
                    icon="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                  />
                  <StatCard 
                    label="Last Active"
                    value={formatDate(user.lastActive)}
                    icon="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </div>

                {/* Additional Details */}
                <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                  <h3 className="text-lg font-semibold text-white mb-4">Additional Details</h3>
                  <div className="space-y-3">
                    <DetailRow label="Department" value={user.department} />
                    <DetailRow label="Role" value={user.role} />
                    <DetailRow label="User ID" value={`#${user.id}`} />
                  </div>
                </div>

                {/* Quick Actions Card */}
                <div className="bg-gradient-to-br from-red-600/20 to-red-800/20 rounded-2xl p-6 border border-red-500/30">
                  <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <ActionButton icon="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" label="Message" />
                    <ActionButton icon="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" label="Email" />
                    <ActionButton icon="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" label="Document" />
                    <ActionButton icon="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4c.176 0 .344-.03.5-.085M9 4h4a2 2 0 012 2v2a2 2 0 01-2 2H9a2 2 0 01-2-2V6a2 2 0 012-2z" label="Settings" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.1; transform: scale(1); }
          50% { opacity: 0.2; transform: scale(1.05); }
        }
        .animate-pulse-slow {
          animation: pulse-slow 4s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </div>
  );
}

// Helper Components
function DetailRow({ label, value, isLink }) {
  return (
    <div>
      <p className="text-sm text-gray-400">{label}</p>
      {isLink ? (
        <a href={`https://${value}`} target="_blank" rel="noopener noreferrer" 
           className="text-red-400 hover:text-red-300 transition-colors">
          {value}
        </a>
      ) : (
        <p className="text-white">{value}</p>
      )}
    </div>
  );
}

function StatCard({ label, value, icon }) {
  return (
    <div className="bg-white/5 rounded-xl p-4 border border-white/10">
      <svg className="w-6 h-6 text-red-400 mb-2" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d={icon} clipRule="evenodd" />
      </svg>
      <p className="text-2xl font-bold text-white">{value}</p>
      <p className="text-sm text-gray-400">{label}</p>
    </div>
  );
}

function SocialLink({ platform, handle, icon }) {
  return (
    <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/10 hover:border-red-500/30 transition-all">
      <div className="flex items-center gap-3">
        <svg className="w-5 h-5 text-red-400" fill="currentColor" viewBox="0 0 24 24">
          <path d={icon} />
        </svg>
        <div>
          <p className="text-sm text-gray-400">{platform}</p>
          <p className="text-white">{handle}</p>
        </div>
      </div>
      <button className="text-gray-400 hover:text-red-400 transition-colors">
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
          <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
        </svg>
      </button>
    </div>
  );
}

function ActionButton({ icon, label }) {
  return (
    <button className="flex flex-col items-center p-3 bg-white/5 hover:bg-red-600/20 rounded-xl border border-white/10 hover:border-red-500/50 transition-all group">
      <svg className="w-5 h-5 text-gray-400 group-hover:text-red-400 mb-1" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d={icon} clipRule="evenodd" />
      </svg>
      <span className="text-xs text-gray-400 group-hover:text-red-300">{label}</span>
    </button>
  );
}