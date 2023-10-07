import React from 'react';

function Footer() {
  return (
    <footer>
      <div className="footer-content">
        <p>&copy; {new Date().getFullYear()} Cars</p>
      </div>
    </footer>
  );
}

export default Footer;
