import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const About = () => {
  return (
    <main className="min-h-screen bg-white text-gray-900 py-16 px-6 md:px-12 lg:px-24 max-w-5xl mx-auto">
      <h1 className="text-5xl font-extrabold text-red-600 mb-8 text-center">
        About Clip It
      </h1>

      <p className="text-lg text-gray-800 leading-relaxed mb-8">
        Clip It is your reliable URL shortener app that makes creating and sharing short links fast, easy, and secure. With an intuitive interface and powerful features, we help you manage your links effortlessly.
      </p>

      <h2 className="text-3xl font-bold text-red-600 mb-6">
        Features
      </h2>

      <ul className="list-disc list-inside text-gray-700 mb-12 space-y-3">
        <li>Quick URL shortening with custom aliases.</li>
        <li>Real-time detailed analytics to track link performance.</li>
        <li>Secure and private link management with password protection.</li>
        <li>Set expiration dates and enable/disable links anytime.</li>
        <li>Generate QR codes for easy sharing.</li>
        <li>Mobile-friendly, responsive design for all devices.</li>
      </ul>

      <h2 className="text-3xl font-bold text-red-600 mb-6">
        Why Choose Clip It?
      </h2>

      <p className="text-lg text-gray-800 leading-relaxed mb-8">
        Whether you are a marketer, developer, or casual user, Clip It delivers a seamless experience combining speed, reliability, and security. Join thousands of users who trust Clip It for all their link management needs.
      </p>

      <div className="text-center">
        <Link
          to="/signup"
          className="inline-flex items-center justify-center bg-red-600 text-white px-8 py-4 rounded-full text-lg font-semibold shadow hover:bg-red-700 transition"
        >
          Get Started <ArrowRight className="ml-2 h-5 w-5" />
        </Link>
      </div>
    </main>
  );
};

export default About;
