import React from 'react';
import "../App.css"
const Header = () => {
  return (
    <header className="header">
      <div className="logo-button">Logo</div>
      <h2 className="header-title">Macroeconomic Researcher Food Security Time Series and Large Language Chat GPT Dashboard</h2>
      <select className="country-dropdown-button">
        <option disabled>Country Flag</option>
        <option>India</option>
        <option>USA</option>
        <option>China</option>
      </select>
    </header>
  );
};

export default Header;
