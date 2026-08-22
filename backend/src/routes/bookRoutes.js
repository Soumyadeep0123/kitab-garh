const express = require('express');
const router = express.Router();
const { getBooks, getBookById, getCategories, createBook, updateBook, deleteBook } = require('../controllers/bookController');
const { protect, authorize } = require('../middleware/auth');

router.get('/', getBooks);
router.get('/categories/list', getCategories);
router.get('/:id', getBookById);

// Admin / Author endpoints
router.post('/', protect, authorize('admin', 'author'), createBook);
router.put('/:id', protect, authorize('admin', 'author'), updateBook);
router.delete('/:id', protect, authorize('admin'), deleteBook);

module.exports = router;
