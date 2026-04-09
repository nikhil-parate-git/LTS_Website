import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import {
  fetchBlogById,
  clearBlogDetail,
} from "../../../redux/slice/blog/getBlogSlice";

// --- UTILS ---
const formatDate = (dateStr) => {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const formatTime = (dateStr) => {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};

const getInitials = (name = "") =>
  name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

// --- MEDIUM PAGE-CENTERED LOADER ---
const PageLoader = () => (
  <div className="flex flex-col items-center justify-center min-h-[60vh] w-full">
    <div className="w-12 h-12 border-4 border-gray-100 border-t-orange-500 rounded-full animate-spin"></div>
    <p className="mt-4 text-[11px] font-bold text-gray-400 uppercase tracking-[0.2em]">
      Loading BlogView....
    </p>
  </div>
);

const BlogView = () => {
  const { categoryId, blogId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { currentBlog, blogDetailLoading, blogDetailError } = useSelector(
    (state) => state.blogs,
  );

  useEffect(() => {
    if (categoryId && blogId) {
      dispatch(fetchBlogById({ categoryId, blogId }));
    }
    return () => {
      dispatch(clearBlogDetail());
    };
  }, [dispatch, categoryId, blogId]);

  const handleBack = () => navigate(-1);

  return (
    <div className="min-h-screen bg-[#fcfcfb] font-sans">
      {/* ── TOP NAV BAR ── */}
      <nav className="sticky top-0 z-30 bg-white/90 border-gray-100">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <button
            onClick={handleBack}
            className="flex cursor-pointer items-center gap-2 text-sm font-bold text-gray-600 hover:text-orange-500 transition-colors"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back
          </button>
          <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">
            Article View
          </span>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Loader */}
        {blogDetailLoading && <PageLoader />}

        {/* Error State */}
        {blogDetailError && !blogDetailLoading && (
          <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
            <p className="text-red-500 font-bold mb-4">{blogDetailError}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-8 py-2.5 bg-gray-900 text-white rounded-xl text-xs font-bold hover:bg-orange-600 transition-all shadow-lg"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Blog Content */}
        {!blogDetailLoading && !blogDetailError && currentBlog && (
          <div className="flex flex-col lg:flex-row gap-10 animate-in fade-in duration-500">
            {/* ── LEFT COLUMN: CONTENT ── */}
            <div className="flex-1">
              {currentBlog.categoryId?.name && (
                <span className="text-orange-600 text-[11px] font-bold uppercase tracking-wider mb-2 block">
                  {currentBlog.categoryId.name}
                </span>
              )}

              <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 leading-tight mb-6">
                {currentBlog.title}
              </h1>

              {/* Image */}
              <div className="mb-8">
                {currentBlog.image ? (
                  <img
                    src={currentBlog.image}
                    alt={currentBlog.title}
                    className="w-full h-64 md:h-[400px] object-cover rounded-2xl shadow-sm border border-gray-100"
                  />
                ) : (
                  <div className="w-full h-48 rounded-2xl bg-gray-100 flex items-center justify-center">
                    <span className="text-4xl opacity-20">📄</span>
                  </div>
                )}
              </div>

              {/* ── FIXED: dangerouslySetInnerHTML for HTML content ── */}
              <div className="max-w-3xl">
                {currentBlog.description ? (
                  <div
                    className="text-gray-700 leading-relaxed text-base prose prose-sm max-w-none"
                    dangerouslySetInnerHTML={{
                      __html: currentBlog.description,
                    }}
                  />
                ) : (
                  <p className="text-gray-400 italic text-sm text-center py-10">
                    No content available for this post.
                  </p>
                )}
              </div>
            </div>

            {/* ── RIGHT COLUMN: SIDEBAR ── */}
            <aside className="w-full lg:w-72 shrink-0">
              <div className="sticky top-24 space-y-6">
                {/* Author */}
                <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
                  <p className="text-[10px] font-bold text-gray-400 uppercase mb-4 tracking-widest">
                    Writer
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-orange-500 to-orange-400 flex items-center justify-center text-white font-bold text-xs shadow-inner">
                      {getInitials(currentBlog.author)}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-900">
                        {currentBlog.author}
                      </p>
                      <p className="text-[11px] text-gray-500">
                        Verified Author
                      </p>
                    </div>
                  </div>
                </div>

                {/* Details */}
                <div className="bg-white p-5 rounded-2xl border border-gray-100 space-y-4 shadow-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                      Date
                    </span>
                    <span className="text-xs font-semibold text-gray-700">
                      {formatDate(currentBlog.createdAt)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                      Time
                    </span>
                    <span className="text-xs font-semibold text-gray-700">
                      {formatTime(currentBlog.createdAt)}
                    </span>
                  </div>
                </div>

                {/* Navigation Action */}
                <button
                  onClick={handleBack}
                  className="w-full py-3.5 bg-gray-900 text-white rounded-xl text-xs font-bold hover:bg-orange-600 transition-all shadow-xl shadow-gray-100 active:scale-95 cursor-pointer"
                >
                  All Articles
                </button>
              </div>
            </aside>
          </div>
        )}
      </main>
    </div>
  );
};

export default BlogView;
