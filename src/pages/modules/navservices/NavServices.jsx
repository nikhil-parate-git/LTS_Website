// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// const NavServices = () => {
  
//   const handleEmailClick = (serviceName) => {
//     const emailAddress = 'chitrivchetan35@gmail.com';
//     const subject = encodeURIComponent(`Inquiry about ${serviceName} Service`);
//     const body = encodeURIComponent(`Hello Local Trade Street Team,\n\nI am interested in your ${serviceName} service. Please provide more details.\n\nThank you.`);
//     window.location.href = `mailto:${emailAddress}?subject=${subject}&body=${body}`;
//   };

// const navigate=useNavigate()
//   const localServices = [
//     {
//       id: 1,
//       name: "Web Development",
//       imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop", 
//       description: "Custom websites, high-performance e-commerce platforms, and scalable web applications designed for growth."
//     },
//     {
//       id: 2,
//       name: "AC Service",
//       imageUrl: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=800&auto=format&fit=crop", 
//       description: "Expert HVAC solutions including repair, precision maintenance, and energy-efficient installations."
//     },
//     {
//       id: 3,
//       name: "Mobile Service",
//       imageUrl: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?q=80&w=800&auto=format&fit=crop", 
//       description: "Hardware repairs, screen restoration, and advanced software troubleshooting for all flagship devices."
//     },
//     {
//       id: 4,
//       name: "Travels & Tours",
//       imageUrl: "https://images.unsplash.com/photo-1503221043305-f7498f8b7888?q=80&w=800&auto=format&fit=crop", 
//       description: "Curated corporate travel, seamless flight bookings, and luxury tour packages worldwide."
//     }
//   ];

//   const devServices = [
//     { name: "HTML5/CSS3", icon: "fab fa-html5" },
//     { name: "PHP", icon: "fab fa-php" },
//     { name: "jQuery", icon: "fab fa-js" },
//     { name: "WordPress", icon: "fab fa-wordpress" },
//     { name: "SEO Strategies", icon: "fas fa-chart-line" },
//     { name: "Digital Marketing", icon: "fas fa-bullhorn" }
//   ];

//   return (
//     <div className="min-h-screen bg-[#F9FAFB] text-gray-800 font-sans">
      
//       {/* Refined Hero Section - Medium Height */}
//       <div className="relative min-h-[70vh] flex items-center bg-[#f35824] overflow-hidden">
//         {/* Background Pattern */}
//         <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#F97316 0.5px, transparent 0.5px)', backgroundSize: '24px 24px' }}></div>
//         <div className="absolute inset-0 bg-gradient-to-br from-orange-600/20 via-transparent to-transparent"></div>
        
//         <div className="relative container mx-auto px-6 py-16">
//           <div className="max-w-4xl">
//             <div className="inline-flex items-center gap-2 bg-orange-500/10 backdrop-blur-md rounded-full px-4 py-1.5 mb-6 border border-orange-500/30">
//               <span className="flex h-2 w-2 rounded-full bg-orange-500 animate-pulse"></span>
//               <span className="text-white text-xs font-bold uppercase tracking-widest">Global Tech Partner</span>
//             </div>
            
//             <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-[1.1] tracking-tight">
//               Empowering <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-300">Local Trade</span> <br/> 
//               with Digital Excellence.
//             </h1>
            
//             <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl leading-relaxed">
//               We provide an all-inclusive, high-traffic search ecosystem designed to give your business the visibility it deserves since 2006.
//             </p>
            
