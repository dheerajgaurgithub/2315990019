import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css'; // Import the CSS file

export default function Header() {
  return (
    <header className="header">
      <nav className="nav">
        <h1 className="logo">
          <Link to="/">📊 Social Dashboard</Link>
        </h1>
        <ul className="nav-links">
          <li><Link to="/" className="nav-link">Top Users</Link></li>
          <li><Link to="/trending" className="nav-link">Trending Posts</Link></li>
          <li><Link to="/feed" className="nav-link">Feed</Link></li>
        </ul>
      </nav>
    </header>
  );
}
