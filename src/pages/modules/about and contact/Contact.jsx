import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Home,
  ChevronRight,
  ArrowLeft,
  Phone,
  Mail,
  MapPin,
  MessageSquare,
} from "lucide-react";

const Contact = () => {
  const navigate = useNavigate();
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
    
    // Validation: Mobile & Pincode should only contain numbers
    if ((name === "mobile" || name === "pincode") && value !== "" && !/^\d+$/.test(value)) return;
    
    if (name === "message" && value.length > maxChars) return;
    
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aap yahan API call add kar sakte hain
    console.log("Form submitted:", form);
    alert("Shukriya! Hum jald hi aapse contact karenge.");
  };

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-orange-100">
      
      {/* ── BREADCRUMB ── */}
      <div className="w-full mt-5 px-4 md:px-12 lg:px-24">
        <div className="flex items-center py-2.5">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center justify-center w-8 h-8 rounded-full border border-gray-200 bg-white hover:bg-orange-500 hover:text-white transition-all duration-300 shadow-sm"
            >
              <ArrowLeft size={14} />
            </button>
            <div className="w-px h-5 bg-gray-200 shrink-0" />
            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-1.5 text-gray-400 hover:text-orange-500 transition-colors group"
            >
              <Home size={14} />
              <span className="text-xs font-medium hidden sm:inline">Home</span>
            </button>
            <ChevronRight size={13} className="text-gray-300" />
            <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-orange-600 bg-orange-50 border border-orange-200 rounded-full px-3 py-1">
              Contact Us
            </span>
          </div>
        </div>
      </div>

      {/* ── BODY ── */}
      <div className="w-full px-4 md:px-12 lg:px-24 py-10">
        <div className="flex flex-col lg:flex-row gap-12 items-start">
          
          {/* ── LEFT — Contact Info ── */}
          <div className="w-full lg:w-2/5">
            <span className="text-orange-500 font-bold text-xs uppercase tracking-widest">Connect with us</span>
            <h2 className="text-3xl font-black text-gray-900 mt-2 mb-4">
              Get In <span className="text-orange-500">Touch</span>
            </h2>
            <p className="text-sm text-gray-500 leading-relaxed mb-8">
              Koi sawal ya feedback? Humari team hamesha aapki madad ke liye taiyar hai. 
              Business listing ho ya support, niche diye gaye tariko se humse judiye.
            </p>

            {/* Info Cards */}
            <div className="space-y-4">
              {/* Email Card */}
              <a href="mailto:support@localtradestreet.com" className="flex items-center gap-4 p-4 rounded-2xl bg-blue-50/50 border border-blue-100 hover:shadow-md transition-all group">
                <div className="w-11 h-11 rounded-xl bg-blue-500 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <Mail size={18} className="text-white" />
                </div>
                <div>
                  <p className="text-[10px] text-blue-500 font-extrabold uppercase tracking-tight">Email Us</p>
                  <p className="text-sm font-bold text-gray-700">support@localtradestreet.com</p>
                </div>
              </a>

              {/* Call Card */}
              <a href="tel:+917030772573" className="flex items-center gap-4 p-4 rounded-2xl bg-green-50/50 border border-green-100 hover:shadow-md transition-all group">
                <div className="w-11 h-11 rounded-xl bg-green-500 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <Phone size={18} className="text-white" />
                </div>
                <div>
                  <p className="text-[10px] text-green-600 font-extrabold uppercase tracking-tight">Call/WhatsApp</p>
                  <p className="text-sm font-bold text-gray-700">+91 70307 72573</p>
                </div>
              </a>

              {/* Address Card */}
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-orange-50/50 border border-orange-100 hover:shadow-md transition-all group">
                <div className="w-11 h-11 rounded-xl bg-orange-500 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform mt-1">
                  <MapPin size={18} className="text-white" />
                </div>
                <div>
                  <p className="text-[10px] text-orange-600 font-extrabold uppercase tracking-tight">Visit Us</p>
                  <p className="text-sm font-bold text-gray-700 leading-tight">
                    4th floor, Prince Complex, Chatrapati Nagar, Nagpur, Maharashtra 440025
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ── RIGHT — Form Card ── */}
          <div className="w-full lg:w-3/5">
            <div className="bg-white rounded-[2rem] shadow-2xl shadow-gray-200/50 border border-gray-100 p-8 md:p-10">
              <div className="flex items-center gap-2 mb-6">
                <MessageSquare className="text-orange-500" size={20} />
                <h3 className="text-xl font-bold text-gray-800">Send Us a Message</h3>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-500 ml-1">YOUR NAME</label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="e.g. Rahul Sharma"
                      className="w-full text-sm text-gray-700 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 focus:border-orange-400 focus:ring-4 focus:ring-orange-50 outline-none transition-all"
                      required
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-500 ml-1">EMAIL ADDRESS</label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="rahul@example.com"
                      className="w-full text-sm text-gray-700 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 focus:border-orange-400 focus:ring-4 focus:ring-orange-50 outline-none transition-all"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-500 ml-1">MOBILE NUMBER</label>
                    <input
                      type="tel"
                      name="mobile"
                      maxLength={10}
                      value={form.mobile}
                      onChange={handleChange}
                      placeholder="10 digit number"
                      className="w-full text-sm text-gray-700 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 focus:border-orange-400 focus:ring-4 focus:ring-orange-50 outline-none transition-all"
                      required
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-500 ml-1">PINCODE</label>
                    <input
                      type="text"
                      name="pincode"
                      maxLength={6}
                      value={form.pincode}
                      onChange={handleChange}
                      placeholder="6 digit pincode"
                      className="w-full text-sm text-gray-700 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 focus:border-orange-400 focus:ring-4 focus:ring-orange-50 outline-none transition-all"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-500 ml-1">SUBJECT</label>
                  <input
                    type="text"
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    placeholder="How can we help you?"
                    className="w-full text-sm text-gray-700 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 focus:border-orange-400 focus:ring-4 focus:ring-orange-50 outline-none transition-all"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-500 ml-1 flex justify-between">
                    MESSAGE <span>{maxChars - form.message.length} chars left</span>
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Describe your requirement..."
                    className="w-full text-sm text-gray-700 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 focus:border-orange-400 focus:ring-4 focus:ring-orange-50 outline-none transition-all resize-none"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-orange-500/30 transition-all active:scale-[0.98]"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;