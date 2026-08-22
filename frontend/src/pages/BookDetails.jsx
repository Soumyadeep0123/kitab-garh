import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import StarRating from '../components/StarRating';
import { 
  BookOpen, 
  User, 
  Calendar, 
  FileText, 
  Globe, 
  ShieldCheck, 
  Bookmark, 
  Share2, 
  Star, 
  MessageSquare,
  Sparkles,
  ArrowLeft,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

const BookDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  
  const [book, setBook] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [isOwned, setIsOwned] = useState(false);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [notification, setNotification] = useState(null);

  // Review form state
  const [userRating, setUserRating] = useState(5);
  const [userComment, setUserComment] = useState('');
  const [submittingReview, setSubmittingReview] = useState(false);

  useEffect(() => {
    const fetchBookData = async () => {
      setLoading(true);
      try {
        const [bookRes, reviewsRes] = await Promise.all([
          api.get(`/books/${id}`),
          api.get(`/reviews/book/${id}`)
        ]);

        if (bookRes.data.success) {
          setBook(bookRes.data.book);
          setIsOwned(bookRes.data.isOwned);
        }
        if (reviewsRes.data.success) {
          setReviews(reviewsRes.data.reviews);
        }
      } catch (err) {
        console.error('Error fetching book details:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchBookData();
  }, [id, isAuthenticated]);

  const handleAddToLibrary = async () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    setActionLoading(true);
    try {
      const res = await api.post('/library/add', { bookId: id });
      if (res.data.success) {
        setIsOwned(true);
        setNotification({ type: 'success', message: 'Book added to your library! You can read it anytime.' });
      }
    } catch (err) {
      setNotification({ type: 'error', message: err.response?.data?.message || 'Failed to add book.' });
    } finally {
      setActionLoading(false);
    }
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    if (!userComment.trim()) return;

    setSubmittingReview(true);
    try {
      const res = await api.post('/reviews', {
        bookId: id,
        rating: userRating,
        comment: userComment.trim()
      });

      if (res.data.success) {
        setUserComment('');
        setNotification({ type: 'success', message: 'Thank you! Your review has been recorded.' });
        // Refresh reviews & book
        const [revRes, bRes] = await Promise.all([
          api.get(`/reviews/book/${id}`),
          api.get(`/books/${id}`)
        ]);
        if (revRes.data.success) setReviews(revRes.data.reviews);
        if (bRes.data.success) setBook(bRes.data.book);
      }
    } catch (err) {
      setNotification({ type: 'error', message: err.response?.data?.message || 'Error submitting review.' });
    } finally {
      setSubmittingReview(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-emerald-500 border-t-transparent"></div>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="max-w-4xl mx-auto py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold">Book Not Found</h2>
        <Link to="/browse" className="text-emerald-600 underline">Back to Catalog</Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      
      {/* Back button */}
      <Link
        to="/browse"
        className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Catalog
      </Link>

      {/* Notification Banner */}
      {notification && (
        <div className={`p-4 rounded-xl flex items-center gap-3 text-sm font-medium ${
          notification.type === 'success'
            ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
            : 'bg-rose-50 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300 border border-rose-200 dark:border-rose-800'
        }`}>
          {notification.type === 'success' ? <CheckCircle className="w-5 h-5 text-emerald-500" /> : <AlertCircle className="w-5 h-5 text-rose-500" />}
          {notification.message}
        </div>
      )}

      {/* Main Details Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 bg-white dark:bg-slate-900 p-8 sm:p-10 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
        
        {/* Cover Column */}
        <div className="space-y-4">
          <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800 relative bg-slate-100 dark:bg-slate-800">
            <img
              src={book.coverImage}
              alt={book.title}
              className="w-full h-full object-cover"
            />
            {book.featured && (
              <span className="absolute top-4 left-4 px-3 py-1 text-xs font-bold uppercase rounded-full bg-amber-500 text-slate-950 shadow-md flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" /> Featured
              </span>
            )}
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 text-xs space-y-2 text-slate-600 dark:text-slate-400">
            <div className="flex justify-between">
              <span>Format:</span>
              <span className="font-semibold text-slate-900 dark:text-white">{book.format || (book.fileUrl ? 'PDF & Web Reader' : 'Interactive Web Reader')}</span>
            </div>
            {book.fileUrl && (
              <div className="flex justify-between">
                <span>PDF Document:</span>
                <span className="font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5" /> Full PDF Included
                </span>
              </div>
            )}
            <div className="flex justify-between">
              <span>ISBN:</span>
              <span className="font-semibold text-slate-900 dark:text-white">{book.isbn}</span>
            </div>
            <div className="flex justify-between">
              <span>DRM Protected:</span>
              <span className="font-semibold text-emerald-600 dark:text-emerald-400">Yes (AES-256)</span>
            </div>
          </div>
        </div>

        {/* Info & Action Column */}
        <div className="lg:col-span-2 space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            
            <div className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
              {book.categoryName || book.category?.name}
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white leading-tight">
              {book.title}
            </h1>

            <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
              <span className="flex items-center gap-1 font-semibold text-slate-900 dark:text-white">
                <User className="w-4 h-4 text-emerald-500" />
                {book.author}
              </span>
              <span>•</span>
              <div className="flex items-center gap-1.5">
                <StarRating rating={book.averageRating || 5} size="w-4 h-4" />
                <span className="font-bold text-slate-900 dark:text-white">{book.averageRating || 5.0}</span>
                <span>({book.ratingsCount || reviews.length} reviews)</span>
              </div>
            </div>

            <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed pt-2">
              {book.description}
            </p>

            {/* Author Bio Box */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
                About the Author
              </h4>
              <p className="text-xs text-slate-700 dark:text-slate-300">
                {book.authorBio || 'Distinguished academic author and researcher.'}
              </p>
            </div>

            {/* Book Meta tags */}
            <div className="grid grid-cols-3 gap-3 pt-2">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 text-center">
                <span className="text-[11px] text-slate-400 block">Pages</span>
                <span className="text-sm font-bold text-slate-800 dark:text-slate-200">{book.pagesCount || 150}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 text-center">
                <span className="text-[11px] text-slate-400 block">Chapters</span>
                <span className="text-sm font-bold text-slate-800 dark:text-slate-200">{book.chapters?.length || 3}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 text-center">
                <span className="text-[11px] text-slate-400 block">Published</span>
                <span className="text-sm font-bold text-slate-800 dark:text-slate-200">{book.publishedYear || 2024}</span>
              </div>
            </div>

          </div>

          {/* Action Row */}
          <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="text-xs text-slate-400 block font-semibold uppercase">Pricing</span>
              <span className="text-3xl font-extrabold text-slate-900 dark:text-white">
                {book.isFree || book.price === 0 ? 'FREE' : `₹${book.price}`}
              </span>
            </div>

            <div className="flex items-center gap-3">
              {isOwned || book.isFree || book.price === 0 ? (
                <Link
                  to={`/reader/${book._id}`}
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold text-white bg-emerald-600 hover:bg-emerald-700 shadow-lg shadow-emerald-600/30 transition-all hover:scale-105"
                >
                  <BookOpen className="w-5 h-5" />
                  Read eBook Now
                </Link>
              ) : (
                <button
                  onClick={handleAddToLibrary}
                  disabled={actionLoading}
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold text-white bg-emerald-600 hover:bg-emerald-700 shadow-lg shadow-emerald-600/30 transition-all hover:scale-105 disabled:opacity-50"
                >
                  <Bookmark className="w-5 h-5" />
                  {actionLoading ? 'Processing...' : 'Get eBook & Add to Library'}
                </button>
              )}
            </div>
          </div>

        </div>

      </div>

      {/* Reviews & Ratings Section */}
      <section className="bg-white dark:bg-slate-900 rounded-3xl p-8 sm:p-10 border border-slate-200 dark:border-slate-800 space-y-8 shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <MessageSquare className="w-6 h-6 text-emerald-500" />
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
              Student & Reader Reviews ({reviews.length})
            </h3>
          </div>
        </div>

        {/* Submit Review Form */}
        {isAuthenticated ? (
          <form onSubmit={handleReviewSubmit} className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 space-y-4">
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">
              Write your Review & Feedback
            </h4>
            
            <div className="flex items-center gap-3">
              <span className="text-xs text-slate-500 dark:text-slate-400">Your Rating:</span>
              <StarRating
                rating={userRating}
                interactive={true}
                onRatingChange={(r) => setUserRating(r)}
                size="w-5 h-5"
              />
            </div>

            <textarea
              rows={3}
              required
              value={userComment}
              onChange={(e) => setUserComment(e.target.value)}
              placeholder="What did you learn from this book? Share your thoughts for other students..."
              className="w-full p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-900 dark:text-white"
            />

            <button
              type="submit"
              disabled={submittingReview}
              className="px-5 py-2 rounded-xl text-sm font-semibold bg-emerald-600 hover:bg-emerald-700 text-white transition-colors disabled:opacity-50"
            >
              {submittingReview ? 'Submitting...' : 'Post Review'}
            </button>
          </form>
        ) : (
          <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/30 text-center space-y-2">
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Want to write a review or leave a rating?
            </p>
            <Link to="/login" className="inline-block text-sm font-bold text-emerald-600 hover:underline">
              Sign In to your KitabGhar Account
            </Link>
          </div>
        )}

        {/* Reviews List */}
        <div className="space-y-4">
          {reviews.length === 0 ? (
            <p className="text-sm text-slate-400 py-4 text-center">
              No reviews yet. Be the first to review this eBook!
            </p>
          ) : (
            reviews.map((rev) => (
              <div key={rev._id} className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/30 border border-slate-100 dark:border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={rev.userAvatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80'}
                      alt={rev.userName}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <span className="font-semibold text-sm text-slate-900 dark:text-white">{rev.userName}</span>
                  </div>
                  <StarRating rating={rev.rating} size="w-3.5 h-3.5" />
                </div>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed pl-11">
                  {rev.comment}
                </p>
              </div>
            ))
          )}
        </div>

      </section>

    </div>
  );
};

export default BookDetails;
