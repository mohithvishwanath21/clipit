import { useState, useContext, useRef } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useMutation } from "@tanstack/react-query";
import { changePassword, updateProfile } from "../api/user";

export default function Profile() {
  const { user, setUser } = useContext(AuthContext);
  const [isError, setIsError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [avatarPreview, setAvatarPreview] = useState(user.avatar);
  const fileInputRef = useRef(null);

  const { mutate: changePasswordMutate, isPending: isChangingPassword } = useMutation({
    mutationFn: () => changePassword(formData),
    onSuccess: () => {
      setSuccessMessage("Password changed successfully");
      setTimeout(() => setSuccessMessage(""), 8000);
      setFormData({ currentPassword: "", newPassword: "", confirmPassword: "" });
    },
    onError: (error) => {
      setIsError(error?.response?.data?.error || "Failed to change password");
      setTimeout(() => setIsError(""), 8000);
    },
  });

  const { mutate: uploadAvatarMutate, isPending: isUploadingAvatar } = useMutation({
    mutationFn: (file) => {
      const form = new FormData();
      form.append("avatar", file);
      return updateProfile(form);
    },
    onSuccess: (data) => {
      setSuccessMessage("Avatar updated successfully");
      setAvatarPreview(data.avatar);
      if (setUser) setUser((prev) => ({ ...prev, avatar: data.avatar }));
      setTimeout(() => setSuccessMessage(""), 8000);
    },
    onError: (error) => {
      setIsError(error?.response?.data?.error || "Failed to upload avatar");
      setTimeout(() => setIsError(""), 8000);
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { currentPassword, newPassword, confirmPassword } = formData;
    if (!currentPassword || !newPassword || !confirmPassword) {
      setIsError("Please fill in all password fields.");
      setTimeout(() => setIsError(""), 8000);
      return;
    }
    if (newPassword !== confirmPassword) {
      setIsError("New password and confirmation do not match.");
      setTimeout(() => setIsError(""), 8000);
      return;
    }
    changePasswordMutate(formData);
  };

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      uploadAvatarMutate(file);
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 flex flex-col items-center py-20 px-4">
      <h1 className="text-5xl font-semibold text-red-600 mb-12 tracking-wide">
        Account Dashboard
      </h1>

      <div className="max-w-5xl w-full bg-white shadow-xl rounded-2xl grid grid-cols-1 md:grid-cols-3 gap-12 p-10 border border-red-100">
        {/* Left panel with avatar and basic info */}
        <div className="flex flex-col items-center border-r border-red-200 pr-8">
          <div
            onClick={handleAvatarClick}
            className="relative rounded-full overflow-hidden w-40 h-40 cursor-pointer shadow-lg ring-2 ring-red-600 ring-offset-2 transition-transform hover:scale-105"
          >
            <img
  src={
    avatarPreview?.startsWith("http")
      ? avatarPreview
      : `${import.meta.env.VITE_BASE_API}${avatarPreview}`
  }
  alt="User avatar"
  className="w-full h-full object-cover"
/>

            <div className="absolute inset-0 bg-red-600 bg-opacity-30 opacity-0 hover:opacity-100 flex items-center justify-center text-white font-medium text-lg transition-opacity">
              Change
            </div>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              ref={fileInputRef}
              onChange={handleAvatarChange}
            />
          </div>
          <h2 className="mt-8 text-3xl font-bold text-gray-900">{user.name}</h2>
          <p className="mt-2 text-gray-600">{user.email}</p>
        </div>

        {/* Right panel with forms */}
        <div className="md:col-span-2 space-y-10">
          {successMessage && (
            <div
              className={`p-4 rounded-md shadow-sm border ${
                successMessage === "Avatar updated successfully"
                  ? "bg-green-100 text-green-700 border-green-300"
                  : "bg-red-100 text-red-700 border-red-300"
              }`}
            >
              {successMessage}
            </div>
          )}
          {isError && (
            <div className="bg-red-50 text-red-800 p-4 rounded-md shadow-sm border border-red-400">
              {isError}
            </div>
          )}

          {/* Personal Info - Display only */}
          <section className="bg-red-50 rounded-lg p-8 shadow-inner border border-red-200">
            <h3 className="text-xl font-semibold text-red-600 mb-6 border-b border-red-300 pb-2">
              Personal Information
            </h3>
            <div className="grid grid-cols-2 gap-8 text-gray-700">
              <div>
                <label className="block font-medium mb-1">Full Name</label>
                <div className="p-3 bg-white rounded border border-gray-300">{user.name}</div>
              </div>
              <div>
                <label className="block font-medium mb-1">Email Address</label>
                <div className="p-3 bg-white rounded border border-gray-300">{user.email}</div>
              </div>
            </div>
          </section>

          {/* Password Change */}
          <section className="bg-white rounded-lg p-8 shadow-lg border border-red-200">
            <h3 className="text-xl font-semibold text-red-600 mb-6 border-b border-red-300 pb-2">
              Update Password
            </h3>

            <form onSubmit={handleSubmit} className="space-y-6 max-w-md">
              <div>
                <label htmlFor="currentPassword" className="block font-medium text-gray-700 mb-2">
                  Current Password
                </label>
                <input
                  type="password"
                  id="currentPassword"
                  name="currentPassword"
                  value={formData.currentPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-red-600 transition"
                  required
                />
              </div>

              <div>
                <label htmlFor="newPassword" className="block font-medium text-gray-700 mb-2">
                  New Password
                </label>
                <input
                  type="password"
                  id="newPassword"
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-red-600 transition"
                  required
                />
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block font-medium text-gray-700 mb-2">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-red-600 transition"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isChangingPassword}
                className={`w-full py-3 rounded-md font-semibold text-white ${
                  isChangingPassword ? "bg-red-300 cursor-not-allowed" : "bg-red-600 hover:bg-red-700"
                } transition`}
              >
                {isChangingPassword ? "Updating..." : "Change Password"}
              </button>
            </form>
          </section>
        </div>
      </div>
    </div>
  );
}