//             <div className="flex flex-wrap gap-4">
//               <button
//               onClick={()=>navigate("/subscriptions")}
//                className="bg-blue-950 cursor-pointer hover:bg-orange-400 text-white font-bold px-8 py-4 rounded-lg transition-all shadow-lg shadow-orange-900/20 flex items-center gap-2">
//                 Get Started Today
//                 <i className="fas fa-chevron-right text-sm"></i>
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Services Section */}
//       <div className="container mx-auto px-6 -mt-12 relative z-10">
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//           {localServices.map((service) => (
//             <div
//               key={service.id}
//               className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 overflow-hidden border border-gray-100 flex flex-col group transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
//             >
//               <div className="relative h-48 overflow-hidden">
//                 <img 
//                   src={service.imageUrl} 
//                   alt={service.name} 
//                   className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
//                 />
//                 <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
//                 <div className="absolute bottom-4 left-5">
//                    <h3 className="text-xl font-bold text-white">{service.name}</h3>
//                 </div>
//               </div>
//               <div className="p-6 flex-grow flex flex-col">
//                 <p className="text-gray-500 text-sm leading-relaxed mb-6">
//                   {service.description}
//                 </p>
//                 <button
//                   onClick={() => handleEmailClick(service.name)}
//                   className="mt-auto flex items-center justify-between w-full text-orange-600 font-bold text-sm border-t border-gray-50 pt-4 group/btn"
//                 >
//                   Request Consultation
//                   <i className="fas fa-envelope transition-transform group-hover/btn:translate-x-1"></i>
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Modern Info Section */}
//       <div className="py-24 bg-white mt-12">
//         <div className="container mx-auto px-6">
//           <div className="flex flex-col lg:flex-row items-center gap-16">
//             <div className="lg:w-1/2">
//               <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6 leading-tight">
//                 Global Software Consultancy & <br/> 
//                 <span className="text-orange-600">Digital Transformation</span>
//               </h2>
//               <div className="w-20 h-1.5 bg-orange-500 rounded-full mb-8"></div>
//               <p className="text-gray-600 text-lg leading-relaxed mb-6">
//                 Positioned as a leading global consultancy, **Local Trade Street** leads the charge in driving digital transformation initiatives. We enhance operational efficiency, accessibility, and security while delivering tangible value.
//               </p>
//               <div className="grid grid-cols-2 gap-6">
//                 <div className="p-4 bg-orange-50 rounded-xl border border-orange-100">
//                   <span className="block text-2xl font-bold text-orange-600">1.5K+</span>
//                   <span className="text-sm text-gray-600 font-medium">Projects Delivered</span>
//                 </div>
//                 <div className="p-4 bg-orange-50 rounded-xl border border-orange-100">
//                   <span className="block text-2xl font-bold text-orange-600">20+</span>
//                   <span className="text-sm text-gray-600 font-medium">Years Experience</span>
//                 </div>
//               </div>
//             </div>
//             <div className="lg:w-1/2 grid grid-cols-2 gap-4">
//               <div className="space-y-4">
//                 <div className="h-40 bg-gray-100 rounded-2xl overflow-hidden shadow-inner">
//                    <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=400" className="w-full h-full object-cover" alt="Team"/>
//                 </div>
//                 <div className="h-60 bg-orange-600 rounded-2xl p-6 text-white flex flex-col justify-end">
//                   <i className="fas fa-quote-left text-3xl mb-4 opacity-50"></i>
//                   <p className="font-medium italic">"Driving innovation through tailored tech solutions."</p>
//                 </div>
//               </div>
//               <div className="space-y-4 pt-8">
//                 <div className="h-60 bg-gray-800 rounded-2xl p-6 text-white flex flex-col justify-end">
//                    <h4 className="text-xl font-bold mb-2">Our Goal</h4>
//                    <p className="text-gray-400 text-sm">To provide tailored solutions that ensure success in the digital landscape.</p>
//                 </div>
//                 <div className="h-40 bg-gray-100 rounded-2xl overflow-hidden">
//                    <img src="https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=400" className="w-full h-full object-cover" alt="Office"/>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Tech Stack - Professional Minimalist */}
//       <div className="bg-gray-50 py-20">
//         <div className="container mx-auto px-6 text-center">
//           <h3 className="text-sm uppercase tracking-widest text-gray-400 font-bold mb-12">Powering digital solutions with modern technology</h3>
//           <div className="flex flex-wrap justify-center gap-4">
//             {devServices.map((tech, idx) => (
//               <div key={idx} className="bg-white px-8 py-4 rounded-xl shadow-sm border border-gray-100 flex items-center gap-3 group hover:border-orange-500 transition-colors">
//                 <i className={`${tech.icon} text-gray-400 group-hover:text-orange-600 text-xl transition-colors`}></i>
//                 <span className="font-bold text-gray-700">{tech.name}</span>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* CTA Section */}
//       <div className="bg-orange-600 py-10 relative overflow-hidden">
//         <div className="absolute right-0 top-0 w-64 h-64 bg-orange-500 rounded-full -mr-32 -mt-32 blur-3xl opacity-50"></div>
//         <div className="container mx-auto px-6 text-center relative z-10">
//           <h2 className="text-4xl font-black text-white mb-6">Ready to Transform Your Business?</h2>
//           <p className="text-orange-100 mb-10 max-w-xl mx-auto text-lg">
//             Connect with our global experts and let's build something extraordinary together.
//           </p>
//           <button 
//             onClick={() => handleEmailClick("General Inquiry")}
//             className="bg-white text-orange-600 font-black px-12 py-5 rounded-xl shadow-2xl hover:scale-105 transition-transform"
//           >
//             CONTACT OUR EXPERTS
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default NavServices;


