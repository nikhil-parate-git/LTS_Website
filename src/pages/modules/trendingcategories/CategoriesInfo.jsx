import { useState, useEffect, useCallback, memo } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchVendorById,
  clearVendorDetail,
} from "../../../redux/slice/category/getVendorById";
import {
  fetchVendorReviews,
  clearVendorReviews,
  updateVendorReview,
  deleteVendorReview,
} from "../../../redux/slice/ratingandreviews/getReviewSlice";
import {
  MapPin,
  Phone,
  Star,
  ChevronRight,
  Home,
  Clock,
  Calendar,
  Info,
  BadgeCheck,
  MessageSquare,
  User,
  Pencil,
  Trash2,
  Check,
  X,
  AlertTriangle,
  ZoomIn,
} from "lucide-react";
import Banner from "./Acbanner/Banner";
import CatgInfoRightSideBar from "./CatgInfoRightSideBar";
import InfoRateNow from "./InfoRateNow";
import Faq from "./Faq";
import { SEO } from "../../../hooks/useSEO";

// ─── ImageLightbox ────────────────────────────────────────────────────────────
function ImageLightbox({ images, startIndex, onClose }) {
  const [current, setCurrent] = useState(startIndex);

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") setCurrent((p) => (p + 1) % images.length);
      if (e.key === "ArrowLeft")
        setCurrent((p) => (p - 1 + images.length) % images.length);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [images.length, onClose]);

  // Prevent body scroll while open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const src = images[current]?.image || images[current]?.url;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/85 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center text-white transition-colors"
        aria-label="Close"
      >
        <X size={20} />
      </button>

      {/* Counter */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 text-white/70 text-sm font-medium">
        {current + 1} / {images.length}
      </div>

      {/* Prev */}
      {images.length > 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            setCurrent((p) => (p - 1 + images.length) % images.length);
          }}
          className="absolute left-3 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center text-white transition-colors"
          aria-label="Previous"
        >
          <ChevronRight size={22} className="rotate-180" />
        </button>
      )}

      {/* Image */}
      <div className="relative z-10 max-w-[90vw] max-h-[85vh] flex items-center justify-center">
        <img
          src={src}
          alt={`Gallery image ${current + 1}`}
          className="max-w-full max-h-[85vh] rounded-xl object-contain shadow-2xl select-none"
          draggable={false}
        />
      </div>

      {/* Next */}
      {images.length > 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            setCurrent((p) => (p + 1) % images.length);
          }}
          className="absolute right-3 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center text-white transition-colors"
          aria-label="Next"
        >
          <ChevronRight size={22} />
        </button>
      )}

      {/* Thumbnail strip */}
      {images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex gap-2 px-3 py-2 bg-black/40 rounded-xl backdrop-blur-sm max-w-[90vw] overflow-x-auto">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={(e) => {
                e.stopPropagation();
                setCurrent(i);
              }}
              className={`w-10 h-10 rounded-lg overflow-hidden border-2 transition-all flex-shrink-0 ${
                i === current
                  ? "border-orange-400 scale-110"
                  : "border-white/20 opacity-60 hover:opacity-100"
              }`}
            >
              <img
                src={img.image || img.url}
                alt=""
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── DeleteConfirmModal ───────────────────────────────────────────────────────
function DeleteConfirmModal({ isOpen, onConfirm, onCancel }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onCancel}
      />
      <div className="relative bg-white rounded-2xl shadow-xl p-6 w-full max-w-sm border border-gray-100 animate-[fadeInScale_0.18s_ease]">
        <style>{`
          @keyframes fadeInScale {
            from { opacity: 0; transform: scale(0.93); }
            to   { opacity: 1; transform: scale(1); }
          }
        `}</style>
        <div className="flex flex-col items-center text-center gap-3">
          <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center">
            <AlertTriangle size={24} className="text-red-500" />
          </div>
          <div>
            <h3 className="text-base font-bold text-gray-900 mb-1">
              Delete Review?
            </h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              Are you sure you want to delete this review? This action cannot be
              undone.
            </p>
          </div>
        </div>
        <div className="flex gap-3 mt-6">
          <button
            onClick={onCancel}
            className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 px-4 py-2.5 rounded-xl bg-red-500 text-white text-sm font-bold hover:bg-red-600 transition-colors"
          >
            Yes, Delete
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── PlanBadge ────────────────────────────────────────────────────────────────
function PlanBadge({ plan }) {
  if (!plan?.subCategory) return null;
  const planType = plan.subCategory.toLowerCase();
  const styles = `
    @keyframes fire-sweep { 0% { background-position: 200% center; } 100% { background-position: -200% center; } }
    @keyframes ember-pulse { 0%, 100% { box-shadow: 0 0 0 0px rgba(234,88,12,0.0); } 50% { box-shadow: 0 0 8px 2px rgba(234,88,12,0.22); } }
    @keyframes diamond-aura { 0%, 100% { box-shadow: 0 0 0 0px rgba(99,102,241,0.0); } 50% { box-shadow: 0 0 10px 3px rgba(99,102,241,0.2); } }
    @keyframes gold-aura { 0%, 100% { box-shadow: 0 0 0 0px rgba(234,179,8,0.0); } 50% { box-shadow: 0 0 10px 3px rgba(234,179,8,0.25); } }
    @keyframes pop-in { 0% { transform: scale(0.7) translateY(4px); opacity: 0; } 65% { transform: scale(1.08) translateY(-1px); opacity: 1; } 100% { transform: scale(1) translateY(0); opacity: 1; } }
    @keyframes sheen { 0% { left: -60%; } 60%, 100% { left: 120%; } }
    @keyframes icon-spin { 0% { transform: rotate(0deg) scale(1); } 50% { transform: rotate(12deg) scale(1.15); } 100% { transform: rotate(0deg) scale(1); } }
    @keyframes top-bounce { 0%, 100% { transform: translateY(0px); } 40% { transform: translateY(-2px); } 70% { transform: translateY(1px); } }
    .pb-badge { display: inline-flex; align-items: center; gap: 5px; padding: 4px 12px 4px 8px; border-radius: 7px; font-size: 12px; font-weight: 700; font-style: italic; letter-spacing: 0.03em; white-space: nowrap; position: relative; overflow: hidden; animation: pop-in 0.4s cubic-bezier(.34,1.56,.64,1) both; }
    .pb-icon { display: inline-flex; align-items: center; justify-content: center; width: 16px; height: 16px; border-radius: 50%; flex-shrink: 0; animation: icon-spin 3s ease-in-out infinite; }
    .pb-icon-bounce { display: inline-flex; align-items: center; justify-content: center; width: 16px; height: 16px; border-radius: 50%; flex-shrink: 0; animation: top-bounce 1.8s ease-in-out infinite; }
    .pb-sheen::before { content: ''; position: absolute; top: 0; left: -60%; width: 40%; height: 100%; background: linear-gradient(90deg, transparent, rgba(255,255,255,0.55), transparent); animation: sheen 2.5s ease-in-out infinite; }
  `;
  const CheckSvg = () => (
    <svg width="9" height="9" viewBox="0 0 12 12" fill="none">
      <polyline
        points="2,6 5,9 10,3"
        stroke="white"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
  const ShieldSvg = () => (
    <svg width="9" height="9" viewBox="0 0 12 12" fill="none">
      <path
        d="M6 1 L11 3.5 V7 C11 9.5 8.5 11 6 11 C3.5 11 1 9.5 1 7 V3.5 Z"
        stroke="white"
        strokeWidth="1.5"
        strokeLinejoin="round"
        fill="none"
      />
      <polyline
        points="4,6 5.5,7.5 8,4.5"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
  const StarSvg = () => (
    <svg width="9" height="9" viewBox="0 0 12 12" fill="none">
      <polygon
        points="6,1 7.5,4.5 11,5 8.5,7.5 9,11 6,9.5 3,11 3.5,7.5 1,5 4.5,4.5"
        fill="white"
      />
    </svg>
  );

  if (["prime", "dynamic", "gold"].includes(planType)) {
    return (
      <>
        <style>{styles}</style>
        <span
          className="pb-badge pb-sheen"
          style={{
            background:
              "linear-gradient(100deg,#f0fdf4 0%,#dcfce7 30%,#bbf7d0 50%,#dcfce7 70%,#f0fdf4 100%)",
            backgroundSize: "300% auto",
            border: "1.5px solid #16a34a",
            color: "#14532d",
            animation:
              "pop-in 0.4s cubic-bezier(.34,1.56,.64,1) both, fire-sweep 2.4s linear infinite, ember-pulse 2.2s ease-in-out infinite",
          }}
        >
          <span className="pb-icon" style={{ background: "#16a34a" }}>
            <CheckSvg />
          </span>
          Verified
        </span>
      </>
    );
  }
  if (planType === "diamond") {
    return (
      <>
        <style>{styles}</style>
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 5,
            flexWrap: "wrap",
          }}
        >
          <span
            className="pb-badge"
            style={{
              background:
                "linear-gradient(100deg,#eef2ff 0%,#e0e7ff 40%,#c7d2fe 55%,#e0e7ff 70%,#eef2ff 100%)",
              backgroundSize: "300% auto",
              border: "1.5px solid #6366f1",
              color: "#3730a3",
              animation:
                "pop-in 0.4s cubic-bezier(.34,1.56,.64,1) 0.1s both, fire-sweep 2.8s linear infinite, diamond-aura 2.5s ease-in-out infinite",
            }}
          >
            <span className="pb-icon" style={{ background: "#6366f1" }}>
              <ShieldSvg />
            </span>
            Trusted
          </span>
          <span
            className="pb-badge pb-sheen"
            style={{
              background:
                "linear-gradient(100deg,#f0fdf4 0%,#dcfce7 40%,#bbf7d0 55%,#dcfce7 70%,#f0fdf4 100%)",
              backgroundSize: "300% auto",
              border: "1.5px solid #16a34a",
              color: "#14532d",
              animation:
                "pop-in 0.4s cubic-bezier(.34,1.56,.64,1) 0.2s both, fire-sweep 2.6s linear infinite, ember-pulse 2.4s ease-in-out 0.4s infinite",
            }}
          >
            <span className="pb-icon" style={{ background: "#16a34a" }}>
              <CheckSvg />
            </span>
            Verified
          </span>
          <span
            className="pb-badge"
            style={{
              background:
                "linear-gradient(100deg,#fffbeb 0%,#fef3c7 35%,#fde68a 50%,#fef3c7 70%,#fffbeb 100%)",
              backgroundSize: "300% auto",
              border: "1.5px solid #d97706",
              color: "#78350f",
              animation:
                "pop-in 0.4s cubic-bezier(.34,1.56,.64,1) 0.3s both, fire-sweep 2.2s linear infinite, gold-aura 2.2s ease-in-out 0.6s infinite",
            }}
          >
            <span className="pb-icon-bounce" style={{ background: "#d97706" }}>
              <StarSvg />
            </span>
            Top Vendor
          </span>
        </span>
      </>
    );
  }
  return null;
}

