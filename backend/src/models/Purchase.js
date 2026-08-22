const mongoose = require('mongoose');

const purchaseSchema = new mongoose.Schema({
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
  amount: {
    type: Number,
    required: true
  },
  transactionId: {
    type: String,
    default: () => 'TXN-' + Date.now() + '-' + Math.floor(Math.random() * 1000)
  },
  paymentStatus: {
    type: String,
    enum: ['completed', 'pending', 'failed'],
    default: 'completed'
  },
  purchaseDate: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Compound index to ensure a user only purchases a book once
purchaseSchema.index({ user: 1, book: 1 }, { unique: true });

module.exports = mongoose.model('Purchase', purchaseSchema);
