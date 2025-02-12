import React from "react";

const BecomeASeller = () => {
  return (
    <div className="min-h-screen flex items-center bg-gray-100 px-6 md:px-12 pb-8">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center">
        {/* Left Section - Text & Form */}
        <div className="md:w-1/2 text-center md:text-left">
          <h1 className="text-4xl font-bold text-gray-900">
            Grow Your Business with Us
          </h1>
          <p className="text-lg text-gray-700 mt-2">
            Join thousands of local sellers expanding their reach. 
            We help you manage sales, payments, and customers with ease.
          </p>

          {/* GST & Info */}
          <div className="bg-blue-100 px-4 py-2 mt-4 rounded-md text-pink-700 font-medium">
            <span className="bg-blue-400 text-white px-2  py-1 rounded text-sm font-semibold">
              New!
            </span>  &#160;
            No GST? No problem! You can still sell with us.  
            <a href="#" className="text-blue-600 underline ml-1">Learn more</a>.
          </div>

          {/* Input & Button */}
          <div className="mt-6 flex items-center border border-gray-300 rounded-md overflow-hidden">
            <span className="px-3 bg-gray-200 text-gray-700 text-lg">+91</span>
            <input
              type="text"
              placeholder="Enter Your Mobile Number"
              className="w-full p-2 outline-none text-gray-900"
            />
            <button className="bg-blue-600 text-white w-40 px-4 py-2 font-medium hover:bg-pink-700">
              Start Selling
            </button>
          </div>
        </div>

        {/* Right Section - Unsplash Image */}
        <div className="md:w-1/2 mt-6 md:mt-0 flex justify-center">
          <img 
            src="https://images.unsplash.com/photo-1664575599618-8f6bd76fc670?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
            alt="Sellers" 
            className="w-full max-w-md rounded-lg shadow-md" 
          />
        </div>
      </div>
    </div>
  );
};

export default BecomeASeller;