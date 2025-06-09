import React, { useState, useEffect } from "react";
import { NavLink } from 'react-router-dom';
import "../style/Sidebar.css";
import * as BiIcons from 'react-icons/bi';
import HomeIcon from '@mui/icons-material/Home';
import MemoryIcon from '@mui/icons-material/Memory';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import SettingsIcon from '@mui/icons-material/Settings';
import Login from './Login';
import { useAuth } from '../context';

const Sidebar = ({ children }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { token, logout, isAuthenticated } = useAuth();

  const logoff = () => {
    if (window.confirm('Do you want to logoff?')) {
      logout();
    }
  };

  const menuItems = [
    {
      text: "대시보드",
      path: '/',
      icon: <HomeIcon fontSize='large' />,
    },
    {
      text: "기기 연결",
      path: '/devices',
      icon: <MemoryIcon fontSize='large' />,
    },
    {
      text: "앱(서비스) 연결",
      path: '/appIds',
      icon: <AppRegistrationIcon fontSize='large' />,
    },
    {
      text: "설정",
      path: '/settings',
      icon: <SettingsIcon fontSize='large' />,
    },
  ];

  if (!isAuthenticated) {
    return <Login />;
  }

  return (
    <div className="relative flex size-full min-h-screen bg-slate-50" style={{ fontFamily: 'Inter, "Noto Sans", sans-serif' }}>
      <div className={`flex flex-col bg-white border-r border-slate-200 shadow-sm transition-all duration-300 ease-in-out w-64`}>
        <div className="flex items-center p-4 border-b border-slate-200">
          <img className="w-8 h-8 rounded-lg cursor-pointer hover:scale-105 transition-transform" src="icons/io7lab-7.png" alt="logo" />

          <h1 className="ml-3 text-slate-900 text-lg font-semibold leading-tight tracking-tight">
            STAY-SENS
          </h1>
        </div>

        <nav className="flex-1 py-4">
          <div className="space-y-1">
            {menuItems.map(({ text, icon, path }) => (
              <NavLink
                to={path}
                key={text}
                id={`side-${text}`}
                className={({ isActive }) =>
                  `flex items-center px-4 py-3 mx-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${isActive
                    ? "bg-blue-50 text-blue-700 border-l-4 border-blue-600"
                    : "text-slate-700 hover:bg-slate-50 hover:text-slate-900"
                  }`
                }
              >
                <div className="flex items-center justify-center w-5 h-5 text-lg">
                  {icon}
                </div>
                <span className="ml-3 whitespace-nowrap overflow-hidden">
                  {text}
                </span>
              </NavLink>
            ))}
          </div>
        </nav>

        <div className="border-t border-slate-200 p-2">
          <button
            onClick={logoff}
            className="flex items-center w-full px-4 py-3 rounded-lg text-sm font-medium text-slate-700 hover:bg-red-50 hover:text-red-700 transition-colors cursor-pointer"
          >
            <div className="flex items-center justify-center w-5 h-5 text-lg">
              <BiIcons.BiLogOutCircle />
            </div>
            {isExpanded && <span className="ml-3">Logout</span>}
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {children}
      </div>
    </div>
  );
};

export default Sidebar;