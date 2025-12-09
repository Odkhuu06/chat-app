"use client";
import { useEffect } from "react";

export default function DarkToggle() {
  // Page load дээр localStorage-с theme уншиж тохируулна
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  const toggle = () => {
    const cur = document.documentElement.getAttribute("data-theme");
    const next = cur === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
  };

  return (
    <button
      onClick={toggle}
      className="px-3 py-1 border rounded bg-gray-200 dark:bg-gray-800 dark:text-white"
    >
      Toggle Theme
    </button>
  );
}
