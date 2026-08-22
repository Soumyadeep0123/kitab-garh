const Purchase = require('../models/Purchase');
const ReadingProgress = require('../models/ReadingProgress');
const Book = require('../models/Book');

// @desc    Get user's purchased books and reading progress ("My Library")
// @route   GET /api/library
// @access  Private
exports.getMyLibrary = async (req, res) => {
  try {
    const purchases = await Purchase.find({ user: req.user.id })
      .populate({
        path: 'book',
        populate: { path: 'category', select: 'name slug icon' }
      })
      .sort({ purchaseDate: -1 });

    const progressList = await ReadingProgress.find({ user: req.user.id });
    const progressMap = {};
    progressList.forEach(p => {
      progressMap[p.book.toString()] = p;
    });

    const libraryItems = purchases
      .filter(p => p.book !== null)
      .map(p => {
        const bookId = p.book._id.toString();
        const progress = progressMap[bookId] || {
          percentage: 0,
          currentChapter: 1,
          currentPage: 1,
          bookmarks: []
        };
        return {
          purchaseId: p._id,
          purchaseDate: p.purchaseDate,
          book: p.book,
          progress
        };
      });

    res.status(200).json({
      success: true,
      count: libraryItems.length,
      library: libraryItems
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Add book to library / Purchase eBook (Lab Day 2 Functional Req)
// @route   POST /api/library/add
// @access  Private
exports.addToLibrary = async (req, res) => {
  try {
    const { bookId } = req.body;
    const book = await Book.findById(bookId);

    if (!book) {
      return res.status(404).json({ success: false, message: 'Book not found' });
    }

    // Check if already in library
    const existing = await Purchase.findOne({ user: req.user.id, book: bookId });
    if (existing) {
      return res.status(200).json({
        success: true,
        message: 'This book is already in your library!',
        purchase: existing
      });
    }

    const purchase = await Purchase.create({
      user: req.user.id,
      book: bookId,
      amount: book.price || 0,
      paymentStatus: 'completed'
    });

    // Initialize reading progress
    await ReadingProgress.create({
      user: req.user.id,
      book: bookId,
      currentChapter: 1,
      currentPage: 1,
      totalPages: book.chapters?.length || 5,
      percentage: 0
    });

    res.status(201).json({
      success: true,
      message: 'Book successfully added to your KitabGhar Library!',
      purchase
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get reading progress for a specific book
// @route   GET /api/library/progress/:bookId
// @access  Private
exports.getProgress = async (req, res) => {
  try {
    let progress = await ReadingProgress.findOne({
      user: req.user.id,
      book: req.params.bookId
    });

    if (!progress) {
      const book = await Book.findById(req.params.bookId);
      progress = await ReadingProgress.create({
        user: req.user.id,
        book: req.params.bookId,
        currentChapter: 1,
        currentPage: 1,
        totalPages: book?.chapters?.length || 5,
        percentage: 0
      });
    }

    res.status(200).json({
      success: true,
      progress
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update reading progress and bookmarks (Lab Day 2 Sync Requirement)
// @route   PUT /api/library/progress/:bookId
// @access  Private
exports.updateProgress = async (req, res) => {
  try {
    const { currentChapter, currentPage, totalPages, bookmarks } = req.body;

    const book = await Book.findById(req.params.bookId);
    const total = totalPages || (book?.chapters?.length || 5);
    const curr = currentChapter || 1;
    const percentage = Math.min(100, Math.round((curr / total) * 100));

    const updateData = {
      currentChapter: curr,
      currentPage: currentPage || 1,
      totalPages: total,
      percentage,
      lastReadAt: new Date()
    };

    if (bookmarks) {
      updateData.bookmarks = bookmarks;
    }

    const progress = await ReadingProgress.findOneAndUpdate(
      { user: req.user.id, book: req.params.bookId },
      updateData,
      { new: true, upsert: true }
    );

    res.status(200).json({
      success: true,
      progress
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
