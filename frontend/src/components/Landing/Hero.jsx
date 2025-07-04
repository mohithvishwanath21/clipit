import { ArrowRight } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom"; // corrected from react-router

const Hero = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-5xl md:text-6xl font-extrabold text-red-600 mb-6">
          Clip It Faster, Share it Smarter!
        </h1>
        <p className="text-xl max-w-3xl mx-auto text-gray-900 mb-6">
          Create short links in seconds. Share them anywhere. Track their
          performance with detailed analytics.
        </p>
        <Link
          to="/signup"
          className="inline-flex items-center justify-center bg-red-600 text-white px-8 py-4 rounded-full text-lg font-semibold shadow hover:bg-red-700 transition"
        >
          Get Started <ArrowRight className="ml-2 h-5 w-5" />
        </Link>
      </div>
    </section>
  );
};

export default Hero;
