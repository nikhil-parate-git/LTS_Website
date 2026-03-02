import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  MapPin,
  Search,
  Home,
  ChevronRight,
  ArrowLeft,
  Phone,
  Mail,
  Clock,
} from "lucide-react";

const Contact = () => {
  const navigate = useNavigate();
  const [locationVal, setLocationVal] = useState("");
  const [searchVal, setSearchVal] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "",
    pincode: "",
    subject: "",
    message: "",
  });

  const maxChars = 150;

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
    <div className="min-h-screen bg-white font-sans">
      {/* ── HEADER ── */}
      <div className="sticky top-0 z-10 bg-white ">
        <div className="w-full px-4 md:px-8 py-4">
          <h1 className="text-center text-xl md:text-2xl font-bold text-gray-800 mb-4">
            Find Top Businesses In Your City
          </h1>
          <div className="flex flex-col sm:flex-row gap-2 max-w-3xl mx-auto">
            <div className="flex items-center border border-gray-300 rounded-md bg-white px-3 py-2 flex-1 gap-2">
              <MapPin size={16} className="text-gray-400 shrink-0" />
              <input
                type="text"
                placeholder="Enter Location"
                value={locationVal}
                onChange={(e) => setLocationVal(e.target.value)}
                className="text-sm text-gray-600 outline-none w-full bg-transparent placeholder-gray-400"
              />
            </div>
            <div className="flex items-center border border-gray-300 rounded-md bg-white px-3 py-2 flex-1 gap-2">
              <Search size={16} className="text-gray-400 shrink-0" />
              <input
                type="text"
                placeholder="What are you looking for?"
                value={searchVal}
                onChange={(e) => setSearchVal(e.target.value)}
                className="text-sm text-gray-600 outline-none w-full bg-transparent placeholder-gray-400"
              />
              <button className="bg-red-500 hover:bg-red-600 text-white rounded p-1 shrink-0">
                <Search size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── BREADCRUMB ── */}
      <div className="w-full  border-gray-200 px-4 md:px-8">
        <div className="flex items-center py-2.5">
          <div className="flex items-center gap-3 overflow-x-auto">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center justify-center w-8 h-8 rounded-full border border-gray-200 bg-gray-50 hover:bg-orange-500 hover:border-orange-500 hover:text-white text-gray-500 transition-all duration-200 shrink-0 shadow-sm"
            >
              <ArrowLeft size={14} />
            </button>

            <div className="w-px h-5 bg-gray-200 shrink-0" />

            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-1.5 text-gray-400 hover:text-orange-500 transition-colors duration-200 shrink-0 group"
            >
              <Home
                size={13}
                className="group-hover:text-orange-500 transition-colors"
              />
              <span className="text-xs font-medium hidden sm:inline">Home</span>
            </button>

            <ChevronRight size={13} className="text-gray-300 shrink-0" />

            <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-orange-600 bg-orange-50 border border-orange-200 rounded-full px-3 py-1 whitespace-nowrap shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500 shrink-0" />
              Contact Us
            </span>
          </div>
        </div>
      </div>

      {/* ── BODY ── */}
      <div className="w-full px-4 md:px-10 lg:px-20 py-10">
        <div className="flex flex-col lg:flex-row gap-10 items-start">
          {/* ── LEFT — Get In Touch ── */}
          <div className="w-full lg:w-2/5">
            <h2 className="text-lg font-bold text-gray-800 mb-1">
              Get In Touch
            </h2>
            <div className="w-10 h-1 bg-orange-500 rounded-full mb-4" />
            <p className="text-sm text-gray-500 leading-relaxed mb-6">
              Have a question, feedback, or need assistance? We're here to help!
              Whether you're a business owner looking to list your services or a
              customer seeking support, our team is ready to assist you. Reach
              out to us and we'll get back to you as soon as possible.
            </p>

            {/* Contact Info Cards */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 rounded-lg bg-orange-50 border border-orange-100">
                <div className="w-9 h-9 rounded-full bg-orange-500 flex items-center justify-center shrink-0">
                  <Phone size={15} className="text-white" />
                </div>
                <div>
                  <p className="text-[11px] text-gray-400 font-medium">
                    Call Us
                  </p>
                  <p className="text-sm font-semibold text-gray-700">
                    +91-070307 72573
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-lg bg-blue-50 border border-blue-100">
                <div className="w-9 h-9 rounded-full bg-blue-500 flex items-center justify-center shrink-0">
                  <Mail size={15} className="text-white" />
                </div>
                <div>
                  <p className="text-[11px] text-gray-400 font-medium">
                    Email Us
                  </p>
                  <p className="text-sm font-semibold text-gray-700">
                    support@localtradestreet.com
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ── RIGHT — Form Card ── */}
          <div className="w-full lg:w-3/5">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 px-8 py-8">
              <h3 className="text-base font-bold text-gray-800 mb-1">
                Send Us a Message
              </h3>
              <div className="w-8 h-1 bg-orange-500 rounded-full mb-5" />

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name + Email — side by side */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <label className="text-xs font-semibold text-gray-600 mb-1 block">
                      Name <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Your full name"
                      className="w-full text-sm text-gray-700 placeholder-gray-400 border border-gray-200 rounded-lg px-3 py-2.5 outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all bg-gray-50"
                      required
                    />
                  </div>
                  <div className="flex-1">
                    <label className="text-xs font-semibold text-gray-600 mb-1 block">
                      Email <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      className="w-full text-sm text-gray-700 placeholder-gray-400 border border-gray-200 rounded-lg px-3 py-2.5 outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all bg-gray-50"
                      required
                    />
                  </div>
                </div>

                {/* Contact Number + Pincode — side by side */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <label className="text-xs font-semibold text-gray-600 mb-1 block">
                      Contact Number <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="tel"
                      name="mobile"
                      value={form.mobile}
                      onChange={handleChange}
                      placeholder="10-digit mobile number"
                      className="w-full text-sm text-gray-700 placeholder-gray-400 border border-gray-200 rounded-lg px-3 py-2.5 outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all bg-gray-50"
                      required
                    />
                  </div>
                  <div className="flex-1">
                    <label className="text-xs font-semibold text-gray-600 mb-1 block">
                      Pincode <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      name="pincode"
                      value={form.pincode}
                      onChange={handleChange}
                      placeholder="6-digit pincode"
                      className="w-full text-sm text-gray-700 placeholder-gray-400 border border-gray-200 rounded-lg px-3 py-2.5 outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all bg-gray-50"
                      required
                    />
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label className="text-xs font-semibold text-gray-600 mb-1 block">
                    Subject <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    placeholder="How can we help you?"
                    className="w-full text-sm text-gray-700 placeholder-gray-400 border border-gray-200 rounded-lg px-3 py-2.5 outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all bg-gray-50"
                    required
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="text-xs font-semibold text-gray-600 mb-1 block">
                    Message <span className="text-red-400">*</span>
                  </label>
                  <div className="border border-gray-200 rounded-lg focus-within:border-orange-400 focus-within:ring-2 focus-within:ring-orange-100 transition-all bg-gray-50">
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Write your message here..."
                      rows={4}
                      className="w-full text-sm text-gray-700 placeholder-gray-400 outline-none bg-transparent resize-none px-3 pt-2.5 pb-1"
                      required
                    />
                    <div className="text-right text-[10px] text-gray-400 px-3 pb-1.5">
                      {maxChars - form.message.length} chars left
                    </div>
                  </div>
                </div>

                {/* Submit */}
                <div className="flex justify-center pt-1">
                  <button
                    type="submit"
                    className="bg-orange-500 hover:bg-orange-600 active:scale-95 text-white font-semibold text-sm px-16 py-3 rounded-lg transition-all duration-300 hover:shadow-lg"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
