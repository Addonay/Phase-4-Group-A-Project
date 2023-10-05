import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState('');

  useEffect(() => {
    axios.get('/reviews')
      .then(response => {
        setReviews(response.data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, []); 

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    
    axios.post('/reviews', { text: newReview })
      .then(response => {
        alert(response.data.message);
        setNewReview('');
        loadReviews();
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  const loadReviews = () => {
    axios.get('/reviews')
      .then(response => {
        setReviews(response.data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  return (
    <div>
      <h1>Reviews</h1>
      <form onSubmit={handleReviewSubmit}>
        <label htmlFor="reviewText">Review Text:</label>
        <input
          type="text"
          id="reviewText"
          value={newReview}
          onChange={(e) => setNewReview(e.target.value)}
          required
        />
        <button type="submit">Submit Review</button>
      </form>
      <h2>Existing Reviews:</h2>
      <ul>
        {reviews.map((review, index) => (
          <li key={index}>
            <strong>{review.author}:</strong> {review.content} (Rating: {review.rating})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Reviews;
