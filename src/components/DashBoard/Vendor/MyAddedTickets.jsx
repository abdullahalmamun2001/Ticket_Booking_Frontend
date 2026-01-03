// import React, { useEffect, useState, useContext } from "react";
// import { AuthContext } from "../../../context/AuthProvider";
// import toast, { Toaster } from "react-hot-toast";

// const MyAddedTickets = () => {
//   const { user } = useContext(AuthContext);
//   const [tickets, setTickets] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedTicket, setSelectedTicket] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
 

//   const backendUrl = import.meta.env.VITE_BACKEND_URL;
//   const token = localStorage.getItem("accessToken");

//   useEffect(() => {
//     if (!user || !token) return;

//     const fetchTickets = async () => {
//       try {
//         const res = await fetch(`${backendUrl}/vendor/tickets`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         if (!res.ok) throw new Error("Failed to fetch tickets");

//         const data = await res.json();
//         setTickets(data);
//       } catch (err) {
//         console.error(err);
//         toast.error("Failed to load tickets");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchTickets();
//   }, [user, backendUrl, token]);

//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this ticket?")) return;

//     try {
//       const res = await fetch(`${backendUrl}/tickets/${id}`, {
//         method: "DELETE",
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       if (!res.ok) throw new Error("Delete failed");

//       setTickets((prev) => prev.filter((t) => t._id !== id));
//       toast.success("Ticket deleted successfully");
//     } catch (err) {
//       console.error(err);
//       toast.error("Delete failed");
//     }
//   };

//   const handleUpdate = async (e) => {
//     e.preventDefault();

//     try {
//       const res = await fetch(`${backendUrl}/tickets/${selectedTicket._id}`, {
//         method: "PATCH",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(selectedTicket),
//       });

//       if (!res.ok) throw new Error("Update failed");

//       setTickets((prev) =>
//         prev.map((t) => (t._id === selectedTicket._id ? selectedTicket : t))
//       );

//       toast.success("Ticket updated successfully");
//       setIsModalOpen(false);
//     } catch (err) {
//       console.error(err);
//       toast.error("Update failed");
//     }
//   };

//   if (loading) return <p className="text-center mt-10">Loading tickets...</p>;

//   return (
//    <div className="p-6">
//   <Toaster />
//   <h2 className="text-2xl font-bold mb-6 text-primary">My Added Tickets</h2>

//   {tickets.length === 0 ? (
//     <p className="text-secondary text-center">No tickets added yet.</p>
//   ) : (
//     <div className="grid md:grid-cols-3 gap-6">
//       {tickets.map((ticket) => {
//         const isRejected = ticket.verificationStatus === "rejected";

//         return (
//           <div
//             key={ticket._id}
//             className="shadow p-4 rounded-xl border border-primary bg-gradient-to-br from-[#B3E5E4] to-[#D0F0F2]"
//           >
//             <img
//               src={ticket.image}
//               alt={ticket.title}
//               className="w-full h-40 object-cover rounded"
//             />

//             <h3 className="font-semibold mt-2 text-primary">{ticket.title}</h3>
//             <p className="text-secondary">{ticket.from} → {ticket.to}</p>
//             <p className="text-secondary">Price: ${ticket.price}</p>
//             <p className="text-secondary">Qty: {ticket.quantity}</p>

//             <p className="mt-1">
//               Status:{" "}
//               <span
//                 className={`font-semibold ${
//                   ticket.verificationStatus === "approved"
//                     ? "text-primary"
//                     : ticket.verificationStatus === "pending"
//                     ? "text-secondary"
//                     : "text-red-600"
//                 }`}
//               >
//                 {ticket.verificationStatus}
//               </span>
//             </p>

//             <div className="flex gap-2 mt-4">
//               <button
//                 disabled={isRejected}
//                 onClick={() => {
//                   setSelectedTicket(ticket);
//                   setIsModalOpen(true);
//                 }}
//                 className={`px-3 py-1 rounded text-white font-semibold transition-all duration-200 ${
//                   isRejected
//                     ? "bg-gray-400 cursor-not-allowed"
//                     : "bg-primary hover:bg-secondary"
//                 }`}
//               >
//                 Update
//               </button>

//               <button
//                 disabled={isRejected}
//                 onClick={() => handleDelete(ticket._id)}
//                 className={`px-3 py-1 rounded text-white font-semibold transition-all duration-200 ${
//                   isRejected
//                     ? "bg-gray-400 cursor-not-allowed"
//                     : "bg-red-600 hover:bg-red-700"
//                 }`}
//               >
//                 Delete
//               </button>
//             </div>
//           </div>
//         );
//       })}
//     </div>
//   )}

