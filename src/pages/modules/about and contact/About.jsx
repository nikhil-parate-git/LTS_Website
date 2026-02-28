import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  const [service, setService] = useState("");

  return (
    <div className="w-full bg-white font-sans">
      {/* ── Hero / Search Section ── */}
      <section className="w-full bg-gradient-to-br from-orange-50 via-amber-50 to-indigo-50 py-10 md:py-16 relative">
        {/* Back Button — top-left corner */}
        <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-10">
          <button
            onClick={() => navigate(-1)}
            className="group w-10 h-10 flex items-center justify-center rounded-full bg-white border border-gray-200 shadow-sm hover:bg-orange-500 hover:border-orange-500 transition-all duration-300"
            aria-label="Go back"
          >
            <svg
              className="w-5 h-5 text-gray-600 group-hover:text-white transition-all duration-300 group-hover:-translate-x-0.5"
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
        </div>

        <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Text */}
          <div className="text-center">
            <span className="inline-block mb-4 px-4 py-1.5 rounded-full bg-orange-100 text-orange-600 text-xs font-bold uppercase tracking-widest">
              India's Local Business Platform
            </span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
              Find Top Businesses{" "}
              <span className="text-orange-500 relative">
                In Your City
                <svg
                  className="absolute -bottom-1 left-0 w-full"
                  viewBox="0 0 200 8"
                  fill="none"
                >
                  <path
                    d="M0 6 Q50 0 100 6 Q150 12 200 6"
                    stroke="#f97316"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    fill="none"
                  />
                </svg>
              </span>
            </h1>
            <p className="text-gray-500 mb-10 max-w-xl mx-auto text-sm sm:text-base">
              Discover trusted local businesses and services tailored to your
              needs — right in your neighbourhood.
            </p>

            {/* Search Bar */}
            <div className="flex flex-col md:flex-row items-stretch justify-center gap-3 max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-3 border border-gray-100">
              {/* Location */}
              <div className="flex items-center gap-2 flex-1 px-3 py-2 rounded-xl border border-gray-200 bg-gray-50 focus-within:border-orange-400 focus-within:bg-white transition-all">
                <svg
                  className="w-5 h-5 text-orange-400 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <input
                  type="text"
                  placeholder="Enter Location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="bg-transparent outline-none text-sm text-gray-700 placeholder-gray-400 w-full"
                />
              </div>

              {/* Divider */}
              <div className="hidden md:block w-px bg-gray-200 self-stretch"></div>

              {/* Service */}
              <div className="flex items-center gap-2 flex-[2] px-3 py-2 rounded-xl border border-gray-200 bg-gray-50 focus-within:border-orange-400 focus-within:bg-white transition-all">
                <svg
                  className="w-5 h-5 text-orange-400 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <input
                  type="text"
                  placeholder="What service do you need? e.g. Plumber, Electrician"
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  className="bg-transparent outline-none text-sm text-gray-700 placeholder-gray-400 w-full"
                />
              </div>

              {/* Search Button */}
              <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-xl font-semibold text-sm transition-all duration-300 hover:shadow-lg active:scale-95 flex items-center justify-center gap-2 whitespace-nowrap">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                Search
              </button>
            </div>
          </div>
          {/* end text-center */}
        </div>
      </section>

      {/* ── Stats Bar ── */}
      <div className="w-full bg-orange-400">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-3 grid grid-cols-2 md:grid-cols-4 gap-4 text-white text-center">
          {[
            { value: "50K +", label: "Verified Businesses" },
            { value: "100K +", label: "Happy Customers" },
            { value: "500 +", label: "Cities Covered" },
            { value: "4.8 ★", label: "Average Rating" },
          ].map((stat, i) => (
            <div key={i}>
              <div className="text-2xl md:text-3xl font-extrabold">
                {stat.value}
              </div>
              <div className="text-orange-100 text-xs mt-1 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── About / Mission / Vision ── */}
      <section className="w-full bg-white py-14 md:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {/* Left */}
            <div className="space-y-6">
              {/* About */}
              <div className="rounded-2xl border border-gray-100 p-7 shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-orange-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <h2 className="text-xl font-bold text-gray-800">
                    About Local Trade Street
                  </h2>
                </div>
                <p className="text-gray-600 leading-relaxed text-sm">
                  Local Trade Street is India's fastest-growing local business
                  discovery platform, connecting millions of customers with
                  trusted service providers in their neighbourhood. We're on a
                  mission to make local commerce more accessible, transparent,
                  and efficient for everyone.
                </p>
              </div>

              {/* Benefits */}
              <div className="rounded-2xl border border-gray-100 p-7 shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-green-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <h2 className="text-xl font-bold text-gray-800">
                    Benefits for Local Businesses
                  </h2>
                </div>
                <ul className="space-y-3">
                  {[
                    "Increased online visibility to local customers",
                    "Free business listing and profile creation",
                    "Customer reviews and ratings system",
                    "Direct communication with potential clients",
                    "Analytics and performance insights",
                  ].map((benefit, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-3 text-sm text-gray-600"
                    >
                      <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg
                          className="w-3 h-3 text-green-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={3}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right */}
            <div className="space-y-6">
              {/* Mission */}
              <div className="rounded-2xl bg-gradient-to-br from-orange-50 to-amber-50 border border-orange-100 p-7 shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-orange-500 flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                  <h2 className="text-xl font-bold text-gray-800">
                    Our Mission
                  </h2>
                </div>
                <p className="text-gray-600 leading-relaxed text-sm">
                  To empower local businesses with digital tools and visibility,
                  while helping customers find reliable services in their
                  community. We strive to create a trusted ecosystem where
                  quality service meets genuine demand.
                </p>
              </div>

              {/* Vision */}
              <div className="rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 p-7 shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-indigo-500 flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                      <path
                        fillRule="evenodd"
                        d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <h2 className="text-xl font-bold text-gray-800">
                    Our Vision
                  </h2>
                </div>
                <p className="text-gray-600 leading-relaxed text-sm">
                  To become India's most trusted platform for local business
                  discovery, fostering economic growth at the grassroots level
                  and revolutionizing how Indians find and avail local services.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Newsletter Section ── */}
      <section className="w-full bg-gradient-to-r from-gray-900 to-gray-800 py-14 mb-5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left">
              <div className="inline-flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </div>
                <span className="text-orange-400 text-xs font-bold uppercase tracking-widest">
                  Newsletter
                </span>
              </div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-2">
                Subscribe to Our Newsletter
              </h2>
              <p className="text-gray-400 text-sm">
                Get the latest updates, offers & local business news.
              </p>
            </div>
            <div className="w-full md:w-auto">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-grow">
                  <svg
                    className="w-4 h-4 absolute left-3.5 top-3.5 text-gray-400"
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
