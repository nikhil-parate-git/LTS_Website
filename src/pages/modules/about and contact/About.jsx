import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, Search, Home, ChevronRight, ArrowLeft } from "lucide-react";

const About = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");


  return (
    <div className="w-full min-h-screen bg-white font-sans">

   

      {/* ── BREADCRUMB ── */}
      <div className="w-full px-3 mt-5 sm:px-6 md:px-8">
        <div className="flex items-center py-2 sm:py-2.5">
          <div className="flex items-center gap-2 sm:gap-3">

            <button
              onClick={() => navigate(-1)}
              className="flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-gray-200 bg-gray-50 hover:bg-orange-500 hover:border-orange-500 hover:text-white text-gray-500 transition-all duration-200 shrink-0 shadow-sm"
            >
              <ArrowLeft size={13} />
            </button>

            <div className="w-px h-4 bg-gray-200 shrink-0" />

            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-1 text-gray-400 hover:text-orange-500 transition-colors duration-200 shrink-0 group"
            >
              <Home size={13} className="group-hover:text-orange-500 transition-colors" />
              <span className="text-xs font-medium hidden sm:inline">Home</span>
            </button>

            <ChevronRight size={11} className="text-gray-300 shrink-0" />

            <span className="inline-flex items-center gap-1.5 text-[10px] sm:text-[11px] font-semibold text-orange-600 bg-orange-50 border border-orange-200 rounded-full px-2.5 py-0.5 sm:px-3 sm:py-1 whitespace-nowrap shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500 shrink-0" />
              About Us
            </span>

          </div>
        </div>
      </div>

      {/* ── ABOUT / MISSION / VISION ── */}
      <section className="w-full  py-8 sm:py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Section Title */}
          <div className="text-center mb-8 sm:mb-12">
            <span className="inline-block mb-2 px-4 py-1 rounded-full bg-orange-100 text-orange-600 text-[11px] font-bold uppercase tracking-widest">
              Who We Are
            </span>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-gray-900 mt-1">
              India's Trusted Local Business Platform
            </h2>
            <div className="mx-auto mt-3 w-12 h-1 rounded-full bg-orange-500" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 lg:gap-8">

            {/* ── About ── */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5 sm:p-7 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-sm sm:text-base font-bold text-gray-800">About Local Trade Street</h3>
              </div>
              <div className="w-full h-px bg-gray-100" />
              <p className="text-gray-500 leading-relaxed text-xs sm:text-sm">
                Local Trade Street is India's fastest-growing local business discovery platform,
                connecting millions of customers with trusted service providers in their
                neighbourhood. We're on a mission to make local commerce more accessible,
                transparent, and efficient for everyone.
              </p>
            </div>

            {/* ── Mission ── */}
            <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl border border-orange-100 p-5 sm:p-7 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-orange-500 flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
                <h3 className="text-sm sm:text-base font-bold text-gray-800">Our Mission</h3>
              </div>
              <div className="w-full h-px bg-orange-100" />
              <p className="text-gray-500 leading-relaxed text-xs sm:text-sm">
                To empower local businesses with digital tools and visibility, while helping
                customers find reliable services in their community. We strive to create a
                trusted ecosystem where quality service meets genuine demand.
              </p>
            </div>

            {/* ── Vision ── */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border border-blue-100 p-5 sm:p-7 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-500 flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                    <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-sm sm:text-base font-bold text-gray-800">Our Vision</h3>
              </div>
              <div className="w-full h-px bg-blue-100" />
              <p className="text-gray-500 leading-relaxed text-xs sm:text-sm">
                To become India's most trusted platform for local business discovery, fostering
                economic growth at the grassroots level and revolutionizing how Indians find
                and avail local services.
              </p>
            </div>

            {/* ── Benefits ── */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5 sm:p-7 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-sm sm:text-base font-bold text-gray-800">Benefits for Local Businesses</h3>
              </div>
              <div className="w-full h-px bg-gray-100" />
              <ul className="space-y-2.5">
                {[
                  "Increased online visibility to local customers",
                  "Free business listing and profile creation",
                  "Customer reviews and ratings system",
                  "Direct communication with potential clients",
                  "Analytics and performance insights",
                ].map((benefit, index) => (
                  <li key={index} className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-500">
                    <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center shrink-0 mt-0.5">
                      <svg className="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* ── NEWSLETTER ── */}
      <section className="w-full bg-gradient-to-r from-gray-900 mb-3 to-gray-800 py-10 sm:py-14">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8">

            {/* Left text */}
            <div className="text-center md:text-left">
              <div className="inline-flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center shrink-0">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </div>
                <span className="text-orange-400 text-xs font-bold uppercase tracking-widest">Newsletter</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white mb-2">
                Subscribe to Our Newsletter
              </h2>
              <p className="text-gray-400 text-xs sm:text-sm">
                Get the latest updates, offers & local business news.
              </p>
            </div>

            {/* Right input */}
            <div className="w-full md:w-auto">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-grow">
                  <svg className="w-4 h-4 absolute left-3.5 top-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full sm:w-80 px-4 py-3 pl-10 rounded-xl bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
                  />
                </div>
                <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-xl font-semibold text-sm transition-all duration-300 hover:shadow-lg active:scale-95 whitespace-nowrap">
                  Subscribe Now
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-3 text-center md:text-left">
                🔒 We respect your privacy. Unsubscribe anytime.
              </p>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
};

export default About;