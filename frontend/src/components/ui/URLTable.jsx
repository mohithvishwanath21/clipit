import {
  ExternalLink,
  Copy,
  Share2,
  Trash2,
  QrCode,
  X,
  BarChart3,
  Download,
} from "lucide-react";
import { Link } from "react-router-dom";
import { QRCodeCanvas } from "qrcode.react";
import { useState, useEffect } from "react";

const URLTable = ({ item, handleCopy, handleShare, handleDelete, handleToggleStatus }) => {
  const [localActive, setLocalActive] = useState(item.isActive);
  useEffect(() => {
  setLocalActive(item.isActive);
}, [item.isActive]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const shortUrl = `${import.meta.env.VITE_BASE_API}/redirect/${item.shortId}`;



  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const downloadQRCode = (canvasId) => {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const pngUrl = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    const downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = `qr-code-${item.shortId}.png`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  return (
    <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-md transition hover:shadow-lg duration-200">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-100 to-red-50 px-5 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <QrCode size={18} className="text-red-600" />
          <span className="font-semibold text-red-600 text-sm">New Shortened Link</span>
        </div>
        <div className="text-xs text-gray-500">
          {item.clicksCount} {item.clicksCount === 1 ? "click" : "clicks"}
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-col md:flex-row flex-wrap justify-between items-start md:items-center gap-4 px-5 py-5">
        {/* Left: URL Info */}
        <div className="flex-1 space-y-3 min-w-0">
          <div>
            <label className="text-xs text-gray-400">Original URL</label>
            <div className="flex items-center gap-2 max-w-full sm:max-w-[300px]">
              <a
                href={item.originalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-gray-800 hover:text-red-600 underline underline-offset-2 truncate"
                title={item.originalUrl}
              >
                {item.originalUrl}
              </a>
            </div>
          </div>

          <div>
            <label className="text-xs text-gray-400">Short URL</label>
            <div className="flex items-center gap-2 max-w-full sm:max-w-[300px]">
              <a
                href={shortUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-red-600 hover:underline break-all"
              >
                {shortUrl}
              </a>
              
            </div>
          </div>

          <div className="flex items-center gap-2 mt-2">
            <span className="text-xs text-gray-500">Status:</span>
            <span
              className={`text-sm font-semibold ${
                localActive ? "text-green-600" : "text-red-600"
              }`}
            >
              {localActive ? "Active" : "Inactive"}
            </span>
            <label className="inline-flex relative items-center cursor-pointer ml-2">
              <input
  type="checkbox"
  className="sr-only peer"
  checked={localActive}
  onChange={() => {
  const newStatus = !localActive;

  handleToggleStatus(item._id, localActive, () => {
    setLocalActive(newStatus); // only update local UI if backend was successful
  });
}}

/>
              <div className="w-10 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:bg-red-600 relative after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-5"></div>
            </label>
          </div>
        </div>

        {/* Right: QR + Actions */}
        <div className="flex flex-col items-center justify-between gap-3 min-w-[120px]">
          <QRCodeCanvas
            id={`qr-canvas-${item.shortId}`}
            value={shortUrl}
            size={70}
            className="rounded-md border border-gray-100 shadow cursor-pointer"
            onClick={handleOpenModal}
          />

          <button
            onClick={() => downloadQRCode(`qr-canvas-${item.shortId}`)}
            className="flex items-center gap-1 bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md text-xs font-semibold transition"
            title="Download QR Code"
          >
            <Download size={14} />
            Download QR
          </button>

          <div className="flex gap-3 mt-2">
            <button
              onClick={() => handleCopy(item.shortId)}
              className="hover:text-blue-700 text-blue-500 transition"
              title="Copy"
            >
              <Copy size={18} />
            </button>
            <button
              onClick={() => handleShare(item.shortId)}
              className="hover:text-green-700 text-green-500 transition"
              title="Share"
            >
              <Share2 size={18} />
            </button>
            <Link
              to={`/analytics/${item._id}`}
              className="hover:text-indigo-700 text-indigo-500 transition"
              title="Analytics"
            >
              <BarChart3 size={18} />
            </Link>
            <button
              onClick={() => handleDelete(item._id)}
              className="hover:text-red-700 text-red-500 transition"
              title="Delete"
            >
              <Trash2 size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      <QRCodeModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        shortUrl={shortUrl}
        downloadQRCode={() => downloadQRCode(`qr-canvas-${item.shortId}`)}
      />
    </div>
  );
};

export default URLTable;

const QRCodeModal = ({ isOpen, onClose, shortUrl, downloadQRCode }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-lg p-6 shadow-lg relative border border-gray-200">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-700"
          aria-label="Close modal"
        >
          <X size={20} />
        </button>
        <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">
          QR Code Preview
        </h2>
        <div className="flex justify-center mb-4">
          <QRCodeCanvas id="modal-qr-canvas" value={shortUrl} size={200} />
        </div>
        <p className="text-sm text-center text-red-600 break-all">{shortUrl}</p>
        <div className="mt-6 flex justify-center gap-4">
          <button
            onClick={downloadQRCode}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-full text-sm font-medium transition"
          >
            Download QR
          </button>
          <button
            onClick={onClose}
            className="bg-red-100 hover:bg-red-200 text-red-600 px-6 py-2 rounded-full text-sm font-medium transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
