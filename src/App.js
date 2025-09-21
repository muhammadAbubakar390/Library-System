import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { BookProvider } from './context/BookContext';
import Header from './components/common/Header/Header';
import Home from './pages/Home/Home';
import Categories from './pages/Categories/Categories';
import CategoryBooks from './pages/CategoryBooks/CategoryBooks';
import Dashboard from './pages/Dashboard/Dashboard';
import Favorites from './components/books/Favorites/Favorites';
import BookDetail from './components/books/BookDetail/BookDetail';
import NotFound from './pages/NotFound/NotFound';
import PrivateRoute from './components/auth/PrivateRoute/PrivateRoute';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <BookProvider>
        <Router>
          <div className="App">
            <Header />
            <main>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/categories" element={<Categories />} />
                <Route path="/category/:categoryId" element={<CategoryBooks />} />
                <Route 
                  path="/dashboard" 
                  element={
                    <PrivateRoute>
                      <Dashboard />
                    </PrivateRoute>
                  } 
                />
                <Route 
                  path="/favorites" 
                  element={
                    <PrivateRoute>
                      <Favorites />
                    </PrivateRoute>
                  } 
                />
                <Route path="/book/:bookId" element={<BookDetail />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
          </div>
        </Router>
      </BookProvider>
    </AuthProvider>
  );
}

export default App;