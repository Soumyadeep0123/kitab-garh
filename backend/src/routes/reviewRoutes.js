const express = require('express');
const router = express.Router();
const { getBookReviews, addReview } = require('../controllers/reviewController');
const { protect } = require('../middleware/auth');

router.get('/book/:bookId', getBookReviews);
router.post('/', protect, addReview);

module.exports = router;
