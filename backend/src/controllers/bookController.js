const Book = require('../models/Book');
const Category = require('../models/Category');
const Purchase = require('../models/Purchase');

// @desc    Get all books with filtering, searching, sorting, pagination
// @route   GET /api/books
// @access  Public
exports.getBooks = async (req, res) => {
  try {
    const { search, category, minPrice, maxPrice, sort, featured, page = 1, limit = 12 } = req.query;

    const query = {};

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { author: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    if (category && category !== 'all') {
      // match category slug or name or ID
      const catObj = await Category.findOne({
        $or: [{ slug: category }, { name: { $regex: category, $options: 'i' } }]
      });
      if (catObj) {
        query.category = catObj._id;
      }
    }

    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    if (featured === 'true') {
      query.featured = true;
    }

    let sortOption = { createdAt: -1 };
    if (sort === 'price-low') sortOption = { price: 1 };
    if (sort === 'price-high') sortOption = { price: -1 };
    if (sort === 'rating') sortOption = { averageRating: -1 };
    if (sort === 'popular') sortOption = { ratingsCount: -1 };
    if (sort === 'title') sortOption = { title: 1 };

    const skip = (Number(page) - 1) * Number(limit);
    const total = await Book.countDocuments(query);
    const books = await Book.find(query)
      .populate('category', 'name slug icon')
      .sort(sortOption)
      .skip(skip)
      .limit(Number(limit));

    res.status(200).json({
      success: true,
      count: books.length,
      total,
      totalPages: Math.ceil(total / Number(limit)),
      currentPage: Number(page),
      books
    });
  } catch (error) {
    console.error('getBooks error:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get single book by ID
// @route   GET /api/books/:id
// @access  Public
exports.getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id).populate('category', 'name slug icon');
    if (!book) {
      return res.status(404).json({
        success: false,
        message: 'Book not found'
      });
    }

    // Check if current user has purchased or owns it
    let isOwned = false;
    if (req.user) {
      const purchase = await Purchase.findOne({ user: req.user.id, book: book._id });
      if (purchase || book.isFree || book.price === 0) {
        isOwned = true;
      }
    }

    res.status(200).json({
      success: true,
      book,
      isOwned
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get all categories
// @route   GET /api/books/categories/list
// @access  Public
exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort({ name: 1 });
    res.status(200).json({
      success: true,
      categories
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Create a new eBook (Admin/Author only)
// @route   POST /api/books
// @access  Private/Admin
exports.createBook = async (req, res) => {
  try {
    const { title, author, authorBio, category, description, price, isFree, coverImage, pagesCount, format, fileUrl, chapters, featured } = req.body;

    let catObj = null;
    if (category) {
      if (category.match(/^[0-9a-fA-F]{24}$/)) {
        catObj = await Category.findById(category);
      }
      if (!catObj) {
        catObj = await Category.findOne({
          $or: [{ name: category }, { slug: category }]
        });
      }
    }

    const newBook = await Book.create({
      title,
      author,
      authorBio: authorBio || 'Author and educator.',
      category: catObj ? catObj._id : category,
      categoryName: catObj ? catObj.name : 'General',
      description,
      price: isFree ? 0 : Number(price || 0),
      isFree: Boolean(isFree),
      coverImage: coverImage || 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=500&q=80',
      pagesCount: Number(pagesCount || 100),
      format: format || (fileUrl ? 'PDF & Web Reader' : 'Web Reader'),
      fileUrl: fileUrl || '',
      chapters: chapters && chapters.length > 0 ? chapters : [
        { chapterNumber: 1, title: 'Introduction', content: 'Welcome to this eBook. Full content is available in the reader.' }
      ],
      featured: Boolean(featured)
    });

    if (catObj) {
      await Category.findByIdAndUpdate(catObj._id, { $inc: { bookCount: 1 } });
    }

    res.status(201).json({
      success: true,
      message: 'eBook created successfully!',
      book: newBook
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Update book
// @route   PUT /api/books/:id
// @access  Private/Admin
exports.updateBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!book) {
      return res.status(404).json({ success: false, message: 'Book not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Book updated successfully',
      book
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete book
// @route   DELETE /api/books/:id
// @access  Private/Admin
exports.deleteBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) {
      return res.status(404).json({ success: false, message: 'Book not found' });
    }

    await Category.findByIdAndUpdate(book.category, { $inc: { bookCount: -1 } });

    res.status(200).json({
      success: true,
      message: 'Book deleted successfully'
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