// ─── getTickColorClass ────────────────────────────────────────────────────────
const getTickColorClass = (color) => {
  switch (color?.toLowerCase()) {
    case "red":
      return "text-red-500";
    case "blue":
      return "text-blue-500";
    case "green":
      return "text-green-500";
    case "gold":
    case "yellow":
      return "text-yellow-500";
    default:
      return "text-blue-500";
  }
};

// ─── BreadcrumbBar ────────────────────────────────────────────────────────────
const BreadcrumbBar = memo(function BreadcrumbBar({
  businessName,
  venId,
  city,
}) {
  return (
    <div className="bg-white border-b border-gray-200 px-4 py-2.5">
      <nav
        className="flex items-center flex-wrap gap-1 text-sm text-gray-500"
        aria-label="Breadcrumb"
      >
        <button
          onClick={() => window.history.back()}
          aria-label="Go back"
          className="flex items-center justify-center w-9 h-7 rounded-lg border border-gray-200 text-gray-500 hover:border-orange-400 hover:text-orange-500 transition-colors"
        >
          <ChevronRight size={18} className="rotate-180 text-gray-600" />
        </button>
        <Link
          to="/"
          className="flex items-center gap-1 hover:text-orange-500 transition-colors"
        >
          <Home size={13} />
          <span>Home</span>
        </Link>
        <span className="flex items-center gap-1">
          <ChevronRight size={13} className="text-gray-400" />
          <span>Business</span>
        </span>
        {city && (
          <span className="flex items-center gap-1">
            <ChevronRight size={13} className="text-gray-400" />
            <MapPin size={11} className="text-orange-500" />
            <span className="capitalize">{city}</span>
          </span>
        )}
        {venId && (
          <span className="flex items-center gap-1">
            <ChevronRight size={13} className="text-gray-400" />
            <span>{venId}</span>
          </span>
        )}
        {businessName && (
          <span className="flex items-center gap-1">
            <ChevronRight size={13} className="text-gray-400" />
            <span className="text-gray-800 font-medium truncate max-w-[200px]">
              {businessName}
            </span>
          </span>
        )}
      </nav>
    </div>
  );
});

