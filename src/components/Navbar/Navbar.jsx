import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router";
import { useAuth } from "../../context/AuthProvider.jsx";
import { FaBus, FaBars, FaTimes } from "react-icons/fa";
import ThemeToggle from "../ThemeToggole/ThemeToggole.jsx";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };

  const links = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
     
      {user && (
        <>
          <li>
            <NavLink to="/allTickets">All Tickets</NavLink>
          </li>
          <li>
            <NavLink to="/dashboard">Dashboard</NavLink>
          </li>
        </>
        
      )}
      <li>
        <NavLink to="/contract">Contract Us</NavLink>
        
      </li>
      <li><NavLink to="/about">About</NavLink></li>
    </>
  );

  return (
    <div
  className="
    navbar px-4 py-2 flex items-center justify-between
    shadow-md relative
    bg-[#018790] dark:bg-[#0B2423]
    text-white
    transition-colors duration-300 sticky
  "
>
  {/* Left */}
  <div className="flex items-center gap-2">
    <FaBus size={24} className="text-[#00B7B5]" />
    <NavLink to="/" className="font-bold text-xl">
      TicketBari
    </NavLink>
  </div>

  {/* Center Links */}
  <ul className="hidden lg:flex gap-6 font-medium">
    {links}
  </ul>

  {/* Right */}
  <div className="flex items-center gap-4">
    <ThemeToggle />

    {user ? (
      <div className="flex items-center gap-2">
        {user.photoURL ? (
          <img
            src={user.photoURL}
            alt="User"
            className="
              w-10 h-10 rounded-full
              border-2 border-[#00B7B5]
            "
          />
        ) : (
          <div
            className="
              w-10 h-10 rounded-full
              bg-[#00B7B5]
              flex items-center justify-center
              text-[#0B2423] font-bold
            "
          >
            {user.email[0].toUpperCase()}
          </div>
        )}

        <span className="hidden md:block font-semibold">
          {user.displayName || user.email}
        </span>

        <button
          onClick={handleLogout}
          className="
            px-3 py-1 rounded
            bg-[#00B7B5] text-[#0B2423]
            hover:opacity-90 transition
          "
        >
          Logout
        </button>
      </div>
    ) : (
      <div className="hidden lg:flex gap-2">
        <NavLink
          to="/login"
          className="
            px-3 py-1 rounded border
            border-white
            hover:bg-white hover:text-[#018790]
            transition
          "
        >
          Login
        </NavLink>
        <NavLink
          to="/register"
          className="
            px-3 py-1 rounded
            bg-[#00B7B5] text-[#0B2423]
            hover:opacity-90 transition
          "
        >
          Register
        </NavLink>
      </div>
    )}

    {/* Mobile Menu Button */}
    <div className="lg:hidden">
      <button onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </button>
    </div>
  </div>

  {/* Mobile Menu */}
  {menuOpen && (
    <ul
      className="
        absolute top-full left-0 w-full
        flex flex-col gap-4 p-4
        bg-[#018790] dark:bg-[#0B2423]
        border-t border-[#00B7B5]/40
        lg:hidden
      "
    >
      {links}

      {!user && (
        <>
          <NavLink to="/login">Login</NavLink>
          <NavLink to="/register">Register</NavLink>
        </>
      )}
    </ul>
  )}
</div>

  );
};

export default Navbar;
