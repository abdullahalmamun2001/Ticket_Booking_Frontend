import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../../context/AuthProvider";
import toast, { Toaster } from "react-hot-toast";
import Loading from "../../Components/Loading";

const TransactionHistory = () => {
  const { user,loading:userLoading } = useContext(AuthContext);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    if (!user || !token) return;

    const fetchTransactions = async () => {
      try {
        const res = await fetch(`${backendUrl}/transactions/user`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) throw new Error("Failed to fetch transactions");

        const data = await res.json();
        setTransactions(data);
      } catch (err) {
        console.error(err);
        toast.error(err.message || "Could not load transactions");
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [user, token]);

  if (loading && userLoading) {
  return (
   <div><Loading></Loading></div>
  );
}

  if (!transactions.length===0) {
  return (
    <div
      className="
        min-h-[60vh] flex flex-col items-center justify-center
        bg-[#F0FBFA] dark:bg-[#0B2423]
        text-[#018790] dark:text-[#00B7B5]
        transition-colors duration-300
      "
    >
      {/* Icon */}
      <div
        className="
          w-14 h-14 mb-4 flex items-center justify-center
          rounded-full
          bg-[#018790]/10 dark:bg-[#00B7B5]/15
          text-2xl font-bold
        "
      >
        💳
      </div>

      {/* Text */}
      <p className="text-lg font-semibold">
        No transactions found
      </p>

      <p className="text-sm mt-1 text-[#018790]/70 dark:text-[#00B7B5]/70">
        Your payment history will appear here
      </p>
    </div>
  );
}


  return (
    <div
  className="
    p-6 min-h-screen transition-colors duration-300
    bg-[#F0FBFA] dark:bg-[#0B2423]
    text-[#1f2937] dark:text-[#f9fafb]
  "
>
  <Toaster />

  <h2 className="text-2xl font-bold mb-4 text-[#018790] dark:text-[#00B7B5]">
    Transaction History
  </h2>

  <div className="overflow-x-auto rounded-xl shadow">
    <table
      className="
        w-full border-collapse
        border border-[#018790]/30 dark:border-[#00B7B5]/40
      "
    >
      <thead>
        <tr className="bg-[#018790]/10 dark:bg-[#00B7B5]/10">
          <th className="border border-[#018790]/30 dark:border-[#00B7B5]/40 px-3 py-2">
            Serial No
          </th>
          <th className="border border-[#018790]/30 dark:border-[#00B7B5]/40 px-3 py-2">
            Ticket
          </th>
          <th className="border border-[#018790]/30 dark:border-[#00B7B5]/40 px-3 py-2">
            Quantity
          </th>
          <th className="border border-[#018790]/30 dark:border-[#00B7B5]/40 px-3 py-2">
            Total Price
          </th>
          <th className="border border-[#018790]/30 dark:border-[#00B7B5]/40 px-3 py-2">
            Date
          </th>
        </tr>
      </thead>

      <tbody>
        {transactions.map((t, idx) => (
          <tr
            key={t._id}
            className="
              hover:bg-[#018790]/5 dark:hover:bg-[#00B7B5]/10
              transition-colors
            "
          >
            <td className="border border-[#018790]/20 dark:border-[#00B7B5]/30 px-3 py-2">
              {idx + 1}
            </td>
            <td className="border border-[#018790]/20 dark:border-[#00B7B5]/30 px-3 py-2">
              {t.ticketTitle}
            </td>
            <td className="border border-[#018790]/20 dark:border-[#00B7B5]/30 px-3 py-2">
              {t.quantity}
            </td>
            <td className="border border-[#018790]/20 dark:border-[#00B7B5]/30 px-3 py-2 font-semibold text-[#018790] dark:text-[#00B7B5]">
              ${t.totalPrice}
            </td>
            <td className="border border-[#018790]/20 dark:border-[#00B7B5]/30 px-3 py-2">
              {new Date(t.createdAt).toLocaleString()}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>

  );
};

export default TransactionHistory;
