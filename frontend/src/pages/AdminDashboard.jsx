import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { 
  Users, 
  BookOpen, 
  DollarSign, 
  Layers, 
  Plus, 
  Trash2, 
  TrendingUp, 
  Sparkles, 
  ShieldCheck, 
  CheckCircle2,
  FileText,
  Tag,
  Link as LinkIcon,
  X
} from 'lucide-react';

const AdminDashboard = () => {
  const [analytics, setAnalytics] = useState(null);
  const [books, setBooks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // New book modal state
  const [showAddModal, setShowAddModal] = useState(false);
  const [newBook, setNewBook] = useState({
    title: '',
    author: '',
    authorBio: 'Author, software engineer, and educator.',
    category: '',
    description: '',
    price: 0,
    isFree: true,
    coverImage: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=500&q=80',
    pagesCount: 250,
    publishedYear: 2024,
    format: 'PDF & Web Reader',
    fileUrl: '',
    featured: false,
    chapters: [
      {
        chapterNumber: 1,
        title: 'Chapter 1: Getting Started',
        content: 'Welcome to this authentic eBook. Start reading the fundamental principles below.\n\n### 1.1 Overview\nSoftware systems require clear structure, modularity, and strong architectural patterns.'
      }
    ]
  });

  const fetchData = async () => {
    try {
      const [analyticsRes, booksRes, catsRes, usersRes] = await Promise.all([
        api.get('/admin/analytics'),
        api.get('/books?limit=50'),
        api.get('/books/categories/list'),
        api.get('/admin/users')
      ]);

      if (analyticsRes.data.success) setAnalytics(analyticsRes.data);
      if (booksRes.data.success) setBooks(booksRes.data.books);
      if (catsRes.data.success) setCategories(catsRes.data.categories);
      if (usersRes.data.success) setUsers(usersRes.data.users);
    } catch (err) {
      console.error('Admin fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddChapterRow = () => {
    const nextNum = newBook.chapters.length + 1;
    setNewBook({
      ...newBook,
      chapters: [
        ...newBook.chapters,
        {
          chapterNumber: nextNum,
          title: `Chapter ${nextNum}: New Topic`,
          content: 'Add detailed chapter content here...'
        }
      ]
    });
  };

  const handleRemoveChapterRow = (index) => {
    if (newBook.chapters.length <= 1) return;
    const updated = newBook.chapters.filter((_, i) => i !== index).map((ch, i) => ({
      ...ch,
      chapterNumber: i + 1
    }));
    setNewBook({ ...newBook, chapters: updated });
  };

  const handleChapterFieldChange = (index, field, value) => {
    const updated = [...newBook.chapters];
    updated[index][field] = value;
    setNewBook({ ...newBook, chapters: updated });
  };

  const handleFillPreset = () => {
    setNewBook({
      title: 'Designing Data-Intensive Applications',
      author: 'Martin Kleppmann',
      authorBio: 'Researcher in distributed systems at the University of Cambridge.',
      category: categories.find(c => c.slug === 'database')?._id || categories[0]?._id,
      description: 'The definitive guide to the architecture of data systems, replication, partitioning, transactions, and stream processing.',
      price: 399,
      isFree: false,
      coverImage: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&w=600&q=80',
      pagesCount: 616,
      publishedYear: 2024,
      format: 'PDF & Web Reader',
      fileUrl: 'https://github.com/ept/ddia-references',
      featured: true,
      chapters: [
        {
          chapterNumber: 1,
          title: 'Reliable, Scalable, and Maintainable Applications',
          content: 'Many applications today are data-intensive, as opposed to compute-intensive. Raw CPU power is rarely a bottleneck for these applications.\n\n### 1.1 Reliability\nReliability means tolerating hardware and software faults, and human errors.\n\n### 1.2 Scalability\nScalability means measuring load with load parameters and assessing performance when load increases.'
        },
        {
          chapterNumber: 2,
          title: 'Data Models and Query Languages',
          content: 'Data models are perhaps the most important part of developing software, because they have such a profound effect on how software is written.\n\n### 2.1 Relational vs Document Model\nThe relational model organizes data into tuples, while the document model targets nested structures.'
        }
      ]
    });
  };

  const handleCreateBook = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        title: newBook.title,
        author: newBook.author,
        authorBio: newBook.authorBio,
        category: newBook.category || categories[0]?._id,
        description: newBook.description,
        price: newBook.isFree ? 0 : Number(newBook.price),
        isFree: newBook.isFree,
        coverImage: newBook.coverImage,
        pagesCount: Number(newBook.pagesCount),
        publishedYear: Number(newBook.publishedYear || 2024),
        format: newBook.format,
        fileUrl: newBook.fileUrl,
        featured: newBook.featured,
        chapters: newBook.chapters
      };

      const res = await api.post('/books', payload);
      if (res.data.success) {
        setShowAddModal(false);
        fetchData();
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Error creating eBook');
    }
  };

  const handleDeleteBook = async (id) => {
    if (!window.confirm('Are you sure you want to delete this eBook from KitabGhar?')) return;
    try {
      await api.delete(`/books/${id}`);
      fetchData();
    } catch (err) {
      alert(err.response?.data?.message || 'Error deleting book');
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-emerald-500 border-t-transparent"></div>
      </div>
    );
  }

  const stats = analytics?.stats || {
    totalUsers: 0,
    totalBooks: 0,
    totalPurchases: 0,
    totalRevenue: 0
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4" /> Administrator Control Center
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
            KitabGhar Analytics & Catalog Manager
          </h1>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm bg-emerald-600 hover:bg-emerald-700 text-white shadow-md transition-all hover:scale-105"
        >
          <Plus className="w-4 h-4" /> Add New eBook
        </button>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Customers</span>
            <div className="p-2.5 rounded-xl bg-blue-50 dark:bg-blue-950 text-blue-600">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <p className="text-3xl font-black text-slate-900 dark:text-white">{stats.totalUsers}</p>
        </div>

        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">eBooks in Catalog</span>
            <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950 text-emerald-600">
              <BookOpen className="w-5 h-5" />
            </div>
          </div>
          <p className="text-3xl font-black text-slate-900 dark:text-white">{stats.totalBooks}</p>
        </div>

        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Library Adds</span>
            <div className="p-2.5 rounded-xl bg-purple-50 dark:bg-purple-950 text-purple-600">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
          <p className="text-3xl font-black text-slate-900 dark:text-white">{stats.totalPurchases}</p>
        </div>

        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">System Revenue</span>
            <div className="p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950 text-amber-600">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>
          <p className="text-3xl font-black text-slate-900 dark:text-white">₹{stats.totalRevenue}</p>
        </div>
      </div>

      {/* Catalog Table */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 space-y-6 shadow-sm">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Layers className="w-5 h-5 text-emerald-500" />
            Catalog Inventory ({books.length} eBooks)
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600 dark:text-slate-400">
            <thead className="text-[11px] uppercase tracking-wider text-slate-400 border-b border-slate-100 dark:border-slate-800">
              <tr>
                <th className="pb-3 font-bold">Cover & Title</th>
                <th className="pb-3 font-bold">Author</th>
                <th className="pb-3 font-bold">Category</th>
                <th className="pb-3 font-bold">Format</th>
                <th className="pb-3 font-bold">Chapters</th>
                <th className="pb-3 font-bold">Price</th>
                <th className="pb-3 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {books.map((b) => (
                <tr key={b._id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="py-4">
                    <div className="flex items-center gap-3">
                      <img src={b.coverImage} alt={b.title} className="w-10 h-14 object-cover rounded-lg shadow-sm" />
                      <div>
                        <span className="font-bold text-slate-900 dark:text-white block line-clamp-1">{b.title}</span>
                        <span className="text-[10px] text-slate-400">ISBN: {b.isbn}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 font-medium text-slate-800 dark:text-slate-200">{b.author}</td>
                  <td className="py-4">
                    <span className="px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 font-semibold text-emerald-700 dark:text-emerald-400">
                      {b.categoryName || b.category?.name}
                    </span>
                  </td>
                  <td className="py-4">
                    <span className="font-semibold text-slate-700 dark:text-slate-300">
                      {b.format || (b.fileUrl ? 'PDF & Web' : 'Web Reader')}
                    </span>
                  </td>
                  <td className="py-4 font-bold text-slate-900 dark:text-white">{b.chapters?.length || 1}</td>
                  <td className="py-4 font-bold text-slate-900 dark:text-white">
                    {b.isFree || b.price === 0 ? 'FREE' : `₹${b.price}`}
                  </td>
                  <td className="py-4 text-right">
                    <button
                      onClick={() => handleDeleteBook(b._id)}
                      className="p-2 rounded-lg text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950 transition-colors"
                      title="Delete eBook"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add eBook Modal with Multi-Chapter & PDF Creator */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl max-w-3xl w-full my-8 max-h-[90vh] overflow-y-auto space-y-6 shadow-2xl border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white">
            
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
              <div>
                <h3 className="font-extrabold text-xl flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-emerald-500" />
                  Add Real eBook to KitabGhar
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Publish complete titles with multiple chapters, typography formatting, and PDF documents.
                </p>
              </div>
              
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleFillPreset}
                  className="px-3 py-1.5 rounded-xl text-xs font-bold bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-300 hover:bg-amber-200 transition-colors flex items-center gap-1"
                >
                  <Sparkles className="w-3.5 h-3.5" /> Fill Sample Preset
                </button>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <form onSubmit={handleCreateBook} className="space-y-6">
              
              {/* Row 1: Title & Author */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-1">Book Title *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Eloquent JavaScript"
                    value={newBook.title}
                    onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 text-sm border border-slate-300 dark:border-slate-700"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-1">Author Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Marijn Haverbeke"
                    value={newBook.author}
                    onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 text-sm border border-slate-300 dark:border-slate-700"
                  />
                </div>
              </div>

              {/* Row 2: Category & Format */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-1">Category *</label>
                  <select
                    value={newBook.category}
                    onChange={(e) => setNewBook({ ...newBook, category: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 text-sm border border-slate-300 dark:border-slate-700"
                  >
                    <option value="">Select Category</option>
                    {categories.map((c) => (
                      <option key={c._id} value={c._id}>{c.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-1">Format</label>
                  <select
                    value={newBook.format}
                    onChange={(e) => setNewBook({ ...newBook, format: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 text-sm border border-slate-300 dark:border-slate-700"
                  >
                    <option value="PDF & Web Reader">PDF & Interactive Web Reader</option>
                    <option value="Web Reader">Interactive Web Reader Only</option>
                    <option value="PDF">PDF Document</option>
                    <option value="EPUB">EPUB Reader</option>
                  </select>
                </div>
              </div>

              {/* Row 3: PDF / Document File Link */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-1 flex items-center gap-1.5">
                  <LinkIcon className="w-3.5 h-3.5 text-emerald-500" />
                  PDF Document URL / External Resource (Optional)
                </label>
                <input
                  type="url"
                  placeholder="https://example.com/book.pdf or open-source documentation URL"
                  value={newBook.fileUrl}
                  onChange={(e) => setNewBook({ ...newBook, fileUrl: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 text-sm border border-slate-300 dark:border-slate-700"
                />
              </div>

              {/* Description */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-1">Description *</label>
                <textarea
                  rows={2}
                  required
                  placeholder="Detailed synopsis of the book..."
                  value={newBook.description}
                  onChange={(e) => setNewBook({ ...newBook, description: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 text-sm border border-slate-300 dark:border-slate-700"
                />
              </div>

              {/* Row 4: Pricing & Meta */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 items-center">
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-1">Price (₹)</label>
                  <input
                    type="number"
                    disabled={newBook.isFree}
                    value={newBook.price}
                    onChange={(e) => setNewBook({ ...newBook, price: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 text-sm border border-slate-300 dark:border-slate-700 disabled:opacity-50"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-1">Pages Count</label>
                  <input
                    type="number"
                    value={newBook.pagesCount}
                    onChange={(e) => setNewBook({ ...newBook, pagesCount: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 text-sm border border-slate-300 dark:border-slate-700"
                  />
                </div>
                <div className="flex items-center gap-2 pt-5">
                  <input
                    type="checkbox"
                    id="isFree"
                    checked={newBook.isFree}
                    onChange={(e) => setNewBook({ ...newBook, isFree: e.target.checked, price: e.target.checked ? 0 : 299 })}
                    className="w-4 h-4 text-emerald-600 rounded"
                  />
                  <label htmlFor="isFree" className="text-xs font-bold text-slate-700 dark:text-slate-300 cursor-pointer">Free eBook</label>
                </div>
                <div className="flex items-center gap-2 pt-5">
                  <input
                    type="checkbox"
                    id="featured"
                    checked={newBook.featured}
                    onChange={(e) => setNewBook({ ...newBook, featured: e.target.checked })}
                    className="w-4 h-4 text-emerald-600 rounded"
                  />
                  <label htmlFor="featured" className="text-xs font-bold text-slate-700 dark:text-slate-300 cursor-pointer">Featured</label>
                </div>
              </div>

              {/* Multi-Chapter Creator */}
              <div className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                    <FileText className="w-4 h-4 text-emerald-500" />
                    Readable Chapters ({newBook.chapters.length})
                  </h4>
                  <button
                    type="button"
                    onClick={handleAddChapterRow}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold bg-emerald-100 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-300 hover:bg-emerald-200 transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add Another Chapter
                  </button>
                </div>

                {newBook.chapters.map((ch, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                        Chapter {ch.chapterNumber || idx + 1}
                      </span>
                      {newBook.chapters.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveChapterRow(idx)}
                          className="text-xs text-rose-500 hover:underline flex items-center gap-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" /> Remove
                        </button>
                      )}
                    </div>

                    <input
                      type="text"
                      required
                      placeholder={`Chapter ${idx + 1} Title`}
                      value={ch.title}
                      onChange={(e) => handleChapterFieldChange(idx, 'title', e.target.value)}
                      className="w-full p-2.5 rounded-xl bg-white dark:bg-slate-900 text-xs border border-slate-200 dark:border-slate-700 font-semibold"
                    />

                    <textarea
                      rows={4}
                      required
                      placeholder="Chapter text content, markdown headers, and code examples..."
                      value={ch.content}
                      onChange={(e) => handleChapterFieldChange(idx, 'content', e.target.value)}
                      className="w-full p-2.5 rounded-xl bg-white dark:bg-slate-900 text-xs border border-slate-200 dark:border-slate-700 font-mono leading-relaxed"
                    />
                  </div>
                ))}
              </div>

              {/* Submit Buttons */}
              <div className="flex justify-end gap-3 pt-6 border-t border-slate-200 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-5 py-2.5 rounded-xl text-xs font-semibold text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl text-xs font-bold bg-emerald-600 text-white hover:bg-emerald-700 shadow-md transition-all hover:scale-105"
                >
                  Save & Publish eBook
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default AdminDashboard;
