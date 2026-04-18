import { useEffect, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { SEO } from "../../../hooks/useSEO";
import {
  fetchBlogById,
  clearBlogDetail,
} from "../../../redux/slice/blog/getBlogSlice";
import { fetchTopCategories } from "../../../redux/slice/topCategory/getTopCategorySlice";

const SITE_URL = typeof window !== "undefined" ? window.location.origin : "";

// ─── Helpers ──────────────────────────────────────────────────────────────────
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

const slugify = (text = "") =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/^-+|-+$/g, "");

// ─── PageLoader ────────────────────────────────────────────────────────────────
const PageLoader = () => (
  <div className="flex flex-col items-center justify-center min-h-[60vh] w-full">
    <div className="w-12 h-12 border-4 border-gray-100 border-t-orange-500 rounded-full animate-spin" />
    <p className="mt-4 text-[11px] font-bold text-gray-400 uppercase tracking-[0.2em]">
      Loading Article...
    </p>
  </div>
);

// ─── BlogView ──────────────────────────────────────────────────────────────────
const BlogView = () => {
  const { categorySlug, blogId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { currentBlog, blogDetailLoading, blogDetailError } = useSelector(
    (state) => state.blogs,
  );
  const { categories: apiCategories, loading: categoriesLoading } = useSelector(
    (state) => state.topCategories,
  );

  // ✅ FIX: If categories not in Redux (direct URL open — WhatsApp/share),
  // fetch them first so resolveCategoryApiId() can work
  useEffect(() => {
    if (!apiCategories || apiCategories.length === 0) {
      dispatch(fetchTopCategories());
    }
  }, [dispatch, apiCategories]);

  // Resolve cateId from Redux categories using URL slug
  const categoryApiId = useMemo(() => {
    if (!apiCategories?.length || !categorySlug) return null;
    const match = apiCategories.find((cat) => {
      const name = cat.name || cat.categoryName || cat.title || "";
      return slugify(name) === categorySlug;
    });
    return match?.cateId || match?._id || match?.id || null;
  }, [apiCategories, categorySlug]);

  // ✅ FIX: Only dispatch once categoryApiId is resolved
  useEffect(() => {
    if (!blogId || !categoryApiId) return;
    dispatch(fetchBlogById({ categoryApiId, blogId }));
    return () => {
      dispatch(clearBlogDetail());
    };
  }, [dispatch, blogId, categoryApiId]);

  const handleBack = useCallback(() => navigate(-1), [navigate]);
  const handleReload = useCallback(() => window.location.reload(), []);

  // SEO values — derived from blog data
  const plainDescription = useMemo(
    () =>
      currentBlog?.description
        ?.replace(/<[^>]+>/g, "")
        .slice(0, 160)
        .trim() || "",
    [currentBlog?.description],
  );

  // const canonicalUrl = `${SITE_URL}/blog/${categorySlug}/${blogId}`;

  const seoTitle = currentBlog?.title
    ? `${currentBlog.title} | Local Trade Street`
    : "Article | Local Trade Street";

  // Show loader while categories or blog are loading
  const isLoading = categoriesLoading || blogDetailLoading;

  return (
    <div className="min-h-screen bg-[#fcfcfb] font-sans">
      {/* ✅ SEO Component — og:image included for WhatsApp/social previews */}
      <SEO
        title={seoTitle}
        description={plainDescription}
        // canonical={canonicalUrl}
        ogType="article"
        ogImage={currentBlog?.image || ""}
      />

      {/* NAV */}
      <nav className="sticky top-0 z-30 bg-white/90 backdrop-blur-sm border-b border-gray-100">
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
        {/* Loading state */}
        {isLoading && <PageLoader />}

        {/* Error state */}
        {blogDetailError && !isLoading && (
          <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
            <p className="text-red-500 font-bold mb-4">{blogDetailError}</p>
            <button
              onClick={handleReload}
              className="px-8 py-2.5 bg-gray-900 text-white rounded-xl text-xs font-bold hover:bg-orange-600 transition-all shadow-lg"
            >
              Try Again
            </button>
          </div>
        )}

        {/* ✅ Wait for categories to resolve before showing "no content" */}
        {!isLoading && !blogDetailError && !currentBlog && !categoryApiId && (
          <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
            <p className="text-gray-400 font-semibold mb-2">
              Could not find category. Please try again.
            </p>
            <button
              onClick={handleReload}
              className="mt-2 px-8 py-2.5 bg-gray-900 text-white rounded-xl text-xs font-bold hover:bg-orange-600 transition-all shadow-lg"
            >
              Reload
            </button>
          </div>
        )}

        {/* Blog Content */}
        {!isLoading && !blogDetailError && currentBlog && (
          <div className="animate-in fade-in duration-500">
            {currentBlog.categoryId?.name && (
              <span className="text-orange-600 text-[11px] font-bold uppercase tracking-wider mb-2 block">
                {currentBlog.categoryId.name}
              </span>
            )}

            <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 leading-tight mb-5">
              {currentBlog.title}
            </h1>

            {/* Author */}
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

            {/* Hero Image */}
            <div className="mb-8 w-full overflow-hidden rounded-2xl border border-gray-100 shadow-sm">
              {currentBlog.image ? (
                <img
                  src={currentBlog.image}
                  alt={currentBlog.title}
                  className="w-full h-[300px] md:h-[500px] object-cover block"
                />
              ) : (
                <div className="w-full h-48 bg-gray-100 flex items-center justify-center">
                  <span className="text-4xl opacity-20">📄</span>
                </div>
              )}
            </div>

            {/* ✅ Blog Body — bullet points & lists properly styled */}
            {currentBlog.description ? (
              <div
                className="
                  text-gray-700 leading-relaxed text-base
                  prose prose-sm max-w-none
                  [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:my-3
                  [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:my-3
                  [&_li]:mb-1.5 [&_li]:text-gray-700 [&_li]:leading-relaxed
                  [&_p]:mb-3
                  [&_h1]:font-bold [&_h1]:text-xl [&_h1]:text-gray-900 [&_h1]:mb-2 [&_h1]:mt-4
                  [&_h2]:font-bold [&_h2]:text-lg [&_h2]:text-gray-900 [&_h2]:mb-2 [&_h2]:mt-4
                  [&_h3]:font-semibold [&_h3]:text-base [&_h3]:text-gray-900 [&_h3]:mb-2 [&_h3]:mt-3
                  [&_strong]:font-bold [&_strong]:text-gray-900
                  [&_em]:italic
                  [&_a]:text-orange-500 [&_a]:underline [&_a]:hover:text-orange-600
                  [&_blockquote]:border-l-4 [&_blockquote]:border-orange-400 [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-gray-500 [&_blockquote]:my-4
                "
                dangerouslySetInnerHTML={{ __html: currentBlog.description }}
              />
            ) : (
              <p className="text-gray-400 italic text-sm text-center py-10">
                No content available for this post.
              </p>
            )}

            {/* Date & Time */}
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
