import React from 'react';

function Footer() {
  return (
    <footer>
      <div className="footer-content">
        <p>&copy; {new Date().getFullYear()} Car Dealership App</p>
      </div>
    </footer>
  );
}

export default Footer;
