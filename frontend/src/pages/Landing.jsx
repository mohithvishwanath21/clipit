import React, { useContext, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import Dashboard from "./Dashboard";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { ArrowRight, BarChart2, Link2, Shield, Calendar, QrCode, Lock, ToggleLeft, TrendingUp, Settings } from "lucide-react";

const Landing = () => {
  const { user, loading } = useContext(AuthContext);

  // Refs and state for auto scroll slider
  const sliderRef = useRef(null);
  const animationRef = useRef(null);
  const isHovered = useRef(false);
  const speed = 0.7;

  useEffect(() => {
    const slider = sliderRef.current;
    const animate = () => {
      if (!isHovered.current && slider) {
        slider.scrollLeft += speed;
        // Reset scroll to create infinite effect
        if (slider.scrollLeft >= slider.scrollWidth / 2) {
          slider.scrollLeft = 0;
        }
      }
      animationRef.current = requestAnimationFrame(animate);
    };
    animationRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationRef.current);
  }, []);

  if (loading) return <LoadingSpinner />;
  if (user) return <Dashboard />;

  // Cards data for Why Choose section (you can update text/icons later)
  const cards = [
    {
      icon: <Link2 className="w-7 h-7 text-red-600" />,
      title: "Easy to Use",
      description: "Create and share short links quickly with an intuitive interface.",
    },
    {
      icon: <BarChart2 className="w-7 h-7 text-red-600" />,
      title: "Detailed Analytics",
      description: "Track clicks and performance of your links in real time.",
    },
    {
      icon: <Shield className="w-7 h-7 text-red-600" />,
      title: "Secure & Reliable",
      description: "Your links are protected with robust security features.",
    },
    {
      icon: <Calendar className="w-7 h-7 text-red-600" />,
      title: "Expiry Control",
      description: "Set expiration dates for your short URLs as needed.",
    },
    {
      icon: <Lock className="w-7 h-7 text-red-600" />,
      title: "Password Protection",
      description: "Add passwords to restrict access to your links.",
    },
    {
      icon: <QrCode className="w-7 h-7 text-red-600" />,
      title: "QR Codes",
      description: "Generate QR codes for easy scanning and sharing.",
    },
    {
      icon: <ToggleLeft className="w-7 h-7 text-red-600" />,
      title: "URL Control",
      description: "Enable or disable your links anytime with ease.",
    },
    {
      icon: <TrendingUp className="w-7 h-7 text-red-600" />,
      title: "Click Analytics",
      description: "Get deep insights into how your links perform.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900">
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">

        {/* Hero Section */}
        <section className="text-center mb-20">
          <h1 className="text-5xl md:text-6xl font-extrabold text-red-600 mb-6">
            Clip It Faster, Share it Smarter!
          </h1>
          <p className="text-xl max-w-3xl mx-auto text-gray-900 mb-6">
            Create short links in seconds. Share them anywhere. Track their performance with detailed analytics.
          </p>
          <Link
            to="/signup"
            className="inline-flex items-center justify-center bg-red-600 text-white px-8 py-4 rounded-full text-lg font-semibold shadow hover:bg-red-700 transition"
          >
            Get Started <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </section>

        {/* Why Choose Our URL Shortener with exact slider style */}
        <section className="py-16 max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-red-600">
            Why Choose Our URL Shortener
          </h2>

          <div
            ref={sliderRef}
            className="relative w-full overflow-x-auto whitespace-nowrap scrollbar-hide"
            style={{ cursor: "default" }}
            onMouseEnter={() => { isHovered.current = true; }}
            onMouseLeave={() => { isHovered.current = false; }}
          >
            {[...cards, ...cards].map((card, index) => (
              <div
                key={index}
                className="inline-block rounded-2xl p-6 mr-6 w-64 align-top border bg-white border-gray-200 hover:shadow-lg text-gray-700 transition break-words"
              >
                <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-4 mx-auto bg-red-100">
                  {card.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-red-600 text-center">{card.title}</h3>
                <p className="text-sm text-gray-600 card-desc text-center">
                  {card.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-16">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>

          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="bg-red-600 text-white w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                1
              </div>
              <h3 className="text-xl font-semibold mb-2">Paste your long URL</h3>
              <p className="text-gray-600 max-w-xs mx-auto">
                Enter your long URL into our shortener input field.
              </p>
            </div>

            <div>
              <div className="bg-red-600 text-white w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                2
              </div>
              <h3 className="text-xl font-semibold mb-2">Click "Shorten URL"</h3>
              <p className="text-gray-600 max-w-xs mx-auto">
                Click the button and get your shortened URL instantly.
              </p>
            </div>

            <div>
              <div className="bg-red-600 text-white w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                3
              </div>
              <h3 className="text-xl font-semibold mb-2">Share and track</h3>
              <p className="text-gray-600 max-w-xs mx-auto">
                Share your short URL and track its performance with our analytics.
              </p>
            </div>
          </div>
        </section>

        

        {/* CTA Section */}
        <section className="py-16 text-center max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-4">Ready to get started?</h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of users who trust our URL shortener for their link management needs.
          </p>
          <Link
            to="/signup"
            className="inline-flex items-center justify-center bg-red-600 text-white px-6 py-3 rounded-md hover:bg-red-700 text-lg font-medium shadow transition"
          >
            Shorten Your First URL <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </section>

      </main>

      {/* Global styles for scrollbar hide and card desc */}
      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .card-desc {
          white-space: normal !important;
          word-wrap: break-word !important;
        }
      `}</style>
    </div>
  );
};

export default Landing;
