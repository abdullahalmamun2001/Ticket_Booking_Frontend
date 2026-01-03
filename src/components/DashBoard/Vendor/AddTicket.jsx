import React, { useContext, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { AuthContext } from "../../../context/AuthProvider";
import { useNavigate } from "react-router";

const AddTicket = () => {
  const { user } = useContext(AuthContext);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const navigate=useNavigate();

  const [perks, setPerks] = useState({
    ac: false,
    wifi: false,
    breakfast: false,
    tv: false,
  });

  const [ticketData, setTicketData] = useState({
    title: "",
    from: "",
    to: "",
    transportType: "",
    price: "",
    quantity: "",
    date: "",
    time: "",
  });

  const handleChange = (e) => {
    setTicketData({ ...ticketData, [e.target.name]: e.target.value });
  };

  const handlePerkChange = (e) => {
    setPerks({ ...perks, [e.target.name]: e.target.checked });
  };

  const uploadImage = async (imageFile) => {
    try {
      const formData = new FormData();
      formData.append("image", imageFile);

      const res = await fetch(
        `https://api.imgbb.com/1/upload?key=0ef452beda453c082cb0d572cb02e855`,
        { method: "POST", body: formData }
      );

      const data = await res.json();
      return data?.data?.url || "";
    } catch {
      toast.error("Image upload failed");
      return "";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("accessToken");
    if (!token) {
      toast.error("Unauthorized");
      return;
    }

    const imageFile = e.target.image.files[0];
    const imageUrl = imageFile ? await uploadImage(imageFile) : "";

    const selectedPerks = Object.keys(perks).filter((key) => perks[key]);

    const departureDateTime = new Date(
      `${ticketData.date}T${ticketData.time}`
    ).toISOString();

    const finalTicket = {
      title: ticketData.title,
      from: ticketData.from,
      to: ticketData.to,
      transportType: ticketData.transportType,
      price: Number(ticketData.price),
      quantity: Number(ticketData.quantity),
      perks: selectedPerks,
      image: imageUrl,
      vendorName: user.displayName,
      vendorEmail: user.email,
      status: "pending",
      departureDateTime,
    };

    try {
      const res = await fetch(`${backendUrl}/tickets`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(finalTicket),
      });

      if (!res.ok) throw new Error("Failed to add ticket");

      toast.success("Ticket submitted for admin approval!");
      navigate("/dashboard/vendor/profile")

      e.target.reset();
      setPerks({ ac: false, wifi: false, breakfast: false, tv: false });
      setTicketData({
        title: "",
        from: "",
        to: "",
        transportType: "",
        price: "",
        quantity: "",
        date: "",
        time: "",
      });
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
   <div className="max-w-3xl mx-auto mt-10 p-6 rounded-2xl shadow-lg bg-gradient-to-br from-[#B3E5E4] to-[#D0F0F2]">
  <Toaster />

  <h2 className="text-3xl font-bold mb-6 text-center text-primary">
    Add New Ticket
  </h2>

  <form onSubmit={handleSubmit} className="space-y-4">
    <input
      type="text"
      name="title"
      placeholder="Ticket Title"
      value={ticketData.title}
      onChange={handleChange}
      required
      className="w-full border border-primary p-3 rounded bg-[#E0F7F7] text-primary placeholder-primary"
    />

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <input
        type="text"
        name="from"
        placeholder="From Location"
        value={ticketData.from}
        onChange={handleChange}
        required
        className="border border-primary p-3 rounded bg-[#E0F7F7] text-primary placeholder-primary"
      />
      <input
        type="text"
        name="to"
        placeholder="To Location"
        value={ticketData.to}
        onChange={handleChange}
        required
        className="border border-primary p-3 rounded bg-[#E0F7F7] text-primary placeholder-primary"
      />
    </div>

    <input
      type="text"
      name="transportType"
      placeholder="Transport Type (Bus / Train / Plane)"
      value={ticketData.transportType}
      onChange={handleChange}
      required
      className="w-full border border-primary p-3 rounded bg-[#E0F7F7] text-primary placeholder-primary"
    />

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <input
        type="number"
        name="price"
        placeholder="Price Per Unit"
        value={ticketData.price}
        onChange={handleChange}
        required
        className="border border-primary p-3 rounded bg-[#E0F7F7] text-primary placeholder-primary"
      />
      <input
        type="number"
        name="quantity"
        placeholder="Ticket Quantity"
        value={ticketData.quantity}
        onChange={handleChange}
        required
        className="border border-primary p-3 rounded bg-[#E0F7F7] text-primary placeholder-primary"
      />
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <input
        type="date"
        name="date"
        value={ticketData.date}
        onChange={handleChange}
        required
        className="border border-primary p-3 rounded bg-[#E0F7F7] text-primary placeholder-primary"
      />
      <input
        type="time"
        name="time"
        value={ticketData.time}
        onChange={handleChange}
        required
        className="border border-primary p-3 rounded bg-[#E0F7F7] text-primary placeholder-primary"
      />
    </div>

    <div className="flex gap-4 flex-wrap">
      {Object.keys(perks).map((perk) => (
        <label key={perk} className="flex items-center gap-2">
          <input
            type="checkbox"
            name={perk}
            checked={perks[perk]}
            onChange={handlePerkChange}
            className="accent-secondary"
          />
          <span className="capitalize text-primary">{perk}</span>
        </label>
      ))}
    </div>

    <input
      type="file"
      name="image"
      accept="image/*"
      required
      className="w-full border border-primary p-3 rounded bg-[#E0F7F7] text-primary"
    />

    <input
      type="text"
      value={user?.displayName || ""}
      readOnly
      className="w-full border border-primary p-3 rounded bg-[#B3E5E4] text-primary"
    />

    <input
      type="email"
      value={user?.email || ""}
      readOnly
      className="w-full border border-primary p-3 rounded bg-[#B3E5E4] text-primary"
    />

    <button
      type="submit"
      className="w-full p-3 rounded font-semibold bg-primary text-white hover:bg-secondary transition-all duration-200"
    >
      Add Ticket
    </button>
  </form>
</div>

  );
};

export default AddTicket;
