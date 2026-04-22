import React, { useState, useEffect } from "react";
import { X, Star } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  submitRateReview,
  resetRateReview,
} from "../../../redux/slice/ratingandreviews/addReviewSlice";

const RatingStructuredData = ({ businessName, vendorId }) => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: businessName,
    identifier: vendorId,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4",
      bestRating: "5",
      worstRating: "1",
      ratingCount: "1",
    },
    review: {
      "@type": "Review",
      reviewBody: "Customer review for " + businessName,
      author: { "@type": "Person", name: "Customer" },
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
};

const STAR_LABELS = {
  1: "Poor",
  2: "Fair",
  3: "Good",
  4: "Very Good",
  5: "Excellent",
};

const InfoRateNow = ({
  isOpen,
  onClose,
  businessName = "S S Rana Tour And Travels",
  vendorId = "VEN-182",
}) => {
  const dispatch = useDispatch();
  const { loading, success, alreadyReviewed } = useSelector(
    (state) => state.rateReview,
  );

  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);
  const [form, setForm] = useState({ review: "", name: "" });

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const metaDesc = document.querySelector('meta[name="description"]');
    const prev = metaDesc?.getAttribute("content");
    if (metaDesc) {
      metaDesc.setAttribute(
        "content",
        `Rate and review ${businessName}. Share your experience and help others make informed decisions.`,
      );
    }
    return () => {
      if (metaDesc && prev) metaDesc.setAttribute("content", prev);
    };
  }, [isOpen, businessName]);

  useEffect(() => {
    if (alreadyReviewed) {
      dispatch(resetRateReview());
      onClose();
    }
  }, [alreadyReviewed, dispatch, onClose]);

  useEffect(() => {
    if (success) {
      setRating(0);
      setHovered(0);
      setForm({ review: "", name: "" });
      dispatch(resetRateReview());
      onClose();
    }
  }, [success, dispatch, onClose]);

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (!rating) {
      toast.warning("Please select a star rating before submitting.", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }
    if (!form.review.trim()) {
      toast.warning("Please write a review before submitting.", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }
    dispatch(
      submitRateReview({ vendorId, rating, review: form.review.trim() }),
    );
  };

  const activeLabel = STAR_LABELS[hovered || rating] || "";

  return (
    <>
      {/* ── SEO: JSON-LD ── */}
      <RatingStructuredData businessName={businessName} vendorId={vendorId} />

      {/* ── Hide scrollbar ── */}
      <style>{`
        .modal-inner::-webkit-scrollbar { display: none; }
        .modal-inner { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {/* ── Backdrop ── */}
      <div
        className="fixed left-0 right-0 bottom-0 z-40 bg-black/50 backdrop-blur-sm"
        style={{ top: "64px" }}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* ── Modal Wrapper ── */}
      <div
        className="fixed left-0 right-0 bottom-0 z-50 flex items-start justify-center px-4 pt-6"
        style={{ top: "64px" }}
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-label={`Rate and review ${businessName}`}
      >
        {/* Modal Card */}
        <div
          className="modal-inner bg-white w-full rounded-2xl shadow-2xl"
          style={{
            maxWidth: "580px",
            maxHeight: "calc(100vh - 100px)",
            overflowY: "auto",
          }}
          onClick={(e) => e.stopPropagation()}
          itemScope
          itemType="https://schema.org/Review"
        >
          {/* ── Header ── */}
          <div className="flex items-start justify-between px-6 pt-5 pb-4">
            <div className="flex-1 pr-3">
              <p className="text-sm leading-snug">
                <span className="font-semibold text-gray-900">
                  Hii Jhone Verge{" "}
                </span>
                <span className="text-orange-500 font-semibold">
                  Give Your Rating &amp; Review for{" "}
                </span>
                {/* SEO: <strong> with itemProp for schema */}
                <strong
                  className="font-bold text-gray-900"
                  itemProp="itemReviewed"
                >
                  {businessName}
                </strong>
              </p>

              {/* Star Rating — role="radiogroup" for a11y & crawlability */}
              <div
                className="flex items-center gap-1.5 mt-3"
                role="radiogroup"
                aria-label="Select star rating"
              >
                {[1, 2, 3, 4, 5].map((s) => (
                  <button
                    key={s}
                    type="button"
                    role="radio"
                    aria-checked={rating === s}
                    aria-label={`${STAR_LABELS[s]} — ${s} out of 5 stars`}
                    onMouseEnter={() => setHovered(s)}
                    onMouseLeave={() => setHovered(0)}
                    onClick={() => setRating(s)}
                    disabled={loading}
                    className="transition-transform hover:scale-110 active:scale-95"
                  >
                    <Star
                      size={28}
                      aria-hidden="true"
                      className={
                        s <= (hovered || rating)
                          ? "text-orange-400 fill-orange-400"
                          : "text-gray-300 fill-gray-100"
                      }
                    />
                  </button>
                ))}

                {/* Visible label — indexable text for SEO */}
                {activeLabel && (
                  <span
                    className="ml-2 text-xs font-semibold text-orange-500"
                    aria-live="polite"
                    itemProp="ratingValue"
                  >
                    {activeLabel}
                  </span>
                )}
              </div>
            </div>

            {/* Close */}
            <button
              onClick={onClose}
              disabled={loading}
              aria-label="Close review modal"
              className="flex-shrink-0 text-gray-400 hover:text-gray-700 transition-colors p-1.5 rounded-full hover:bg-gray-100 disabled:opacity-50"
            >
              <X size={18} aria-hidden="true" />
            </button>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-100 mx-6" role="separator" />

          {/* ── Form Body ── */}
          <section
            className="px-6 py-5 space-y-4"
            aria-label="Review submission form"
          >
            {/* Review textarea */}
            <div>
              <label
                htmlFor="review-textarea"
                className="block text-sm font-semibold text-gray-800 mb-1.5"
              >
                Enter Your Reviews
              </label>
              <div className="relative border border-gray-200 rounded-xl bg-gray-50 overflow-hidden">
                <textarea
                  id="review-textarea"
                  name="review"
                  value={form.review}
                  onChange={(e) => setForm({ ...form, review: e.target.value })}
                  placeholder="Enter your reviews here. Share your personal experience, photos & what you want other customers to know about before visiting or Holidays Private Limited."
                  rows={4}
                  disabled={loading}
                  aria-required="true"
                  aria-label={`Write your review for ${businessName}`}
                  maxLength={1000}
                  itemProp="reviewBody"
                  className="w-full p-3 pb-10 text-xs text-gray-600 bg-transparent outline-none resize-none placeholder-gray-400 leading-relaxed disabled:opacity-60"
                />
                <div className="absolute bottom-2 left-2 pointer-events-none">
                  <div className="w-7 h-7 rounded-full bg-gray-300 flex items-center justify-center border border-gray-200">
                    <svg
                      viewBox="0 0 24 24"
                      fill="#9ca3af"
                      className="w-4 h-4"
                      aria-hidden="true"
                    >
                      <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
                    </svg>
                  </div>
                </div>
              </div>
              {/* Character count */}
              <p
                className="text-right text-[10px] text-gray-400 mt-1"
                aria-live="polite"
              >
                {form.review.length}/1000
              </p>
            </div>

            {/* Submit */}
            <button
              type="button"
              onClick={handleSubmit}
              disabled={loading}
              aria-label={`Submit your review for ${businessName}`}
              aria-busy={loading}
              className="w-full py-3.5 bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm rounded-xl transition-colors duration-200 shadow-md disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8H4z"
                    />
                  </svg>
                  Submitting...
                </>
              ) : (
                "Submit Review"
              )}
            </button>
          </section>
        </div>
      </div>
    </>
  );
};

export default InfoRateNow;
