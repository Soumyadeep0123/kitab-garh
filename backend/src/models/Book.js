const mongoose = require('mongoose');

const chapterSchema = new mongoose.Schema({
  title: { type: String, required: true },
  chapterNumber: { type: Number, required: true },
  content: { type: String, required: true }
});

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Book title is required'],
    trim: true
  },
  author: {
    type: String,
    required: [true, 'Author name is required'],
    trim: true
  },
  authorBio: {
    type: String,
    default: 'Distinguished author and educator in computer science and literature.'
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },
  categoryName: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: [true, 'Description is required']
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: 0,
    default: 0
  },
  isFree: {
    type: Boolean,
    default: false
  },
  coverImage: {
    type: String,
    default: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=500&q=80'
  },
  pagesCount: {
    type: Number,
    default: 120
  },
  publishedYear: {
    type: Number,
    default: 2024
  },
  language: {
    type: String,
    default: 'English'
  },
  isbn: {
    type: String,
    default: () => '978-0-' + Math.floor(100000000 + Math.random() * 900000000)
  },
  format: {
    type: String,
    enum: ['EPUB', 'PDF', 'MOBI', 'Web Reader', 'PDF & Web Reader'],
    default: 'Web Reader'
  },
  fileUrl: {
    type: String,
    default: ''
  },
  averageRating: {
    type: Number,
    default: 4.8,
    min: 0,
    max: 5
  },
  ratingsCount: {
    type: Number,
    default: 0
  },
  chapters: [chapterSchema],
  featured: {
    type: Boolean,
    default: false
  },
  drmProtected: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Book', bookSchema);
