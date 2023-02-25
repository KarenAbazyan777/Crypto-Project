import React from 'react';
import logo from './logo.png';
import { Link } from 'react-router-dom';
import './Header.css';
import Search from '../search';

const Header = (props) => {
  return (
    <div className="Header">
      <Link to={'/'}>
      <img src={logo} alt="logo" className="Header-logo" />      
      </Link>
      <Search/>
    </div>
  );
}

export default Header;
