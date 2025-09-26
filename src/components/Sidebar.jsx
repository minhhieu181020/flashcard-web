import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";

export default function Sidebar({ children }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="app-layout">
      {/* Nút toggle 3 gạch */}
      <button
        onClick={() => setOpen(!open)}
        className="menu-toggle-btn fixed top-3 left-3 z-50 p-2 bg-[#0b1437] text-white rounded-md hover:bg-[#1a1d3a]"
      >
        ☰
      </button>

      {/* Overlay mờ khi sidebar mở */}
      {open && (
        <div
          className="overlay fixed inset-0 bg-black bg-opacity-40 z-40"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar trượt vào */}
      <div
        className={`sidebar fixed top-0 left-0 h-full w-64 bg-[#0b1437] text-white shadow-lg z-50 transform transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        <div className="p-4 font-bold text-lg border-b border-gray-600">
          Sidebar
        </div>
        <nav className="flex flex-col p-4 space-y-3">
          <Link
            to="/"
            className="hover:text-blue-400"
            onClick={() => setOpen(false)}
          >
            🏠 Home
          </Link>
          <Link
            to="/createFlashcard"
            className="hover:text-blue-400"
            onClick={() => setOpen(false)}
          >
            ➕ Create Flashcard
          </Link>
          <Link
            to="/studies"
            className="hover:text-blue-400"
            onClick={() => setOpen(false)}
          >
            📚 My Studies
          </Link>
        </nav>
      </div>

      {/* Nội dung chính */}
      <div className="main-content flex-1 ml-0 md:ml-64 bg-[#1a1d3a] text-white p-6 transition-all duration-300">
        {children}
      </div>
    </div>
  );
}
