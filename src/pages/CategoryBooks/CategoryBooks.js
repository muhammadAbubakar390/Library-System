import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useBooks } from '../../context/BookContext';
import { categories } from '../../utils/sampleData';
import BookList from '../../components/books/BookList/BookList';
import './CategoryBooks.css';

const CategoryBooks = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const { getPublicBooks } = useBooks();

  // Find the category
  const category = categories.find(cat => cat.id === categoryId);
  
  if (!category) {
    return (
      <div className="category-books">
        <div className="not-found">
          <h2>Category not found</h2>
          <p>The category you're looking for doesn't exist.</p>
          <button onClick={() => navigate('/categories')} className="back-btn">
            Back to Categories
          </button>
        </div>
      </div>
    );
  }

  // Get books for this category
  const publicBooks = getPublicBooks();
  const categoryBooks = publicBooks.filter(book => 
    book.category.toLowerCase() === category.name.toLowerCase()
  );

  return (
    <div className="category-books">
      <button onClick={() => navigate('/categories')} className="back-btn">
        Back to Categories
      </button>

      <div className="category-header">
        <div className="category-icon">{category.icon}</div>
        <div className="category-info">
          <h1>{category.name}</h1>
          <p>{category.description}</p>
          <span className="books-count">
            {categoryBooks.length} book{categoryBooks.length !== 1 ? 's' : ''}
          </span>
        </div>
      </div>

      {categoryBooks.length > 0 ? (
        <BookList books={categoryBooks} />
      ) : (
        <div className="no-books">
          <h2>No books found in this category</h2>
          <p>Check back later for new additions!</p>
        </div>
      )}
    </div>
  );
};

export default CategoryBooks;