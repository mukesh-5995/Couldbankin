import React, { useState } from 'react';
import './Menu.css'; // Import the CSS file

const Menu = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isMenuOpen, setMenuOpen] = useState(false); // Mobile menu state
  const userName = "John Doe";
  const companyName = "Cloudbankin";
  const initial = userName.split(" ").map(word => word[0]).join(""); // JD for John Doe

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleProfileClick = () => {
    console.log("Navigating to profile...");
  };

  const handleLogoutClick = () => {
    console.log("Logging out...");
  };

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  return (
    <div>
      <nav className={`menu ${isMenuOpen ? 'menu-open' : ''}`}>
        <div className="logo"><span className="logoinitial">CB</span>{companyName}</div>
        <div className="menu-items">
          <div className="user-menu">
            <div className="user-name" onClick={toggleDropdown}>
              <span className="initial">{initial}</span>
              <span className="full-name">{userName}</span>
              <span className="dropdown-arrow">&#x025BD;</span>
            </div>
            {isDropdownOpen && (
              <div className="dropdown-menu">
                <div className="dropdown-item" onClick={handleProfileClick}>
                  Profile
                </div>
                <div className="dropdown-item" onClick={handleLogoutClick}>
                  Logout
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="menu-toggle" onClick={toggleMenu}>
            <span className="menu-icon">☰</span>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="mobile-menu">
          <div className="logo"><span className="logoinitial">CB</span>{companyName}</div>
          <div className="mobile-item" onClick={handleProfileClick}>
            Profile
          </div>
          <div className="mobile-item" onClick={handleLogoutClick}>
            Logout
          </div>
        </div>
      )}
    </div>
  );
};

export default Menu;
