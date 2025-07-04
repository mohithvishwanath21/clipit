import React from "react";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 py-8 mt-auto">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
    <p className="text-sm text-gray-600 mb-4">
      © {new Date().getFullYear()} URL Shortener. All rights reserved.
    </p>
    <div className="flex justify-center space-x-6">
      <a href="#" className="text-sm text-gray-600 hover:text-indigo-600 transition">
        Privacy Policy
      </a>
      <a href="#" className="text-sm text-gray-600 hover:text-indigo-600 transition">
        Terms of Service
      </a>
      <a href="#" className="text-sm text-gray-600 hover:text-indigo-600 transition">
        Contact Us
      </a>
    </div>
  </div>
</footer>

  );
};

export default Footer;
