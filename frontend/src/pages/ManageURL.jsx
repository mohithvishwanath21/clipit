import { Link } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteUrl, getUrlData } from "../api/url";
import URLTable from "../components/ui/URLTable";
import axios from "axios";
import { useEffect } from "react";

export default function ManageURL() {
  const queryClient = useQueryClient();

  const getUrl = useQuery({
    queryKey: ["shortUrls"],
    queryFn: getUrlData,
  });
useEffect(() => {
  getUrl.refetch(); // ⬅ force latest data from server
}, []);

  const deletMutation = useMutation({
    mutationFn: (_id) => deleteUrl(_id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["shortUrls"] });
    },
    onError: (error) => {
      console.log("Error: ", error.message);
    },
  });

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
      queryClient.invalidateQueries({ queryKey: ["shortUrls"] });
    },
    onError: (error) => {
      console.log("Toggle error:", error.message);
    },
  });

  const handleDelete = (_id) => {
    deletMutation.mutate(_id);
  };

  const handleToggleStatus = (_id, currentStatus) => {
    toggleStatusMutation.mutate({ id: _id, isActive: !currentStatus });
  };

  const handleCopy = (shortUrl) => {
    navigator.clipboard.writeText(`${window.location.origin}/${shortUrl}`);
    alert(`URL copied to clipboard: ${window.location.origin}/${shortUrl}`);
  };

  const handleShare = (shortUrl) => {
    const shareUrl = `${window.location.origin}/${shortUrl}`;
    navigator.share({
      title: "Shortened URL",
      text: "Check out this shortened URL",
      url: shareUrl,
    });
  };

  const uData = Array.isArray(getUrl.data) ? getUrl.data : [];

  return (
    <main className="min-h-screen bg-white text-gray-900 py-16 px-6 md:px-12 lg:px-24 max-w-5xl mx-auto">
      <h1 className="text-4xl font-extrabold text-red-600 mb-12 text-center">
        Manage Your URLs
      </h1>

      {/* URLs Section */}
      <div className="flex items-center justify-between px-2 py-2 text-gray-600 max-w-3xl mx-auto mb-4">
        <span className="font-semibold">My Shortened URLs</span>
        <Link
          className="text-red-600 hover:text-red-700 font-medium"
          to="/create"
        >
          Create New URL
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
            {uData.map((item) => (
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
