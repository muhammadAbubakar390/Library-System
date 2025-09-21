import React, { useState } from 'react';
import { useBooks } from '../../../context/BookContext';
import './AddBook.css';

const AddBook = ({ onClose, onBookAdded }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');
  const [visibility, setVisibility] = useState('public');
  const [tags, setTags] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { addBook } = useBooks();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (!title || !author) {
        throw new Error('Title and author are required');
      }

      const newBook = {
        title,
        author,
        description,
        isPublic: visibility === 'public',
        tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag),
        rating: 0,
        price: 0,
        publicationDate: new Date().toISOString().split('T')[0]
      };

      const addedBook = addBook(newBook);
      onBookAdded(addedBook);
      onClose();
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-book-modal">
      <div className="add-book-content">
        <button className="close-btn" onClick={onClose}>×</button>
        <h2>Add New Book</h2>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title *</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              disabled={loading}
            />
          </div>
          <div className="form-group">
            <label htmlFor="author">Author *</label>
            <input
              type="text"
              id="author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              required
              disabled={loading}
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="4"
              disabled={loading}
            />
          </div>
          <div className="form-group">
            <label htmlFor="tags">Tags (comma-separated)</label>
            <input
              type="text"
              id="tags"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              disabled={loading}
              placeholder="AI, Machine Learning, Programming"
            />
          </div>
          <div className="form-group">
            <label>Visibility</label>
            <div className="visibility-options">
              <label>
                <input
                  type="radio"
                  value="public"
                  checked={visibility === 'public'}
                  onChange={(e) => setVisibility(e.target.value)}
                  disabled={loading}
                />
                Public (visible to everyone)
              </label>
              <label>
                <input
                  type="radio"
                  value="private"
                  checked={visibility === 'private'}
                  onChange={(e) => setVisibility(e.target.value)}
                  disabled={loading}
                />
                Private (only visible to you)
              </label>
            </div>
          </div>
          <div className="form-actions">
            <button 
              type="button" 
              className="cancel-btn"
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="submit-btn"
              disabled={loading}
            >
              {loading ? 'Adding...' : 'Add Book'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBook;