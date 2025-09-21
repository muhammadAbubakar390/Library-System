const express = require('express');
const User = require('../models/User');    // Fixed path and case
const Book = require('../models/Book');    // Fixed path
const auth = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/users/favorites
// @desc    Get user's favorite books
// @access  Private
router.get('/favorites', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate('favorites');
    res.json(user.favorites);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/users/favorites/:bookId
// @desc    Add book to favorites
// @access  Private
router.post('/favorites/:bookId', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const bookId = req.params.bookId;

    if (user.favorites.includes(bookId)) {
      return res.status(400).json({ message: 'Book already in favorites' });
    }

    user.favorites.push(bookId);
    await user.save();

    await user.populate('favorites');
    res.json(user.favorites);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   DELETE /api/users/favorites/:bookId
// @desc    Remove book from favorites
// @access  Private
router.delete('/favorites/:bookId', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const bookId = req.params.bookId;

    user.favorites = user.favorites.filter(id => id.toString() !== bookId);
    await user.save();

    await user.populate('favorites');
    res.json(user.favorites);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/users/profile
// @desc    Get user profile
// @access  Private
router.get('/profile', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    const bookCount = await Book.countDocuments({ owner: req.user._id });
    
    res.json({
      user,
      stats: {
        bookCount,
        favoriteCount: user.favorites.length
      }
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;