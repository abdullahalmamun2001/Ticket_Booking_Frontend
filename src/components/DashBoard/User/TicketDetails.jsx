import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { AuthContext } from "../../../context/AuthProvider";
import Loading from "../../Components/Loading";

const TicketDetails = () => {
  const { id } = useParams();
  const { user, loading } = useContext(AuthContext);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [ticket, setTicket] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [timeLeft, setTimeLeft] = useState("");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetch(`${backendUrl}/tickets/${id}`)
      .then((res) => res.json())
      .then((data) => setTicket(data))
      .catch(() => toast.error("Failed to load ticket"));
  }, [id, backendUrl]);

  useEffect(() => {
    if (!ticket) return;

    const interval = setInterval(() => {
      const now = new Date();
      const departure = new Date(ticket.departureDateTime);
      const diff = departure - now;

      if (diff <= 0) {
        setTimeLeft("Departed");
        clearInterval(interval);
      } else {
        const totalSeconds = Math.floor(diff / 1000);
        const d = Math.floor(totalSeconds / 86400);
        const h = Math.floor((totalSeconds % 86400) / 3600);
        const m = Math.floor((totalSeconds % 3600) / 60);
        const s = totalSeconds % 60;
        setTimeLeft(`${d}d ${h}h ${m}m ${s}s`);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [ticket]);

  const handleBooking = async () => {
    if (!user) return toast.error("Please login first");

    if (quantity < 1 || quantity > ticket.quantity) {
      return toast.error("Invalid ticket quantity");
    }
    if (loading) {
      return (
        <>
          <Loading></Loading>
        </>
      );
    }

    const token = localStorage.getItem("accessToken");

    const bookingData = {
      ticketId: ticket._id,
      ticketTitle: ticket.title,
      ticketImage: ticket.image,
      vendorEmail: ticket.vendorEmail,
      quantity,
      totalPrice: quantity * ticket.price,
      status: "pending",
    };

    try {
      const res = await fetch(`${backendUrl}/bookings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(bookingData),
      });

      if (!res.ok) throw new Error("Booking failed");

      toast.success("Booking successful!");
      setShowModal(false);
      setQuantity(1);
    } catch (err) {
      toast.error(err.message);
    }
  };

  if (!ticket)
    return <p className="text-center mt-20 h-full">Loading ticket...</p>;

  const departurePassed = new Date(ticket.departureDateTime) < new Date();
  const isDisabled = departurePassed || ticket.quantity === 0;

  return (
    <div className="max-w-5xl mx-auto mt-10">
      <Toaster />

      {/* Ticket Image */}
      {ticket.image && (
        <div className="relative">
          <img
            src={ticket.image}
            alt={ticket.title}
            className="w-full h-80 object-cover rounded-xl shadow-lg"
          />
          <div className="absolute inset-0 bg-black/40 rounded-xl flex items-center justify-center">
            <h2 className="absolute rounded-full top-2 right-2 text-white text-2xl font-bold p-2 bg-black rounded">
              {ticket.title}
            </h2>
          </div>
        </div>
      )}

      {/* Ticket Info Card */}
      <div className="bg-base-100 dark:bg-gray-800 border border-primary/20 shadow-md rounded-2xl p-6 mt-6 space-y-3 text-base-content dark:text-white">
        <p>
          <b className="text-primary">From:</b> {ticket.from} →{" "}
          <b className="text-primary">To:</b> {ticket.to}
        </p>
        <p>
          <b className="text-primary">Transport:</b> {ticket.transportType}
        </p>
        <p>
          <b className="text-primary">Price:</b> ${ticket.price} / ticket
        </p>
        <p>
          <b className="text-primary">Available Tickets:</b> {ticket.quantity}
        </p>
        <p>
          <b className="text-primary">Departure:</b>{" "}
          {new Date(ticket.departureDateTime).toLocaleString()}
        </p>
        <p>
          <b className="text-primary">Countdown:</b>{" "}
          <span className="text-secondary font-semibold">{timeLeft}</span>
        </p>

        <button
          disabled={isDisabled}
          onClick={() => setShowModal(true)}
          className={`mt-4 px-6 py-3 rounded-lg text-white font-semibold transition ${
            isDisabled
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-primary hover:bg-secondary"
          }`}
        >
          Book Now
        </button>

        {isDisabled && (
          <p className="text-sm text-red-500 mt-2">
            Booking unavailable for this ticket
          </p>
        )}
      </div>

      {/* Booking Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-base-100 dark:bg-gray-900 border border-primary/20 rounded-2xl p-6 w-96 shadow-lg text-base-content dark:text-white">
            <h3 className="text-xl font-semibold text-primary mb-4">
              Book Ticket
            </h3>

            <label className="block mb-2 font-medium">Ticket Quantity</label>
            <input
              type="number"
              min="1"
              max={ticket.quantity}
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="border border-primary/30 dark:border-secondary p-2 w-full rounded mb-4 bg-base-100 dark:bg-gray-800 text-base-content dark:text-white"
            />

            <p className="mb-4">
              <b>Total Price:</b> ${quantity * ticket.price}
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleBooking}
                className="px-4 py-2 bg-primary text-white rounded hover:bg-secondary transition"
              >
                Confirm Booking
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TicketDetails;
