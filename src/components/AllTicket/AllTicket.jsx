// import  { useEffect, useState } from "react";
// import { useNavigate } from "react-router";
// import toast, { Toaster } from "react-hot-toast";

// const AllTicket = () => {
//   const [tickets, setTickets] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();
//   const backendUrl = import.meta.env.VITE_BACKEND_URL;

//   const token = localStorage.getItem("accessToken");
//   // const navigate = useNavigate();
//   const [darkMode, setDarkMode] = useState(false);

//   useEffect(() => {
//     const storedDark = localStorage.getItem("darkMode");
//     setDarkMode(storedDark === "true"); // true if darkMode is enabled
//   }, []);
//   useEffect(() => {
//     const fetchTickets = async () => {
//       setLoading(true);
//       try {
//         const res = await fetch(`${backendUrl}/tickets?verificationStatus=approved`, {
//           headers: token
//             ? { Authorization: `Bearer ${token}` }
//             : {},
//         });

//         if (!res.ok) throw new Error("Failed to fetch tickets");

//         const data = await res.json();
//         setTickets(data);
//       } catch (err) {
//         console.error(err);
//         toast.error(err.message || "Error loading tickets");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchTickets();
//   }, [backendUrl, token]);

//   if (loading) {
//     return (
//       <div className="bg-green-300 flex  justify-center items-center h-screen text-lg font-semibold text-gray-600">
//         Loading tickets...
//       </div>
//     );
//   }

//   if (!tickets.length) {
//     return (
//       <div className="bg-green-300 flex justify-center items-center h-screen text-lg font-semibold text-gray-600">
//         No tickets available.
//       </div>
//     );
//   }

//   // return (
//   //   //  <div className="bg-base-100 dark:bg-gray-900  px-4 md:px-8 lg:px-16 py-8 space-y-8 min-h-screen">
//   //   //   <Toaster />

//   //   //   <h1 className="text-4xl font-extrabold text-center text-primary dark:text-secondary mb-8">
//   //   //     All Tickets
//   //   //   </h1>

//   //   //   <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
//   //   //     {tickets.map((ticket) => (
//   //   //       <div
//   //   //         key={ticket._id}
//   //   //         className="bg-base-100 dark:bg-gray-800 border border-primary/20 shadow-md rounded-2xl overflow-hidden transform hover:-translate-y-2 hover:shadow-xl transition duration-300 flex flex-col"
//   //   //       >
//   //   //         {/* Ticket Image */}
//   //   //         <img
//   //   //           src={ticket.image}
//   //   //           alt={ticket.title}
//   //   //           className="h-48 w-full object-cover"
//   //   //         />

//   //   //         {/* Ticket Content */}
//   //   //         <div className="p-4 flex flex-col flex-1 text-base-content dark:text-white">
//   //   //           <h2 className="text-xl font-semibold text-primary mb-2">
//   //   //             {ticket.title}
//   //   //           </h2>

//   //   //           <p className="mb-1 font-medium">
//   //   //             <span className="font-semibold text-secondary">Route:</span>{" "}
//   //   //             {ticket.fromLocation} → {ticket.toLocation}
//   //   //           </p>
//   //   //           <p className="mb-1">
//   //   //             <span className="font-semibold text-secondary">Transport:</span>{" "}
//   //   //             {ticket.transportType}
//   //   //           </p>
//   //   //           <p className="mb-1">
//   //   //             <span className="font-semibold text-secondary">Price:</span> ${ticket.price}
//   //   //           </p>
//   //   //           <p className="mb-1">
//   //   //             <span className="font-semibold text-secondary">Quantity:</span> {ticket.quantity}
//   //   //           </p>

//   //   //           {/* Perks */}
//   //   //           <div className="flex flex-wrap gap-2 my-2">
//   //   //             {ticket.perks?.map((perk, idx) => (
//   //   //               <span
//   //   //                 key={idx}
//   //   //                 className="bg-secondary/20 text-secondary text-xs font-semibold px-2 py-1 rounded-full"
//   //   //               >
//   //   //                 {perk}
//   //   //               </span>
//   //   //             ))}
//   //   //           </div>

