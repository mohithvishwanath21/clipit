import { useState, useEffect, useContext } from "react";
import { Link, NavLink } from "react-router";
import {
  Code,
  User,
  LogOut,
  Menu,
  X,
  UserCircle,
  Link2,
  Eye,
  ChartSpline,
  Mail,
  LayoutDashboard,
  Scale,
  Grid,
  Layout,
  LinkIcon,
  Link2Icon,
  Link2Off,
  ChartBar,
} from "lucide-react";
import { FaLink } from "react-icons/fa";
import { AuthContext } from "../contexts/AuthContext";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isProfileOpen && !event.target.closest("[data-profile-menu]")) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isProfileOpen]);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleProfile = () => setIsProfileOpen(!isProfileOpen);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  const avatarURL = user?.avatar
    ? `http://localhost:3000${user.avatar}`
    : null;

  return (
    <>
      <header className="bg-white shadow sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <FaLink className="h-6 w-6 text-red-600" />
            <span className="text-3xl font-bold text-red-600">Clipit</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-6">
            {(user ? navMenu.slice(0, 4) : navMenu.slice(7)).map((item) => (
              <NavLink
                to={item.link}
                key={item.link}
                className={({ isActive }) =>
                  `relative font-medium transition-colors duration-200 ${
                    isActive
                      ? "text-red-600"
                      : "text-gray-700 hover:text-red-600"
                  } after:block after:absolute after:h-0.5 after:w-0 after:bg-red-600 after:transition-all after:duration-300 hover:after:w-full after:bottom-0 after:left-0`
                }
              >
                {item.name}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            {user ? (
              <div className="relative hidden md:flex" data-profile-menu>
                <button
                  onClick={toggleProfile}
                  className="flex items-center gap-3 bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-full transition-all duration-200 shadow-sm"
                  aria-expanded={isProfileOpen}
                  aria-haspopup="true"
                >
                  <div className="h-9 w-9 rounded-full bg-gray-200 overflow-hidden border-2 border-red-500">
                    {avatarURL ? (
                      <img
                        src={avatarURL}
                        alt={user.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <UserCircle className="h-9 w-9 text-gray-500" />
                    )}
                  </div>

                  <span className="text-sm font-semibold text-gray-800 hidden lg:inline-block">
                    {user.name.split(" ")[0]}
                  </span>

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-4 w-4 text-red-600 hidden lg:inline-block transform transition-transform duration-200 ${
                      isProfileOpen ? "rotate-180" : ""
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {isProfileOpen && (
                  <div className="absolute right-0 mt-12 w-64 bg-white border border-gray-200 rounded-lg shadow-2xl z-50 p-4 space-y-4">
                    <div className="bg-gray-50 p-3 rounded-md text-sm text-gray-800 shadow-inner">
                      <p className="font-semibold">{user.name}</p>
                      <p className="text-xs text-gray-500 truncate">
                        {user.email}
                      </p>
                    </div>
                    <div className="grid gap-2">
                      <Link to="/contact" onClick={() => setIsProfileOpen(false)} className="flex items-center gap-3 p-2 rounded-md hover:ring-1 hover:ring-red-500 transition-all">
                        <Mail className="h-4 w-4 text-red-600" />
                        <span className="text-sm font-medium text-gray-700">
                          Contact
                        </span>
                      </Link>
                      <Link to="/profile" onClick={() => setIsProfileOpen(false)} className="flex items-center gap-3 p-2 rounded-md hover:ring-1 hover:ring-red-500 transition-all">
                        <User className="h-4 w-4 text-red-600" />
                        <span className="text-sm font-medium text-gray-700">
                          Your Profile
                        </span>
                      </Link>

                      <button
                        onClick={() => {
                          setIsProfileOpen(false);
                          handleLogout();
                        }}
                        className="flex items-center gap-3 p-2 rounded-md hover:ring-1 hover:ring-red-500 transition-all text-sm font-medium text-gray-700"
                      >
                        <LogOut className="h-4 w-4 text-red-600" />
                        Sign out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <LoginSignup />
            )}

            <button
              onClick={toggleMenu}
              className="text-gray-600 hover:text-red-600 focus:outline-none md:hidden"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu and Overlay */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ${
          isMenuOpen ? "opacity-70" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsMenuOpen(false)}
      />

      <div
        className={`fixed top-0 right-0 h-full w-72 bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <div className="flex items-center space-x-2">
            <FaLink className="h-6 w-6 text-red-600" />
            <span className="text-xl font-bold text-gray-900">Clipit</span>
          </div>
          <button
            onClick={() => setIsMenuOpen(false)}
            className="text-gray-600 hover:text-red-600"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {user && (
          <div className="p-4 border-b">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 rounded-full bg-gray-200 overflow-hidden">
                {avatarURL ? (
                  <img
                    src={avatarURL}
                    alt={user.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <UserCircle className="h-10 w-10 text-gray-500" />
                )}
              </div>
              <div>
                <p className="font-medium text-gray-900">{user.name}</p>
                <p className="text-sm text-gray-500 truncate">{user.email}</p>
              </div>
            </div>
          </div>
        )}

        <nav className="p-4">
          <ul className="space-y-2">
            {(user ? navMenu.slice(0, 4) : navMenu.slice(7)).map((item) => (
              <li key={item.link}>
                <NavLink
                  to={item.link}
                  className={({ isActive }) =>
                    `flex items-center py-2 text-sm font-medium ${
                      isActive
                        ? "text-red-600"
                        : "text-gray-700 hover:text-red-600"
                    }`
                  }
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.icon}
                  {item.name}
                </NavLink>
              </li>
            ))}
          </ul>

          {user ? (
            <div className="mt-6 pt-6 border-t space-y-4">
              {navMenu.slice(4, 7).map((item) => (
                <NavLink
                  key={item.link}
                  to={item.link}
                  className={({ isActive }) =>
                    `flex items-center py-2 text-sm font-medium ${
                      isActive
                        ? "text-red-600"
                        : "text-gray-700 hover:text-red-600"
                    }`
                  }
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.icon}
                  {item.name}
                </NavLink>
              ))}
              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  handleLogout();
                }}
                className="flex items-center w-full text-sm text-gray-700 hover:text-red-600"
              >
                <LogOut className="mr-3 h-5 w-5" />
                Sign out
              </button>
            </div>
          ) : (
            <div className="mt-6 pt-6 border-t space-y-4">
              <Link
                to="/login"
                className="block py-2 px-4 text-center text-gray-700 border border-gray-300 rounded-md hover:bg-gray-100"
                onClick={() => setIsMenuOpen(false)}
              >
                Log in
              </Link>
              <Link
                to="/signup"
                className="block py-2 px-4 text-center bg-red-600 text-white rounded-md hover:bg-red-700"
                onClick={() => setIsMenuOpen(false)}
              >
                Sign up
              </Link>
            </div>
          )}
        </nav>
      </div>
    </>
  );
}

export const LoginSignup = () => (
  <>
    <Link
      to="/login"
      className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-100 hidden md:block"
    >
      Log in
    </Link>
    <Link
      to="/signup"
      className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 hidden md:block"
    >
      Sign up
    </Link>
  </>
);

const navMenu = [
  { name: "Home", link: "/", icon: <Layout className="mr-3 h-5 w-5" /> },
  { name: "Clipit", link: "/create", icon: <FaLink className="mr-3 h-5 w-5" /> },
  { name: "Manage URLs", link: "/view", icon: <Eye className="mr-3 h-5 w-5" /> },
  { name: "Analytics", link: "/analytics", icon: <ChartBar className="mr-3 h-5 w-5" /> },
  { name: "Contact", link: "/contact", icon: <Mail className="mr-3 h-5 w-5" /> },
  { name: "Profile", link: "/profile", icon: <User className="mr-3 h-5 w-5" /> },
  { name: "Home", link: "/", icon: <User className="mr-3 h-5 w-5" /> },
  { name: "About", link: "/about", icon: <User className="mr-3 h-5 w-5" /> },
  { name: "Contact", link: "/contact", icon: <Mail className="mr-3 h-5 w-5" /> },
  { name: "FAQ", link: "/#", icon: <Scale className="mr-3 h-5 w-5" /> },
];
