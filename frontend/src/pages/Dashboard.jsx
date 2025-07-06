// import { AuthContext } from "../contexts/AuthContext";
// import { useContext } from "react";
// import { Link } from "react-router";
// import { LinkIcon as LinkPlus, Link2, BarChart2, User } from "lucide-react";
// import { useQuery } from "@tanstack/react-query";
// import { getUrlData } from "../api/url";
// import { LoadingSpinner } from "../components/LoadingSpinner";

// const Dashboard = () => {
//   const { user } = useContext(AuthContext);

//   const { data, isLoading } = useQuery({
//     queryKey: ["shortUrls"],
//     queryFn: getUrlData,
//   });

//   if (isLoading) return <LoadingSpinner />;

//   const totalClicks = data?.reduce((sum, item) => sum + item.clicksCount, 0);

//   return (
//     <main className="p-4 sm:p-6 lg:p-8">
//       <div className="mb-6">
//         <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
//         <p className="text-gray-500">
//           Welcome back,{" "}
//           <span className="font-medium text-gray-600">{user.name}!</span> Here's
//           an overview of your URLs.
//         </p>
//       </div>

//       {/* Stats overview */}
//       <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
//         <div className="bg-white p-6 rounded-md shadow-sm border border-gray-200">
//           <p className="text-sm font-medium text-gray-500 mb-1">Total URLs</p>
//           <p className="text-2xl font-bold">{data.length}</p>
//           {/* <p className="text-xs text-green-500 mt-2">↑ 0% from last month</p> */}
//         </div>

//         <div className="bg-white p-6 rounded-md shadow-sm border border-gray-200">
//           <p className="text-sm font-medium text-gray-500 mb-1">Total Clicks</p>
//           <p className="text-2xl font-bold">{totalClicks}</p>
//           {/* <p className="text-xs text-green-500 mt-2">↑ 0% from last month</p> */}
//         </div>

//         <div className="bg-white p-6 rounded-md shadow-sm border border-gray-200">
//           <p className="text-sm font-medium text-gray-500 mb-1">
//             Avg. Click Rate
//           </p>
//           <p className="text-2xl font-bold">
//             {data.length ? (totalClicks / data.length).toFixed(2) : 0}
//           </p>
//           {/* <p className="text-xs text-green-500 mt-2">↑ 0% from last month</p> */}
//         </div>

//         <div className="bg-white p-6 rounded-md shadow-sm border border-gray-200">
//           <p className="text-sm font-medium text-gray-500 mb-1">Active URLs</p>
//           <p className="text-2xl font-bold">{data.length}</p>
//           {/* <p className="text-xs text-green-500 mt-2">↑ 0% from last month</p> */}
//         </div>
//       </div>

//       {/* Quick actions */}
//       <div className="mb-8">
//         <h2 className="text-lg font-medium text-gray-900 mb-4">
//           Quick Actions
//         </h2>
//         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//           <Link
//             to="/create"
//             className="bg-white p-6 rounded-md shadow-sm border border-gray-200 flex flex-col items-center text-center hover:border-indigo-500 transition-colors"
//           >
//             <div className="bg-indigo-100 p-3 rounded-full mb-3">
//               <LinkPlus className="h-6 w-6 text-indigo-600" />
//             </div>
//             <h3 className="font-medium">Create Short URL</h3>
//             <p className="text-sm text-gray-500 mt-1">Shorten a new URL</p>
//           </Link>

//           <Link
//             to="/view"
//             className="bg-white p-6 rounded-md shadow-sm border border-gray-200 flex flex-col items-center text-center hover:border-indigo-500 transition-colors"
//           >
//             <div className="bg-indigo-100 p-3 rounded-full mb-3">
//               <Link2 className="h-6 w-6 text-indigo-600" />
//             </div>
//             <h3 className="font-medium">View URLs</h3>
//             <p className="text-sm text-gray-500 mt-1">Manage your links</p>
//           </Link>

//           <Link
//             to="/analytics"
//             className="bg-white p-6 rounded-md shadow-sm border border-gray-200 flex flex-col items-center text-center hover:border-indigo-500 transition-colors"
//           >
//             <div className="bg-indigo-100 p-3 rounded-full mb-3">
//               <BarChart2 className="h-6 w-6 text-indigo-600" />
//             </div>
//             <h3 className="font-medium">Analytics</h3>
//             <p className="text-sm text-gray-500 mt-1">Track performance</p>
//           </Link>

