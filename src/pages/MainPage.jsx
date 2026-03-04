import React, { useState, useEffect, useMemo } from "react";
import { fetchUsers } from "../services/api";
import { useNavigate } from "react-router-dom";
import { useDebounce } from "../hooks/useDebounce";

export default function MainPage() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  
  const debouncedSearch = useDebounce(search, 300);

  useEffect(() => {
    const getUsers = async () => {
      try {
        setLoading(true);
        const data = await fetchUsers();
        // Minimal enhancement - just add online status and role
        const enhancedData = data.map(user => ({
          ...user,
          online: Math.random() > 0.3,
          role: ['Admin', 'Editor', 'Viewer'][Math.floor(Math.random() * 3)],
        }));
        setUsers(enhancedData);
      } catch (err) {
        setError("Failed to load users. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    getUsers();
  }, []);

  const filteredUsers = useMemo(() => {
    if (!debouncedSearch) return users;
    return users.filter(user =>
      user.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
      user.email.toLowerCase().includes(debouncedSearch.toLowerCase())
    );
  }, [users, debouncedSearch]);

  const getInitials = (name) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="min-h-screen bg-black pt-24 pb-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                User Explorer
              </h1>
              <p className="text-gray-400">
                {filteredUsers.length} team members found
              </p>
            </div>
          </div>

          {/* Search */}
          <div className="mt-6 max-w-md">
            <div className="relative">
              <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"/>
              </svg>
              <input
                type="text"
                placeholder="Search by name or email..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-900 border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-red-600 transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Content */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-gray-900 rounded-lg p-6 border border-gray-800 animate-pulse">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gray-800 rounded-full"></div>
                  <div className="flex-1">
                    <div className="h-4 bg-gray-800 rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-gray-800 rounded w-1/2"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-12 bg-gray-900 rounded-lg border border-gray-800">
            <p className="text-red-500 mb-4">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="px-6 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-white transition-colors"
            >
              Try Again
            </button>
          </div>
        ) : filteredUsers.length === 0 ? (
          <div className="text-center py-12 bg-gray-900 rounded-lg border border-gray-800">
            <p className="text-gray-400">No users found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredUsers.map((user) => (
              <div
                key={user.id}
                onClick={() => navigate(`/detail/${user.id}`)}
                className="bg-gray-900 rounded-lg p-6 border border-gray-800 hover:border-red-600 cursor-pointer transition-all hover:shadow-lg hover:shadow-red-600/10 animate-fadeIn"
              >
                <div className="flex items-start gap-4">
                  {/* Avatar with online indicator */}
                  <div className="relative">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-red-600 to-red-800 p-0.5">
                      <div className="w-full h-full rounded-full bg-gray-900 flex items-center justify-center">
                        <span className="text-lg font-bold text-white">
                          {getInitials(user.name)}
                        </span>
                      </div>
                    </div>
                    {user.online && (
                      <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-gray-900 rounded-full"></span>
                    )}
                  </div>

                  {/* User info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-lg font-semibold text-white truncate">
                        {user.name}
                      </h3>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        user.role === 'Admin' ? 'bg-red-600 text-white' : 
                        user.role === 'Editor' ? 'bg-blue-600 text-white' : 
                        'bg-gray-600 text-white'
                      }`}>
                        {user.role}
                      </span>
                    </div>
                    <p className="text-sm text-gray-400 truncate mb-2">
                      {user.email}
                    </p>
                    <p className="text-xs text-gray-500">
                      Click to view details →
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}