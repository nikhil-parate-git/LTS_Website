import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Contact = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "",
    reason: "",
    message: "",
  });

  const maxChars = 100;

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "message" && value.length > maxChars) return;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", form);
  };

  return (
    <div className="w-full min-h-screen bg-white font-sans px-4 sm:px-8 md:px-16 lg:px-32 py-10">
      {/* Header — Back Arrow + Title */}
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => navigate(-1)}
          className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-500 hover:text-orange-500 transition-all duration-200 flex-shrink-0"
          aria-label="Go back"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
        </button>
        <h2 className="text-xl font-bold text-gray-800">Contact Us</h2>
      </div>

      {/* Subtitle */}
      <p className="text-center text-sm font-medium text-gray-700 mb-6">
        Please fill the form below and we will soon get in touch with you
      </p>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <div className="flex items-center gap-3 border border-gray-300 rounded-lg px-4 py-3 focus-within:border-orange-400 focus-within:ring-1 focus-within:ring-orange-300 transition-all bg-white">
          <svg
            className="w-4 h-4 text-blue-800 flex-shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Enter your Name"
            className="w-full text-sm text-gray-700 placeholder-gray-400 outline-none bg-transparent"
            required
          />
        </div>

        {/* Email */}
        <div className="flex items-center gap-3 border border-gray-300 rounded-lg px-4 py-3 focus-within:border-orange-400 focus-within:ring-1 focus-within:ring-orange-300 transition-all bg-white">
          <svg
            className="w-4 h-4 text-blue-800 flex-shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Enter your Email ID"
            className="w-full text-sm text-gray-700 placeholder-gray-400 outline-none bg-transparent"
            required
          />
        </div>

        {/* Mobile */}
        <div className="flex items-center gap-3 border border-gray-300 rounded-lg px-4 py-3 focus-within:border-orange-400 focus-within:ring-1 focus-within:ring-orange-300 transition-all bg-white">
          <svg
            className="w-4 h-4 text-blue-800 flex-shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
            />
          </svg>
          <input
            type="tel"
            name="mobile"
            value={form.mobile}
            onChange={handleChange}
            placeholder="Enter your Mobile No."
            className="w-full text-sm text-gray-700 placeholder-gray-400 outline-none bg-transparent"
            required
          />
        </div>

        {/* Reason Dropdown */}
        <div className="relative border border-gray-300 rounded-lg px-4 py-3 focus-within:border-orange-400 focus-within:ring-1 focus-within:ring-orange-300 transition-all bg-white">
          <select
            name="reason"
            value={form.reason}
            onChange={handleChange}
            className="w-full text-sm text-gray-500 outline-none bg-white appearance-none cursor-pointer pr-6"
            required
          >
            <option value="" disabled>
              Select your reason to contact us
            </option>
            <option value="listing">Customized Business Listing</option>
            <option value="ads">Advertisements</option>
            <option value="partnership">
              Partnership / Alliance / Tie-upp
            </option>
            <option value="other">Other</option>
          </select>
          <svg
            className="w-4 h-4 text-gray-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>

        {/* Message */}
        <div className="relative border border-gray-300 rounded-lg px-4 pt-3 pb-2 focus-within:border-orange-400 focus-within:ring-1 focus-within:ring-orange-300 transition-all bg-white">
          <div className="flex items-start gap-3">
            <svg
              className="w-4 h-4 text-blue-800 flex-shrink-0 mt-0.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
              />
            </svg>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Enter your Message"
              rows={4}
              className="w-full text-sm text-gray-700 placeholder-gray-400 outline-none bg-transparent resize-none"
              required
            />
          </div>
          <div className="text-right text-xs text-gray-400 mt-1">
            {maxChars - form.message.length}
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-center pt-2">
          <button
            type="submit"
            className="bg-orange-500 hover:bg-orange-600 active:scale-95 text-white font-semibold text-sm px-16 py-3 rounded-lg transition-all duration-300 hover:shadow-lg"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Contact;
