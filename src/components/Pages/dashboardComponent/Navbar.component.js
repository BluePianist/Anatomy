import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './CSS/Navbar.css'

export default class Navbar extends Component {

  render() {
    return (
      <nav className="navbar">
        <Link to="/" className="navbar-text">About us</Link>
        <Link to="/" className="navbar-text">Home</Link>
      </nav>
    );
  }
}