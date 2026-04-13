import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Home, ChevronRight, ArrowLeft, Mail, Info, Target, Eye, CheckCircle2 } from "lucide-react";

const About = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      alert(`Thank you for subscribing with: ${email}`);
      setEmail("");
    }
  };

  return (
    <div className="w-full min-h-screen bg-white font-sans selection:bg-orange-100">
      
      {/* ── BREADCRUMB ── */}
      <nav className="w-full px-4 mt-6 sm:px-6 md:px-12 lg:px-24">
        <div className="flex items-center gap-3 py-3 border-b border-gray-50">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center justify-center w-8 h-8 rounded-full border border-gray-200 bg-white hover:bg-orange-500 hover:border-orange-500 hover:text-white text-gray-500 transition-all duration-300 shadow-sm"
            aria-label="Go back"
          >
            <ArrowLeft size={14} />
          </button>

          <div className="w-px h-4 bg-gray-200" />

          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-1.5 text-gray-400 hover:text-orange-600 transition-colors duration-200 group"
          >
            <Home size={14} className="group-hover:scale-110 transition-transform" />
            <span className="text-xs font-medium hidden sm:inline">Home</span>
          </button>

          <ChevronRight size={12} className="text-gray-300" />

          <span className="inline-flex items-center gap-1.5 text-[10px] sm:text-[11px] font-bold text-orange-600 bg-orange-50 border border-orange-100 rounded-full px-3 py-1 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
            About Us
          </span>
        </div>
      </nav>

      {/* ── HERO SECTION ── */}
      <section className="w-full py-12 sm:py-20 bg-gradient-to-b from-orange-50/30 to-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block mb-3 px-4 py-1.5 rounded-full bg-orange-100 text-orange-600 text-[10px] font-extrabold uppercase tracking-[0.2em]">
            Who We Are
          </span>
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-gray-900 tracking-tight leading-tight">
            India's Trusted <span className="text-orange-500">Local Business</span> Platform
          </h1>
          <p className="mt-4 text-gray-500 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            Bridging the gap between local vendors and digital customers. We bring your neighborhood marketplace to your fingertips.
          </p>
          <div className="mx-auto mt-6 w-16 h-1.5 rounded-full bg-orange-500" />
        </div>
      </section>

      {/* ── CONTENT GRID ── */}
      <section className="w-full pb-16 sm:pb-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10">

            {/* About Card */}
            <div className="group bg-white rounded-3xl border border-gray-100 p-8 shadow-sm hover:shadow-xl hover:border-orange-100 transition-all duration-500">
              <div className="w-12 h-12 rounded-2xl bg-orange-50 flex items-center justify-center mb-6 group-hover:rotate-6 transition-transform">
                <Info className="w-6 h-6 text-orange-500" />
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-4">About Local Trade Street</h3>
              <p className="text-gray-500 leading-relaxed text-sm">
                Local Trade Street is India's fastest-growing local business discovery platform, 
                connecting millions of customers with trusted service providers. We make local commerce 
                accessible, transparent, and efficient for everyone.
              </p>
            </div>

            {/* Mission Card */}
            <div className="group bg-gradient-to-br from-orange-500 to-orange-600 rounded-3xl p-8 shadow-lg hover:shadow-orange-200 transition-all duration-500 text-white">
              <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center mb-6 backdrop-blur-md group-hover:-rotate-6 transition-transform">
                <Target className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold mb-4">Our Mission</h3>
              <p className="text-orange-50/90 leading-relaxed text-sm">
                To empower local businesses with digital tools and visibility, while helping customers 
                find reliable services. We strive to create a trusted ecosystem where quality 
                service meets genuine demand.
              </p>
            </div>

            {/* Vision Card */}
            <div className="group bg-slate-900 rounded-3xl p-8 shadow-xl transition-all duration-500 text-white">
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Eye className="w-6 h-6 text-indigo-400" />
              </div>
              <h3 className="text-lg font-bold mb-4">Our Vision</h3>
              <p className="text-gray-400 leading-relaxed text-sm">
                To become India's most trusted platform for local business discovery, fostering economic 
                growth at the grassroots level and revolutionizing how Indians find and avail local services.
              </p>
            </div>

            {/* Benefits Card */}
            <div className="group bg-white rounded-3xl border border-gray-100 p-8 shadow-sm hover:shadow-xl transition-all duration-500">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-green-50 flex items-center justify-center group-hover:bg-green-500 group-hover:text-white transition-colors">
                  <CheckCircle2 className="w-6 h-6 text-green-500 group-hover:text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-800">Business Benefits</h3>
              </div>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  "Online Visibility",
                  "Free Listing",
                  "Verified Ratings",
                  "Direct Leads",
                  "Growth Insights",
                  "Customer Connect",
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-xs font-medium text-gray-600">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* ── NEWSLETTER ── */}
      <section className="w-full px-4 pb-12">
        <div className="max-w-6xl mx-auto bg-gray-900 rounded-[2.5rem] p-8 sm:p-16 relative overflow-hidden shadow-2xl">
          {/* Decorative Circle */}
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl" />
          
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10">
            <div className="text-center lg:text-left">
              <h2 className="text-2xl sm:text-4xl font-black text-white mb-4">
                Stay Updated with <br className="hidden sm:block" /> Local Trade News
              </h2>
              <p className="text-gray-400 text-sm sm:text-base">
                Join 5000+ businesses and customers today.
              </p>
            </div>

            <form onSubmit={handleSubscribe} className="w-full lg:w-auto">
              <div className="flex flex-col sm:flex-row gap-4 p-2 bg-white/5 rounded-2xl backdrop-blur-sm border border-white/10">
                <div className="relative flex-grow">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                  <input
                    required
                    type="email"
                    placeholder="yourname@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full lg:w-72 bg-transparent pl-12 pr-4 py-4 text-white text-sm outline-none placeholder:text-gray-600"
                  />
                </div>
                <button 
                  type="submit"
                  className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-xl font-bold text-sm transition-all active:scale-95 shadow-lg shadow-orange-500/20"
                >
                  Subscribe Now
                </button>
              </div>
              <p className="text-[10px] text-gray-500 mt-4 text-center lg:text-left uppercase tracking-widest font-bold">
                No Spam • One-Click Unsubscribe
              </p>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;