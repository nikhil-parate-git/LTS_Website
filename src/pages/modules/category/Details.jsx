import { useParams } from "react-router-dom";

function Details() {
  const { id } = useParams();

  return (
    <div className="max-w-7xl mx-auto p-6">

      {/* Business Title Section */}
      <h1 className="text-3xl font-bold mb-2 text-left">Nikhil Travel Blog</h1>
      

       {/* Location */}
          <div className="flex items-center gap-2 text-gray-700 mb-4">

            <span className="text-orange-500">📍</span>
            <span>Shiv Vihar, Delhi</span>
            <a href="#" className="text-blue-600 hover:underline ml-2">
              View Complete Address
            </a>
          </div>

          {/* Buttons Row */}
          <div className="flex flex-wrap gap-3 mb-6">

          <button className="bg-indigo-900 text-white px-2 py-2  hover:bg-indigo-800 transition ">
            Show Number
          </button>

          <button className="border px-2 py-2  hover:bg-gray-100">
            Rate Now
          </button>

          <button className="border px-2 py-2  hover:bg-gray-100 ">
            Add Photos
          </button>

          <button className="border px-2 py-2  hover:bg-gray-100 ">
            Share
          </button>

        </div>
      

      <div className="grid grid-cols-2 md:grid-cols-3 gap-8">

        {/* LeftContent */}
        <div className="md:col-span-2">

          {/* About  */}
          <h2 className="text-2xl font-semibold mb-4 text-left" >
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

          <div className="bg-[#eef3f3] p-6 rounded-lg shadow-sm">

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
              className="w-full mt-3 p-2 border rounded-lg"
              rows="4"
            ></textarea>

            <button className="w-full mt-4 bg-indigo-900 text-white py-2 rounded-lg hover:bg-indigo-800 transition">
              Send Enquiry
            </button>

        </div>

        </div>

      </div>

    </div>
  );
}

export default Details;