import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { saveShortUrl, getUrlData, deleteUrl } from "../api/url";
import URLTable from "../components/ui/URLTable";
import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function CreateURL() {
  const queryClient = useQueryClient();
  const inputRef = useRef();
  const [isError, setIsError] = useState("");

  const getUrl = useQuery({
    queryKey: ["shortUrls"],
    queryFn: getUrlData,
  });
useEffect(() => {
  getUrl.refetch(); // ⬅ force latest data from server
}, []);

  const urlMutation = useMutation({
    mutationFn: (originalUrl) => saveShortUrl(originalUrl),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["shortUrls"] });
      if (inputRef.current) inputRef.current.value = "";
    },
    onError: (error) => {
      setIsError(error?.response?.data?.message || "Something went wrong");
      setTimeout(() => {
        setIsError("");
      }, 10000);
    },
  });

  const deletMutation = useMutation({
    mutationFn: (_id) => deleteUrl(_id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["shortUrls"] });
    },
    onError: (error) => {
      console.log("Error: ", error.message);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    let url = e.target.url.value.trim();
    if (!/^https?:\/\//i.test(url)) {
      url = "https://" + url;
    }
    urlMutation.mutate(url);
  };

  const handleCopy = (shortUrl) => {
    navigator.clipboard.writeText(`${window.location.origin}/${shortUrl}`);
    alert(`URL copied to clipboard: ${window.location.origin}/${shortUrl}`);
  };

  const handleDelete = (_id) => {
    deletMutation.mutate(_id);
  };

  const toggleStatusMutation = useMutation({
  mutationFn: async ({ id, isActive }) => {
    const res = await axios.patch(
      `${import.meta.env.VITE_URL_API}/status/${id}`,
      { isActive },
      { withCredentials: true }
    );
    return res.data;
  },
  onSuccess: () => {
    // ✅ Refresh the "shortUrls" query used across both View and Create pages
    queryClient.invalidateQueries({ queryKey: ["shortUrls"] });
  },
  onError: (error) => {
    console.log("Toggle error:", error.message);
  },
});

const handleToggleStatus = (_id, currentStatus, onSuccess) => {
  toggleStatusMutation.mutate(
    { id: _id, isActive: !currentStatus },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["shortUrls"] });
        onSuccess?.(); // call local state updater AFTER backend success
      },
      onError: (error) => {
        console.log("Toggle error:", error.message);
      },
    }
  );
};



  const handleShare = (shortUrl) => {
    const shareUrl = `${window.location.origin}/${shortUrl}`;
    if (navigator.share) {
      navigator
        .share({
          title: "Shortened URL",
          text: "Check out this shortened URL",
          url: shareUrl,
        })
        .catch(() => alert("Sharing failed or not supported."));
    } else {
      alert(`Share not supported. Here's the URL: ${shareUrl}`);
    }
  };

  const uData = Array.isArray(getUrl.data) ? getUrl.data : [];

  return (
    <main className="min-h-screen bg-white text-gray-900 py-16 px-6 md:px-12 lg:px-24 max-w-5xl mx-auto">
      <h1 className="text-4xl font-extrabold text-red-600 mb-12 text-center">
        Shorten Your URLs
      </h1>

      {/* Error message */}
      {isError && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-md mb-8 text-center font-semibold">
          {isError}
        </div>
      )}

      {/* URL Input Form */}
      <form onSubmit={handleSubmit} className="mb-12 max-w-3xl mx-auto">
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            name="url"
            ref={inputRef}
            placeholder="Enter a URL (e.g., google.com)"
            required
            className="flex-grow px-5 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-red-600 placeholder-gray-400"
          />
          <button
            type="submit"
            disabled={urlMutation.isPending}
            className="flex-shrink-0 inline-flex items-center justify-center bg-red-600 text-white px-8 py-3 rounded-full font-semibold shadow hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            {urlMutation.isPending ? "Shortening..." : "Shorten URL"}
          </button>
        </div>
      </form>

      {/* Recent URLs Header */}
      <div className="flex items-center justify-between px-2 py-2 text-gray-600 max-w-3xl mx-auto mb-4">
        <span className="font-semibold">Recent 5 URLs</span>
        <Link
          className="text-red-600 hover:text-red-700 font-medium"
          to="/view"
        >
          View all URLs
        </Link>
      </div>

      {/* URLs List */}
      <section className="max-w-3xl mx-auto">
        {getUrl.isLoading ? (
          <div className="flex justify-center items-center py-12 border border-gray-200 rounded-md">
            <Spinner />
          </div>
        ) : uData.length > 0 ? (
          <div className="space-y-4">
            {uData.slice(0, 5).map((item) => (
              <URLTable
                key={item._id}
                item={item}
                handleCopy={handleCopy}
                handleShare={handleShare}
                handleDelete={handleDelete}
                handleToggleStatus={handleToggleStatus}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-gray-500 border border-gray-200 rounded-md">
            No shortened URLs yet. Enter a URL above to get started.
          </div>
        )}
      </section>
    </main>
  );
}

const Spinner = () => (
  <div className="flex items-center justify-center gap-4">
    <div className="w-12 h-12 border-4 border-transparent border-t-red-600 rounded-full animate-spin"></div>
    <span className="text-red-600 font-semibold">Loading...</span>
  </div>
);
