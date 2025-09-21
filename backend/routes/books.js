const express = require('express');
const Book = require('../models/Book');
const auth = require('../middleware/auth');
const { body, validationResult } = require('express-validator');

const router = express.Router();

// @route   GET /api/books
// @desc    Get all public books
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { category, search, page = 1, limit = 10 } = req.query;
    
    let query = { isPublic: true };
    
    // Filter by category
    if (category) {
      query.category = new RegExp(category, 'i');
    }
    
    // Search in title, author, or description
    if (search) {
      query.$or = [
        { title: new RegExp(search, 'i') },
        { author: new RegExp(search, 'i') },
        { description: new RegExp(search, 'i') }
      ];
    }
    
    const books = await Book.find(query)
      .populate('owner', 'name email')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);
    
    const total = await Book.countDocuments(query);
    
    res.json({
      books,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/books/my-books
// @desc    Get user's books (both public and private)
// @access  Private
router.get('/my-books', auth, async (req, res) => {
  try {
    const books = await Book.find({ owner: req.user._id })
      .sort({ createdAt: -1 });
    
    res.json(books);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/books/:id
// @desc    Get book by ID
// @access  Public (if public) or Private (if owner)
router.get('/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id).populate('owner', 'name email');
    
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    
    // Check if book is public or user is owner
    if (!book.isPublic && (!req.user || book.owner._id.toString() !== req.user._id.toString())) {
      return res.status(403).json({ message: 'Access denied' });
    }
    
    res.json(book);
  } catch (error) {
    console.error(error.message);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/books
// @desc    Create a new book
// @access  Private
router.post('/', [
  auth,
  body('title', 'Title is required').not().isEmpty(),
  body('author', 'Author is required').not().isEmpty(),
  body('category', 'Category is required').not().isEmpty()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const book = new Book({
      ...req.body,
      owner: req.user._id
    });

    await book.save();
    await book.populate('owner', 'name email');
    
    res.status(201).json(book);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/books/:id
// @desc    Update book
// @access  Private (only owner)
router.put('/:id', auth, async (req, res) => {
  try {
    let book = await Book.findById(req.params.id);
    
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    
    // Check if user owns the book
    if (book.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Access denied' });
    }
    
    book = await Book.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    ).populate('owner', 'name email');
    
    res.json(book);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   DELETE /api/books/:id
// @desc    Delete book
// @access  Private (only owner)
router.delete('/:id', auth, async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    
    // Check if user owns the book
    if (book.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Access denied' });
    }
    
    await Book.findByIdAndDelete(req.params.id);
    
    res.json({ message: 'Book removed' });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;