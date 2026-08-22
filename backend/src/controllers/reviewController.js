const Review = require('../models/Review');
const Book = require('../models/Book');

// @desc    Get reviews for a book
// @route   GET /api/reviews/book/:bookId
// @access  Public
exports.getBookReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ book: req.params.bookId })
      .populate('user', 'firstName lastName avatar username')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: reviews.length,
      reviews
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Add review for a book (Lab Day 2 Functional Req)
// @route   POST /api/reviews
// @access  Private
exports.addReview = async (req, res) => {
  try {
    const { bookId, rating, comment } = req.body;

    if (!bookId || !rating || !comment) {
      return res.status(400).json({
        success: false,
        message: 'Please provide book ID, rating (1-5), and a review comment.'
      });
    }

    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ success: false, message: 'Book not found' });
    }

    // Check if user already reviewed
    const existingReview = await Review.findOne({ user: req.user.id, book: bookId });
    if (existingReview) {
      existingReview.rating = Number(rating);
      existingReview.comment = comment;
      await existingReview.save();

      // Recalculate average rating
      await updateBookRating(bookId);

      return res.status(200).json({
        success: true,
        message: 'Your review was updated successfully!',
        review: existingReview
      });
    }

    const review = await Review.create({
      user: req.user.id,
      userName: `${req.user.firstName} ${req.user.lastName}`,
      userAvatar: req.user.avatar,
      book: bookId,
      rating: Number(rating),
      comment
    });

    // Recalculate average rating
    await updateBookRating(bookId);

    res.status(201).json({
      success: true,
      message: 'Review posted successfully!',
      review
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

async function updateBookRating(bookId) {
  const reviews = await Review.find({ book: bookId });
  if (reviews.length > 0) {
    const totalScore = reviews.reduce((acc, curr) => acc + curr.rating, 0);
    const avg = (totalScore / reviews.length).toFixed(1);
    await Book.findByIdAndUpdate(bookId, {
      averageRating: Number(avg),
      ratingsCount: reviews.length
    });
  }
}
