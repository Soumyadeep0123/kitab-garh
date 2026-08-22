import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import BookCard from '../components/BookCard';
import { 
  BookOpen, 
  Sparkles, 
  Search, 
  TrendingUp, 
  Layers, 
  ShieldCheck, 
  Bookmark, 
  Zap, 
  Users, 
  Library,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';

const Home = () => {
  const [featuredBooks, setFeaturedBooks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [booksRes, catsRes] = await Promise.all([
          api.get('/books?featured=true&limit=6'),
          api.get('/books/categories/list')
        ]);
        if (booksRes.data.success) setFeaturedBooks(booksRes.data.books);
        if (catsRes.data.success) setCategories(catsRes.data.categories);
      } catch (err) {
        console.error('Error fetching home data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="space-y-16 pb-12">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-emerald-950 via-slate-900 to-slate-950 text-white pt-16 pb-24 px-4 sm:px-6 lg:px-8 rounded-3xl mx-2 sm:mx-6 mt-4 shadow-2xl border border-emerald-900/30">
        
        {/* Glow effects */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute top-1/2 -right-24 w-96 h-96 bg-teal-500/15 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-5xl mx-auto text-center space-y-6 relative z-10">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold uppercase tracking-wider backdrop-blur-md">
            <Layers className="w-3.5 h-3.5" />
            3-Tier Client • API • Database Architecture
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-tight">
            Your Digital Sanctuary for <br />
            <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-300 bg-clip-text text-transparent">
              Knowledge & eBooks
            </span>
          </h1>

          <p className="text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            KitabGhar empowers readers, educators, and scholars with an immersive web reader, cloud progress sync, and comprehensive academic eBook collections.
          </p>

          {/* Quick Action CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Link
              to="/browse"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 shadow-lg shadow-emerald-500/25 transition-all hover:scale-105"
            >
              <BookOpen className="w-5 h-5" />
              Explore All Books
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to="/library"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-white bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/80 backdrop-blur-md transition-all hover:scale-105"
            >
              <Bookmark className="w-5 h-5" />
              Open My Library
            </Link>
          </div>

          {/* Architecture Highlights Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-12 border-t border-slate-800/80 text-left">
            <div className="p-3 rounded-xl bg-slate-900/50 border border-slate-800">
              <span className="text-xs text-emerald-400 font-bold uppercase">Tier 1: Frontend</span>
              <p className="text-sm font-semibold text-slate-200 mt-1">React + Tailwind</p>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/50 border border-slate-800">
              <span className="text-xs text-teal-400 font-bold uppercase">Tier 2: Backend</span>
              <p className="text-sm font-semibold text-slate-200 mt-1">Node + Express REST</p>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/50 border border-slate-800">
              <span className="text-xs text-purple-400 font-bold uppercase">Tier 3: Data</span>
              <p className="text-sm font-semibold text-slate-200 mt-1">MongoDB & SQL Models</p>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/50 border border-slate-800">
              <span className="text-xs text-amber-400 font-bold uppercase">Security & DRM</span>
              <p className="text-sm font-semibold text-slate-200 mt-1">JWT + Role Auth</p>
            </div>
          </div>

        </div>
      </section>

      {/* Categories Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              Explore by Category
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Structured eBook categories designed for computer science, literature, and STEM studies.
            </p>
          </div>
          <Link
            to="/browse"
            className="text-sm font-semibold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1"
          >
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((cat) => (
            <Link
              key={cat._id || cat.slug}
              to={`/browse?category=${cat.slug}`}
              className="group p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-emerald-500 dark:hover:border-emerald-500 shadow-sm hover:shadow-md transition-all text-center flex flex-col items-center justify-center space-y-2"
            >
              <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="text-xs font-bold text-slate-800 dark:text-slate-200 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                {cat.name}
              </h3>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured eBooks Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              Curated Picks
            </div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
              Featured Books & Reading Materials
            </h2>
          </div>
          <Link
            to="/browse"
            className="text-sm font-semibold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1"
          >
            See Full Catalog <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="aspect-[3/4] rounded-2xl bg-slate-200 dark:bg-slate-800 animate-pulse"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {featuredBooks.map((book) => (
              <BookCard key={book._id} book={book} />
            ))}
          </div>
        )}
      </section>

      {/* Lab Features Breakdown */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 sm:p-12 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              Lab Experiments Specifications
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">
              Built strictly per Software Tools & Techniques Lab Standards
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
              Every component in KitabGhar directly addresses the functional, non-functional, and architectural requirements stated across Days 1–4 of the curriculum.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
              <CheckCircle2 className="w-6 h-6 text-emerald-500 mb-3" />
              <h3 className="font-bold text-slate-900 dark:text-white text-base">In-Browser eBook Reader</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                Light/Dark/Sepia reading themes, font customization, table of contents, and auto bookmarking.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
              <CheckCircle2 className="w-6 h-6 text-emerald-500 mb-3" />
              <h3 className="font-bold text-slate-900 dark:text-white text-base">Progress Synchronization</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                Cloud-persisted percentage completed, current chapter/page, and personal study bookmarks.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
              <CheckCircle2 className="w-6 h-6 text-emerald-500 mb-3" />
              <h3 className="font-bold text-slate-900 dark:text-white text-base">Admin & Platform Analytics</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                Total users, catalog management CRUD, purchase tracking, and category metrics dashboard.
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
