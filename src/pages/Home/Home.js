import React from 'react';
import { useNavigate } from 'react-router-dom';
import BookList from '../../components/books/BookList/BookList';
import { sampleBooks, categories } from '../../utils/sampleData';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();
  const popularTopics = categories.slice(0, 6); // Show first 6 categories
  const publicBooks = sampleBooks.filter(book => book.isPublic);

  const handleCategoryClick = (categoryId) => {
    navigate(`/category/${categoryId}`);
  };

  return (
    <div className="home">
      <section className="hero">
        <div className="hero-content">
          <h1>All the skills you need in one place</h1>
          <p>From critical skills to technical topics, our Library supports your professional development.</p>
        </div>
      </section>

      <section className="popular-topics">
        <h2>Popular Topics</h2>
        <div className="topics-grid">
          {popularTopics.map((topic) => (
            <div 
              key={topic.id} 
              className="topic-card"
              onClick={() => handleCategoryClick(topic.id)}
            >
              <div className="topic-icon">{topic.icon}</div>
              <h3>{topic.name}</h3>
              <p>{topic.count} book{topic.count !== 1 ? 's' : ''}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="featured-books">
        <h2>Featured Books</h2>
        <BookList books={publicBooks} />
      </section>

      <section className="cta-section">
        <div className="cta-content">
          <h2>Unlock your career potential in the AI era</h2>
          <p>Level up with AI and other cutting-edge skills to reach your career goals.</p>
          <button className="cta-button">Start Your Journey Today.</button>
        </div>
      </section>
    </div>
  );
};

export default Home;