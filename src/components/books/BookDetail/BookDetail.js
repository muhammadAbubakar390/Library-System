import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useBooks } from '../../../context/BookContext';
import { useAuth } from '../../../context/AuthContext';
import './BookDetail.css';

const BookDetail = () => {
  const { bookId } = useParams();
  const navigate = useNavigate();
  const { books, toggleFavorite } = useBooks();
  const { currentUser } = useAuth();

  // Find the book by ID
  const book = books.find(b => b.id === parseInt(bookId));
const BookDetail = () => {
  return (
    <div className="book-detail">
      <h2>Book Detail Page</h2>
      <p>This will show detailed information about a book.</p>
    </div>
  );
};
  // If book not found, show error
  if (!book) {
    return (
      <div className="book-detail">
        <div className="book-not-found">
          <h2>Book Not Found</h2>
          <p>The book you're looking for doesn't exist.</p>
          <button onClick={() => navigate('/')} className="back-btn">
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  const handleFavoriteClick = () => {
    if (currentUser) {
      toggleFavorite(book.id);
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={i} className="star">★</span>);
    }

    if (hasHalfStar) {
      stars.push(<span key="half" className="star">☆</span>);
    }

    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<span key={`empty-${i}`} className="star empty">★</span>);
    }

    return stars;
  };

  return (
    <div className="book-detail">
      <button onClick={() => navigate(-1)} className="back-btn">
        Back
      </button>

      <div className="book-detail-content">
        <div className="book-detail-header">
          <div className="book-cover">
            <div className="book-cover-placeholder">
              <span>{book.title.charAt(0)}</span>
            </div>
            {currentUser && (
              <button 
                className={`favorite-btn-large ${book.isFavorite ? 'favorited' : ''}`}
                onClick={handleFavoriteClick}
                aria-label={book.isFavorite ? 'Remove from favorites' : 'Add to favorites'}
              >
                ♥
              </button>
            )}
            {!book.isPublic && (
              <div className="private-badge-large">Private</div>
            )}
          </div>

          <div className="book-info">
            <h1>{book.title}</h1>
            <p className="book-author">By {book.author}</p>
            
            <div className="book-rating-large">
              <span className="rating-stars">{renderStars(book.rating)}</span>
              <span className="rating-value">{book.rating}</span>
              <span className="rating-count">({book.reviews.toLocaleString()} reviews)</span>
            </div>

            {book.price > 0 ? (
              <div className="book-price-large">
                <span className="current-price">${book.price}</span>
                {book.originalPrice && book.originalPrice > book.price && (
                  <span className="original-price">${book.originalPrice}</span>
                )}
              </div>
            ) : (
              <div className="book-price-large">
                <span className="free-label">Free</span>
              </div>
            )}

            {book.isBestseller && (
              <div className="bestseller-badge-large">Bestseller</div>
            )}

            <div className="publication-date">
              Published: {formatDate(book.publicationDate)}
            </div>
          </div>
        </div>

        <div className="book-detail-body">
          <div className="book-description">
            <h2>Description</h2>
            <p>{book.description || 'No description available for this book.'}</p>
          </div>

          {book.tags && book.tags.length > 0 && (
            <div className="book-tags-section">
              <h2>Tags</h2>
              <div className="tags-container">
                {book.tags.map((tag, index) => (
                  <span key={index} className="tag-large">{tag}</span>
                ))}
              </div>
            </div>
          )}

          <div className="book-metadata">
            <h2>Book Details</h2>
            <div className="metadata-grid">
              <div className="metadata-item">
                <span className="metadata-label">Visibility:</span>
                <span className="metadata-value">{book.isPublic ? 'Public' : 'Private'}</span>
              </div>
              <div className="metadata-item">
                <span className="metadata-label">Rating:</span>
                <span className="metadata-value">{book.rating}/5</span>
              </div>
              <div className="metadata-item">
                <span className="metadata-label">Reviews:</span>
                <span className="metadata-value">{book.reviews.toLocaleString()}</span>
              </div>
              <div className="metadata-item">
                <span className="metadata-label">Published:</span>
                <span className="metadata-value">{formatDate(book.publicationDate)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetail;