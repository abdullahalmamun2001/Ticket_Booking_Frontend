import { Link } from "react-router";
import { FaFacebook, FaCcStripe } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-primary text-white dark:bg-gray-900 dark:text-gray-300 pt-12 pb-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 px-6">

        {/* Logo & Description */}
        <div>
          <h2 className="text-2xl font-bold text-white">TicketBari</h2>
          <p className="mt-3 text-sm text-white/80">
            Book bus, train, launch & flight tickets easily.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/" className="hover:text-secondary transition-colors">Home</Link>
            </li>
            <li>
              <Link to="/all-tickets" className="hover:text-secondary transition-colors">All Tickets</Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-secondary transition-colors">Contact Us</Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-secondary transition-colors">About</Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Contact Info</h3>
          <ul className="space-y-2 text-sm">
            <li>Email: support@ticketbari.com</li>
            <li>Phone: +880 1234-567890</li>
            <li className="flex items-center gap-2">
              <FaFacebook className="text-secondary" /> Facebook Page
            </li>
          </ul>
        </div>

        {/* Payment Methods */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Payment Methods</h3>
          <div className="flex items-center gap-3 text-3xl text-white">
            <FaCcStripe className="text-secondary" />
          </div>
          <p className="text-sm mt-2 text-white/80">Secure payments powered by Stripe</p>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-primary/40 mt-10 pt-4 text-center text-sm text-white/70">
        © 2025 TicketBari. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
