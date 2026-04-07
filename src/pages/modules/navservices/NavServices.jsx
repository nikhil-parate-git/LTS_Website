import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchServices } from "../../../redux/slice/services/getServicesSlice";
import EnquiryModal from "../../modules/navservices/FormModel";

const NavServices = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState("");

  const { items, loading } = useSelector((state) => state.services);

  useEffect(() => {
    dispatch(fetchServices());
  }, [dispatch]);

  const openModal = (title) => {
    setSelectedService(title);
    setIsModalOpen(true);
  };

  const devServices = [
    { name: "HTML5/CSS3", icon: "fab fa-html5" },
    { name: "PHP", icon: "fab fa-php" },
    { name: "jQuery", icon: "fab fa-js" },
    { name: "WordPress", icon: "fab fa-wordpress" },
    { name: "SEO Strategies", icon: "fas fa-chart-line" },
    { name: "Digital Marketing", icon: "fas fa-bullhorn" },
  ];

  const DotLoader = () => (
    <div className="col-span-full flex flex-col items-center justify-center py-20">
      <div className="flex space-x-2">
        <div className="w-4 h-4 bg-orange-600 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
        <div className="w-4 h-4 bg-orange-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
        <div className="w-4 h-4 bg-orange-400 rounded-full animate-bounce"></div>
      </div>
      <p className="mt-4 text-orange-600 font-bold animate-pulse">
        Loading Services...
      </p>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F9FAFB] text-gray-800 font-sans">
      <EnquiryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        serviceName={selectedService}
      />

      {/* ── HERO SECTION ── */}
      <div className="relative min-h-[60vh] md:min-h-[70vh] flex items-center bg-gradient-to-br from-orange-600 via-orange-500 to-orange-400 overflow-hidden text-left">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "radial-gradient(#F97316 0.5px, transparent 0.5px)",
            backgroundSize: "24px 24px",
          }}
        />
        <div className="relative container mx-auto px-4 sm:px-6 py-12 md:py-16">
          <div className="max-w-4xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-orange-500/10 backdrop-blur-md rounded-full px-3 py-1 mb-4 md:mb-6 border border-orange-500/30">
              <span className="flex h-2 w-2 rounded-full bg-orange-500 animate-pulse" />
              <span className="text-white text-[10px] md:text-xs font-bold uppercase tracking-widest">
                Global Tech Partner
              </span>
            </div>

            {/* Heading */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4 md:mb-6 leading-[1.15] tracking-tight">
              Empowering{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-300">
                Local Trade
              </span>{" "}
              with Digital Excellence.
            </h1>

            {/* Subtext */}
            <p className="text-sm sm:text-base md:text-lg text-black mb-8 md:mb-10 max-w-2xl leading-relaxed font-medium">
              We provide an all-inclusive, high-traffic search ecosystem
              designed to give your business the visibility it deserves since
              2026.
            </p>

            {/* CTA Button */}
            <button
              onClick={() => navigate("/subscriptions")}
              className="bg-blue-950 cursor-pointer hover:bg-orange-400 text-white font-bold px-6 md:px-8 py-3 md:py-4 rounded-xl transition-all shadow-lg flex items-center gap-2 text-sm md:text-base w-fit"
            >
              Get Started Today
              <i className="fas fa-chevron-right text-xs md:text-sm" />
            </button>
          </div>
        </div>
      </div>

      {/* ── SERVICE CARDS ── */}
      <div className="container mx-auto px-4 sm:px-6 -mt-10 md:-mt-12 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 min-h-[200px]">
          {loading ? (
            <DotLoader />
          ) : (
            items.map((service) => (
              <div
                key={service._id}
                className="bg-white rounded-2xl md:rounded-3xl shadow-xl shadow-gray-200/50 overflow-hidden border border-gray-100 flex flex-col group transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
              >
                <div className="relative h-40 md:h-48 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-3 left-4 md:bottom-4 md:left-5 text-left">
                    <h3 className="text-base md:text-xl font-bold text-white tracking-tight">
                      {service.title}
                    </h3>
                  </div>
                </div>
                <div className="p-4 md:p-6 flex-grow flex flex-col text-left">
                  <p className="text-gray-500 text-xs md:text-sm leading-relaxed mb-4 md:mb-6 line-clamp-3 font-medium">
                    {service.description}
                  </p>
                  <button
                    onClick={() => openModal(service.title)}
                    className="mt-auto cursor-pointer flex items-center justify-between w-full text-orange-600 font-black text-[11px] md:text-base  border-t border-gray-100 pt-4 md:pt-5 group/btn"
                  >
                    Request Consultation
                    <i className="fas fa-envelope text-base md:text-lg transition-transform group-hover/btn:translate-x-1" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* ── INFO SECTION ── */}
      <div className="py-14 md:py-24 bg-white mt-10 md:mt-12 text-left">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col lg:flex-row items-center gap-10 md:gap-16">
            {/* Left Text */}
            <div className="w-full lg:w-1/2">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-900 mb-4 md:mb-6 leading-tight">
                Global Software Consultancy &{" "}
                <span className="text-orange-600 italic">
                  Digital Transformation
                </span>
              </h2>
              <div className="w-16 md:w-20 h-2 bg-orange-500 rounded-full mb-6 md:mb-8" />
              <p className="text-gray-600 text-sm md:text-lg leading-relaxed mb-6 font-medium">
                Positioned as a leading global consultancy,{" "}
                <strong>Local Trade Street</strong> leads the charge in driving
                digital transformation initiatives.
              </p>
              <div className="grid grid-cols-2 gap-4 md:gap-6">
                <div className="p-4 md:p-5 bg-orange-50 rounded-2xl border border-orange-100/50">
                  <span className="block text-2xl md:text-3xl font-black text-orange-600 tracking-tighter">
                    1.5K+
                  </span>
                  <span className="text-[11px] md:text-xs text-gray-500 font-bold uppercase tracking-wider">
                    Projects Delivered
                  </span>
                </div>
                <div className="p-4 md:p-5 bg-orange-50 rounded-2xl border border-orange-100/50">
                  <span className="block text-2xl md:text-3xl font-black text-orange-600 tracking-tighter">
                    20+
                  </span>
                  <span className="text-[11px] md:text-xs text-gray-500 font-bold uppercase tracking-wider">
                    Years Experience
                  </span>
                </div>
              </div>
            </div>

            {/* Right Images */}
            <div className="w-full lg:w-1/2 grid grid-cols-2 gap-3 md:gap-4">
              <div className="space-y-3 md:space-y-4">
                <div className="h-32 sm:h-36 md:h-40 bg-gray-100 rounded-2xl md:rounded-3xl overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=400"
                    className="w-full h-full object-cover"
                    alt="Team"
                  />
                </div>
                <div className="h-44 sm:h-52 md:h-60 bg-orange-600 rounded-2xl md:rounded-3xl p-5 md:p-8 text-white flex flex-col justify-end">
                  <i className="fas fa-quote-left text-2xl md:text-3xl mb-3 md:mb-4 opacity-50" />
                  <p className="font-bold italic text-sm md:text-lg leading-snug">
                    "Driving innovation through tailored tech solutions."
                  </p>
                </div>
              </div>
              <div className="space-y-3 md:space-y-4 pt-6 md:pt-8">
                <div className="h-44 sm:h-52 md:h-60 bg-gray-900 rounded-2xl md:rounded-3xl p-5 md:p-8 text-white flex flex-col justify-end">
                  <h4 className="text-base md:text-xl font-black mb-2 italic">
                    OUR GOAL
                  </h4>
                  <p className="text-gray-400 text-xs md:text-sm font-medium leading-relaxed">
                    To provide tailored solutions that ensure success in the
                    digital landscape.
                  </p>
                </div>
                <div className="h-32 sm:h-36 md:h-40 bg-gray-100 rounded-2xl md:rounded-3xl overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=400"
                    className="w-full h-full object-cover"
                    alt="Office"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── TECH STACK ── */}
      <div className="bg-gray-50 py-14 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <h3 className="text-[10px]  tracking-[0.3em] text-gray-400 font-black mb-8 md:mb-12 italic">
            Powering digital solutions with modern technology
          </h3>
          <div className="flex flex-wrap justify-center gap-2 md:gap-4">
            {devServices.map((tech, idx) => (
              <div
                key={idx}
                className="bg-white px-4 md:px-8 py-3 md:py-5 rounded-xl md:rounded-2xl shadow-sm border border-gray-100 flex items-center gap-2 md:gap-3 group hover:border-orange-500 transition-all hover:shadow-lg hover:shadow-orange-100"
              >
                <i
                  className={`${tech.icon} text-gray-400 group-hover:text-orange-600 text-lg md:text-2xl transition-colors`}
                />
                <span className="font-black text-gray-700 text-[11px] md:text-base ">
                  {tech.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── CTA SECTION ── */}
      <div className="bg-orange-600 py-12 md:py-16 relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 text-center relative z-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-6 md:mb-8 ">
            Ready to Transform Your Business?
          </h2>
          <button
            onClick={() => openModal("General Platform Inquiry")}
            className="bg-white cursor-pointer text-orange-600 font-black px-8 md:px-14 py-4 md:py-5 rounded-xl md:rounded-2xl shadow-2xl hover:scale-105 transition-transform  text-xs md:text-sm"
          >
            Contact Our Experts
          </button>
        </div>
      </div>
    </div>
  );
};

export default NavServices;
