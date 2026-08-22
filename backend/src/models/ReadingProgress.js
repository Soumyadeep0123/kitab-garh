const mongoose = require('mongoose');

const readingProgressSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  book: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book',
    required: true
  },
  currentChapter: {
    type: Number,
    default: 1
  },
  currentPage: {
    type: Number,
    default: 1
  },
  totalPages: {
    type: Number,
    default: 10
  },
  percentage: {
    type: Number,
    default: 0
  },
  bookmarks: [{
    chapter: Number,
    page: Number,
    title: String,
    note: String,
    createdAt: { type: Date, default: Date.now }
  }],
  lastReadAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

readingProgressSchema.index({ user: 1, book: 1 }, { unique: true });

module.exports = mongoose.model('ReadingProgress', readingProgressSchema);
