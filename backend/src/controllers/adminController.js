const User = require('../models/User');
const Book = require('../models/Book');
const Category = require('../models/Category');
const Purchase = require('../models/Purchase');
const Review = require('../models/Review');

// @desc    Get Admin Dashboard Platform Analytics (Lab Day 2 Module 3)
// @route   GET /api/admin/analytics
// @access  Private/Admin
exports.getAnalytics = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments({ role: 'customer' });
    const totalBooks = await Book.countDocuments();
    const totalCategories = await Category.countDocuments();
    const totalPurchases = await Purchase.countDocuments();
    const totalReviews = await Review.countDocuments();

    const purchases = await Purchase.find();
    const totalRevenue = purchases.reduce((acc, curr) => acc + (curr.amount || 0), 0);

    const recentUsers = await User.find().sort({ createdAt: -1 }).limit(5);
    const recentPurchases = await Purchase.find()
      .populate('user', 'firstName lastName email')
      .populate('book', 'title price coverImage')
      .sort({ purchaseDate: -1 })
      .limit(6);

    const categories = await Category.find();
    const categoryStats = await Promise.all(
      categories.map(async (cat) => {
        const count = await Book.countDocuments({ category: cat._id });
        return {
          name: cat.name,
          slug: cat.slug,
          count
        };
      })
    );

    res.status(200).json({
      success: true,
      stats: {
        totalUsers,
        totalBooks,
        totalCategories,
        totalPurchases,
        totalReviews,
        totalRevenue: Math.round(totalRevenue)
      },
      categoryStats,
      recentUsers,
      recentPurchases
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get all users list
// @route   GET /api/admin/users
// @access  Private/Admin
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: users.length,
      users
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create Category
// @route   POST /api/admin/categories
// @access  Private/Admin
exports.createCategory = async (req, res) => {
  try {
    const { name, description, icon } = req.body;
    const category = await Category.create({ name, description, icon });
    res.status(201).json({
      success: true,
      message: 'Category created successfully',
      category
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