//   {isModalOpen && selectedTicket && (
//     <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
//       <div className="bg-white p-6 rounded w-full max-w-md shadow-lg">
//         <h3 className="text-xl font-bold mb-4 text-primary">Update Ticket</h3>
//         <form onSubmit={handleUpdate} className="space-y-3">
//           <input
//             type="text"
//             value={selectedTicket.title}
//             onChange={(e) =>
//               setSelectedTicket({ ...selectedTicket, title: e.target.value })
//             }
//             className="w-full border p-2 rounded"
//             placeholder="Title"
//             required
//           />
//           <input
//             type="number"
//             value={selectedTicket.price}
//             onChange={(e) =>
//               setSelectedTicket({ ...selectedTicket, price: e.target.value })
//             }
//             className="w-full border p-2 rounded"
//             placeholder="Price"
//             required
//           />
//           <input
//             type="number"
//             value={selectedTicket.quantity}
//             onChange={(e) =>
//               setSelectedTicket({ ...selectedTicket, quantity: e.target.value })
//             }
//             className="w-full border p-2 rounded"
//             placeholder="Quantity"
//             required
//           />
//           <div className="flex justify-end gap-2">
//             <button
//               type="button"
//               onClick={() => setIsModalOpen(false)}
//               className="px-3 py-1 bg-gray-400 text-white rounded"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className="px-3 py-1 bg-primary hover:bg-secondary text-white rounded"
//             >
//               Save
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   )}
// </div>

//   );
// };

// export default MyAddedTickets;
import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../../context/AuthProvider";
import toast, { Toaster } from "react-hot-toast";
import Loading from "../../Components/Loading";

const MyAddedTickets = () => {
  const { user } = useContext(AuthContext);
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const token = localStorage.getItem("accessToken");

  // Fetch tickets
  useEffect(() => {
    if (!user || !token) return;

    const fetchTickets = async () => {
      try {
        const res = await fetch(`${backendUrl}/vendor/tickets`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("Failed to fetch tickets");

        const data = await res.json();
        setTickets(data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load tickets");
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, [user, backendUrl, token]);

  // Delete ticket
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this ticket?")) return;

    try {
      const res = await fetch(`${backendUrl}/tickets/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Delete failed");

      setTickets((prev) => prev.filter((t) => t._id !== id));
      toast.success("Ticket deleted successfully");
    } catch (err) {
      console.error(err);
      toast.error("Delete failed");
    }
  };

  // Update ticket
  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${backendUrl}/tickets/${selectedTicket._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(selectedTicket),
      });

      if (!res.ok) throw new Error("Update failed");

      const updatedTicket = await res.json();

      setTickets((prev) =>
        prev.map((t) => (t._id === updatedTicket._id ? updatedTicket : t))
      );

      toast.success("Ticket updated successfully");
      setIsModalOpen(false);
    } catch (err) {
      console.error(err);
      toast.error("Update failed");
    }
  };

  if (loading) return <Loading></Loading>

  return (
    <div className="p-6">
      <Toaster />
      <h2 className="text-2xl font-bold mb-6 text-primary">My Added Tickets</h2>

      {tickets.length === 0 ? (
        <p className="text-secondary text-center">No tickets added yet.</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {tickets.map((ticket) => {
            const isRejected = ticket.verificationStatus === "rejected";

            return (
              <div
                key={ticket._id}
                className="shadow p-4 rounded-xl border border-primary bg-gradient-to-br from-[#B3E5E4] to-[#D0F0F2]"
              >
                <img
                  src={ticket.image}
                  alt={ticket.title}
                  className="w-full h-40 object-cover rounded"
                />

                <h3 className="font-semibold mt-2 text-primary">{ticket.title}</h3>
                <p className="text-secondary">{ticket.from} → {ticket.to}</p>
                <p className="text-secondary">Price: ${ticket.price}</p>
                <p className="text-secondary">Qty: {ticket.quantity}</p>

                <p className="mt-1">
                  Status:{" "}
                  <span
                    className={`font-semibold ${
                      ticket.verificationStatus === "approved"
                        ? "text-primary"
                        : ticket.verificationStatus === "pending"
                        ? "text-secondary"
                        : "text-red-600"
                    }`}
                  >
                    {ticket.verificationStatus}
                  </span>
                </p>

                <div className="flex gap-2 mt-4">
                  <button
                    disabled={isRejected}
                    onClick={() => {
                      setSelectedTicket(ticket);
                      setIsModalOpen(true);
                    }}
                    className={`px-3 py-1 rounded text-white font-semibold transition-all duration-200 ${
                      isRejected
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-primary hover:bg-secondary"
                    }`}
                  >
                    Update
                  </button>

                  <button
                    disabled={isRejected}
                    onClick={() => handleDelete(ticket._id)}
                    className={`px-3 py-1 rounded text-white font-semibold transition-all duration-200 ${
                      isRejected
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-red-600 hover:bg-red-700"
                    }`}
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Modal */}
      {isModalOpen && selectedTicket && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded w-full max-w-md shadow-lg">
            <h3 className="text-xl font-bold mb-4 text-primary">Update Ticket</h3>
            <form onSubmit={handleUpdate} className="space-y-3">
              <input
                type="text"
                value={selectedTicket.title}
                onChange={(e) =>
                  setSelectedTicket({ ...selectedTicket, title: e.target.value })
                }
                className="w-full border p-2 rounded"
                placeholder="Title"
                required
              />
              <input
                type="number"
                value={selectedTicket.price}
                onChange={(e) =>
                  setSelectedTicket({ ...selectedTicket, price: e.target.value })
                }
                className="w-full border p-2 rounded"
                placeholder="Price"
                required
              />
              <input
                type="number"
                value={selectedTicket.quantity}
                onChange={(e) =>
                  setSelectedTicket({ ...selectedTicket, quantity: e.target.value })
                }
                className="w-full border p-2 rounded"
                placeholder="Quantity"
                required
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-3 py-1 bg-gray-400 text-white rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-3 py-1 bg-primary hover:bg-secondary text-white rounded"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyAddedTickets;
