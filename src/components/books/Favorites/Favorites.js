import React from 'react';
import { useBooks } from '../../../context/BookContext';
import BookList from '../BookList/BookList'; // This should work now
import './Favorites.css';

const Favorites = () => {
  const { getFavoriteBooks } = useBooks();
  const favoriteBooks = getFavoriteBooks();

  return (
    <div className="favorites-page">
      <div className="favorites-header">
        <h1>Your Favorites</h1>
        <p>{favoriteBooks.length} book{favoriteBooks.length !== 1 ? 's' : ''} marked as favorite</p>
      </div>
      
      {favoriteBooks.length > 0 ? (
        <BookList books={favoriteBooks} />
      ) : (
        <div className="empty-state">
          <h2>No favorites yet</h2>
          <p>Start adding books to your favorites by clicking the heart icon!</p>
        </div>
      )}
    </div>
  );
};

export default Favorites;