// ─── Stars ────────────────────────────────────────────────────────────────────
const Stars = memo(function Stars({ count = 5, size = 16, filled = 5 }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <Star
          key={i}
          size={size}
          className={
            i < filled
              ? "text-orange-400 fill-orange-400"
              : "text-gray-300 fill-gray-100"
          }
        />
      ))}
    </div>
  );
});

// ─── ReviewCard ───────────────────────────────────────────────────────────────
function ReviewCard({ review, currentCustomerId }) {
  const dispatch = useDispatch();
  const { updating, deleting } = useSelector((state) => state.vendorReviews);

  const reviewId = review?.reviewId;

  const customerId =
    typeof review?.customerId === "object" && review?.customerId !== null
      ? review?.customerId?._id?.toString()
      : review?.customerId?.toString();

  const isOwner =
    !!currentCustomerId &&
    !!customerId &&
    customerId === currentCustomerId.toString();

  const [isEditing, setIsEditing] = useState(false);
  const [editRating, setEditRating] = useState(review?.rating || 0);
  const [editHovered, setEditHovered] = useState(0);
  const [editText, setEditText] = useState(review?.review || "");
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const name = review?.customerId?.name || "Anonymous";
  const date = review?.createdAt
    ? new Date(review.createdAt).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "";

  const handleSave = async () => {
    if (!editRating) return;
    await dispatch(
      updateVendorReview({
        reviewId,
        rating: editRating,
        review: editText.trim(),
      }),
    );
    setIsEditing(false);
  };

  const handleDeleteConfirm = () => {
    setShowDeleteModal(false);
    dispatch(deleteVendorReview(reviewId));
  };

  const isDeleting = deleting === reviewId;
  const isSaving = updating;

  return (
    <>
      <DeleteConfirmModal
        isOpen={showDeleteModal}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setShowDeleteModal(false)}
      />

      <div className="flex gap-3 p-4 bg-gray-50 rounded-xl border border-gray-100">
        <div className="w-9 h-9 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
          <User size={16} className="text-orange-500" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 flex-wrap">
            <div>
              <span className="text-sm font-semibold text-gray-800">
                {name}
              </span>
              <span className="text-[10px] text-gray-400 ml-2">{date}</span>
            </div>

            {isOwner && !isEditing && (
              <div className="flex items-center gap-1 flex-shrink-0">
                <button
                  onClick={() => setIsEditing(true)}
                  className="p-1.5 rounded-lg text-gray-400 hover:text-orange-500 hover:bg-orange-50 transition-colors"
                  aria-label="Edit review"
                >
                  <Pencil color="black" size={17} />
                </button>
                <button
                  onClick={() => setShowDeleteModal(true)}
                  disabled={isDeleting}
                  className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors disabled:opacity-50"
                  aria-label="Delete review"
                >
                  {isDeleting ? (
                    <span className="inline-block w-3 h-3 border-2 border-red-400 border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Trash2 color="black" size={17} />
                  )}
                </button>
              </div>
            )}

            {isOwner && isEditing && (
              <div className="flex items-center gap-1 flex-shrink-0">
                <button
                  onClick={handleSave}
                  disabled={isSaving || !editRating}
                  className="p-1.5 rounded-lg text-gray-400 hover:text-green-600 hover:bg-green-50 transition-colors disabled:opacity-50"
                  aria-label="Save review"
                >
                  {isSaving ? (
                    <span className="inline-block w-3 h-3 border-2 border-green-400 border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Check size={15} />
                  )}
                </button>
                <button
                  onClick={() => {
                    setIsEditing(false);
                    setEditRating(review.rating);
                    setEditText(review.review);
                  }}
                  className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
                  aria-label="Cancel edit"
                >
                  <X size={15} />
                </button>
              </div>
            )}
          </div>

          {!isEditing && (
            <>
              <div className="flex items-center gap-0.5 mt-0.5 mb-1">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star
                    key={s}
                    size={12}
                    className={
                      s <= review.rating
                        ? "text-orange-400 fill-orange-400"
                        : "text-gray-300 fill-gray-100"
                    }
                  />
                ))}
                <span className="ml-1 text-[11px] text-gray-500 font-medium">
                  {review.rating}.0
                </span>
              </div>
              {review.review && (
                <p className="text-xs text-gray-600 leading-relaxed">
                  {review.review}
                </p>
              )}
            </>
          )}

          {isEditing && (
            <div className="mt-2 space-y-2">
              <div
                className="flex items-center gap-1"
                role="radiogroup"
                aria-label="Edit star rating"
              >
                {[1, 2, 3, 4, 5].map((s) => (
                  <button
                    key={s}
                    type="button"
                    onMouseEnter={() => setEditHovered(s)}
                    onMouseLeave={() => setEditHovered(0)}
                    onClick={() => setEditRating(s)}
                    className="transition-transform hover:scale-110"
                  >
                    <Star
                      size={18}
                      className={
                        s <= (editHovered || editRating)
                          ? "text-orange-400 fill-orange-400"
                          : "text-gray-300 fill-gray-100"
                      }
                    />
                  </button>
                ))}
              </div>
              <textarea
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                rows={3}
                maxLength={1000}
                placeholder="Update your review..."
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-xs text-gray-700 placeholder-gray-400 outline-none focus:ring-2 focus:ring-orange-300 resize-none bg-white"
              />
              <p className="text-right text-[10px] text-gray-400">
                {editText.length}/1000
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

// ─── ReviewsSection ───────────────────────────────────────────────────────────
const ReviewsSection = memo(function ReviewsSection({
  reviews,
  loading,
  currentCustomerId,
}) {
  const avg = reviews.length
    ? (
        reviews.reduce((sum, r) => sum + (r.rating || 0), 0) / reviews.length
      ).toFixed(1)
    : null;

  return (
    <section className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <MessageSquare size={16} className="text-orange-500" />
          <h2 className="text-base font-semibold text-gray-800">
            Ratings &amp; Reviews
          </h2>
          {reviews.length > 0 && (
            <span className="text-xs bg-orange-100 text-orange-600 font-bold px-2 py-0.5 rounded-full">
              {reviews.length}
            </span>
          )}
        </div>
        {avg && (
          <div className="flex items-center gap-1">
            <Star size={14} className="text-orange-400 fill-orange-400" />
            <span className="text-sm font-bold text-gray-800">{avg}</span>
            <span className="text-xs text-gray-400">/ 5</span>
          </div>
        )}
      </div>

      {loading && (
        <div className="space-y-3">
          {[1, 2].map((i) => (
            <div
              key={i}
              className="flex gap-3 p-4 bg-gray-50 rounded-xl animate-pulse"
            >
              <div className="w-9 h-9 rounded-full bg-gray-200 flex-shrink-0" />
              <div className="flex-1 space-y-2">
                <div className="h-3 bg-gray-200 rounded w-1/3" />
                <div className="h-2 bg-gray-200 rounded w-1/4" />
                <div className="h-3 bg-gray-200 rounded w-3/4" />
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && reviews.length > 0 && (
        <div className="space-y-3">
          {reviews.map((review) => (
            <ReviewCard
              key={review._id || review.reviewId}
              review={review}
              currentCustomerId={currentCustomerId}
            />
          ))}
        </div>
      )}

      {!loading && reviews.length === 0 && (
        <div className="text-center py-8">
          <MessageSquare size={32} className="text-gray-300 mx-auto mb-2" />
          <p className="text-gray-400 text-sm">
            No reviews yet. Be the first to review!
          </p>
        </div>
      )}
    </section>
  );
});

// ─── Details ──────────────────────────────────────────────────────────────────
export default function Details() {
  const { city, venId, slug } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { vendor, loading, error } = useSelector((state) => state.vendorDetail);
  const { reviews, loading: reviewsLoading } = useSelector(
    (state) => state.vendorReviews,
  );
  const { success: reviewSubmitSuccess } = useSelector(
    (state) => state.rateReview,
  );

  const [rateModalOpen, setRateModalOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(null); // gallery lightbox
  const [serviceLightboxIndex, setServiceLightbox] = useState(null); // services lightbox

  const currentCustomerId = localStorage.getItem("customerId") || null;

  useEffect(() => {
    if (!venId) return;
    dispatch(fetchVendorById(venId));
    return () => {
      dispatch(clearVendorDetail());
      dispatch(clearVendorReviews());
    };
  }, [dispatch, venId]);

  useEffect(() => {
    if (!venId) return;
    dispatch(fetchVendorReviews(venId));
  }, [dispatch, venId]);

  useEffect(() => {
    if (reviewSubmitSuccess && venId) {
      dispatch(fetchVendorReviews(venId));
    }
  }, [reviewSubmitSuccess, dispatch, venId]);

  const openRateModal = useCallback(() => setRateModalOpen(true), []);
  const closeRateModal = useCallback(() => setRateModalOpen(false), []);
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const closeServiceLightbox = useCallback(() => setServiceLightbox(null), []);

  const handleSendEnquiry = useCallback(() => {
    const catId = vendor?.categoryId;
    const subCateId = Array.isArray(vendor?.subcategoryIds)
      ? vendor.subcategoryIds[0]
      : vendor?.subcategoryIds;
    const meta = { venId: vendor?.venId || venId, catId, subCateId };
    sessionStorage.setItem("enquiryMeta", JSON.stringify(meta));
    navigate(`/submitenquiry/${catId}/${subCateId}`, { state: meta });
  }, [vendor, venId, navigate]);

  const businessName =
    vendor?.companyName || slug?.replace(/-/g, " ") || "Business";
  const cityLabel = city?.replace(/-/g, " ") || "India";
  const categoryLabel =
    vendor?.category?.name || vendor?.category || "Services";

  const addressText =
    vendor?.address && Object.keys(vendor.address).length > 0
      ? `${vendor.address.city || ""}, ${vendor.address.state || ""}`.replace(
          /^,\s*|,\s*$/,
          "",
        )
      : "Address not provided";

  const resolvedVendorId = vendor?.vendorId || vendor?.venId || venId;

  const avgRating = reviews.length
    ? (
        reviews.reduce((sum, r) => sum + (r.rating || 0), 0) / reviews.length
      ).toFixed(1)
    : "0.0";
  const filledStars = reviews.length ? Math.round(parseFloat(avgRating)) : 5;

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500" />
        <p className="mt-4 text-gray-500 font-medium">Loading profile...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="text-center bg-white p-8 rounded-2xl shadow-sm border border-red-100">
          <p className="text-red-500 font-bold mb-2">Failed to load vendor</p>
          <p className="text-gray-500 text-sm">{error}</p>
          <button
            onClick={() => dispatch(fetchVendorById(venId))}
            className="mt-4 text-orange-500 font-bold"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!vendor) return null;

  const galleryImages = vendor.gallery || [];
  const serviceImages = (vendor.services || []).map((s) => ({
    image:
      s.image ||
      "https://images.unsplash.com/photo-1586717791821-3f44a563dc4c?w=500&q=80",
  }));

  return (
    <div className="min-h-screen bg-gray-50 font-sans pb-20">
      <SEO
        title={`${businessName} – ${categoryLabel} in ${cityLabel} | LocalTradeStreet`}
        description={`${businessName} provides ${categoryLabel} services in ${cityLabel}. View gallery, services, timings, ratings and contact details on LocalTradeStreet.`}
        ogImage={vendor?.image}
        ogType="business.business"
      />

      {/* Gallery Lightbox */}
      {lightboxIndex !== null && galleryImages.length > 0 && (
        <ImageLightbox
          images={galleryImages}
          startIndex={lightboxIndex}
          onClose={closeLightbox}
        />
      )}

      {/* Services Lightbox */}
      {serviceLightboxIndex !== null && serviceImages.length > 0 && (
        <ImageLightbox
          images={serviceImages}
          startIndex={serviceLightboxIndex}
          onClose={closeServiceLightbox}
        />
      )}

      <InfoRateNow
        isOpen={rateModalOpen}
        onClose={closeRateModal}
        businessName={vendor.companyName}
        vendorId={resolvedVendorId}
      />

      <Banner
        banners={vendor.banners}
        pageTitle={vendor.companyName}
        selectedCity={city?.replace(/-/g, " ") || ""}
      />
      <BreadcrumbBar
        businessName={vendor.companyName}
        venId={venId}
        city={city?.replace(/-/g, " ")}
      />

      <div className="w-full mx-auto px-4 py-6">
        {/* Hero card */}
        <div className="bg-white rounded-xl shadow-sm p-5 mb-5 border border-gray-100">
          <div className="flex flex-col sm:flex-row items-start gap-4">
            <div className="w-20 h-20 rounded-lg overflow-hidden border border-gray-200 flex-shrink-0 bg-gray-50">
              <img
                src={
                  vendor.image ||
                  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&q=80"
                }
                alt={`${vendor.companyName} logo`}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-1.5 flex-wrap mb-0.5">
                <h1 className="text-2xl font-bold text-gray-900">
                  {vendor.companyName}
                </h1>
                {(vendor.isVerify === "Verify" || vendor.isVerified) && (
                  <BadgeCheck
                    size={20}
                    className={`${getTickColorClass(vendor.tickColour)} shrink-0`}
                  />
                )}
                <PlanBadge plan={vendor.plan} />
              </div>
              <div className="flex items-center gap-1 text-sm text-gray-500 mb-1">
                <Stars filled={filledStars} size={14} />
                <span className="ml-1 text-gray-600 font-medium">
                  {avgRating}
                </span>
                <span className="text-gray-400 ml-1">
                  ({reviews.length}{" "}
                  {reviews.length === 1 ? "review" : "reviews"}) |{" "}
                  {categoryLabel}
                </span>
              </div>
              <div className="flex items-center gap-1 text-sm text-gray-500">
                <MapPin size={14} className="text-orange-500" />
                <span>{addressText}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 mt-4">
            <button
              onClick={handleSendEnquiry}
              className="flex cursor-pointer items-center justify-center gap-2 px-5 py-2.5 rounded-lg text-sm font-bold shadow-sm transition-all duration-300 min-w-[160px] bg-orange-500 text-white hover:bg-orange-600"
            >
              <Phone size={15} />
              <span>Send Enquiry</span>
            </button>
            <button
              onClick={openRateModal}
              className="flex items-center cursor-pointer gap-2 px-5 py-2.5 rounded-lg border border-gray-200 bg-white text-gray-700 text-sm font-semibold hover:bg-gray-50 transition-all"
            >
              <Star size={15} className="text-orange-400" /> Rate Now
            </button>
          </div>
        </div>

        {/* Subcategories */}
        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm mb-5">
          <h2 className="text-base font-semibold text-gray-800 mb-3">
            Subcategories
          </h2>
          <div className="flex flex-wrap gap-2">
            {vendor.subcategories?.length > 0 ? (
              vendor.subcategories.map((sub, i) => (
                <span
                  key={i}
                  className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full border border-gray-200"
                >
                  {typeof sub === "object" ? sub.name : sub}
                </span>
              ))
            ) : (
              <p className="text-gray-400 text-sm">
                No subcategories available
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="md:col-span-2 space-y-5">
            {/* Photo Gallery */}
            <section className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
              <h2 className="text-base font-semibold text-gray-800 mb-3">
                Photo Gallery
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {galleryImages.length > 0 ? (
                  galleryImages.map((item, i) => (
                    <div
                      key={item.id || i}
                      onClick={() => setLightboxIndex(i)}
                      className="group relative rounded-lg overflow-hidden aspect-square border border-gray-200 bg-gray-50 cursor-pointer"
                    >
                      <img
                        src={item.image || item.url}
                        alt={`${vendor.companyName} gallery ${i + 1}`}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {/* Hover overlay */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                        <ZoomIn
                          size={22}
                          className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 drop-shadow"
                        />
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-400 text-sm py-4 col-span-4">
                    Gallery is empty
                  </p>
                )}
              </div>
            </section>

            {/* Services */}
            <section className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
              <h2 className="text-base font-semibold text-gray-800 mb-4">
                Services
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {vendor.services?.length > 0 ? (
                  vendor.services.map((service, i) => (
                    <div
                      key={service.id || i}
                      className="group relative bg-white rounded-xl overflow-hidden border border-gray-200 hover:shadow-md transition-all duration-300"
                    >
                      <div className="absolute top-3 left-3 z-10">
                        <span className="bg-orange-500 text-white text-[11px] font-bold px-2 py-1 rounded shadow-sm flex items-center gap-0.5">
                          ₹ {service.price}
                        </span>
                      </div>
                      <div
                        className="aspect-[16/9] overflow-hidden bg-gray-100 cursor-pointer relative"
                        onClick={() => setServiceLightbox(i)}
                      >
                        <img
                          src={
                            service.image ||
                            "https://images.unsplash.com/photo-1586717791821-3f44a563dc4c?w=500&q=80"
                          }
                          alt={service.name}
                          loading="lazy"
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        {/* Hover overlay */}
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                          <ZoomIn
                            size={22}
                            className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 drop-shadow"
                          />
                        </div>
                      </div>
                      <div className="p-3 text-center border-t border-gray-50">
                        <h3 className="text-sm font-medium text-gray-700 truncate">
                          {service.name}
                        </h3>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-400 text-sm italic py-2 col-span-3">
                    No services listed
                  </p>
                )}
              </div>
            </section>

            {/* Business Info */}
            <section className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
              <h2 className="text-base font-semibold text-gray-800 mb-4">
                Business Info
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Clock className="text-orange-500 shrink-0" size={18} />
                  <div>
                    <p className="text-gray-400 text-[10px] uppercase font-bold">
                      Timing
                    </p>
                    <p className="text-gray-700 font-medium">
                      {vendor.openingTime || "N/A"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Calendar className="text-orange-500 shrink-0" size={18} />
                  <div>
                    <p className="text-gray-400 text-[10px] uppercase font-bold">
                      Days
                    </p>
                    <p className="text-gray-700 font-medium">
                      {vendor.openingDays?.join(", ") || "N/A"}
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* About */}
            {vendor.aboutUs && (
              <section className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
                <div className="flex items-center gap-2 mb-3">
                  <Info size={16} className="text-orange-500" />
                  <h2 className="text-base font-semibold text-gray-800">
                    About {vendor.companyName}
                  </h2>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">
                  {vendor.aboutUs}
                </p>
              </section>
            )}

            {/* Reviews Section */}
            <ReviewsSection
              reviews={reviews}
              loading={reviewsLoading}
              currentCustomerId={currentCustomerId}
            />

            {/* FAQ */}
            {vendor && <Faq vendor={vendor} />}
          </div>

          {/* Right sidebar */}
          <div className="space-y-4">
            <div className="sticky top-4">
              <CatgInfoRightSideBar vendorData={vendor} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
