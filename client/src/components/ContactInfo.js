import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ContactInfo() {
  const [contactInfo, setContactInfo] = useState({
    name: '',
    address: '',
    phone: '',
    email: '',
    social_media: {},
  });

  useEffect(() => {
    axios.get('/api/contact')
      .then(response => {
        setContactInfo(response.data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, []);

  return (
    <div>
      <h1>Contact Information</h1>
      <p><strong>Name:</strong> {contactInfo.name}</p>
      <p><strong>Address:</strong> {contactInfo.address}</p>
      <p><strong>Phone:</strong> {contactInfo.phone}</p>
      <p><strong>Email:</strong> {contactInfo.email}</p>
      <p><strong>Social Media:</strong></p>
      <ul>
        {Object.entries(contactInfo.social_media).map(([platform, link], index) => (
          <li key={index}>
            <a href={link} target="_blank" rel="noopener noreferrer">
              {platform}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ContactInfo;
