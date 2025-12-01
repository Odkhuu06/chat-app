export default function DarkToggle() {
  const toggle = () => {
    const cur = document.documentElement.getAttribute("data-theme");
    const next = cur === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("theme", next === "dark" ? "dark" : "light");
  };

  return (
    <button onClick={toggle} className="px-3 py-1 border rounded">
      Toggle Theme
    </button>
  );
}
