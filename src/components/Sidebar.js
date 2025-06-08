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
      text: "Home",
      path: '/',
      icon: <HomeIcon fontSize='large' />,
    },
    {
      text: "Devices",
      path: '/devices',
      icon: <MemoryIcon fontSize='large' />,
    },
    {
      text: "Apps",
      path: '/appIds',
      icon: <AppRegistrationIcon fontSize='large' />,
    },
    {
      text: "Settings",
      path: '/settings',
      icon: <SettingsIcon fontSize='large' />,
    },
  ];

  if (!isAuthenticated) {
    return <Login />;
  }

  return (
    <div className='container'>
      <div
        className={
          isExpanded
            ? "sidebar-container"
            : "sidebar-container sidebar-container-out"
        }
        onMouseLeave={() => setIsExpanded(false)}
      >
        <div className="nav-upper">
          <div className="nav-heading">
            <img
              className="logo"
              src="icons/io7lab-7.png"
              width="40"
              alt="logo"
              onClick={() => setIsExpanded(!isExpanded)}
              onMouseOver={() => setIsExpanded(true)}
            />
            {isExpanded && <p className="nav-heading-title">io7 Device Console</p>}
          </div>
        </div>
        <div className="nav-menu">
          {menuItems.map(({ text, icon, path }) => (
            <NavLink to={path} key={text} id={`side-${text}`} className="menu-item">
              <div className='menu-item-icon'>{icon}</div>
              {isExpanded && <div className='menu-item-text'>{text}</div>}
            </NavLink>
          ))}
          <div className="nav-footer" onClick={logoff}>
            <div className='logout-icon'><BiIcons.BiLogOutCircle /></div>
          </div>
        </div>
      </div>
      <div className="children-container">{children}</div>
    </div>
  );
};

export default Sidebar;