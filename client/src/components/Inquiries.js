import React, { useState } from 'react';

function InquiryForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSubmit = () => {
    // Frontend validation 
    if (name.trim() !== '' && isValidEmail(email) && message.trim() !== '') {
      // Send inquiry data to the backend via API
      // Handle success or error response from the backend
    } else {
      // Display validation errors to the user
    }
  };

  const isValidEmail = (email) => {
    // Implement email validation logic 
    return email.includes('@') && email.includes('.');
  };

  return (
    <div>
      <h2>Contact the Dealer</h2>
      <label>
        Name:
        <input type="text" value={name} onChange={handleNameChange} />
      </label>
      <label>
        Email:
        <input type="email" value={email} onChange={handleEmailChange} />
      </label>
      <label>
        Message:
        <textarea value={message} onChange={handleMessageChange} />
      </label>
      <button onClick={handleSubmit}>Submit Inquiry</button>
    </div>
  );
}

export default InquiryForm;
