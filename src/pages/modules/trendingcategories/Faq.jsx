import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFaqsByCategoryAndCity } from "../../../redux/slice/faq/getFaqSlice";

const nearbyTravelLinks = [
  "Travel Agents & Tour Operators in Loni",
  "Travel Agents & Tour Operators in Gurugram",
  "Travel Agents & Tour Operators in Sonipat",
  "Travel Agents & Tour Operators in Noida",
  "Travel Agents & Tour Operators in Ghaziabad",
  "Travel Agents & Tour Operators in Faridabad",
  "Travel Agents & Tour Operators in Rohtak",
  "Travel Agents & Tour Operators in Rewari",
  "Travel Agents & Tour Operators in Bhiwani",
  "Travel Agents & Tour Operators in Jaipur",
  "Travel Agents & Tour Operators in Alwar",
  "Travel Agents & Tour Operators in Meerut",
  "Travel Agents & Tour Operators in Roorkee",
  "Travel Agents & Tour Operators in Panipat",
  "Travel Agents & Tour Operators in Bulandshahr",
];

const popularCityLinks = [
  "Travel Agents & Tour Operators in Agra",
  "Travel Agents & Tour Operators in Ahmedabad",
  "Travel Agents & Tour Operators in Amritsar",
  "Travel Agents & Tour Operators in Aurangabad",
  "Travel Agents & Tour Operators in Bareilly",
  "Travel Agents & Tour Operators in Bengaluru",
  "Travel Agents & Tour Operators in Bhopal",
  "Travel Agents & Tour Operators in Chandigarh",
  "Travel Agents & Tour Operators in Chennai",
  "Travel Agents & Tour Operators in Coimbatore",
  "Travel Agents & Tour Operators in Delhi",
  "Travel Agents & Tour Operators in Dhanbad",
  "Travel Agents & Tour Operators in Guwahati",
  "Travel Agents & Tour Operators in Gwalior",
  "Travel Agents & Tour Operators in Howrah",
  "Travel Agents & Tour Operators in Hyderabad",
  "Travel Agents & Tour Operators in Indore",
  "Travel Agents & Tour Operators in Jabalpur",
  "Travel Agents & Tour Operators in Jaipur",
  "Travel Agents & Tour Operators in Jalandhar",
  "Travel Agents & Tour Operators in Jodhpur",
  "Travel Agents & Tour Operators in Kanpur",
  "Travel Agents & Tour Operators in Kolkata",
  "Travel Agents & Tour Operators in Kozhikode",
  "Travel Agents & Tour Operators in Lucknow",
  "Travel Agents & Tour Operators in Ludhiana",
  "Travel Agents & Tour Operators in Mangalore",
  "Travel Agents & Tour Operators in Mumbai",
  "Travel Agents & Tour Operators in Mysuru",
  "Travel Agents & Tour Operators in Nagpur",
  "Travel Agents & Tour Operators in Nashik",
  "Travel Agents & Tour Operators in Navi Mumbai",
  "Travel Agents & Tour Operators in Noida",
  "Travel Agents & Tour Operators in Patna",
  "Travel Agents & Tour Operators in Prayagraj",
  "Travel Agents & Tour Operators in Pune",
  "Travel Agents & Tour Operators in Raipur",
  "Travel Agents & Tour Operators in Rajkot",
  "Travel Agents & Tour Operators in Ranchi",
  "Travel Agents & Tour Operators in Salem",
  "Travel Agents & Tour Operators in Surat",
  "Travel Agents & Tour Operators in Thane",
  "Travel Agents & Tour Operators in Thiruvananthapuram",
  "Travel Agents & Tour Operators in Tiruppur",
  "Travel Agents & Tour Operators in Trichy",
  "Travel Agents & Tour Operators in Vadodara",
  "Travel Agents & Tour Operators in Varanasi",
  "Travel Agents & Tour Operators in Vijayawada",
  "Travel Agents & Tour Operators in Visakhapatnam",
  "Travel Agents & Tour Operators in Warangal",
];

const delhiCategories = [
  "Travel Agents & Tour Operators in Delhi",
  "Massage & Spa Parlours in Delhi",
  "Movers & Packers in Delhi",
  "Pest Control Service Providers in Delhi",
  "Home Nurse & Domestic Help Agencies in Delhi",
  "Investment Advisors & Consultants in Delhi",
  "Lawyers in Delhi",
  "Digital Marketing & Website Designing Companies in Delhi",
  "CCTV & Security System Dealers in Delhi",
  "Home Appliances Repair Service Providers in Delhi",
  "Caterers in Delhi",
  "Computer Training Institutes in Delhi",
  "Hospitals & Clinics in Delhi",
  "Legal Documents & License Agents in Delhi",
];