//   //   //           <p className="text-sm text-base-content/70 dark:text-white/70 mb-3">
//   //   //             Departure: {new Date(ticket.departureDate).toLocaleString()}
//   //   //           </p>

//   //   //           {/* View Details Button */}
//   //   //           <button
//   //   //             onClick={() => navigate(`/allTickets/${ticket._id}`)}
//   //   //             className="mt-auto px-3 py-2 bg-primary text-white rounded-lg hover:bg-secondary transition-all duration-200"
//   //   //           >
//   //   //             View Details
//   //   //           </button>
//   //   //         </div>
//   //   //       </div>
//   //   //     ))}
//   //   //   </div>
//   //   // </div>
//   //    <div className="min-h-screen px-4 md:px-8 lg:px-16 py-8 bg-base-100 bg-gray-900">
//   //     <Toaster />

//   //     <h1 className="text-4xl font-extrabold text-center text-primary dark:text-secondary mb-8">
//   //       All Tickets
//   //     </h1>

//   //     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
//   //       {tickets.map((ticket) => (
//   //         <div
//   //           key={ticket._id}
//   //           className="
//   //             flex flex-col rounded-2xl overflow-hidden 
//   //             border border-primary/20 shadow-md 
//   //             bg-base-100 dark:bg-gray-800 
//   //             text-base-content dark:text-white
//   //             transform hover:-translate-y-2 hover:shadow-xl transition duration-300
//   //           "
//   //         >
//   //           {/* Image */}
//   //           <img
//   //             src={ticket.image}
//   //             alt={ticket.title}
//   //             className="h-48 w-full object-cover"
//   //           />

//   //           {/* Content */}
//   //           <div className="p-4 flex flex-col flex-1">
//   //             <h2 className="text-xl font-semibold text-primary mb-2 dark:text-secondary">
//   //               {ticket.title}
//   //             </h2>

//   //             <p className="mb-1 font-medium">
//   //               <span className="font-semibold text-secondary dark:text-primary">Route:</span>{" "}
//   //               {ticket.fromLocation} → {ticket.toLocation}
//   //             </p>
//   //             <p className="mb-1">
//   //               <span className="font-semibold text-secondary dark:text-primary">Transport:</span>{" "}
//   //               {ticket.transportType}
//   //             </p>
//   //             <p className="mb-1">
//   //               <span className="font-semibold text-secondary dark:text-primary">Price:</span> ${ticket.price}
//   //             </p>
//   //             <p className="mb-1">
//   //               <span className="font-semibold text-secondary dark:text-primary">Quantity:</span> {ticket.quantity}
//   //             </p>

//   //             {/* Perks */}
//   //             <div className="flex flex-wrap gap-2 my-2">
//   //               {ticket.perks?.map((perk, idx) => (
//   //                 <span
//   //                   key={idx}
//   //                   className="bg-secondary/20 dark:bg-primary/20 text-secondary dark:text-primary text-xs font-semibold px-2 py-1 rounded-full"
//   //                 >
//   //                   {perk}
//   //                 </span>
//   //               ))}
//   //             </div>

//   //             <p className="text-sm text-base-content/70 dark:text-white/70 mb-3">
//   //               Departure: {new Date(ticket.departureDate).toLocaleString()}
//   //             </p>

//   //             {/* Button */}
//   //             <button
//   //               onClick={() => navigate(`/allTickets/${ticket._id}`)}
//   //               className="mt-auto px-3 py-2 bg-primary dark:bg-secondary text-white rounded-lg hover:bg-secondary dark:hover:bg-primary transition-all duration-200"
//   //             >
//   //               View Details
//   //             </button>
//   //           </div>
//   //         </div>
//   //       ))}
//   //     </div>
//   //   </div>
//   // );
  
//   return(

//    <div
//       className={`min-h-screen px-4 md:px-8 lg:px-16 py-8 transition-colors duration-300`}
//       style={{
//         backgroundColor: darkMode ? "#1f2937" : "#f9fafb", // dark vs light
//         color: darkMode ? "#f9fafb" : "#1f2937",
//       }}
//     >
//       <Toaster />

