// import { useState, useEffect } from "react";

// const ThemeToggle = () => {
//   const [darkMode, setDarkMode] = useState(
//     localStorage.getItem("darkMode") === "true"
//   );

//   useEffect(() => {
//     if (darkMode) {
//       document.body.style.backgroundColor = "#1f2937"; 
//       document.body.style.color = "#f9fafb"; 
//     } else {
//       document.body.style.backgroundColor = "#f9fafb";
//       document.body.style.color = "#1f2937"; 
//     }
//     localStorage.setItem("darkMode", darkMode);
//   }, [darkMode]);

//   return (
//     <button
//       onClick={() => setDarkMode(!darkMode)}
//       style={{
//         padding: "6px 12px",
//         borderRadius: "6px",
//         cursor: "pointer",
//         backgroundColor: darkMode ? "#374151" : "#e5e7eb",
//         color: darkMode ? "#fbbf24" : "#1f2937",
//         border: "none",
//       }}
//     >
//       {darkMode ? "Light Mode" : "Dark Mode"}
//     </button>
//   );
// };

// export default ThemeToggle;
import { useState, useEffect } from "react";

const ThemeToggle = () => {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  );

  useEffect(() => {
    const html = document.documentElement;

    if (darkMode) {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }

    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className={`px-4 py-2 rounded-md font-semibold transition-colors
        ${darkMode ? "bg-gray-700 text-yellow-400" : "bg-gray-200 text-gray-800"}
      `}
    >
      {darkMode ? "Light Mode" : "Dark Mode"}
    </button>
  );
};

export default ThemeToggle;

// import { useState, useEffect, useMemo } from "react";

// const ThemeToggle = () => {
//   const [darkMode, setDarkMode] = useState(
//     localStorage.getItem("darkMode") === "true"
//   );

//   const toggleDarkMode = () => {
//     setDarkMode((prev) => {
//       const newMode = !prev;
//       localStorage.setItem("darkMode", newMode);
//       const html = document.documentElement;
//       if (newMode) html.classList.add("dark");
//       else html.classList.remove("dark");
//       return newMode;
//     });
//   };
// // const stableIds = useMemo(() => tickets.map(t => t._id), [tickets]);
//   useEffect(() => {
//     // Apply dark mode on first load
//     const storedDark = localStorage.getItem("darkMode") === "true";
//     const html = document.documentElement;
//     if (storedDark) html.classList.add("dark");
//     else html.classList.remove("dark");
//     setDarkMode(storedDark);
//   }, []);

//   return (
//     <button
//       onClick={toggleDarkMode}
//       className={`px-4 py-2 rounded-md font-semibold transition-colors
//         ${darkMode ? "bg-gray-700 text-yellow-400" : "bg-gray-200 text-gray-800"}
//       `}
//     >
//       {darkMode ? "Light Mode" : "Dark Mode"}
//     </button>
//   );
// };

// export default ThemeToggle;

