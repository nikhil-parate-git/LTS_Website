import React, { useState, useRef, useEffect } from "react";
import { X, Star, Upload } from "lucide-react";

const InfoRateNow = ({ isOpen, onClose, businessName = "S S Rana Tour And Travels" }) => {
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);
  const [form, setForm] = useState({ review: "", name: "", phone: "", photo: null });
  const [preview, setPreview] = useState(null);
  const fileRef = useRef();

  // ── Lock body scroll when open ──────────────────────────────────────────
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

  if (!isOpen) return null;

  const handlePhoto = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setForm({ ...form, photo: file });
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = () => {
    onClose();
  };

  return (
    <>
      {/* ── Hide scrollbar style ── */}
      <style>{`
        .modal-inner::-webkit-scrollbar { display: none; }
        .modal-inner { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {/* ── Backdrop: below navbar at 64px ── */}
      <div
        className="fixed left-0 right-0 bottom-0 z-40 bg-black/50 backdrop-blur-sm"
        style={{ top: "64px" }}
        onClick={onClose}
      />

      {/* ── Modal Centering Wrapper ── */}
      <div
        className="fixed left-0 right-0 bottom-0 z-50 flex items-start justify-center px-4 pt-6"
        style={{ top: "64px" }}
        onClick={onClose}
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
        >
          {/* ── Header ── */}
          <div className="flex items-start justify-between px-6 pt-5 pb-4">
            <div className="flex-1 pr-3">
              <p className="text-sm leading-snug">
                <span className="font-semibold text-gray-900">Hii Jhone Verge </span>
                <span className="text-orange-500 font-semibold">
                  Give Your Rating &amp; Review for{" "}
                </span>
                <span className="font-bold text-gray-900">{businessName}</span>
              </p>

              {/* Star Rating */}
              <div className="flex items-center gap-1.5 mt-3">
                {[1, 2, 3, 4, 5].map((s) => (
                  <button
                    key={s}
                    type="button"
                    onMouseEnter={() => setHovered(s)}
                    onMouseLeave={() => setHovered(0)}
                    onClick={() => setRating(s)}
                    className="transition-transform hover:scale-110 active:scale-95"
                  >
                    <Star
                      size={28}
                      className={
                        s <= (hovered || rating)
                          ? "text-orange-400 fill-orange-400"
                          : "text-gray-300 fill-gray-100"
                      }
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Close button */}
            <button
              onClick={onClose}
              className="flex-shrink-0 text-gray-400 hover:text-gray-700 transition-colors p-1.5 rounded-full hover:bg-gray-100"
            >
              <X size={18} />
            </button>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-100 mx-6" />

          {/* ── Form Body ── */}
          <div className="px-6 py-5 space-y-4">

            {/* Enter Your Reviews */}
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-1.5">
                Enter Your Reviews
              </label>
              <div className="relative border border-gray-200 rounded-xl bg-gray-50 overflow-hidden">
                <textarea
                  value={form.review}
                  onChange={(e) => setForm({ ...form, review: e.target.value })}
                  placeholder="Enter your reviews here. Share your personal experience, photos & what you want other customers to know about before visiting or Holidays Private Limited."
                  rows={4}
                  className="w-full p-3 pb-10 text-xs text-gray-600 bg-transparent outline-none resize-none placeholder-gray-400 leading-relaxed"
                />
                <div className="absolute bottom-2 left-2 pointer-events-none">
                  <div className="w-7 h-7 rounded-full bg-gray-300 flex items-center justify-center border border-gray-200">
                    <svg viewBox="0 0 24 24" fill="#9ca3af" className="w-4 h-4">
                      <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/>
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Your Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-1.5">
                Your Name
              </label>
              <input
                type="text"
                placeholder="Enter Your Name here"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-700 placeholder-gray-400 outline-none focus:ring-2 focus:ring-orange-300 bg-white"
              />
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-1.5">
                Phone Number
              </label>
              <div className="flex border border-gray-200 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-orange-300 bg-white">
                <div className="flex items-center gap-1 px-3 py-2.5 border-r border-gray-200 bg-white flex-shrink-0 cursor-pointer">
                  <span className="text-xs font-medium text-gray-700">IN</span>
                  <svg className="w-3 h-3 text-gray-400 ml-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                  <span className="text-xs text-gray-600 ml-1">+91</span>
                </div>
                <input
                  type="tel"
                  placeholder="7045611111"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="flex-1 px-3 py-2.5 text-sm text-gray-700 placeholder-gray-400 outline-none bg-white"
                />
              </div>
            </div>

            {/* Upload Photo */}
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-1.5">
                Upload Photo
              </label>
              <div
                onClick={() => fileRef.current.click()}
                className="border-2 border-dashed border-orange-300 rounded-xl py-6 flex flex-col items-center justify-center cursor-pointer hover:bg-orange-50 transition-colors bg-orange-50/30"
              >
                {preview ? (
                  <img src={preview} alt="preview" className="h-16 w-auto rounded-lg object-cover" />
                ) : (
                  <>
                    <Upload size={22} className="text-gray-400 mb-1.5" />
                    <p className="text-xs text-gray-500 text-center px-4">
                      Upload Image (Add JPG,JPEG, PNG Photos Only – Max. 10 MB each)
                    </p>
                  </>
                )}
              </div>
              <input
                ref={fileRef}
                type="file"
                accept=".jpg,.jpeg,.png"
                className="hidden"
                onChange={handlePhoto}
              />
            </div>

            {/* Submit */}
            <button
              onClick={handleSubmit}
              className="w-full py-3.5 bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm rounded-xl transition-colors duration-200 shadow-md"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default InfoRateNow;