import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <h1>Flashcard Learning Tool</h1>
      <nav>
        <Link to="/">User</Link>
        <Link to="/admin">Admin</Link>
      </nav>
    </header>
  );
};

export default Header;
