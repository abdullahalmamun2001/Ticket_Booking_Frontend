import React from "react";

const AboutPage = () => {
  return (
    <div className="max-w-5xl mx-auto mt-10 p-6 space-y-10">
      
      {/* Hero Section */}
      <section className="text-center bg-gradient-to-r from-[#89A8B2] to-[#266352] text-white p-10 rounded-xl shadow-lg">
        <h1 className="text-4xl font-bold mb-4">About TicketBari</h1>
        <p className="text-lg max-w-2xl mx-auto">
          At TicketBari, we simplify your travel experience. From buses, trains, 
          to flights, we ensure you get your tickets seamlessly, quickly, and safely.
        </p>
      </section>

      {/* Mission Section */}
      <section className="bg-white p-8 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-primary">Our Mission</h2>
        <p className="text-gray-800">
          Our mission is to provide travelers with a reliable, fast, and user-friendly ticket booking experience. 
          We aim to connect passengers with trusted transport providers and make planning journeys effortless.
        </p>
      </section>

      {/* Services Section */}
      <section className="bg-gradient-to-br from-[#B3E5E4] to-[#D0F0F2] p-8 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-primary text-center">Our Services</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition text-gray-800">
            <h3 className="text-xl font-semibold mb-2">Bus Tickets</h3>
            <p>Book tickets for local and long-distance buses with just a few clicks.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition text-gray-800">
            <h3 className="text-xl font-semibold mb-2">Train Tickets</h3>
            <p>Secure your train tickets hassle-free and plan your journey ahead of time.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition text-gray-800">
            <h3 className="text-xl font-semibold mb-2">Flight Tickets</h3>
            <p>Book flights from trusted airlines at competitive prices with instant confirmation.</p>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="bg-white p-8 rounded-xl shadow-md text-gray-800">
        <h2 className="text-2xl font-bold mb-4 text-primary">Why Choose TicketBari?</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>Fast and secure ticket booking for multiple transport types.</li>
          <li>Reliable partners ensuring verified tickets and smooth travel.</li>
          <li>24/7 customer support for any queries or travel assistance.</li>
          <li>User-friendly interface for easy booking and management.</li>
          <li>Special discounts and promotions for loyal users.</li>
        </ul>
      </section>

      {/* Call to Action */}
      <section className="bg-gradient-to-r from-[#89A8B2] to-[#266352] text-white p-8 rounded-xl shadow-lg text-center">
        <h2 className="text-3xl font-bold mb-4">Start Your Journey Today!</h2>
        <p className="mb-6">Book your tickets with TicketBari and travel hassle-free.</p>
        <a
          href="/allTickets"
          className="bg-primary hover:bg-secondary px-6 py-3 rounded text-white font-semibold transition"
        >
          Browse Tickets
        </a>
      </section>
      
    </div>
  );
};

export default AboutPage;
