import React, { useState } from 'react';
import './ReviewsAndRatings.css';

function ReviewsAndRatings() {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const handleRatingChange = (event) => {
    setRating(event.target.value);
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleSubmit = () => {
    // Frontend validation 
    if (rating >= 1 && rating <= 5 && comment.trim() !== '') {
      // Simulate sending review data to the backend via API
      fetch('/submit-review', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ rating, comment }),
      })
        .then((response) => response.json())
        .then((data) => {
          // Handle success or error response from the backend
          alert(data.message); // You can replace this with your actual handling logic
        })
        .catch((error) => {
          // Handle error
          console.error(error);
        });
    } else {
      // Display validation errors to the user
      alert('Please provide a valid rating (1-5) and a comment.');
    }
  };

  return (
    <div>
      <h2>Reviews & Ratings</h2>
      <form>
        <label>
          Rating:
          <input type="number" value={rating} onChange={handleRatingChange} />
        </label>
        <label>
          Comment:
          <textarea value={comment} onChange={handleCommentChange} />
        </label>
        <button onClick={handleSubmit}>Submit Review</button>
      </form>
     
    </div>
  );
}

export default ReviewsAndRatings;
