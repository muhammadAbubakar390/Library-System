import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useBooks } from '../../../context/BookContext';
import { useAuth } from '../../../context/AuthContext';
import './BookCard.css';

const BookCard = ({ book }) => {
  const navigate = useNavigate();
  const { toggleFavorite } = useBooks();
  const { currentUser } = useAuth();

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

  const handleFavoriteClick = (e) => {
    e.stopPropagation(); // Prevent navigating to book detail
    if (currentUser) {
      toggleFavorite(book.id);
    }
  };

  const handleCardClick = () => {
    navigate(`/book/${book.id}`);
  };

  return (
    <div className="book-card" onClick={handleCardClick}>
      <div className="book-image">
        <div className="book-placeholder">
          <span>{book.title.charAt(0)}</span>
        </div>
        {currentUser && (
          <button 
            className={`favorite-btn ${book.isFavorite ? 'favorited' : ''}`}
            onClick={handleFavoriteClick}
            aria-label={book.isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            ♥
          </button>
        )}
        {!book.isPublic && (
          <div className="private-badge">Private</div>
        )}
      </div>
      <div className="book-content">
        <h3 className="book-title">{book.title}</h3>
        <p className="book-author">{book.author}</p>
        <div className="book-rating">
          <span className="rating-stars">{renderStars(book.rating)}</span>
          <span className="rating-value">{book.rating}</span>
          <span className="rating-count">({book.reviews.toLocaleString()})</span>
        </div>
        {book.price > 0 ? (
          <div className="book-price">
            <span className="current-price">${book.price}</span>
            {book.originalPrice && book.originalPrice > book.price && (
              <span className="original-price">${book.originalPrice}</span>
            )}
          </div>
        ) : (
          <div className="book-price">
            <span className="free-label">Free</span>
          </div>
        )}
        {book.isBestseller && (
          <div className="bestseller-badge">Bestseller</div>
        )}
        {book.tags && book.tags.length > 0 && (
          <div className="book-tags">
            {book.tags.slice(0, 3).map((tag, index) => (
              <span key={index} className="tag">{tag}</span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BookCard;