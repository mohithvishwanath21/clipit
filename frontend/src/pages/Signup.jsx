import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const AUTH_API = import.meta.env.VITE_AUTH_API;

const Signup = () => {
  const navigate = useNavigate();
  const { fetchUser, user, loading } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    if (!loading && user) {
      navigate("/create");
    }
  }, [user, loading, navigate]);

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      await axios.post(`${AUTH_API}/signup`, formData, {
        withCredentials: true,
      });
      await fetchUser();
    } catch (err) {
      setIsError(err.response?.data?.error || "Something went wrong");
      setTimeout(() => {
        setIsError("");
      }, 10000);
    } finally {
      setIsLoading(false);
    }
  };

  if (loading)
    return (
      <div className="flex-col gap-4 w-full flex items-center justify-center min-h-screen">
        <div className="w-20 h-20 border-4 border-transparent text-red-600 text-4xl animate-spin flex items-center justify-center border-t-red-600 rounded-full">
          <div className="w-16 h-16 border-4 border-transparent text-red-400 text-2xl animate-spin flex items-center justify-center border-t-red-400 rounded-full"></div>
        </div>
      </div>
    );

  return (
    <main className="min-h-screen bg-white text-gray-900 py-16 px-6 md:px-12 lg:px-24 max-w-3xl mx-auto">
      <h1 className="text-4xl font-extrabold text-red-600 mb-10 text-center">
        Create an Account
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-semibold text-gray-700 mb-2"
          >
            Full Name
          </label>
          <input
            id="name"
            type="text"
            value={formData.name}
            onChange={(e) =>
              setFormData({ ...formData, name: e.target.value })
            }
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-red-600 transition"
            placeholder="John Doe"
            required
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-semibold text-gray-700 mb-2"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-red-600 transition"
            placeholder="you@example.com"
            required
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-semibold text-gray-700 mb-2"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-red-600 transition"
            placeholder="Choose a password with 4 or more characters."
            required
            minLength={4}
          />
          <p className="mt-1 text-xs text-gray-500">
            
          </p>
        </div>

        {isError && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
            {isError}
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3 bg-red-600 text-white rounded-full hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          {isLoading ? "Creating account..." : "Sign Up"}
        </button>
      </form>

      <p className="mt-8 text-center text-gray-700 text-sm">
        Already have an account?{" "}
        <Link
          to="/login"
          className="text-red-600 font-semibold hover:underline"
        >
          Login
        </Link>
      </p>
    </main>
  );
};

export default Signup;