export default function Faq({ vendor }) {
  const [openIndex, setOpenIndex] = useState(null);
  const dispatch = useDispatch();

  const { faqs, loading, error } = useSelector((state) => state.faq);

  useEffect(() => {
    const categoryId = vendor?.category?._id || vendor?.category?.id;
    const city = vendor?.address?.city;

    console.log("Vendor Object:", vendor);
    console.log("Captured Category ID:", categoryId);
    console.log("Captured City:", city);

    if (categoryId) {
      dispatch(fetchFaqsByCategoryAndCity({ categoryId, city }));
    }
  }, [dispatch, vendor]);

  const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

  return (
    <div className="bg-white font-sans text-gray-800 text-sm">
      {/* ── FAQ Section ── */}
      <div className="px-4 py-6">
        <h2 className="text-base font-bold text-gray-900 mb-4">
          Frequently Asked Questions (FAQs)
        </h2>

        {loading && (
          <div className="flex items-center gap-1 py-4">
            <span
              className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
              style={{ animationDelay: "0ms" }}
            ></span>
            <span
              className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
              style={{ animationDelay: "150ms" }}
            ></span>
            <span
              className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
              style={{ animationDelay: "300ms" }}
            ></span>
          </div>
        )}

        {error && (
          <p className="text-red-400 text-sm py-4">
            Failed to load FAQs: {error}
          </p>
        )}

        {!loading && !error && faqs.length === 0 && (
          <p className="text-gray-400 text-sm py-4">No FAQs available.</p>
        )}

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div key={faq._id || i} className="border-b border-gray-100 pb-3">
              <button
                onClick={() => toggle(i)}
                className="w-full text-left flex items-start justify-between gap-2 group"
              >
                <p className="font-semibold text-gray-800 text-sm leading-snug">
                  Question {i + 1}: {faq.description}
                </p>
                <span className="text-gray-400 mt-0.5 shrink-0 text-base leading-none">
                  {openIndex === i ? "▲" : "▼"}
                </span>
              </button>

              <p className="text-gray-600 text-sm mt-1 leading-relaxed">
                <span className="font-medium text-gray-700">Answer:</span>{" "}
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Nearby Cities ── */}
      <div className="border-t border-gray-100 bg-gray-50">
        <div className="px-4 py-5">
          <h3 className="text-sm font-bold text-gray-900 mb-3">
            Travel Agents & Tour Operators in nearby cities
          </h3>
          <p className="text-sm text-gray-600 leading-relaxed">
            {nearbyTravelLinks.map((link, i) => (
              <React.Fragment key={i}>
                <a
                  href="#"
                  className="text-blue-600 hover:text-orange-500 hover:underline transition-colors"
                >
                  {link}
                </a>
                {i < nearbyTravelLinks.length - 1 && (
                  <span className="text-gray-400"> | </span>
                )}
              </React.Fragment>
            ))}
          </p>
        </div>
      </div>

      {/* ── Popular Cities ── */}
      <div className="border-t border-gray-100">
        <div className="px-4 py-5">
          <h3 className="text-sm font-bold text-gray-900 mb-3">
            Travel Agents & Tour Operators in Popular Cities
          </h3>
          <p className="text-sm text-gray-600 leading-relaxed">
            {popularCityLinks.map((link, i) => (
              <React.Fragment key={i}>
                <a
                  href="#"
                  className="text-blue-600 hover:text-orange-500 hover:underline transition-colors"
                >
                  {link}
                </a>
                {i < popularCityLinks.length - 1 && (
                  <span className="text-gray-400"> | </span>
                )}
              </React.Fragment>
            ))}
          </p>
        </div>
      </div>

      {/* ── Popular Categories in Delhi ── */}
      <div className="border-t border-gray-100 bg-gray-50">
        <div className="px-4 py-5">
          <h3 className="text-sm font-bold text-gray-900 mb-3">
            Popular Categories in Delhi
          </h3>
          <p className="text-sm text-gray-600 leading-relaxed">
            {delhiCategories.map((link, i) => (
              <React.Fragment key={i}>
                <a
                  href="#"
                  className="text-blue-600 hover:text-orange-500 hover:underline transition-colors"
                >
                  {link}
                </a>
                {i < delhiCategories.length - 1 && (
                  <span className="text-gray-400"> | </span>
                )}
              </React.Fragment>
            ))}
          </p>
        </div>
      </div>
    </div>
  );
}
