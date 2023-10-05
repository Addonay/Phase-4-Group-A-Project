import React from 'react';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';

const contactInfo = {
  name: 'Kenyan Car Dealership',
  address: '123 Nairobi Road, Nairobi, Kenya',
  phone: '+254-123-456-789',
  email: 'info@kenyancars.com',
  social_media: {
    facebook: 'https://www.facebook.com/kenyancars',
    twitter: 'https://twitter.com/kenyancars',
    instagram: 'https://www.instagram.com/kenyancars/',
  },
};

function Footer() {
  return (
    <footer>
      <div className="footer-content">
        <p>&copy; {new Date().getFullYear()} Cars</p>
        <div className="contact-info">
          <p>{contactInfo.name}</p>
          <p>{contactInfo.address}</p>
          <p>Phone: {contactInfo.phone}</p>
          <p>Email: {contactInfo.email}</p>
        </div>
        <div className="social-media-links">
          <a
            href={contactInfo.social_media.facebook}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FacebookIcon />
          </a>
          <a
            href={contactInfo.social_media.twitter}
            target="_blank"
            rel="noopener noreferrer"
          >
            <TwitterIcon />
          </a>
          <a
            href={contactInfo.social_media.instagram}
            target="_blank"
            rel="noopener noreferrer"
          >
            <InstagramIcon />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