//           <Link
//             to="/profile"
//             className="bg-white p-6 rounded-md shadow-sm border border-gray-200 flex flex-col items-center text-center hover:border-indigo-500 transition-colors"
//           >
//             <div className="bg-indigo-100 p-3 rounded-full mb-3">
//               <User className="h-6 w-6 text-indigo-600" />
//             </div>
//             <h3 className="font-medium">Profile</h3>
//             <p className="text-sm text-gray-500 mt-1">Update your info</p>
//           </Link>
//         </div>
//       </div>
// {/*  */}
//       {/* Recent URLs */}
//       {/* <div>
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-lg font-medium text-gray-900">Recent URLs</h2>
//           <Link
//             href="/dashboard/urls"
//             className="text-sm text-indigo-600 hover:text-indigo-800"
//           >
//             View all
//           </Link>
//         </div>

//         <div className="bg-white rounded-md shadow-sm border border-gray-200 overflow-hidden">
//           <table className="min-w-full divide-y divide-gray-200">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th
//                   scope="col"
//                   className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//                 >
//                   Original URL
//                 </th>
//                 <th
//                   scope="col"
//                   className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//                 >
//                   Short URL
//                 </th>
//                 <th
//                   scope="col"
//                   className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//                 >
//                   Clicks
//                 </th>
//                 <th
//                   scope="col"
//                   className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//                 >
//                   Created
//                 </th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               <tr>
//                 <td className="px-6 py-4 whitespace-nowrap">
//                   <div className="flex items-center">
//                     <span className="text-sm text-gray-900 truncate max-w-[200px]">
//                       https://example.com/very-long-path-that-needs-to-be-shortened
//                     </span>
//                   </div>
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap">
//                   <div className="text-sm text-indigo-600">abc123</div>
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap">
//                   <div className="text-sm text-gray-900">245</div>
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                   2 days ago
//                 </td>
//               </tr>
//               <tr>
//                 <td className="px-6 py-4 whitespace-nowrap">
//                   <div className="flex items-center">
//                     <span className="text-sm text-gray-900 truncate max-w-[200px]">
//                       https://anotherexample.com/blog/article/2023/05/15
//                     </span>
//                   </div>
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap">
//                   <div className="text-sm text-indigo-600">xyz789</div>
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap">
//                   <div className="text-sm text-gray-900">187</div>
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                   3 days ago
//                 </td>
//               </tr>
//               <tr>
//                 <td className="px-6 py-4 whitespace-nowrap">
//                   <div className="flex items-center">
//                     <span className="text-sm text-gray-900 truncate max-w-[200px]">
//                       https://docs.example.org/documentation/getting-started
//                     </span>
//                   </div>
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap">
//                   <div className="text-sm text-indigo-600">def456</div>
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap">
//                   <div className="text-sm text-gray-900">132</div>
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                   5 days ago
//                 </td>
//               </tr>
//             </tbody>
//           </table>
//         </div>
//       </div> */}
//       {/*  */}
//     </main>
//   );
// };

// export default Dashboard;
import React, { useContext, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
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
  Rocket,
} from "lucide-react";

const Dashboard = () => {
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

        {/* Hero Section with Two Buttons */}
        <section className="text-center mb-20 px-2">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-red-600 mb-6 leading-tight">
            Clip It Faster, Share it Smarter!
          </h1>
          <p className="text-lg sm:text-xl max-w-2xl mx-auto text-gray-900 mb-8">
            Create short links in seconds. Share them anywhere. Track their performance with detailed analytics.
          </p>
          <div className="flex justify-center gap-4 sm:gap-6 flex-wrap">
            <Link
              to="/create"
              className="inline-flex items-center bg-red-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-semibold shadow hover:bg-red-700 transition"
            >
              <Rocket className="w-5 h-5 mr-2" />
              Clip It
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              to="/view"
              className="inline-flex items-center bg-gray-100 text-red-600 px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-semibold shadow hover:bg-gray-200 transition"
            >
              <Rocket className="w-5 h-5 mr-2" />
              Manage URLs
            </Link>
          </div>
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
                  <p className="text-sm text-gray-600 text-center">
                    {card.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-16 px-2">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
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
      </main>

      {/* Extra Styling */}
      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default Dashboard;