import React from 'react';
import { useNavigate } from 'react-router-dom';

const NavServices = () => {
  
  // ✅ ONLY FIX HERE (बाकी सब same)
  const handleEmailClick = (serviceName) => {
    const emailAddress = 'chitrivchetan35@gmail.com';
    const subject = encodeURIComponent(`Inquiry about ${serviceName} Service`);
    const body = encodeURIComponent(`Hello Local Trade Street Team,\n\nI am interested in your ${serviceName} service. Please provide more details.\n\nThank you.`);

    // Gmail open (fix)
    window.open(
      `https://mail.google.com/mail/?view=cm&fs=1&to=${emailAddress}&su=${subject}&body=${body}`,
      "_blank"
    );
  };

  const navigate=useNavigate()

  const localServices = [
    {
      id: 1,
      name: "Web Development",
      imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop", 
      description: "Custom websites, high-performance e-commerce platforms, and scalable web applications designed for growth."
    },
    {
      id: 2,
      name: "AC Service",
      imageUrl: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=800&auto=format&fit=crop", 
      description: "Expert HVAC solutions including repair, precision maintenance, and energy-efficient installations."
    },
    {
      id: 3,
      name: "Mobile Service",
      imageUrl: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?q=80&w=800&auto=format&fit=crop", 
      description: "Hardware repairs, screen restoration, and advanced software troubleshooting for all flagship devices."
    },
    {
      id: 4,
      name: "Travels & Tours",
      imageUrl: "https://images.unsplash.com/photo-1503221043305-f7498f8b7888?q=80&w=800&auto=format&fit=crop", 
      description: "Curated corporate travel, seamless flight bookings, and luxury tour packages worldwide."
    }
  ];

  const devServices = [
    { name: "HTML5/CSS3", icon: "fab fa-html5" },
    { name: "PHP", icon: "fab fa-php" },
    { name: "jQuery", icon: "fab fa-js" },
    { name: "WordPress", icon: "fab fa-wordpress" },
    { name: "SEO Strategies", icon: "fas fa-chart-line" },
    { name: "Digital Marketing", icon: "fas fa-bullhorn" }
  ];

  return (
    <div className="min-h-screen bg-[#F9FAFB] text-gray-800 font-sans">
      
      {/* Refined Hero Section - Medium Height */}
      <div className="relative min-h-[70vh] flex items-center bg-gradient-to-br from-orange-600 via-orange-500 to-orange-400 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#F97316 0.5px, transparent 0.5px)', backgroundSize: '24px 24px' }}></div>
        <div className="absolute inset-0 bg-gradient-to-br from-orange-600/20 via-transparent to-transparent"></div>
        
        <div className="relative container mx-auto px-6 py-16">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 bg-orange-500/10 backdrop-blur-md rounded-full px-4 py-1.5 mb-6 border border-orange-500/30">
              <span className="flex h-2 w-2 rounded-full bg-orange-500 animate-pulse"></span>
              <span className="text-white text-xs font-bold uppercase tracking-widest">Global Tech Partner</span>
            </div>
            
            <h1 className="text-5xl md:text-5xl font-black text-white mb-6 leading-[1.1] tracking-tight">
              Empowering <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-300">Local Trade</span> <br/> 
              with Digital Excellence.
            </h1>
            
            <p className="text-lg md:text-base text-black mb-10 max-w-2xl leading-relaxed">
              We provide an all-inclusive, high-traffic search ecosystem designed to give your business the visibility it deserves since 2026.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <button
              onClick={()=>navigate("/subscriptions")}
               className="bg-blue-950 cursor-pointer hover:bg-orange-400 text-white font-bold px-8 py-4 rounded-lg transition-all shadow-lg shadow-orange-900/20 flex items-center gap-2">
                Get Started Today
                <i className="fas fa-chevron-right text-sm"></i>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="container mx-auto px-6 -mt-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {localServices.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 overflow-hidden border border-gray-100 flex flex-col group transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={service.imageUrl} 
                  alt={service.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                <div className="absolute bottom-4 left-5">
                   <h3 className="text-xl font-bold text-white">{service.name}</h3>
                </div>
              </div>
              <div className="p-6 flex-grow flex flex-col">
                <p className="text-gray-500 text-sm leading-relaxed mb-6">
                  {service.description}
                </p>
                <button
                  onClick={() => handleEmailClick(service.name)}
                  className="mt-auto flex items-center justify-between w-full text-orange-600 font-bold text-sm border-t border-gray-50 pt-4 group/btn"
                >
                  Request Consultation
                  <i className="fas fa-envelope transition-transform group-hover/btn:translate-x-1"></i>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modern Info Section */}
      <div className="py-24 bg-white mt-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2">
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6 leading-tight">
                Global Software Consultancy & <br/> 
                <span className="text-orange-600">Digital Transformation</span>
              </h2>
              <div className="w-20 h-1.5 bg-orange-500 rounded-full mb-8"></div>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                Positioned as a leading global consultancy, **Local Trade Street** leads the charge in driving digital transformation initiatives. We enhance operational efficiency, accessibility, and security while delivering tangible value.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="p-4 bg-orange-50 rounded-xl border border-orange-100">
                  <span className="block text-2xl font-bold text-orange-600">1.5K+</span>
                  <span className="text-sm text-gray-600 font-medium">Projects Delivered</span>
                </div>
                <div className="p-4 bg-orange-50 rounded-xl border border-orange-100">
                  <span className="block text-2xl font-bold text-orange-600">20+</span>
                  <span className="text-sm text-gray-600 font-medium">Years Experience</span>
                </div>
              </div>
            </div>
            <div className="lg:w-1/2 grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="h-40 bg-gray-100 rounded-2xl overflow-hidden shadow-inner">
                   <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=400" className="w-full h-full object-cover" alt="Team"/>
                </div>
                <div className="h-60 bg-orange-600 rounded-2xl p-6 text-white flex flex-col justify-end">
                  <i className="fas fa-quote-left text-3xl mb-4 opacity-50"></i>
                  <p className="font-medium italic">"Driving innovation through tailored tech solutions."</p>
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="h-60 bg-gray-800 rounded-2xl p-6 text-white flex flex-col justify-end">
                   <h4 className="text-xl font-bold mb-2">Our Goal</h4>
                   <p className="text-gray-400 text-sm">To provide tailored solutions that ensure success in the digital landscape.</p>
                </div>
                <div className="h-40 bg-gray-100 rounded-2xl overflow-hidden">
                   <img src="https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=400" className="w-full h-full object-cover" alt="Office"/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tech Stack - Professional Minimalist */}
      <div className="bg-gray-50 py-20">
        <div className="container mx-auto px-6 text-center">
          <h3 className="text-sm uppercase tracking-widest text-gray-400 font-bold mb-12">Powering digital solutions with modern technology</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {devServices.map((tech, idx) => (
              <div key={idx} className="bg-white px-8 py-4 rounded-xl shadow-sm border border-gray-100 flex items-center gap-3 group hover:border-orange-500 transition-colors">
                <i className={`${tech.icon} text-gray-400 group-hover:text-orange-600 text-xl transition-colors`}></i>
                <span className="font-bold text-gray-700">{tech.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-orange-600 py-10 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-64 h-64 bg-orange-500 rounded-full -mr-32 -mt-32 blur-3xl opacity-50"></div>
        <div className="container mx-auto px-6 text-center relative z-10">
          <h2 className="text-4xl font-black text-white mb-6">Ready to Transform Your Business?</h2>
          <p className="text-orange-100 mb-10 max-w-xl mx-auto text-lg">
            Connect with our global experts and let's build something extraordinary together.
          </p>
          <button 
            onClick={() => handleEmailClick("General Inquiry")}
            className="bg-white cursor-pointer text-orange-600 font-black px-12 py-5 rounded-xl shadow-2xl hover:scale-105 transition-transform"
          >
            CONTACT OUR EXPERTS
          </button>
        </div>
      </div>
    </div>
  );
};

export default NavServices;