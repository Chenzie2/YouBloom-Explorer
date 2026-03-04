import React, { useState, useEffect, useMemo, useCallback } from "react";
import { fetchUsers } from "../services/api";
import { useNavigate } from "react-router-dom";
import { useDebounce } from "../hooks/useDebounce";

export default function MainPage() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [viewMode, setViewMode] = useState("grid"); // 'grid' or 'list'
  const [sortBy, setSortBy] = useState("name"); // 'name', 'email'
  const [selectedCategory, setSelectedCategory] = useState("all");
  const navigate = useNavigate();
  
  const debouncedSearch = useDebounce(search, 300);

  useEffect(() => {
    const getUsers = async () => {
      try {
        setLoading(true);
        const data = await fetchUsers();
        // Add some random data for better visualization
        const enhancedData = data.map(user => ({
          ...user,
          avatar: `https://ui-avatars.com/api/?name=${user.name}&background=random&size=128`,
          online: Math.random() > 0.3,
          role: ['Admin', 'Editor', 'Viewer'][Math.floor(Math.random() * 3)],
          department: ['Engineering', 'Marketing', 'Sales', 'HR'][Math.floor(Math.random() * 4)],
          lastActive: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString()
        }));
        setUsers(enhancedData);
      } catch (err) {
        setError("Failed to load users. Please try again.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    getUsers();
  }, []);

  // Filter and sort users
  const filteredUsers = useMemo(() => {
    let filtered = [...users];

    // Apply search filter
    if (debouncedSearch) {
      filtered = filtered.filter(user =>
        user.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        user.email.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        user.department?.toLowerCase().includes(debouncedSearch.toLowerCase())
      );
    }

    // Apply category filter
    if (selectedCategory !== "all") {
      filtered = filtered.filter(user => user.role === selectedCategory);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      if (sortBy === "name") {
        return a.name.localeCompare(b.name);
      } else if (sortBy === "email") {
        return a.email.localeCompare(b.email);
      }
      return 0;
    });

    return filtered;
  }, [users, debouncedSearch, selectedCategory, sortBy]);

  // Stats
  const stats = useMemo(() => ({
    total: users.length,
    online: users.filter(u => u.online).length,
    admins: users.filter(u => u.role === 'Admin').length
  }), [users]);

  const getInitials = (name) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const formatLastActive = (date) => {
    const now = new Date();
    const last = new Date(date);
    const diffHours = Math.floor((now - last) / (1000 * 60 * 60));
    
    if (diffHours < 1) return 'Just now';
    if (diffHours < 24) return `${diffHours} hours ago`;
    return `${Math.floor(diffHours / 24)} days ago`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-900">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 -left-40 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float"></div>
        <div className="absolute bottom-0 -right-40 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float animation-delay-4000"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="mb-8 backdrop-blur-lg bg-white/5 rounded-2xl p-6 border border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2 flex items-center gap-3">
                <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  User Explorer
                </span>
                <span className="bg-purple-500/20 text-purple-300 text-sm px-3 py-1 rounded-full">
                  {filteredUsers.length} users
                </span>
              </h1>
              
              {/* Stats Cards */}
              <div className="flex gap-4 mt-4">
                <div className="bg-white/5 rounded-lg px-4 py-2 border border-white/10">
                  <p className="text-gray-400 text-sm">Total Users</p>
                  <p className="text-2xl font-bold text-white">{stats.total}</p>
                </div>
                <div className="bg-green-500/5 rounded-lg px-4 py-2 border border-green-500/20">
                  <p className="text-gray-400 text-sm">Online</p>
                  <p className="text-2xl font-bold text-green-400">{stats.online}</p>
                </div>
                <div className="bg-purple-500/5 rounded-lg px-4 py-2 border border-purple-500/20">
                  <p className="text-gray-400 text-sm">Admins</p>
                  <p className="text-2xl font-bold text-purple-400">{stats.admins}</p>
                </div>
              </div>
            </div>

            {/* View Toggle */}
            <div className="flex items-center gap-2 bg-white/5 rounded-lg p-1 border border-white/10">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded transition-all ${
                  viewMode === "grid" 
                    ? "bg-purple-500 text-white" 
                    : "text-gray-400 hover:text-white"
                }`}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/>
                </svg>
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded transition-all ${
                  viewMode === "list" 
                    ? "bg-purple-500 text-white" 
                    : "text-gray-400 hover:text-white"
                }`}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h14a1 1 0 110 2H3a1 1 0 01-1-1zM2 7a1 1 0 011-1h14a1 1 0 110 2H3a1 1 0 01-1-1zM2 11a1 1 0 011-1h14a1 1 0 110 2H3a1 1 0 01-1-1zM2 15a1 1 0 011-1h14a1 1 0 110 2H3a1 1 0 01-1-1z"/>
                </svg>
              </button>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="mt-6 flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"/>
              </svg>
              <input
                type="text"
                placeholder="Search by name, email, or department..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              />
            </div>
            
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="all" className="bg-gray-800">All Roles</option>
              <option value="Admin" className="bg-gray-800">Admins</option>
              <option value="Editor" className="bg-gray-800">Editors</option>
              <option value="Viewer" className="bg-gray-800">Viewers</option>
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="name" className="bg-gray-800">Sort by Name</option>
              <option value="email" className="bg-gray-800">Sort by Email</option>
            </select>
          </div>
        </div>

        {/* Content Section */}
        {loading ? (
          <div className={`grid ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'} gap-6`}>
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white/5 rounded-2xl p-6 border border-white/10 animate-pulse">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-white/10 rounded-full"></div>
                  <div className="flex-1">
                    <div className="h-4 bg-white/10 rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-white/10 rounded w-1/2"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <div className="text-red-400 text-xl mb-4">{error}</div>
            <button 
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-purple-500 hover:bg-purple-600 rounded-xl text-white transition-all"
            >
              Try Again
            </button>
          </div>
        ) : filteredUsers.length === 0 ? (
          <div className="text-center py-12 backdrop-blur-lg bg-white/5 rounded-2xl border border-white/10">
            <svg className="w-24 h-24 text-gray-500 mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 13a2 2 0 11-4 0 2 2 0 014 0zM15 13a2 2 0 11-4 0 2 2 0 014 0zM7 5a2 2 0 012 2v2a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2zM15 5a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V7a2 2 0 012-2h2z"/>
            </svg>
            <h3 className="text-xl text-white mb-2">No users found</h3>
            <p className="text-gray-400">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className={`grid ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'} gap-6`}>
            {filteredUsers.map((user, index) => (
              <div
                key={user.id}
                onClick={() => navigate(`/detail/${user.id}`)}
                className={`
                  group cursor-pointer transform transition-all duration-300 hover:scale-105 hover:rotate-1
                  ${viewMode === 'list' ? 'flex items-center gap-6' : ''}
                  backdrop-blur-lg bg-white/5 rounded-2xl p-6 border border-white/10
                  hover:bg-white/10 hover:border-purple-500/50 hover:shadow-2xl hover:shadow-purple-500/20
                  animate-fadeIn
                `}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {/* Online Indicator */}
                {user.online && (
                  <div className="absolute top-4 right-4">
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                    </span>
                  </div>
                )}

                {/* Avatar */}
                <div className={`${viewMode === 'list' ? 'flex-shrink-0' : 'mb-4'} flex justify-center`}>
                  <div className="relative">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 p-0.5">
                      <div className="w-full h-full rounded-full bg-gray-900 flex items-center justify-center overflow-hidden">
                        {user.avatar ? (
                          <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                        ) : (
                          <span className="text-xl font-bold text-white">{getInitials(user.name)}</span>
                        )}
                      </div>
                    </div>
                    {/* Role Badge */}
                    <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2">
                      <span className={`
                        text-xs px-2 py-0.5 rounded-full whitespace-nowrap
                        ${user.role === 'Admin' ? 'bg-purple-500 text-white' : 
                          user.role === 'Editor' ? 'bg-blue-500 text-white' : 
                          'bg-gray-500 text-white'}
                      `}>
                        {user.role}
                      </span>
                    </div>
                  </div>
                </div>

                {/* User Info */}
                <div className={`${viewMode === 'list' ? 'flex-1' : 'text-center'}`}>
                  <h3 className="text-lg font-semibold text-white mb-1 group-hover:text-purple-300 transition-colors">
                    {user.name}
                  </h3>
                  <p className="text-sm text-gray-400 mb-2">{user.email}</p>
                  
                  {/* Additional Info */}
                  <div className="flex flex-wrap gap-2 justify-center text-xs">
                    <span className="px-2 py-1 bg-white/5 rounded-full text-gray-300">
                      {user.department}
                    </span>
                    <span className="px-2 py-1 bg-white/5 rounded-full text-gray-300">
                      {formatLastActive(user.lastActive)}
                    </span>
                  </div>

                  {/* View Details Indicator */}
                  <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-purple-400 text-sm flex items-center justify-center gap-1">
                      View Details
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"/>
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(10px, -10px) scale(1.05); }
          50% { transform: translate(0, 20px) scale(0.95); }
          75% { transform: translate(-10px, -10px) scale(1.02); }
        }
        .animate-float {
          animation: float 15s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
}