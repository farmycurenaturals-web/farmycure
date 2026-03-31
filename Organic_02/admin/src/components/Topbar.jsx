import React from 'react';
import { Bell, Search } from 'lucide-react';

const Topbar = () => {
  return (
    <header className="h-16 bg-white border-b border-gray-100 sticky top-0 z-10 w-full flex items-center justify-between px-6 lg:px-8">
      {/* Search Bar */}
      <div className="flex-1 max-w-md">
        <div className="relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            <Search size={18} className="text-gray-400" />
          </span>
          <input
            type="text"
            placeholder="Search..."
            className="w-full bg-gray-50 text-gray-900 text-sm rounded-lg border border-transparent focus:border-green-500 focus:bg-white focus:ring-1 focus:ring-green-500 py-2 pl-10 pr-4 transition-colors outline-none"
          />
        </div>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-4 ml-4">
        {/* Notifications */}
        <button className="relative p-2 text-gray-400 hover:text-gray-600 transition-colors rounded-full hover:bg-gray-50">
          <Bell size={20} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
        </button>

        {/* Admin Avatar */}
        <div className="h-8 w-8 rounded-full bg-green-600 flex items-center justify-center text-white font-medium text-sm cursor-pointer shadow-sm">
          A
        </div>
      </div>
    </header>
  );
};

export default Topbar;
