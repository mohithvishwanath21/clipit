import React, { useContext, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import Dashboard from "./Dashboard";
import { LoadingSpinner } from "../components/LoadingSpinner";
import {
  ArrowRight,
  BarChart2,
  Link2,
  Shield,
  Calendar,
  QrCode,
  Lock,
  ToggleLeft,
  TrendingUp,
} from "lucide-react";

const Landing = () => {
  const { user, loading } = useContext(AuthContext);

  const sliderRef = useRef(null);
  const animationRef = useRef(null);
  const isHovered = useRef(false);
  const speed = 0.7;

  useEffect(() => {
    const slider = sliderRef.current;
    const animate = () => {
      if (!isHovered.current && slider) {
        slider.scrollLeft += speed;
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

        {/* Hero */}
        <section className="text-center mb-20 px-2">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-red-600 mb-6 leading-tight">
            Clip It Faster, Share it Smarter!
          </h1>
          <p className="text-lg sm:text-xl max-w-2xl mx-auto text-gray-900 mb-6">
            Create short links in seconds. Share them anywhere. Track their performance with detailed analytics.
          </p>
          <Link
            to="/signup"
            className="inline-flex items-center justify-center bg-red-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-semibold shadow hover:bg-red-700 transition"
          >
            Get Started <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </section>

        {/* Why Choose Section */}
        <section className="py-16">
          <h2 className="text-3xl font-bold text-center mb-12 text-red-600">
            Why Choose Our URL Shortener
          </h2>
          <div
            ref={sliderRef}
            className="overflow-x-auto scrollbar-hide sm:scroll-auto"
            onMouseEnter={() => { isHovered.current = true; }}
            onMouseLeave={() => { isHovered.current = false; }}
          >
            <div className="flex sm:flex-row flex-col gap-6 sm:gap-4 sm:whitespace-nowrap px-2">
              {[...cards, ...cards].map((card, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 min-w-[250px] max-w-xs bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-lg text-gray-700 transition"
                >
                  <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-4 mx-auto bg-red-100">
                    {card.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-red-600 text-center">
                    {card.title}
                  </h3>
                  <p className="text-sm text-gray-600 text-center">{card.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-16 px-2">
          <h2 className="text-3xl font-bold text-center mb-12">
            How It Works
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 text-center max-w-5xl mx-auto">
            {[1, 2, 3].map((step, idx) => (
              <div key={idx}>
                <div className="bg-red-600 text-white w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  {step}
                </div>
                <h3 className="text-lg sm:text-xl font-semibold mb-2">
                  {step === 1
                    ? "Paste your long URL"
                    : step === 2
                    ? 'Click "Shorten URL"'
                    : "Share and track"}
                </h3>
                <p className="text-gray-600 max-w-xs mx-auto">
                  {step === 1
                    ? "Enter your long URL into our shortener input field."
                    : step === 2
                    ? "Click the button and get your shortened URL instantly."
                    : "Share your short URL and track its performance with our analytics."}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 text-center max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-4">Ready to get started?</h2>
          <p className="text-lg sm:text-xl text-gray-600 mb-8">
            Join thousands of users who trust our URL shortener for their link management needs.
          </p>
          <Link
            to="/signup"
            className="inline-flex items-center justify-center bg-red-600 text-white px-6 py-3 rounded-md hover:bg-red-700 text-base sm:text-lg font-medium shadow transition"
          >
            Shorten Your First URL <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </section>
      </main>

      {/* Scrollbar hide global */}
      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default Landing;
