import { useParams } from "react-router-dom";
import { MapPin } from "lucide-react";
import { Phone, Star, ImagePlus, Share2 } from "lucide-react";



function Details() {
  const { id } = useParams();

  return (
    <div className="max-w-7xl mx-auto p-6">

      {/* Business Title Section */}
      <h1 className="text-3xl font-bold mb-2 text-left">Nikhil Travel Blog</h1>


         {/* Location */}
        <div 
        className="flex items-center gap-2 text-gray-600">
        <MapPin size={18} className="text-black-500" />
        <span>Shiv Vihar, Delhi</span>
        <a href="#" className="text-blue-600 hover:underline ml-2">
              View Complete Address
            </a>
        </div>
      
          <div 
          className="flex items-center gap-2 text-gray-700 mb-4">
          </div>
      
          

          {/* Buttons Row */}
          <div className="flex gap-4 mt-4">

            {/*Number Button */}
            <button className="flex items-center gap-2 px-5 py-1 rounded-lg 
            bg-gradient-to-r from-blue-600/90 to-blue-500/90 
            backdrop-blur-md 
            text-white font-medium 
            shadow-lg shadow-blue-500/30
            hover:scale-105 hover:shadow-xl 
            transition-all duration-300">
              <Phone size={18} />
              Show Number
            </button>
        
            {/* Rate Now */}
            <button className="flex items-center gap-2 px-5 py-1 rounded-lg 
            bg-white/30 backdrop-blur-md 
            border border-white/40 
            text-gray-800 font-medium
            shadow-md hover:shadow-lg 
            hover:bg-white/40 
            transition-all duration-300">
              <Star size={18} className="text-orange-500" />
              Rate Now
            </button>
        
            {/* Add Photos */}
            <button className="flex items-center gap-2 px-5 py-1 rounded-lg 
            bg-white/30 backdrop-blur-md 
            border border-white/40 
            text-gray-800 font-medium
            shadow-md hover:shadow-lg 
            hover:bg-white/40 
            transition-all duration-300">
              <ImagePlus size={18} />
              Add Photos
            </button>
        
            {/* Share */}
            <button className="flex items-center gap-2 px-5 py-1 rounded-lg 
            bg-white/30 backdrop-blur-md 
            border border-white/40 
            text-gray-800 font-medium
            shadow-md hover:shadow-lg 
            hover:bg-white/40 
            transition-all duration-300">
              <Share2 size={18} />
              Share
            </button>
  </div>



        <div 
        className="grid grid-cols-2 md:grid-cols-3 gap-8">
        {/* LeftContent */}
        <div className="md:col-span-2">

          {/* About  */}
          <h2 className="mt-5 text-2xl font-semibold text-left">
          About Us – Nikhil Travel Blog
          </h2>

        <p className="text-gray-700 mb-4 leading-relaxed text-left">
            Nikhil’s journey through North India offers a dynamic blend of rich history, vibrant culture, bustling business hubs, and natural beauty. 
            This region of India is a mix of ancient traditions and modern-day progress, making it an exciting destination for all kinds of travelers, 
            from history enthusiasts to business professionals.
          </p>

         <p className="text-gray-700 mb-4 leading-relaxed text-left">
           Starting with Delhi, the capital city of India, Nikhil would experience a city that serves as the political and business heart of the nation. 
           Delhi is home to both historical landmarks like the Red Fort, Qutub Minar, and Humayun’s Tomb, and contemporary business districts like Connaught Place and Cyber Hub. The city is a bustling center of commerce, attracting professionals and entrepreneurs from across the country and the globe. 
           The infrastructure, networking opportunities, and growing startup ecosystem make it a magnet for those in business.
          </p>

        <p className="text-gray-700 mb-4 leading-relaxed text-left">
            From Delhi, Nikhil could travel to Agra to marvel at the world-famous Taj Mahal, one of the Seven Wonders of the World. 
            Beyond tourism, Agra is also an important business hub for the handicraft and leather industries. 
            The city’s industrial growth and trade ties with global markets have contributed significantly to the region's economy.
          </p>

          <p className="text-gray-700 mb-4 leading-relaxed text-left">
            Rajasthan, with cities like Jaipur, Udaipur, and Jodhpur, offers both historical marvels and a glimpse into the region's thriving tourism industry. 
            These cities are also important business centers in the state’s textile, handicraft, and tourism sectors. Jaipur, also known as the "Pink City," is home to a burgeoning tech scene and the world-renowned Rajasthan International Film Festival. 
            The state's rich history and traditions attract both tourists and investors, while the rise of business parks and hotels further boosts its economy.
          </p>

          <p className="text-gray-700 mb-4 leading-relaxed text-left">
           Heading further north, Nikhil could explore the religious and spiritual significance of cities like Varanasi, Rishikesh, and Haridwar. 
           Varanasi, on the banks of the Ganges River, is a key center for spirituality and a popular destination for pilgrims and travelers alike.
          </p>

          
        </div>

        {/* Right Sidebar  */}
        <div>

          <div className="bg-[#eef3f3] p-7 rounded-lg shadow-sm">

            <h3 className="text-lg font-semibold text-gray-800 text-left">
              Get more information from
            </h3>

            <h2 className="text-xl font-bold text-orange-600 mt-1 text-left">
              Nikhil Travel Blog
            </h2>

            {/* FormCard */}

            <input
              type="text"
              placeholder="Enter your Mobile No."
              className="w-full mt-4 p-2 border rounded-lg"
            />

            <input
              type="text"
              placeholder="Enter your Name"
              className="w-full mt-3 p-2 border rounded-lg"
            />

            <textarea
              placeholder="What is your Requirement?"
              className="w-full mt-3 p-2 border rounded-xl"
              rows="4"
            ></textarea>

            <button className="w-full mt-4 py-3 rounded-xl 
            bg-gradient-to-r from-indigo-700 to-indigo-500 
            text-white font-semibold 
            shadow-lg hover:shadow-indigo-400/40 
            hover:scale-[1.02] 
            transition-all duration-300">
              Send Enquiry
            </button>

        </div>

        </div>

      </div>

    </div>
  );
}

export default Details;