//       <h1
//         className={`text-4xl font-extrabold text-center mb-8`}
//         style={{ color: darkMode ? "#00B7B5" : "#018790" }}
//       >
//         All Tickets
//       </h1>

//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
//         {tickets.map((ticket) => (
//           <div
//             key={ticket._id}
//             className={`flex flex-col rounded-2xl overflow-hidden border shadow-md transform hover:-translate-y-2 hover:shadow-xl transition duration-300`}
//             style={{
//               backgroundColor: darkMode ? "#111827" : "#ffffff",
//               borderColor: darkMode ? "#00B7B5" : "#018790",
//               color: darkMode ? "#f9fafb" : "#1f2937",
//             }}
//           >
//             {/* Image */}
//             <img
//               src={ticket.image}
//               alt={ticket.title}
//               className="h-48 w-full object-cover"
//             />

//             {/* Content */}
//             <div className="p-4 flex flex-col flex-1">
//               <h2
//                 className="text-xl font-semibold mb-2"
//                 style={{ color: darkMode ? "#00B7B5" : "#018790" }}
//               >
//                 {ticket.title}
//               </h2>

//               <p className="mb-1 font-medium">
//                 <span
//                   className="font-semibold"
//                   style={{ color: darkMode ? "#018790" : "#00B7B5" }}
//                 >
//                   Route:
//                 </span>{" "}
//                 {ticket.fromLocation} → {ticket.toLocation}
//               </p>
//               <p className="mb-1">
//                 <span
//                   className="font-semibold"
//                   style={{ color: darkMode ? "#018790" : "#00B7B5" }}
//                 >
//                   Transport:
//                 </span>{" "}
//                 {ticket.transportType}
//               </p>
//               <p className="mb-1">
//                 <span
//                   className="font-semibold"
//                   style={{ color: darkMode ? "#018790" : "#00B7B5" }}
//                 >
//                   Price:
//                 </span>{" "}
//                 ${ticket.price}
//               </p>
//               <p className="mb-1">
//                 <span
//                   className="font-semibold"
//                   style={{ color: darkMode ? "#018790" : "#00B7B5" }}
//                 >
//                   Quantity:
//                 </span>{" "}
//                 {ticket.quantity}
//               </p>

//               {/* Perks */}
//               <div className="flex flex-wrap gap-2 my-2">
//                 {ticket.perks?.map((perk, idx) => (
//                   <span
//                     key={idx}
//                     className="text-xs font-semibold px-2 py-1 rounded-full"
//                     style={{
//                       backgroundColor: darkMode ? "#01879033" : "#00B7B520",
//                       color: darkMode ? "#00B7B5" : "#018790",
//                     }}
//                   >
//                     {perk}
//                   </span>
//                 ))}
//               </div>

//               <p className="text-sm mb-3" style={{ color: darkMode ? "#d1d5db" : "#4b5563" }}>
//                 Departure: {new Date(ticket.departureDate).toLocaleString()}
//               </p>

//               {/* Button */}
//               <button
//                 onClick={() => navigate(`/allTickets/${ticket._id}`)}
//                 className="mt-auto px-3 py-2 rounded-lg font-semibold transition-all duration-200"
//                 style={{
//                   backgroundColor: darkMode ? "#00B7B5" : "#018790",
//                   color: "#fff",
//                 }}
//               >
//                 View Details
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default AllTicket;


