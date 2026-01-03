import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../../context/AuthProvider";
import toast, { Toaster } from "react-hot-toast";

const MyBookings = () => {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    if (!user) return;

    const token = localStorage.getItem("accessToken");
    if (!token) {
      toast.error("Unauthorized");
      return;
    }

    fetch(`${backendUrl}/bookings/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setBookings(data);
        setLoading(false);
      })
      .catch(() => {
        toast.error("Failed to load bookings");
        setLoading(false);
      });
  }, [user, backendUrl]);

  const getCountdown = (date) => {
    const diff = new Date(date) - new Date();
    if (diff <= 0) return "Departed";

    const s = Math.floor(diff / 1000);
    const d = Math.floor(s / 86400);
    const h = Math.floor((s % 86400) / 3600);
    const m = Math.floor((s % 3600) / 60);
    return `${d}d ${h}h ${m}m`;
  };

  const handlePayNow = async (booking) => {
    const token = localStorage.getItem("accessToken");
    if (!token) return toast.error("Unauthorized");

    try {
      const res = await fetch(`${backendUrl}/bookings/pay/${booking._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Payment failed");

      setBookings((prev) =>
        prev.map((b) =>
          b._id === booking._id ? { ...b, status: "paid" } : b
        )
      );

      toast.success("Payment successful! Booking is now PAID.");
    } catch (err) {
      toast.error(err.message);
    }
  };

 if (loading) {
  return (
    <div
      className="
        min-h-screen flex flex-col items-center justify-center
        bg-[#F0FBFA] dark:bg-[#0B2423]
        text-[#018790] dark:text-[#00B7B5]
        transition-colors duration-300
      "
    >
      {/* Spinner */}
      <div
        className="
          w-10 h-10 mb-4
          border-4 border-[#018790]/30
          border-t-[#018790]
          dark:border-[#00B7B5]/30
          dark:border-t-[#00B7B5]
          rounded-full animate-spin
        "
      />

      {/* Text */}
      <p className="text-lg font-semibold">
        Loading...
      </p>
    </div>
  );
}


  if (bookings.length === 0)
    return <p className="text-center mt-10">No bookings found</p>;

  return (
    // <div className="p-6">
    //   <Toaster />
    //   <h2 className="text-2xl font-bold mb-6">My Booked Tickets</h2>

    //   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    //     {bookings.map((b) => {
    //       const departed = new Date(b.departureDateTime) < new Date();
    //       const showPay = b.status === "accepted" && !departed;

    //       return (
    //         <div key={b._id} className="border rounded shadow p-4 bg-white">
    //           {b.ticketImage && (
    //             <img
    //               src={b.ticketImage}
    //               alt={b.ticketTitle}
    //               className="h-40 w-full object-cover rounded mb-3"
    //             />
    //           )}

    //           <h3 className="font-semibold text-lg">{b.ticketTitle}</h3>
    //           <p className="text-sm">
    //             {b.from} → {b.to}
    //           </p>

    //           <p className="mt-1">
    //             <b>Departure:</b>{" "}
    //             {new Date(b.departureDateTime).toLocaleString()}
    //           </p>

    //           {b.status !== "rejected" && (
    //             <p className="mt-1">
    //               <b>Countdown:</b> {getCountdown(b.departureDateTime)}
    //             </p>
    //           )}

    //           <p className="mt-1">
    //             <b>Quantity:</b> {b.quantity}
    //           </p>
    //           <p>
    //             <b>Total:</b> ${b.totalPrice}
    //           </p>

    //           <span
    //             className={`inline-block mt-2 px-3 py-1 text-white rounded text-sm ${
    //               b.status === "pending"
    //                 ? "bg-yellow-500"
    //                 : b.status === "accepted"
    //                 ? "bg-green-600"
    //                 : b.status === "paid"
    //                 ? "bg-blue-600"
    //                 : "bg-red-600"
    //             }`}
    //           >
    //             {b.status.toUpperCase()}
    //           </span>

    //           {showPay && (
    //             <button
    //               className="mt-3 w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
    //               onClick={() => handlePayNow(b)}
    //             >
    //               Pay Now
    //             </button>
    //           )}
    //         </div>
    //       );
    //     })}
    //   </div>
    // </div>
    <div className="p-6 
  bg-[#F0FBFA] dark:bg-[#0B2423] 
  text-[#1f2937] dark:text-[#f9fafb] 
  min-h-screen transition-colors duration-300"
>
  <Toaster />

  <h2 className="text-2xl font-bold mb-6 text-[#018790] dark:text-[#00B7B5]">
    My Booked Tickets
  </h2>

  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {bookings.map((b) => {
      const departed = new Date(b.departureDateTime) < new Date();
      const showPay = b.status === "accepted" && !departed;

      return (
        <div
          key={b._id}
          className="
            border rounded-xl shadow p-4
            bg-white dark:bg-[#111827]
            border-[#018790]/30 dark:border-[#00B7B5]/40
            transition-colors duration-300
          "
        >
          {b.ticketImage && (
            <img
              src={b.ticketImage}
              alt={b.ticketTitle}
              className="h-40 w-full object-cover rounded mb-3"
            />
          )}

          <h3 className="font-semibold text-lg text-[#018790] dark:text-[#00B7B5]">
            {b.ticketTitle}
          </h3>

          <p className="text-sm opacity-80">
            {b.from} → {b.to}
          </p>

          <p className="mt-1">
            <b className="text-[#018790] dark:text-[#00B7B5]">Departure:</b>{" "}
            {new Date(b.departureDateTime).toLocaleString()}
          </p>

          {b.status !== "rejected" && (
            <p className="mt-1">
              <b className="text-[#018790] dark:text-[#00B7B5]">Countdown:</b>{" "}
              {getCountdown(b.departureDateTime)}
            </p>
          )}

          <p className="mt-1">
            <b className="text-[#018790] dark:text-[#00B7B5]">Quantity:</b>{" "}
            {b.quantity}
          </p>

          <p>
            <b className="text-[#018790] dark:text-[#00B7B5]">Total:</b>{" "}
            ${b.totalPrice}
          </p>

          {/* Status Badge */}
          <span
            className={`inline-block mt-2 px-3 py-1 text-white rounded-full text-sm
              ${
                b.status === "pending"
                  ? "bg-yellow-500"
                  : b.status === "accepted"
                  ? "bg-[#018790]"
                  : b.status === "paid"
                  ? "bg-[#00B7B5]"
                  : "bg-red-600"
              }
            `}
          >
            {b.status.toUpperCase()}
          </span>

          {/* Pay Button */}
          {showPay && (
            <button
              className="
                mt-3 w-full py-2 rounded-lg font-semibold text-white
                bg-[#018790] hover:bg-[#00B7B5]
                transition-colors duration-200
              "
              onClick={() => handlePayNow(b)}
            >
              Pay Now
            </button>
          )}
        </div>
      );
    })}
  </div>
</div>

  );
};

export default MyBookings;
