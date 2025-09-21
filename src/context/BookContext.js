import React, { createContext, useContext, useState, useEffect } from 'react';
import { sampleBooks, privateBooks } from '../utils/sampleData';

const BookContext = createContext();

export const useBooks = () => {
  return useContext(BookContext);
};

export const BookProvider = ({ children }) => {
  const [books, setBooks] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load data on component mount
  useEffect(() => {
    const savedBooks = localStorage.getItem('libraryBooks');
    const savedFavorites = localStorage.getItem('libraryFavorites');
    
    if (savedBooks) {
      setBooks(JSON.parse(savedBooks));
    } else {
      // Initialize with sample data
      const allBooks = [...sampleBooks, ...privateBooks];
      setBooks(allBooks);
      localStorage.setItem('libraryBooks', JSON.stringify(allBooks));
    }
    
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
    
    setLoading(false);
  }, []);

  // Save to localStorage whenever books or favorites change
  useEffect(() => {
    if (!loading) {
      localStorage.setItem('libraryBooks', JSON.stringify(books));
    }
  }, [books, loading]);

  useEffect(() => {
    if (!loading) {
      localStorage.setItem('libraryFavorites', JSON.stringify(favorites));
    }
  }, [favorites, loading]);

  // Add a new book
  const addBook = (newBook) => {
    const bookToAdd = {
      ...newBook,
      id: Date.now(), // Simple ID generation
      reviews: 0,
      isFavorite: false
    };
    
    setBooks(prevBooks => [...prevBooks, bookToAdd]);
    return bookToAdd;
  };

  // Toggle favorite status
  const toggleFavorite = (bookId) => {
    setBooks(prevBooks => 
      prevBooks.map(book => 
        book.id === bookId 
          ? { ...book, isFavorite: !book.isFavorite } 
          : book
      )
    );
    
    setFavorites(prevFavorites => {
      if (prevFavorites.includes(bookId)) {
        return prevFavorites.filter(id => id !== bookId);
      } else {
        return [...prevFavorites, bookId];
      }
    });
  };

  // Get user's private books
  const getUserPrivateBooks = (userId) => {
    return books.filter(book => !book.isPublic);
  };

  // Get all public books
  const getPublicBooks = () => {
    return books.filter(book => book.isPublic);
  };

  // Get favorite books
  const getFavoriteBooks = () => {
    return books.filter(book => favorites.includes(book.id));
  };

  // Get books by category
  const getBooksByCategory = (categoryName) => {
    return books.filter(book => 
      book.isPublic && book.category && book.category.toLowerCase() === categoryName.toLowerCase()
    );
  };

  const value = {
    books,
    favorites,
    loading,
    addBook,
    toggleFavorite,
    getUserPrivateBooks,
    getPublicBooks,
    getFavoriteBooks,
    getBooksByCategory
  };

  return (
    <BookContext.Provider value={value}>
      {!loading && children}
    </BookContext.Provider>
  );
};