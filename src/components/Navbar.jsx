import { useState, useEffect, useContext } from "react";
import { Menu, X, NotebookPen,  BookOpen, User } from "lucide-react";
import noteContext from "../context/notes/noteContext";
import { NavLink, Link, useLocation, useNavigate } from "react-router-dom";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { clearNotes } = useContext(noteContext);

  let navigate = useNavigate();
  const navItems = [
    // { name: "Home", icon: <Home size={18} />, path: "/" },
    { name: "Notes", icon: <BookOpen size={18} />, path: "/Notes" },
    // { name: "Favorites", icon: <Star size={18} />, path: "/Favorites" },
    { name: "Profile", icon: <User size={18} />, path: "/Profile" },
  ];

  let location = useLocation();

  useEffect(() => {
    console.log(location.search);
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  }, []);

  const handleLogout = () => {
    clearNotes();

    localStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <nav className="bg-black text-white shadow-lg border-b border-zinc-800">
      <div className="max-w-7xl mx-auto px-5">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer">
            <NotebookPen className="text-yellow-400" size={28} />
            <h1 className="text-2xl font-bold tracking-wide">
              i<span className="text-yellow-400">Notebook</span>
            </h1>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item, index) => (
              <NavLink
                key={index}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-2 transition duration-300 ${
                    isActive
                      ? "text-yellow-400 font-semibold"
                      : "hover:text-yellow-400"
                  }`
                }
              >
                {item.icon}
                {item.name}
              </NavLink>
            ))}
          </div>

          {/* Add Note Button (Desktop only) */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              to="/addNote"
              className="bg-yellow-400 text-black px-5 py-2 rounded-xl font-semibold hover:scale-105 transition duration-300"
            >
              + Add Note
            </Link>
            {localStorage.getItem("token") ? (
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded-lg cursor-pointer"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                className="bg-yellow-400 text-black px-5 py-2 rounded-xl font-semibold hover:scale-105 transition duration-300"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-white focus:outline-none cursor-pointer" onClick={() => setOpen(!open)}>
            {open ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {open && (
          <div className="md:hidden pb-5 pt-3 flex flex-col gap-4 animate-fadeIn border-t border-zinc-800 mt-2">
            {navItems.map((item, index) => (
              <NavLink
                key={index}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-2 py-2 transition duration-300 ${
                    isActive
                      ? "text-yellow-400 font-semibold"
                      : "hover:text-yellow-400"
                  }`
                }
                onClick={() => setOpen(false)}
              >
                {item.icon}
                {item.name}
              </NavLink>
            ))}

            <Link
              to="/addNote"
              className="bg-yellow-400 text-black py-3 rounded-xl font-semibold mt-2 text-center block"
              onClick={() => setOpen(false)}
            >
              + Add Note
            </Link>

            {localStorage.getItem("token") ? (
              <button
                onClick={() => {
                  handleLogout();
                  setOpen(false);
                }}
                className="bg-red-500 text-white py-3 rounded-xl font-semibold text-center w-full cursor-pointer"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                className="bg-yellow-400 text-black py-3 rounded-xl font-semibold mt-2 text-center block"
                onClick={() => setOpen(false)}
              >
                Login
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
