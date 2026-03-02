import { useState } from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import {
  MapPin,
  Phone,
  Star,
  Share2,
  ChevronRight,
  Home,
  ThumbsUp,
  Flag,
  MoreHorizontal,
} from "lucide-react";
import Banner from "./Acbanner/Banner";
import CatgInfoRightSideBar from "./CatgInfoRightSideBar";
import InfoRateNow from "./InfoRateNow";
import Faq from "./Faq";

// ─── Breadcrumb ───────────────────────────────────────────────────────────────
function slugToLabel(slug) {
  return slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

function BreadcrumbBar({ businessName }) {
  const location = useLocation();
  const segments = location.pathname.split("/").filter(Boolean);
  const crumbs = segments.map((seg, i) => ({
    label: slugToLabel(seg),
    href: "/" + segments.slice(0, i + 1).join("/"),
    isLast: i === segments.length - 1,
  }));
  if (businessName && crumbs.length > 0) {
    crumbs[crumbs.length - 1].label = businessName;
  }

  return (
    <div className="bg-white border-b border-gray-200 px-4 py-2.5">
      <nav className="flex items-center flex-wrap gap-1 text-sm text-gray-500">
        <button
          onClick={() => window.history.back()}
          className="flex items-center justify-center w-9 h-7 rounded-lg border border-gray-200 text-gray-500 hover:border-orange-400 hover:text-orange-500 transition-colors"
          aria-label="Go back"
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

        {crumbs.map((crumb, i) => (
          <span key={i} className="flex items-center gap-1">
            <ChevronRight size={13} className="text-gray-400 flex-shrink-0" />
            {crumb.isLast ? (
              <span className="text-gray-800 font-medium truncate max-w-[200px]">
                {crumb.label}
              </span>
            ) : (
              <Link
                to={crumb.href}
                className="hover:text-orange-500 transition-colors truncate max-w-[180px]"
              >
                {crumb.label}
              </Link>
            )}
          </span>
        ))}
      </nav>
    </div>
  );
}

// ─── Stars ────────────────────────────────────────────────────────────────────
function Stars({ count = 5, size = 16, filled = 5 }) {
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
}

// ─── Data ────────────────────────────────────────────────────────────────────
const galleryImgs = [
  "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=400&q=80",
  "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=400&q=80",
  "https://images.unsplash.com/photo-1530521954074-e64f6810b32d?w=400&q=80",
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80",
];

const servicePackages = [
  {
    name: "Goa Tour Packages",
    price: "₹ 60000",
    img: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=400&q=80",
  },
  {
    name: "Manali Package",
    price: "₹ 25000",
    img: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=400&q=80",
  },
  {
    name: "Shimla Tour",
    price: "₹ 20000",
    img: "https://images.unsplash.com/photo-1597074866923-dc0589150358?w=400&q=80",
  },
];

const reviews = [
  {
    name: "Jhon Dev",
    time: "a few seconds ago",
    text: "Outstanding",
    rating: 5,
  },
  {
    name: "Jhon Dev",
    time: "a few seconds ago",
    text: "Outstanding",
    rating: 5,
  },
  {
    name: "Jhon Dev",
    time: "a few seconds ago",
    text: "Outstanding",
    rating: 5,
  },
];

const similar = [
  {
    name: "Delhi Tempo Travels",
    loc: "Shiv Vihar, Delhi",
    img: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=200&q=80",
  },
  {
    name: "Visalworldwide",
    loc: "Patel Nagar, Delhi",
    img: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=200&q=80",
  },
  {
    name: "Comtreks, Kerala limited",
    loc: "Kochi, Kerala",
    img: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=200&q=80",
  },
  {
    name: "Rana Bath Soldiers",
    loc: "Shiv Vihar, Delhi",
    img: "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?w=200&q=80",
  },
];

// ─── Main Details Component ───────────────────────────────────────────────────
function Details() {
  const { id } = useParams();
  const [reviewText, setReviewText] = useState("");
  const [sortBy, setSortBy] = useState("latest");
  const [rateModalOpen, setRateModalOpen] = useState(false);

  const businessName = "Rana Travel Blog";

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* ── Rate Now Modal ── */}
      <InfoRateNow
        isOpen={rateModalOpen}
        onClose={() => setRateModalOpen(false)}
        businessName="S S Rana Tour And Travels"
      />

      {/* ── Banner ── */}
      <Banner />

      {/* ── Dynamic Breadcrumb ── */}
      <BreadcrumbBar businessName={businessName} />

      {/* ── Main Content ── */}
      <div className="w-full mx-auto px-4 py-6">
        {/* Business Header Card */}
        <div className="bg-white rounded-xl shadow-sm p-5 mb-5 border border-gray-100">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-lg overflow-hidden border border-gray-200 flex-shrink-0">
              <img
                src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=100&q=80"
                alt="logo"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-900 mb-0.5">
                {businessName}
              </h1>
              <div className="flex items-center gap-1 text-sm text-gray-500 mb-1">
                <Stars filled={5} size={14} />
                <span className="ml-1 text-gray-600 font-medium">5.0</span>
                <span className="text-gray-400 ml-1">(8 Ratings)</span>
              </div>
              <div className="flex items-center gap-1 text-sm text-gray-500">
                <MapPin size={14} className="text-gray-400" />
                <span>Shiv Vihar, Delhi</span>
                <a
                  href="#"
                  className="text-blue-500 hover:underline ml-2 text-xs"
                >
                  View Complete Address
                </a>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 mt-4">
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-blue-500 text-white text-sm font-medium shadow hover:shadow-md hover:scale-105 transition-all duration-200">
              <Phone size={15} />
              Show Number
            </button>

            {/* ── Rate Now → opens modal ── */}
            <button
              onClick={() => setRateModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 bg-white text-gray-700 text-sm font-medium hover:bg-gray-50 shadow-sm transition-all duration-200"
            >
              <Star size={15} className="text-orange-400" />
              Rate Now
            </button>

            <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 bg-white text-gray-700 text-sm font-medium hover:bg-gray-50 shadow-sm transition-all duration-200">
              <Share2 size={15} />
              Share
            </button>
          </div>
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* ─ Left Column ─ */}
          <div className="md:col-span-2 space-y-5">
            {/* Photo Gallery */}
            <div className="rounded-xl p-5">
              <h2 className="text-base font-semibold text-gray-800 mb-3">
                Photo Gallery
              </h2>
              <div className="grid grid-cols-4 gap-2">
                {galleryImgs.map((src, i) => (
                  <div
                    key={i}
                    className="rounded-lg overflow-hidden aspect-square"
                  >
                    <img
                      src={src}
                      alt={`gallery-${i}`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Services with Photo Cards */}
            <div className="rounded-xl p-5">
              <h2 className="text-base font-semibold text-gray-800 mb-4">
                Services by S S Rana Tour And Travels
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {servicePackages.map((pkg, i) => (
                  <div
                    key={i}
                    className="rounded-xl overflow-hidden bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer"
                  >
                    <div className="relative">
                      <img
                        src={pkg.img}
                        alt={pkg.name}
                        className="w-full h-36 object-cover"
                      />
                      <span className="absolute top-2 left-2 bg-orange-500 text-white text-xs font-semibold px-2.5 py-1 rounded-md shadow">
                        {pkg.price}
                      </span>
                    </div>
                    <div className="px-3 py-2.5">
                      <p className="text-xs font-semibold text-gray-800 text-center">
                        {pkg.name}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* About */}
            <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
              <h2 className="text-base font-semibold text-gray-800 mb-2">
                About Us – {businessName}
              </h2>
              <div className="space-y-3 text-sm text-gray-600 leading-relaxed">
                <p>
                  Rana's journey through North India offers a dynamic blend of
                  rich history, vibrant culture, bustling business hubs, and
                  natural beauty. This region of India is a mix of ancient
                  traditions and modern-day progress, making it an exciting
                  destination for all kinds of travelers.
                </p>
                <p>
                  Starting with Delhi, the capital city of India, Rana would
                  experience a city that serves as the political and business
                  heart of the nation. Delhi is home to both historical
                  landmarks like the Red Fort, Qutub Minar, and Humayun's Tomb,
                  and contemporary business districts like Connaught Place and
                  Cyber Hub.
                </p>
                <p>
                  From Delhi, Rana could travel to Agra to marvel at the
                  world-famous Taj Mahal, one of the Seven Wonders of the World.
                  Beyond tourism, Agra is also an important business hub for the
                  handicraft and leather industries.
                </p>
              </div>
            </div>

            {/* Reviews */}
            <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
              <h2 className="text-base font-semibold text-gray-800 mb-4">
                Reviews of 5 S Rana Tour And Travels by Verified Users
              </h2>

              <div className="flex flex-col sm:flex-row gap-4 mb-5">
                {/* Score Box */}
                <div className="flex-shrink-0 flex flex-col items-center justify-center bg-orange-500 text-white rounded-xl px-5 py-3 w-24 h-24">
                  <span className="text-2xl font-extrabold leading-none">
                    5.0
                  </span>
                  <Stars filled={5} size={11} />
                  <span className="text-[10px] mt-1 text-orange-100">
                    8 Ratings
                  </span>
                </div>

                {/* Write Review */}
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-700 mb-2">
                    Start your Review
                  </p>
                  <Stars filled={0} size={22} />
                  <textarea
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    placeholder="Write your review here..."
                    className="w-full mt-3 p-3 border border-gray-200 rounded-lg text-sm text-gray-700 resize-none focus:outline-none focus:ring-2 focus:ring-orange-300"
                    rows={3}
                  />
                  <button className="mt-2 px-5 py-2 bg-orange-500 text-white text-sm font-semibold rounded-lg hover:bg-orange-600 transition">
                    Submit Review
                  </button>
                </div>
              </div>

              {/* Sort Row */}
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm font-semibold text-gray-700">
                  User reviews
                </p>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500">Sort by</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="text-xs border border-gray-200 rounded-lg px-2 py-1 focus:outline-none"
                  >
                    <option value="latest">Latest</option>
                    <option value="highest">Highest</option>
                    <option value="lowest">Lowest</option>
                    <option value="photos">Reviews With Photos</option>
                  </select>
                </div>
              </div>

              {/* Review List */}
              <div className="space-y-4">
                {reviews.map((r, i) => (
                  <div key={i} className="flex gap-3">
                    <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0 text-sm font-bold text-gray-600">
                      {r.name[0]}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-semibold text-gray-800">
                            {r.name}
                          </p>
                          <p className="text-xs text-gray-400">{r.time}</p>
                        </div>
                        <button className="text-gray-400 hover:text-gray-600">
                          <MoreHorizontal size={16} />
                        </button>
                      </div>
                      <Stars filled={r.rating} size={13} />
                      <p className="text-sm text-gray-600 mt-1">{r.text}</p>
                      <div className="flex items-center gap-4 mt-2 text-xs text-gray-400">
                        <button className="flex items-center gap-1 hover:text-gray-600">
                          <ThumbsUp size={12} /> Helpful
                        </button>
                        <button className="flex items-center gap-1 hover:text-gray-600">
                          <Flag size={12} /> Report
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Similar Businesses */}
            <div className="rounded-xl p-5">
              <h2 className="text-base font-semibold text-gray-800 mb-4">
                Similar Travel Agents &amp; Tour Operators in Delhi
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {similar.map((b, i) => (
                  <div
                    key={i}
                    className="rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition cursor-pointer"
                  >
                    <img
                      src={b.img}
                      alt={b.name}
                      className="w-full h-24 object-cover"
                    />
                    <div className="p-2">
                      <p className="text-xs font-semibold text-gray-800 leading-tight">
                        {b.name}
                      </p>
                      <p className="text-xs text-gray-400 flex items-center gap-0.5 mt-0.5">
                        <MapPin size={10} /> {b.loc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ─ Right Sidebar ─ */}
          <div className="space-y-4">
            <div className="sticky top-4">
              <CatgInfoRightSideBar />
            </div>
          </div>
        </div>
      </div>

      {/* ── FAQ Section - Full Width ── */}
      <div className=" p-9 -mx-4">
        <Faq />
      </div>
    </div>
  );
}

export default Details;
