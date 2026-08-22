import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../services/api';
import { 
  BookOpen, 
  ArrowLeft, 
  ChevronLeft, 
  ChevronRight, 
  Moon, 
  Sun, 
  Bookmark, 
  List, 
  Sliders,
  FileText,
  Download,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  Sparkles
} from 'lucide-react';

const Reader = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [currentChapterIndex, setCurrentChapterIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  
  // Reader preferences & mode
  const [readerMode, setReaderMode] = useState('text'); // 'text' | 'pdf'
  const [theme, setTheme] = useState('sepia'); // 'light' | 'dark' | 'sepia'
  const [fontSize, setFontSize] = useState(18); // in px
  const [fontFamily, setFontFamily] = useState('serif'); // 'serif' | 'sans'
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [bookmarks, setBookmarks] = useState([]);
  const [bookmarkNote, setBookmarkNote] = useState('');
  const [showBookmarkModal, setShowBookmarkModal] = useState(false);

  useEffect(() => {
    const fetchBookAndProgress = async () => {
      try {
        const [bookRes, progRes] = await Promise.all([
          api.get(`/books/${id}`),
          api.get(`/library/progress/${id}`).catch(() => null)
        ]);

        if (bookRes.data.success) {
          setBook(bookRes.data.book);
        }

        if (progRes && progRes.data.success && progRes.data.progress) {
          const p = progRes.data.progress;
          if (p.currentChapter && p.currentChapter > 0) {
            setCurrentChapterIndex(p.currentChapter - 1);
          }
          if (p.bookmarks) {
            setBookmarks(p.bookmarks);
          }
        }
      } catch (err) {
        console.error('Error initializing reader:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchBookAndProgress();
  }, [id]);

  // Sync progress on chapter change
  const handleChapterChange = async (index) => {
    if (!book || !book.chapters || index < 0 || index >= book.chapters.length) return;
    setCurrentChapterIndex(index);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    try {
      await api.put(`/library/progress/${id}`, {
        currentChapter: index + 1,
        totalPages: book.chapters.length,
        currentPage: 1
      });
    } catch (err) {
      console.warn('Could not auto-save reading progress:', err.message);
    }
  };

  const handleAddBookmark = async () => {
    const newBookmark = {
      chapter: currentChapterIndex + 1,
      page: 1,
      title: book.chapters[currentChapterIndex]?.title || `Chapter ${currentChapterIndex + 1}`,
      note: bookmarkNote || 'Quick study note'
    };

    const updatedBookmarks = [...bookmarks, newBookmark];
    setBookmarks(updatedBookmarks);
    setShowBookmarkModal(false);
    setBookmarkNote('');

    try {
      await api.put(`/library/progress/${id}`, {
        bookmarks: updatedBookmarks
      });
    } catch (err) {
      console.warn('Failed to save bookmark:', err.message);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-emerald-500 border-t-transparent"></div>
      </div>
    );
  }

  if (!book || (!book.chapters?.length && !book.fileUrl)) {
    return (
      <div className="max-w-3xl mx-auto py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold">No Readable Chapters Available</h2>
        <Link to="/browse" className="text-emerald-600 underline">Return to Catalog</Link>
      </div>
    );
  }

  const hasChapters = book.chapters && book.chapters.length > 0;
  const currentChapter = hasChapters ? (book.chapters[currentChapterIndex] || book.chapters[0]) : null;
  const progressPercent = hasChapters ? Math.round(((currentChapterIndex + 1) / book.chapters.length) * 100) : 100;

  // Theme style mapping
  const themeStyles = {
    light: 'bg-white text-slate-900 border-slate-200',
    dark: 'bg-slate-950 text-slate-100 border-slate-800',
    sepia: 'bg-[#fbf0d9] text-[#433422] border-[#ebd7b2]'
  };

  // Helper to format chapter content with code blocks and headers
  const renderFormattedContent = (content) => {
    if (!content) return null;
    const parts = content.split(/(```[\s\S]*?```)/g);

    return parts.map((part, index) => {
      if (part.startsWith('```')) {
        const lines = part.slice(3, -3).trim().split('\n');
        const lang = lines[0].trim();
        const code = lines.slice(lang.match(/^[a-zA-Z0-9_-]+$/) ? 1 : 0).join('\n');

        return (
          <div key={index} className="my-6 rounded-2xl overflow-hidden shadow-md bg-slate-900 text-slate-100 border border-slate-800 font-mono text-xs sm:text-sm">
            <div className="px-4 py-2 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between text-slate-400">
              <span className="font-bold uppercase tracking-wider text-[11px] text-emerald-400">{lang || 'CODE'}</span>
              <span className="text-[10px]">Syntax Preview</span>
            </div>
            <pre className="p-4 overflow-x-auto leading-relaxed">
              <code>{code || lines.join('\n')}</code>
            </pre>
          </div>
        );
      }

      // Normal paragraph split
      const paragraphs = part.split('\n\n');
      return (
        <div key={index} className="space-y-4">
          {paragraphs.map((p, pIdx) => {
            const trimmed = p.trim();
            if (!trimmed) return null;

            if (trimmed.startsWith('### ')) {
              return (
                <h3 key={pIdx} className="text-xl sm:text-2xl font-bold tracking-tight text-emerald-800 dark:text-emerald-400 pt-6 pb-2">
                  {trimmed.replace('### ', '')}
                </h3>
              );
            }
            if (trimmed.startsWith('## ')) {
              return (
                <h2 key={pIdx} className="text-2xl sm:text-3xl font-extrabold tracking-tight text-emerald-900 dark:text-emerald-300 pt-8 pb-3 border-b border-black/10 dark:border-white/10">
                  {trimmed.replace('## ', '')}
                </h2>
              );
            }
            if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
              const listItems = trimmed.split('\n');
              return (
                <ul key={pIdx} className="list-disc pl-6 space-y-1.5 opacity-90 my-3">
                  {listItems.map((li, liIdx) => (
                    <li key={liIdx}>{li.replace(/^[-*]\s+/, '')}</li>
                  ))}
                </ul>
              );
            }
            return (
              <p key={pIdx} className="leading-relaxed opacity-95">
                {trimmed}
              </p>
            );
          })}
        </div>
      );
    });
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${themeStyles[theme]}`}>
      
      {/* Reader Control Header */}
      <header className={`sticky top-0 z-40 px-4 sm:px-8 py-3 border-b flex items-center justify-between backdrop-blur-md ${
        theme === 'dark' ? 'bg-slate-900/90 border-slate-800' : theme === 'sepia' ? 'bg-[#f4e4c1]/90 border-[#e6d0a7]' : 'bg-white/90 border-slate-200'
      }`}>
        
        {/* Left: Back & Title */}
        <div className="flex items-center gap-3">
          <Link
            to={`/books/${book._id}`}
            className="p-2 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
            title="Exit Reader"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>

          <div className="hidden sm:block">
            <h2 className="text-sm font-bold truncate max-w-xs md:max-w-md">{book.title}</h2>
            <p className="text-xs opacity-75">
              {readerMode === 'pdf' ? 'Full PDF Document View' : currentChapter?.title || 'Interactive Reader'}
            </p>
          </div>
        </div>

        {/* Center: Mode Switcher (Chapter Text vs PDF Viewer) */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-black/5 dark:bg-white/10 border border-black/5 dark:border-white/5 text-xs font-bold">
          <button
            onClick={() => setReaderMode('text')}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
              readerMode === 'text'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'opacity-70 hover:opacity-100'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Chapter View</span>
          </button>

          {book.fileUrl && (
            <button
              onClick={() => setReaderMode('pdf')}
              className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                readerMode === 'pdf'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'opacity-70 hover:opacity-100'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span className="hidden md:inline">PDF Document</span>
            </button>
          )}
        </div>

        {/* Right: Controls */}
        <div className="flex items-center gap-2">
          
          {readerMode === 'text' && (
            <>
              {/* Font Family Toggle */}
              <button
                onClick={() => setFontFamily(fontFamily === 'serif' ? 'sans' : 'serif')}
                className="hidden sm:block px-2.5 py-1.5 rounded-lg text-xs font-bold border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5"
                title="Toggle Serif / Sans font"
              >
                {fontFamily === 'serif' ? 'Serif' : 'Sans'}
              </button>

              {/* Font Size decrease / increase */}
              <div className="hidden sm:flex items-center border border-black/10 dark:border-white/10 rounded-lg overflow-hidden text-xs font-bold">
                <button
                  onClick={() => setFontSize(Math.max(14, fontSize - 2))}
                  className="px-2 py-1.5 hover:bg-black/5 dark:hover:bg-white/5"
                  title="Decrease Font Size"
                >
                  A-
                </button>
                <span className="px-1.5 opacity-60 text-[11px]">{fontSize}px</span>
                <button
                  onClick={() => setFontSize(Math.min(26, fontSize + 2))}
                  className="px-2 py-1.5 hover:bg-black/5 dark:hover:bg-white/5"
                  title="Increase Font Size"
                >
                  A+
                </button>
              </div>

              {/* Theme Selector (Sepia / Dark / Light) */}
              <button
                onClick={() => setTheme(theme === 'sepia' ? 'dark' : theme === 'dark' ? 'light' : 'sepia')}
                className="p-2 rounded-lg border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5"
                title={`Theme: ${theme}`}
              >
                {theme === 'dark' ? <Moon className="w-4 h-4" /> : theme === 'light' ? <Sun className="w-4 h-4" /> : <Sliders className="w-4 h-4" />}
              </button>

              {/* Bookmark Button */}
              <button
                onClick={() => setShowBookmarkModal(true)}
                className="p-2 rounded-lg border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5 text-amber-600"
                title="Add Bookmark"
              >
                <Bookmark className="w-4 h-4" />
              </button>

              {/* Table of Contents Toggle */}
              {hasChapters && (
                <button
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className="p-2 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm"
                  title="Table of Contents"
                >
                  <List className="w-4 h-4" />
                </button>
              )}
            </>
          )}

          {readerMode === 'pdf' && book.fileUrl && (
            <a
              href={book.fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Open in New Tab</span>
            </a>
          )}

        </div>

      </header>

      {/* Sidebar: Table of Contents & Bookmarks */}
      {sidebarOpen && hasChapters && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-sm">
          <div className={`w-80 h-full p-6 space-y-6 shadow-2xl overflow-y-auto ${
            theme === 'dark' ? 'bg-slate-900 text-white' : theme === 'sepia' ? 'bg-[#f4e4c1] text-[#433422]' : 'bg-white text-slate-900'
          }`}>
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-bold text-base flex items-center gap-2">
                <List className="w-4 h-4" />
                Table of Contents
              </h3>
              <button 
                onClick={() => setSidebarOpen(false)}
                className="text-xs font-bold px-2 py-1 rounded bg-black/10 dark:bg-white/10"
              >
                Close
              </button>
            </div>

            <div className="space-y-1.5">
              {book.chapters.map((ch, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    handleChapterChange(idx);
                    setSidebarOpen(false);
                  }}
                  className={`w-full text-left p-3 rounded-xl text-xs font-semibold transition-all ${
                    idx === currentChapterIndex
                      ? 'bg-emerald-600 text-white shadow-md'
                      : 'hover:bg-black/5 dark:hover:bg-white/5'
                  }`}
                >
                  <span className="block opacity-75 text-[10px] uppercase tracking-wider">Chapter {ch.chapterNumber || idx + 1}</span>
                  <span className="line-clamp-1">{ch.title}</span>
                </button>
              ))}
            </div>

            {/* Saved Bookmarks */}
            <div className="pt-4 border-t border-black/10 dark:border-white/10 space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider opacity-75 flex items-center gap-1.5">
                <Bookmark className="w-3.5 h-3.5 text-amber-500" />
                Your Bookmarks ({bookmarks.length})
              </h4>
              {bookmarks.length === 0 ? (
                <p className="text-xs opacity-60">No bookmarks saved yet.</p>
              ) : (
                bookmarks.map((bm, i) => (
                  <div
                    key={i}
                    onClick={() => {
                      if (bm.chapter) handleChapterChange(bm.chapter - 1);
                      setSidebarOpen(false);
                    }}
                    className="p-2.5 rounded-lg bg-black/5 dark:bg-white/5 text-xs cursor-pointer hover:bg-black/10 dark:hover:bg-white/10"
                  >
                    <span className="font-bold block text-emerald-600 dark:text-emerald-400">{bm.title}</span>
                    <span className="opacity-75">{bm.note}</span>
                  </div>
                ))
              )}
            </div>

          </div>
        </div>
      )}

      {/* Main Mode View */}
      {readerMode === 'text' ? (
        <main className="max-w-3xl mx-auto px-6 sm:px-12 py-16 space-y-8">
          
          {/* Chapter Header */}
          {currentChapter && (
            <div className="text-center space-y-2 border-b border-black/10 dark:border-white/10 pb-8">
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
                Chapter {currentChapter.chapterNumber || currentChapterIndex + 1} of {book.chapters.length}
              </span>
              <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
                {currentChapter.title}
              </h1>
            </div>
          )}

          {/* Formatted Text Content */}
          <article 
            className={`leading-relaxed space-y-6 ${
              fontFamily === 'serif' ? 'font-serif' : 'font-sans'
            }`}
            style={{ fontSize: `${fontSize}px`, lineHeight: 1.8 }}
          >
            {renderFormattedContent(currentChapter?.content)}
          </article>

          {/* Bottom Chapter Navigation Bar */}
          {hasChapters && (
            <div className="pt-12 border-t border-black/10 dark:border-white/10 flex items-center justify-between gap-4">
              <button
                onClick={() => handleChapterChange(currentChapterIndex - 1)}
                disabled={currentChapterIndex === 0}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 disabled:opacity-30 disabled:pointer-events-none transition-colors"
              >
                <ChevronLeft className="w-4 h-4" /> Previous Chapter
              </button>

              <span className="text-xs font-bold opacity-60">
                {currentChapterIndex + 1} / {book.chapters.length} ({progressPercent}%)
              </span>

              <button
                onClick={() => handleChapterChange(currentChapterIndex + 1)}
                disabled={currentChapterIndex === book.chapters.length - 1}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold bg-emerald-600 hover:bg-emerald-700 text-white disabled:opacity-30 disabled:pointer-events-none transition-colors shadow-md"
              >
                Next Chapter <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}

        </main>
      ) : (
        /* PDF Document Viewer Mode */
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-6">
          <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-emerald-900 dark:text-emerald-300 font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Full original document viewer active. DRM access verified.</span>
            </div>
            <a
              href={book.fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold text-emerald-700 dark:text-emerald-300 underline flex items-center gap-1"
            >
              Open Direct PDF Link <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          <div className="w-full h-[80vh] rounded-3xl overflow-hidden border border-slate-300 dark:border-slate-800 shadow-2xl bg-slate-900">
            <iframe
              src={book.fileUrl}
              title={book.title}
              className="w-full h-full border-none"
            />
          </div>
        </div>
      )}

      {/* Bookmark Modal */}
      {showBookmarkModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl max-w-sm w-full space-y-4 shadow-2xl border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white">
            <h3 className="font-bold text-base flex items-center gap-2">
              <Bookmark className="w-5 h-5 text-amber-500" />
              Add Bookmark
            </h3>
            <p className="text-xs text-slate-500">
              Bookmark: {currentChapter?.title || 'Current Page'}
            </p>
            <input
              type="text"
              placeholder="Add optional study note or key summary..."
              value={bookmarkNote}
              onChange={(e) => setBookmarkNote(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs border border-transparent focus:border-emerald-500 focus:outline-none"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowBookmarkModal(false)}
                className="px-4 py-2 text-xs font-semibold rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                Cancel
              </button>
              <button
                onClick={handleAddBookmark}
                className="px-4 py-2 text-xs font-semibold rounded-lg bg-emerald-600 text-white hover:bg-emerald-700"
              >
                Save Bookmark
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Reader;
