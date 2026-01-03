import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const ManageTickets = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const token = localStorage.getItem("accessToken");
  useEffect(() => {
    if (!token) return;

    const fetchTickets = async () => {
      try {
        const res = await fetch(`${backendUrl}/admin/tickets`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
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
  }, [backendUrl, token]);
  const updateStatus = async (id, status) => {
    try {
      const res = await fetch(`${backendUrl}/admin/tickets/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Update failed");
      setTickets((prev) =>
        prev.map((t) =>
          t._id === id ? { ...t, verificationStatus: status } : t
        )
      );

      toast.success(data.message);
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Failed to update ticket");
    }
  };

  if (loading) {
    return <p className="text-center mt-6">Loading tickets...</p>;
  }

  if (!tickets.length) {
    return <p className="text-center mt-6">No tickets found.</p>;
  }

  return (
   <div className="p-6">
  <Toaster />
  <h2 className="text-2xl font-bold mb-4 text-primary">Manage Tickets</h2>

  <div className="overflow-x-auto">
    <table className="table-auto w-full border border-primary rounded-lg">
      <thead>
        <tr className="bg-primary/20">
          <th className="border px-3 py-2 text-left text-primary">Title</th>
          <th className="border px-3 py-2 text-left text-primary">Vendor Email</th>
          <th className="border px-3 py-2 text-left text-primary">Price</th>
          <th className="border px-3 py-2 text-left text-primary">Status</th>
          <th className="border px-3 py-2 text-left text-primary">Actions</th>
        </tr>
      </thead>

      <tbody>
        {tickets.map((ticket) => (
          <tr
            key={ticket._id}
            className="hover:bg-primary/10 transition-colors"
          >
            <td className="border px-3 py-2">{ticket.title}</td>
            <td className="border px-3 py-2">{ticket.vendorEmail}</td>
            <td className="border px-3 py-2">${ticket.price}</td>
            <td
              className={`border px-3 py-2 font-semibold capitalize ${
                ticket.verificationStatus === "approved"
                  ? "text-primary"
                  : ticket.verificationStatus === "rejected"
                  ? "text-red-600"
                  : "text-secondary"
              }`}
            >
              {ticket.verificationStatus}
            </td>
            <td className="border px-3 py-2 flex gap-2">
              <button
                disabled={ticket.verificationStatus === "approved"}
                onClick={() => updateStatus(ticket._id, "approved")}
                className={`px-3 py-1 rounded text-white font-semibold transition-all duration-200 ${
                  ticket.verificationStatus === "approved"
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-primary hover:bg-secondary"
                }`}
              >
                Approve
              </button>

              <button
                disabled={ticket.verificationStatus === "rejected"}
                onClick={() => updateStatus(ticket._id, "rejected")}
                className={`px-3 py-1 rounded text-white font-semibold transition-all duration-200 ${
                  ticket.verificationStatus === "rejected"
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-red-600 hover:bg-red-700"
                }`}
              >
                Reject
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>

  );
};

export default ManageTickets;
