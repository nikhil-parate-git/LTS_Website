import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import {
  fetchBlogById,
  clearBlogDetail,
} from "../../../redux/slice/blog/getBlogSlice";

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
      {/* NAV */}
      <nav className="sticky top-0 z-30 bg-white/90 border-gray-100">
        <div className="w-full mx-auto px-4 py-3 flex items-center justify-between">
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

      <main className="w-full mx-auto px-4 py-8">
        {blogDetailLoading && <PageLoader />}

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

        {!blogDetailLoading && !blogDetailError && currentBlog && (
          <div className="animate-in fade-in duration-500">
            {/* Category */}
            {currentBlog.categoryId?.name && (
              <span className="text-orange-600 text-[11px] font-bold uppercase tracking-wider mb-2 block">
                {currentBlog.categoryId.name}
              </span>
            )}

            {/* Title */}
            <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 leading-tight mb-5">
              {currentBlog.title}
            </h1>

            {/* Author Row */}
            <div className="flex items-center gap-3 mb-7 pb-5 border-b border-gray-100">
              <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-orange-500 to-orange-400 flex items-center justify-center text-white font-extrabold text-sm shadow-md shrink-0">
                {getInitials(currentBlog.author)}
              </div>
              <div>
                <p className="text-sm font-extrabold text-gray-900 leading-tight">
                  {currentBlog.author}
                </p>
                <div className="flex items-center gap-1 mt-0.5">
                  <svg
                    className="w-3 h-3 text-orange-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-[11px] text-orange-500 font-semibold">
                    Verified Author
                  </span>
                </div>
              </div>
            </div>

            {/* Image - FIXED TO FULL WIDTH */}
            <div className="mb-8 w-full overflow-hidden rounded-2xl border border-gray-100 shadow-sm">
              {currentBlog.image ? (
                <img
                  src={currentBlog.image}
                  alt={currentBlog.title}
                  className="w-full h-[500px] block"
                />
              ) : (
                <div className="w-full h-48 bg-gray-100 flex items-center justify-center">
                  <span className="text-4xl opacity-20">📄</span>
                </div>
              )}
            </div>

            {/* Description */}
            {currentBlog.description ? (
              <div
                className="text-gray-700 leading-relaxed text-base prose prose-sm max-w-none"
                dangerouslySetInnerHTML={{ __html: currentBlog.description }}
              />
            ) : (
              <p className="text-gray-400 italic text-sm text-center py-10">
                No content available for this post.
              </p>
            )}

            {/* DATE & TIME */}
            <div className="mt-10 pt-6 border-t border-gray-100 flex items-center gap-6 text-[11px] text-gray-400 font-semibold">
              <div className="flex items-center gap-1.5">
                <svg
                  className="w-3.5 h-3.5 text-orange-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                {formatDate(currentBlog.createdAt)}
              </div>
              <div className="flex items-center gap-1.5">
                <svg
                  className="w-3.5 h-3.5 text-orange-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                {formatTime(currentBlog.createdAt)}
              </div>
            </div>

            {/* Back Button */}
            <div className="mt-5 pb-8">
              <button
                onClick={handleBack}
                className="px-8 py-3 bg-gray-900 text-white rounded-xl text-xs font-bold hover:bg-orange-600 transition-all shadow-lg active:scale-95 cursor-pointer"
              >
                ← All Articles
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default BlogView;
