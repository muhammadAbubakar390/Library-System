import React, { useState } from 'react';
import { useBooks } from '../../context/BookContext';
import { useAuth } from '../../context/AuthContext';
import BookList from '../../components/books/BookList/BookList'; // Fixed path for all
import AddBook from '../../components/books/AddBook/AddBook';
import Favorites from '../../components/books/Favorites/Favorites';
import './Dashboard.css';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [showAddBook, setShowAddBook] = useState(false);
  const { getPublicBooks, getUserPrivateBooks } = useBooks();
  const { currentUser } = useAuth();

  const publicBooks = getPublicBooks();
  const privateBooks = getUserPrivateBooks(currentUser?.id);
  const allBooks = [...publicBooks, ...privateBooks];

  const handleBookAdded = (newBook) => {
    setShowAddBook(false);
    console.log('Book added:', newBook);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'all':
        return <BookList books={allBooks} />;
      case 'public':
        return <BookList books={publicBooks} />;
      case 'private':
        return <BookList books={privateBooks} />;
      case 'favorites':
        return <Favorites />;
      default:
        return <BookList books={allBooks} />;
    }
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Your Library</h1>
        <p>Manage your book collection and favorites</p>
        <button 
          className="add-book-btn"
          onClick={() => setShowAddBook(true)}
        >
          + Add New Book
        </button>
      </div>

      <div className="dashboard-tabs">
        <button 
          className={activeTab === 'all' ? 'tab active' : 'tab'}
          onClick={() => setActiveTab('all')}
        >
          All Books ({allBooks.length})
        </button>
        <button 
          className={activeTab === 'public' ? 'tab active' : 'tab'}
          onClick={() => setActiveTab('public')}
        >
          Public Books ({publicBooks.length})
        </button>
        <button 
          className={activeTab === 'private' ? 'tab active' : 'tab'}
          onClick={() => setActiveTab('private')}
        >
          Private Books ({privateBooks.length})
        </button>
        <button 
          className={activeTab === 'favorites' ? 'tab active' : 'tab'}
          onClick={() => setActiveTab('favorites')}
        >
          Favorites
        </button>
      </div>

      <div className="dashboard-content">
        {renderContent()}
      </div>

      {showAddBook && (
        <AddBook 
          onClose={() => setShowAddBook(false)}
          onBookAdded={handleBookAdded}
        />
      )}
    </div>
  );
};

export default Dashboard;