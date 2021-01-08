import React, { useContext } from 'react';
// import classNames from 'classnames';
import logo from "./../assets/logo.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome,
  faChartLine,
  faAddressCard,
  faChartPie,
  faCogs,
  faDoorOpen
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { AuthContext } from './../context/AuthContext'

const navItems = [
  {
    label: 'Home',
    path: '',
    icon: faHome,
    allowedRoles: ['user', 'admin']
  },
  {
    label: 'Dashboard',
    path: 'dashboard',
    icon: faChartLine,
    allowedRoles: ['user', 'admin']
  },
  {
    label: 'Inventory',
    path: 'inventory',
    icon: faChartPie,
    allowedRoles: ['admin']
  },
  {
    label: 'Gallery',
    path: 'gallery',
    icon: faAddressCard,
    allowedRoles: ['user', 'admin']
  },
  {
    label: 'Settings',
    path: 'settings',
    icon: faCogs,
    allowedRoles: ['admin']
  },
  {
    label: 'Users',
    path: 'users',
    icon: faDoorOpen,
    allowedRoles: ['admin']
  }
];

const NavItem = ({ navItem }) => {
  // const location = useLocation();
  // const isCurrentRoute = location.pathname === `/${navItem.path}`;
  // const classes = classNames({
  //   'px-2 sm:px-6 justify-center sm:justify-start py-3 rounded-full flex': true,
  //   'text-gray-600 hover:text-blue-500 transform hover:translate-x-1 transition ease-in-out duration-100': !isCurrentRoute,
  //   'bg-gradient text-gray-100 shadow-lg': isCurrentRoute
  // });
  return (
    <Link to={navItem.path} className="anchor">
      <div className="sidebar-items">
        <div className="sidebar-icons">
          <FontAwesomeIcon icon={navItem.icon} />
        </div>
        <span className="hidden sm:block">
          {navItem.label}
        </span>
      </div>
    </Link>
  );
};

const NavItemContainer = ({ children }) => (
  <div>{children}</div>
);

const Sidebar = () => {
  const authContext = useContext(AuthContext)
  const { role } = authContext.authState.userInfo
  return (
    <section className="sidebar-container">
      <div className="sidebar-logo">
        <img src={logo} className="sidebar-logo" alt="Brand Logo" width="70" height="70" />
      </div>
      <div className="sidebar-items-container">
        {navItems.map((navItem, i) => (
          <div key={i}>
            {authContext.isAdmin() &&
            navItem.allowedRoles.includes(role) && (
              <NavItemContainer>
                <NavItem navItem={navItem} />
              </NavItemContainer>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Sidebar;
