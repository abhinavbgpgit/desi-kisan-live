import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    { 
      to: '/', 
      label: 'Project Overview',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      )
    },
    
  ];

  return (
    <div 
      className={`${isCollapsed ? 'w-20' : 'w-72'} bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white h-screen fixed left-0 top-0 flex flex-col shadow-2xl transition-all duration-300 ease-in-out border-r border-slate-700/50`}
    >
      {/* Header */}
      <div className="p-6 border-b border-slate-700/50 backdrop-blur-sm">
        <div className="flex items-center justify-between mb-2">
          {!isCollapsed && (
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <div>
                <h2 className="text-sm font-bold bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent">
                  Wedding & Temple
                </h2>
                <p className="text-slate-400 text-xs">360° Engagement</p>
              </div>
            </div>
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 hover:bg-slate-700/50 rounded-lg transition-colors ml-auto"
            aria-label="Toggle sidebar"
          >
            <svg 
              className={`w-5 h-5 transition-transform duration-300 ${isCollapsed ? 'rotate-180' : ''}`} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
            </svg>
          </button>
        </div>
      </div>
      
      {/* Navigation */}
      <nav className="flex-1 p-4 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
        <ul className="space-y-1">
          {menuItems.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  `group flex items-center ${isCollapsed ? 'justify-center' : 'justify-start'} px-4 py-3 rounded-xl transition-all duration-200 relative overflow-hidden ${
                    isActive
                      ? 'bg-gradient-to-r from-emerald-500/20 to-green-500/20 text-white shadow-lg shadow-emerald-500/10 border border-emerald-500/30'
                      : 'text-slate-300 hover:bg-slate-700/50 hover:text-white hover:translate-x-1'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {isActive && (
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-emerald-500 to-green-500 rounded-r-full"></div>
                    )}
                    <span className={`${isActive ? 'text-emerald-400' : 'text-slate-400 group-hover:text-white'} transition-colors flex-shrink-0`}>
                      {item.icon}
                    </span>
                    {!isCollapsed && (
                      <span className="ml-3 font-medium text-sm whitespace-nowrap">
                        {item.label}
                      </span>
                    )}
                    {!isCollapsed && isActive && (
                      <svg className="w-4 h-4 ml-auto text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      
      {/* Footer */}
      <div className="p-4 border-t border-slate-700/50 backdrop-blur-sm">
        {!isCollapsed ? (
          <div className="bg-gradient-to-r from-slate-800/50 to-slate-700/50 rounded-xl p-4 border border-slate-600/30">
            <div className="flex items-center space-x-3 mb-2">
              <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-green-600 rounded-full flex items-center justify-center text-xs font-bold">
                SC
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-white">Wedding & Temple</p>
                <p className="text-xs text-slate-400">Wedding & Temple Platform</p>
              </div>
            </div>
            <div className="text-xs text-slate-400 text-center pt-2 border-t border-slate-600/30">
              © 2025 All Rights Reserved
            </div>
          </div>
        ) : (
          <div className="flex justify-center">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-green-600 rounded-full flex items-center justify-center text-xs font-bold shadow-lg">
              SC
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;