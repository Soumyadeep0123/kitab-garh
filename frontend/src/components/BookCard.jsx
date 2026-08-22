import React from 'react';
import { Link } from 'react-router-dom';
import StarRating from './StarRating';
import { BookOpen, User, Tag, Sparkles } from 'lucide-react';

const BookCard = ({ book }) => {
  return (
    <div className="group bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-emerald-500/40 dark:hover:border-emerald-500/40 transition-all duration-300 flex flex-col overflow-hidden">
      
      {/* Cover Image Container */}
      <div className="relative aspect-[3/4] overflow-hidden bg-slate-100 dark:bg-slate-800">
        <img
          src={book.coverImage || 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=500&q=80'}
          alt={book.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        
        {/* Category & Badge Overlay */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          <span className="px-2.5 py-1 text-[11px] font-semibold tracking-wide uppercase rounded-full bg-slate-900/80 text-white backdrop-blur-md border border-white/10">
            {book.categoryName || book.category?.name || 'eBook'}
          </span>
          {book.featured && (
            <span className="px-2 py-1 text-[10px] font-bold uppercase rounded-full bg-amber-500 text-slate-950 flex items-center gap-1 shadow-sm">
              <Sparkles className="w-3 h-3" />
              Featured
            </span>
          )}
        </div>

        {/* Price Tag */}
        <div className="absolute bottom-3 right-3">
          <span className={`px-3 py-1 text-xs font-bold rounded-full backdrop-blur-md shadow-md ${
            book.isFree || book.price === 0
              ? 'bg-emerald-500 text-white'
              : 'bg-white/95 dark:bg-slate-900/95 text-slate-900 dark:text-white border border-slate-200/50 dark:border-slate-700/50'
          }`}>
            {book.isFree || book.price === 0 ? 'FREE' : `₹${book.price}`}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1.5 text-xs text-slate-500 dark:text-slate-400">
            <User className="w-3.5 h-3.5" />
            <span className="truncate">{book.author}</span>
          </div>

          <h3 className="font-bold text-slate-900 dark:text-white text-base line-clamp-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
            {book.title}
          </h3>

          <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mt-2 leading-relaxed">
            {book.description}
          </p>
        </div>

        <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <StarRating rating={book.averageRating || 5} size="w-3.5 h-3.5" />
            <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              {book.averageRating || 5.0}
            </span>
          </div>

          <Link
            to={`/books/${book._id}`}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/50 transition-colors"
          >
            <BookOpen className="w-3.5 h-3.5" />
            View Details
          </Link>
        </div>

      </div>

    </div>
  );
};

export default BookCard;
