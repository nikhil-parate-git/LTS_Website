import { useState, useEffect } from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchVendorById,
  clearVendorDetail,
} from "../../../redux/slice/category/getVendorById";

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
  Clock,
  Calendar,
} from "lucide-react";
import Banner from "./Acbanner/Banner";
import CatgInfoRightSideBar from "./CatgInfoRightSideBar";
import InfoRateNow from "./InfoRateNow";
import Faq from "./Faq";
import StickyFooter from "./EnquiryFooter";

function slugToLabel(slug) {
  if (!slug) return "";
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
  if (businessName && crumbs.length > 0)
    crumbs[crumbs.length - 1].label = businessName;

  return (
    <div className="bg-white border-b border-gray-200 px-4 py-2.5">
      <nav className="flex items-center flex-wrap gap-1 text-sm text-gray-500">
        <button
          onClick={() => window.history.back()}
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

export default function Details() {
  const { id } = useParams(); 
  const dispatch = useDispatch();
const [showPhone, setShowPhone] = useState(false);
  // Redux selection
  const { vendor, loading, error } = useSelector((state) => state.vendorDetail);

  const [reviewText, setReviewText] = useState("");
  const [sortBy, setSortBy] = useState("latest");
  const [rateModalOpen, setRateModalOpen] = useState(false);

  useEffect(() => {
    if (id) {
      dispatch(fetchVendorById(id));
    }
    // Cleanup state when leaving page
    return () => dispatch(clearVendorDetail());
  }, [dispatch, id]);

  // Loading UI
  if (loading)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
        <p className="mt-4 text-gray-500 font-medium">Loading profile...</p>
      </div>
    );

  // Error UI
  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="text-center bg-white p-8 rounded-2xl shadow-sm border border-red-100">
          <p className="text-red-500 font-bold mb-2">Failed to load vendor</p>
          <p className="text-gray-500 text-sm">{error}</p>
          <button
            onClick={() => window.history.back()}
            className="mt-4 text-orange-500 font-bold"
          >
            Go Back
          </button>
        </div>
      </div>
    );

  // If no data yet
  if (!vendor) return null;

  return (
    <div className="min-h-screen bg-gray-50 font-sans pb-20">
      <InfoRateNow
        isOpen={rateModalOpen}
        onClose={() => setRateModalOpen(false)}
        businessName={vendor.companyName}
      />

      {/* Dynamic Banner - API data pass kiya */}
      <Banner banners={vendor.banners} />

      <BreadcrumbBar businessName={vendor.companyName} />

      <div className="w-full mx-auto px-4 py-6 max-w-7xl">
        {/* Business Header Card */}
        <div className="bg-white rounded-xl shadow-sm p-5 mb-5 border border-gray-100">
          <div className="flex flex-col sm:flex-row items-start gap-4">
            <div className="w-20 h-20 rounded-lg overflow-hidden border border-gray-200 flex-shrink-0 bg-gray-50">
              <img
                src={
                  vendor.image ||
                  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&q=80"
                }
                alt="logo"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-900 mb-0.5">
                {vendor.companyName}
              </h1>
              <div className="flex items-center gap-1 text-sm text-gray-500 mb-1">
                <Stars filled={5} size={14} />
                <span className="ml-1 text-gray-600 font-medium">5.0</span>
                <span className="text-gray-400 ml-1">| {vendor.category?.name}</span>
              </div>
              <div className="flex items-center gap-1 text-sm text-gray-500">
                <MapPin size={14} className="text-orange-500" />
                <span>
                  {Object.keys(vendor.address || {}).length === 0
                    ? "Address not provided"
                    : `${vendor.address?.city || ""}, ${vendor.address?.state || ""}`}
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 mt-4">
           
           <button
    onClick={() => setShowPhone(!showPhone)}
    className={`flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg text-sm font-bold shadow-sm transition-all duration-300 min-w-[160px] ${
      showPhone 
        ? "bg-green-600 text-white border-green-700" 
        : "bg-orange-500 text-white hover:bg-orange-600"
    }`}
  >
    {showPhone ? (
      <>
        <Phone size={15} className="animate-pulse" />
        <span className="tracking-wider">{vendor.phone}</span>
      </>
    ) : (
      <>
        <Phone size={15} />
        <span>Show Number</span>
      </>
    )}
  </button>

            <button
              onClick={() => setRateModalOpen(true)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg border border-gray-200 bg-white text-gray-700 text-sm font-semibold hover:bg-gray-50 transition-all"
            >
              <Star size={15} className="text-orange-400" /> Rate Now
            </button>
            <button className="flex items-center gap-2 px-5 py-2.5 rounded-lg border border-gray-200 bg-white text-gray-700 text-sm font-semibold hover:bg-gray-50 transition-all">
              <Share2 size={15} /> Share
            </button>
          </div>
        </div>

        {/* Subcategories Section */}
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
                  {/* {sub} */}
                  {typeof sub === 'object' ? sub.name : sub}
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
            {/* Gallery Mapping */}
            <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
              <h2 className="text-base font-semibold text-gray-800 mb-3">
                {" "}
                Photo Gallery{" "}
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {vendor.gallery?.length > 0 ? (
                  vendor.gallery.map((item, i) => (
                    <div
                      key={item.id || i}
                      className="rounded-lg overflow-hidden aspect-square border border-gray-200 bg-gray-50"
                    >
                      <img
                        src={item.image || item.url} // Yahan item.image check karein
                        alt="gallery"
                        className="w-full h-full object-cover hover:scale-105 transition-transform"
                      />
                    </div>
                  ))
                ) : (
                  <p className="text-gray-400 text-sm py-4">Gallery is empty</p>
                )}
              </div>
            </div>

            {/* Services Mapping - Grid UI with Images and Price Badges */}
            <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
              <h2 className="text-base font-semibold text-gray-800 mb-4 flex items-center gap-2">
                Services
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {vendor.services?.length > 0 ? (
                  vendor.services.map((service, i) => (
                    <div
                      key={service.id || i}
                      className="group relative bg-white rounded-xl overflow-hidden border border-gray-200 hover:shadow-md transition-all duration-300"
                    >
                      {/* Price Badge - Top Left */}
                      <div className="absolute top-3 left-3 z-10">
                        <span className="bg-orange-500 text-white text-[11px] font-bold px-2 py-1 rounded shadow-sm flex items-center gap-0.5">
                          ₹ {service.price}
                        </span>
                      </div>

                      {/* Service Image */}
                      <div className="aspect-[16/9] overflow-hidden bg-gray-100">
                        <img
                          src={
                            service.image ||
                            "https://images.unsplash.com/photo-1586717791821-3f44a563dc4c?w=500&q=80"
                          }
                          alt={service.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>

                      {/* Service Name - Bottom Bar */}
                      <div className="p-3 text-center border-t border-gray-50">
                        <h3 className="text-sm font-medium text-gray-700 truncate">
                          {service.name}
                        </h3>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-400 text-sm italic py-2">
                    No services listed
                  </p>
                )}
              </div>
            </div>
            {/* About Section */}
            <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
              <h2 className="text-base font-semibold text-gray-800 mb-4">
                Business Info
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Clock className="text-orange-500" size={18} />
                  <div>
                    <p className="text-gray-400 text-[10px] uppercase font-bold">
                      Timing
                    </p>
                    <p className="text-gray-700 font-medium">
                      {vendor.openingTime}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Calendar className="text-orange-500" size={18} />
                  <div>
                    <p className="text-gray-400 text-[10px] uppercase font-bold">
                      Days
                    </p>
                    <p className="text-gray-700 font-medium">
                      {vendor.openingDays?.join(", ")}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <Faq />
          </div>

          <div className="space-y-4">
            <div className="sticky top-4">
              <CatgInfoRightSideBar vendorData={vendor} />
            </div>
          </div>
        </div>
      </div>

{/* hide this footer for submit button of rating and reviews */}
      {/* <StickyFooter businessName={vendor.companyName} phone={vendor.phone} /> */}
    </div>
  );
}