import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const AllTicket = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const token = localStorage.getItem("accessToken");

  // Load dark mode preference from localStorage
  useEffect(() => {
    const storedDark = localStorage.getItem("darkMode");
    setDarkMode(storedDark === "true");
  }, []);

  // Fetch tickets from backend
  useEffect(() => {
    const fetchTickets = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${backendUrl}/tickets?verificationStatus=approved`, {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
        if (!res.ok) throw new Error("Failed to fetch tickets");
        const data = await res.json();
        setTickets(data);
      } catch (err) {
        console.error(err);
        toast.error(err.message || "Error loading tickets");
      } finally {
        setLoading(false);
      }
    };
    fetchTickets();
  }, [backendUrl, token]);

  // Loading state
  if (loading) {
    return (
      <div
        className="flex justify-center items-center h-screen text-lg font-semibold transition-colors duration-300"
        style={{
          backgroundColor: darkMode ? "#1f2937" : "#f9fafb",
          color: darkMode ? "#f9fafb" : "#1f2937",
        }}
      >
        Loading tickets...
      </div>
    );
  }

  // Empty state
  if (!tickets.length) {
    return (
      <div
        className="flex justify-center items-center h-screen text-lg font-semibold transition-colors duration-300"
        style={{
          backgroundColor: darkMode ? "#1f2937" : "#f9fafb",
          color: darkMode ? "#f9fafb" : "#1f2937",
        }}
      >
        No tickets available.
      </div>
    );
  }

  // Main content
  return (
    <div
      className="min-h-screen px-4 md:px-8 lg:px-16 py-8 transition-colors duration-300"
      style={{
        backgroundColor: darkMode ? "#1f2937" : "#f9fafb",
        color: darkMode ? "#f9fafb" : "#1f2937",
      }}
    >
      <Toaster />

      <h1
        className="text-4xl font-extrabold text-center mb-8"
        style={{ color: darkMode ? "#00B7B5" : "#018790" }}
      >
        All Tickets
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {tickets.map((ticket) => (
          <div
            key={ticket._id}
            className="flex flex-col rounded-2xl overflow-hidden border shadow-md transform hover:-translate-y-2 hover:shadow-xl transition duration-300"
            style={{
              backgroundColor: darkMode ? "#111827" : "#ffffff",
              borderColor: darkMode ? "#00B7B5" : "#018790",
              color: darkMode ? "#f9fafb" : "#1f2937",
            }}
          >
            {/* Ticket Image */}
            <img
              src={ticket.image}
              alt={ticket.title}
              className="h-48 w-full object-cover"
            />

            {/* Ticket Content */}
            <div className="p-4 flex flex-col flex-1">
              <h2
                className="text-xl font-semibold mb-2"
                style={{ color: darkMode ? "#00B7B5" : "#018790" }}
              >
                {ticket.title}
              </h2>

              <p className="mb-1 font-medium">
                <span
                  className="font-semibold"
                  style={{ color: darkMode ? "#018790" : "#00B7B5" }}
                >
                  Route:
                </span>{" "}
                {ticket.fromLocation} → {ticket.toLocation}
              </p>

              <p className="mb-1">
                <span
                  className="font-semibold"
                  style={{ color: darkMode ? "#018790" : "#00B7B5" }}
                >
                  Transport:
                </span>{" "}
                {ticket.transportType}
              </p>

              <p className="mb-1">
                <span
                  className="font-semibold"
                  style={{ color: darkMode ? "#018790" : "#00B7B5" }}
                >
                  Price:
                </span>{" "}
                ${ticket.price}
              </p>

              <p className="mb-1">
                <span
                  className="font-semibold"
                  style={{ color: darkMode ? "#018790" : "#00B7B5" }}
                >
                  Quantity:
                </span>{" "}
                {ticket.quantity}
              </p>

              {/* Ticket Perks */}
              <div className="flex flex-wrap gap-2 my-2">
                {ticket.perks?.map((perk, idx) => (
                  <span
                    key={idx}
                    className="text-xs font-semibold px-2 py-1 rounded-full"
                    style={{
                      backgroundColor: darkMode ? "#01879033" : "#00B7B520",
                      color: darkMode ? "#00B7B5" : "#018790",
                    }}
                  >
                    {perk}
                  </span>
                ))}
              </div>

              <p
                className="text-sm mb-3"
                style={{ color: darkMode ? "#d1d5db" : "#4b5563" }}
              >
                Departure: {new Date(ticket.departureDate).toLocaleString()}
              </p>

              {/* View Details Button */}
              <button
                onClick={() => navigate(`/allTickets/${ticket._id}`)}
                className="mt-auto px-3 py-2 rounded-lg font-semibold transition-all duration-200"
                style={{
                  backgroundColor: darkMode ? "#00B7B5" : "#018790",
                  color: "#fff",
                }}
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllTicket;
