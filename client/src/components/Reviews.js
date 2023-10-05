import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Reviews.css';


function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [productName, setProductName] = useState('');
  const [rating, setRating] = useState('');

  useEffect(() => {
    loadReviews();
  }, []);

  const handleReviewSubmit = (e) => {
    e.preventDefault();

    axios.post('/reviews', {
      author_name: authorName,
      product_name: productName,
      rating: parseInt(rating),
      comment: newReview,
    })
      .then(response => {
        alert(response.data.message);
        setNewReview('');
        setAuthorName('');
        setProductName('');
        setRating('');
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
        <div>
          <label htmlFor="authorName">Author's Name:</label>
          <input
            type="text"
            id="authorName"
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="productName">Product Name:</label>
          <input
            type="text"
            id="productName"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="rating">Rating:</label>
          <input
            type="number"
            id="rating"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="reviewText">Review Text:</label>
          <input
            type="text"
            id="reviewText"
            value={newReview}
            onChange={(e) => setNewReview(e.target.value)}
            required
          />
        </div>
        <button type="submit">Submit Review</button>
      </form>
      <h2>Existing Reviews:</h2>
      <ul>
        {reviews.map((review, index) => (
          <li key={index}>
            <strong>{review.author_name}:</strong> {review.comment} (Rating: {review.rating})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Reviews;
