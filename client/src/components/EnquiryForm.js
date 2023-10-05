import React, { useState } from 'react';
import './EnquiryForm.css';


const EnquiryForm = () => {
  const [senderName, setSenderName] = useState('');
  const [receiverName, setReceiverName] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/enquiries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ senderName, receiverName, message }),
      });

      if (response.status === 201) {
        alert('Enquiry submitted successfully');
      } else {
        alert('Enquiry submission failed');
      }
    } catch (error) {
      console.error('Error submitting enquiry:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Sender's Name:</label>
        <input
          type="text"
          value={senderName}
          onChange={(e) => setSenderName(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Receiver's Name:</label>
        <input
          type="text"
          value={receiverName}
          onChange={(e) => setReceiverName(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Message:</label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />
      </div>
      <button type="submit">Submit Enquiry</button>
    </form>
  );
};

export default EnquiryForm;
