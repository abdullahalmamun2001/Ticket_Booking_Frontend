import React from "react";

const ChooseUs = () => {
  return (
    <section
      className="
    p-8 rounded-2xl
    bg-base-100 text-base-content
    border border-primary/20
    shadow-md
  "
    >
      <h2 className="text-2xl font-semibold text-primary mb-4">
        Why Choose Us?
      </h2>

      <ul className="space-y-3">
        <li className="flex items-start gap-3">
          <span className="text-secondary text-lg">✔</span>
          <span className="text-base-content/70">Verified vendors only</span>
        </li>

        <li className="flex items-start gap-3">
          <span className="text-secondary text-lg">✔</span>
          <span className="text-base-content/70">Admin-approved tickets</span>
        </li>

        <li className="flex items-start gap-3">
          <span className="text-secondary text-lg">✔</span>
          <span className="text-base-content/70">Secure online payments</span>
        </li>

        <li className="flex items-start gap-3">
          <span className="text-secondary text-lg">✔</span>
          <span className="text-base-content/70">Fast and easy booking</span>
        </li>
      </ul>
    </section>
  );
};

export default ChooseUs;
