import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import { 
  BookmarkCheck, 
  BookOpen, 
  Clock, 
  Sparkles, 
  Compass, 
  BookX, 
  CheckCircle, 
  Award,
  Layers
} from 'lucide-react';

const MyLibrary = () => {
  const { user } = useAuth();
  const [library, setLibrary] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLibrary = async () => {
      try {
        const res = await api.get('/library');
        if (res.data.success) {
          setLibrary(res.data.library);
        }
      } catch (err) {
        console.error('Error fetching library:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchLibrary();
  }, []);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-emerald-500 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 p-8 sm:p-10 rounded-3xl text-white shadow-xl border border-emerald-900/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold">
            <BookmarkCheck className="w-3.5 h-3.5" />
            Personal eBook Shelf
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Welcome to your Library, {user?.firstName || 'Reader'}!
          </h1>
          <p className="text-sm text-slate-300 max-w-xl">
            Track reading progress, revisit your bookmarked highlights, and resume your eBooks seamlessly.
          </p>
        </div>

        <Link
          to="/browse"
          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-md transition-all hover:scale-105"
        >
          <Compass className="w-4 h-4" />
          Discover New eBooks
        </Link>
      </div>

      {/* Library Grid */}
      {library.length === 0 ? (
        <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 space-y-4">
          <div className="w-16 h-16 rounded-full bg-emerald-50 dark:bg-emerald-950/50 flex items-center justify-center mx-auto text-emerald-500">
            <BookOpen className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">
            Your Library is Empty
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
            You have not added any eBooks to your library yet. Explore our free and academic collection to get started.
          </p>
          <Link
            to="/browse"
            className="inline-block px-6 py-3 rounded-xl font-bold bg-emerald-600 text-white hover:bg-emerald-700 shadow-md transition-colors"
          >
            Browse Free eBooks
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {library.map((item) => {
            const { book, progress } = item;
            if (!book) return null;

            const percentage = progress?.percentage || 0;

            return (
              <div
                key={item.purchaseId}
                className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4"
              >
                <div className="flex gap-4">
                  <img
                    src={book.coverImage}
                    alt={book.title}
                    className="w-24 h-32 object-cover rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 flex-shrink-0"
                  />
                  <div className="space-y-1 flex-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                      {book.categoryName || 'eBook'}
                    </span>
                    <h3 className="font-bold text-slate-900 dark:text-white text-sm line-clamp-2">
                      {book.title}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {book.author}
                    </p>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-slate-500 dark:text-slate-400">
                      {percentage === 100 ? (
                        <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                          <CheckCircle className="w-3.5 h-3.5" /> Completed
                        </span>
                      ) : (
                        `Chapter ${progress?.currentChapter || 1}`
                      )}
                    </span>
                    <span className="text-slate-800 dark:text-slate-200">{percentage}%</span>
                  </div>

                  <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                    <div
                      className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>

                {/* Action button */}
                <Link
                  to={`/reader/${book._id}`}
                  className="w-full py-2.5 rounded-xl font-semibold text-xs text-center text-white bg-emerald-600 hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2 shadow-sm"
                >
                  <BookOpen className="w-4 h-4" />
                  {percentage > 0 ? 'Continue Reading' : 'Start Reading'}
                </Link>
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
};

export default MyLibrary;
