import React, { useEffect } from "react";
import {
  Search,
  Mic,
  Home,
  Briefcase,
  Wrench,
  Users,
  UserCheck,
  Megaphone,
  Stethoscope,
  MoreHorizontal,
  ChevronLeft,
} from "lucide-react";

export default function HamburgerDrawer({ isOpen, onClose }) {

  // 🔒 Lock background scroll
  useEffect(() => {
    if (isOpen) {
      const scrollY = window.scrollY;

      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.left = "0";
      document.body.style.right = "0";
      document.body.style.width = "100%";
    } else {
      const scrollY = document.body.style.top;

      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.width = "";

      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || "0") * -1);
      }
    }

    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.width = "";
    };
  }, [isOpen]);

  const sections = [
    {
      title: "Daily Home Needs",
      icon: <Home size={20} />,
      items: [
        "Grocery & General Stores",
        "Fruits & Vegetable Shops",
        "Pharmacy, Chemists & Medical Supplies",
      ],
    },
    {
      title: "Business Needs & Office Supplies",
      icon: <Briefcase size={20} />,
      items: [
        "Photocopy, Laminates & Binding",
        "Packing & Packaging Materials",
        "Laptops, Printers & Accessories",
      ],
    },
    {
      title: "Repairs & Service",
      icon: <Wrench size={20} />,
      items: [
        "Electricians & Electrical Contractors",
        "Plumbers & Plumbing Contractors",
        "Carpenters",
      ],
    },
    {
      title: "Brokers, Agents, Agencies",
      icon: <Users size={20} />,
      items: [
        "Investment Advisors-Mutual fund & Insurance",
        "Property Dealers & Land Brokers",
        "Legal Documents & Licenses",
      ],
    },
    {
      title: "Consultants & Professionals",
      icon: <UserCheck size={20} />,
      items: ["Architects", "Interior Designers", "Astrologers"],
    },
    {
      title: "Advertising & Marketing",
      icon: <Megaphone size={20} />,
      items: [
        "Advertising & PR Agencies",
        "Digital Marketing & Website Designing",
        "Flex, Display & Signage Boards",
      ],
    },
    {
      title: "Doctors, Clinics & Hospitals",
      icon: <Stethoscope size={20} />,
      items: [],
    },
  ];

  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity duration-300 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-[85%] md:w-[600px] lg:w-[900px] bg-white z-50 shadow-2xl transform transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Scrollable Container */}
        <div className="relative h-full overflow-y-auto scrollbar-hide px-4 py-5 sm:px-6 sm:py-6 md:px-10 md:py-8">

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute right-3 top-4 sm:right-4 sm:top-5 md:right-6 md:top-6 p-2 rounded-full hover:bg-gray-100 transition"
          >
            <ChevronLeft size={20} />
          </button>

          {/* Search */}
          <div className="max-w-full sm:max-w-sm md:max-w-md mb-6 md:mb-8 pr-10 sm:pr-0">
            <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 sm:px-4 focus-within:ring-2 focus-within:ring-orange-400 transition">
              <Search size={18} className="text-gray-400 shrink-0" />
              <input
                type="text"
                placeholder="What service do you need?"
                className="flex-1 px-2 sm:px-3 text-sm outline-none bg-transparent min-w-0"
              />
              <Mic size={18} className="text-orange-500 cursor-pointer shrink-0" />
            </div>
          </div>

          {/* Sections */}
          <div className="space-y-6 md:space-y-8">
            {sections.map((section, index) => (
              <div key={index}>
                {/* Section Title */}
                <div className="flex items-center gap-2 md:gap-3 mb-2 md:mb-3">
                  <div className="text-orange-500 shrink-0">{section.icon}</div>
                  <h2 className="text-base md:text-lg font-semibold text-gray-900 leading-tight">
                    {section.title}
                  </h2>
                </div>

                {/* Items */}
                {section.items.length > 0 && (
                  <div className="flex flex-wrap gap-x-4 gap-y-2 sm:gap-x-6 md:gap-x-10 md:gap-y-3 text-xs sm:text-sm text-gray-700 pl-6 md:pl-7">
                    {section.items.map((item, i) => (
                      <span
                        key={i}
                        className="hover:text-orange-500 cursor-pointer transition"
                      >
                        {item}
                      </span>
                    ))}
                    <MoreHorizontal
                      size={18}
                      className="cursor-pointer hover:text-orange-500"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>

        </div>
      </div>
    </>
  );
}