import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, LogOut, UserRound } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { isLoggedIn, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="fixed left-0 top-0 z-50 w-full bg-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">

        <Link to="/" className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 text-sm font-bold text-white">
            A
          </div>

          <span className="text-lg font-bold tracking-tight text-slate-800">
            Alumni<span className="text-indigo-600">Sphere</span>
          </span>
        </Link>

        <div className="hidden items-center gap-7 text-sm font-medium text-slate-500 md:flex">
          <Link
            to="/"
            className="transition hover:text-indigo-600"
          >
            Home
          </Link>

          <Link
            to="/mentorship"
            className="transition hover:text-indigo-600"
          >
            Mentorship
          </Link>

          <Link
            to="/jobs"
            className="transition hover:text-indigo-600"
          >
            Jobs & Internships
          </Link>

          <Link
            to="/events"
            className="transition hover:text-indigo-600"
          >
            Events
          </Link>

          <Link
            to="/networking"
            className="transition hover:text-indigo-600"
          >
            Networking
          </Link>
        </div>

        {!isLoggedIn ? (
          <div className="flex items-center gap-3">
            <Link
              to="/login"
              className="hidden text-sm font-semibold text-slate-600 transition hover:text-indigo-600 sm:block"
            >
              Login
            </Link>

            <Link
              to="/signup"
              className="flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-700"
            >
              Get Started
              <ArrowRight size={16} />
            </Link>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <Link
              to="/profile"
              className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-indigo-50 hover:text-indigo-600"
            >
              <UserRound size={16} />
              <span className="hidden sm:block">
                Profile
              </span>
            </Link>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 rounded-xl bg-slate-900 px-3 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              <LogOut size={16} />
              <span className="hidden sm:block">
                Logout
              </span>
            </button>
          </div>
        )}

      </div>
    </nav>
  );
};

export default Navbar;