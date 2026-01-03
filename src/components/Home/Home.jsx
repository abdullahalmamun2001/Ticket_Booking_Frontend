import  { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";
import PopularRoute from "../Components/PopularRoute";
import ChooseUs from "../Components/ChooseUs";

const Home = () => {
  const { user } = useContext(AuthContext);

  const [advertisedTickets, setAdvertisedTickets] = useState([]);
  const [latestTickets, setLatestTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const backendUrl=import.meta.env.VITE_BACKEND_URL
      try {
        const adRes = await fetch(
          `${backendUrl}/tickets?advertised=true`
        );
        const adData = await adRes.json();
        setAdvertisedTickets(adData.slice(0, 6));

        const latestRes = await fetch(
          `${backendUrl}/tickets`
        );
        const latestData = await latestRes.json();

        const sorted = latestData
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 8);

        setLatestTickets(sorted);
      } catch (err) {
        console.error("Home page fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const TicketCard = ({ ticket }) => (
    <div
  className="
    flex flex-col rounded-2xl overflow-hidden
    bg-base-100 text-base-content
    shadow-md hover:shadow-xl transition
    border border-primary/20
  "
>
  {/* Image */}
  <div className="relative">
    <img
      src={ticket.image}
      alt={ticket.title}
      className="h-44 w-full object-cover"
    />

    {/* Price Badge */}
    <span
      className="
        absolute top-3 right-3
        bg-primary text-white
        text-sm font-semibold
        px-3 py-1 rounded-full
      "
    >
      ${ticket.price}
    </span>
  </div>

  {/* Content */}
  <div className="p-4 flex flex-col gap-2 flex-grow">

    <h3 className="text-lg font-semibold text-primary">
      {ticket.title}
    </h3>

    <div className="text-sm text-base-content/70 space-y-1">
      <p>
        <span className="font-medium">Quantity:</span> {ticket.quantity}
      </p>
      <p>
        <span className="font-medium">Transport:</span> {ticket.transportType}
      </p>
      <p className="line-clamp-2">
        <span className="font-medium">Perks:</span>{" "}
        {ticket.perks
          ? Array.isArray(ticket.perks)
            ? ticket.perks.join(", ")
            : Object.values(ticket.perks).join(", ")
          : "None"}
      </p>
    </div>

    {/* Button */}
    <Link
      to={`/allTickets/${ticket._id}`}
      className="
        mt-auto text-center py-2 rounded-lg font-medium
        bg-primary text-white
        hover:bg-secondary transition
      "
    >
      See Details
    </Link>
  </div>
</div>

  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="space-y-16 px-4 md:px-10 py-8 bg-white-400">
      <section className="relative h-[350px] rounded-xl overflow-hidden bg-gradient-to-r from-blue-600 to-teal-500 flex items-center justify-center text-white">
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold">
            Book Your Tickets Easily
          </h1>
          <p className="text-lg md:text-xl">
            Trusted vendors • Secure booking • Best prices
          </p>

          <Link
            to={user ? "/allTickets" : "/login"}
            className="inline-block bg-white text-blue-600 px-6 py-3 rounded font-semibold hover:bg-gray-100"
          >
            Browse Tickets
          </Link>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-6">
          Advertisement Tickets
        </h2>

        {advertisedTickets.length === 0 ? (
          <p>No advertised tickets available.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {advertisedTickets.map((ticket) => (
              <TicketCard key={ticket._id} ticket={ticket} />
            ))}
          </div>
        )}
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-6">
          Latest Tickets
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {latestTickets.map((ticket) => (
            <TicketCard key={ticket._id} ticket={ticket} />
          ))}
        </div>
      </section>

     <PopularRoute></PopularRoute>
      <ChooseUs></ChooseUs>
    </div>
  );
};

export default Home;
