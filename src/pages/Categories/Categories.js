import React from 'react';
import { useNavigate } from 'react-router-dom';
import { categories } from '../../utils/sampleData';
import './Categories.css';

const Categories = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (categoryId) => {
    navigate(`/category/${categoryId}`);
  };

  return (
    <div className="categories-page">
      <div className="categories-header">
        <h1>Browse by Category</h1>
        <p>Explore books organized by topics and categories</p>
      </div>
      
      <div className="categories-grid">
        {categories.map(category => (
          <div 
            key={category.id} 
            className="category-card"
            onClick={() => handleCategoryClick(category.id)}
          >
            <div className="category-icon">{category.icon}</div>
            <h3>{category.name}</h3>
            <p>{category.description}</p>
            <span className="book-count">{category.count} book{category.count !== 1 ? 's' : ''}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;