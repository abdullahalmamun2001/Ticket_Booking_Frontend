import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Loading from "../../Components/Loading";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    if (!token) return;

    fetch(`${backendUrl}/users`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Unauthorized");
        return res.json();
      })
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to load users");
        setLoading(false);
      });
  }, [backendUrl, token]);

  const updateRole = async (id, role) => {
    try {
      const res = await fetch(`${backendUrl}/users/role/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ role }),
      });

      if (!res.ok) throw new Error("Failed to update role");

      setUsers((prev) =>
        prev.map((u) => (u._id === id ? { ...u, role } : u))
      );

      toast.success(`Role changed to ${role}`);
    } catch (err) {
      console.error(err);
      toast.error(err.message);
    }
  };
  const markFraud = async (id) => {
    try {
      const res = await fetch(`${backendUrl}/users/fraud/${id}`, {
        method: "PATCH",
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Failed to mark as fraud");

      setUsers((prev) =>
        prev.map((u) => (u._id === id ? { ...u, isFraud: true } : u))
      );

      toast.success("Vendor marked as fraud");
    } catch (err) {
      console.error(err);
      toast.error(err.message);
    }
  };

  if (loading) {
    return <Loading></Loading>
  }

  return (
   <div className="p-6">
  <Toaster />
  <h2 className="text-2xl font-bold mb-4 text-primary">Manage Users</h2>

  <div className="overflow-x-auto">
    <table className="table-auto w-full border border-primary rounded-lg">
      <thead>
        <tr className="bg-primary/20">
          <th className="border px-3 py-2 text-left text-primary">Name</th>
          <th className="border px-3 py-2 text-left text-primary">Email</th>
          <th className="border px-3 py-2 text-left text-primary">Role</th>
          <th className="border px-3 py-2 text-left text-primary">Actions</th>
        </tr>
      </thead>

      <tbody>
        {users.map((user) => (
          <tr
            key={user._id}
            className="hover:bg-primary/10 transition-colors"
          >
            <td className="border px-3 py-2">{user.name}</td>
            <td className="border px-3 py-2">{user.email}</td>
            <td className="border px-3 py-2 capitalize font-semibold">
              {user.role}
            </td>

            <td className="border px-3 py-2 flex flex-wrap gap-2">
              {user.role !== "ADMIN" && (
                <>
                  <button
                    onClick={() => updateRole(user._id, "ADMIN")}
                    className="px-3 py-1 bg-primary text-white rounded hover:bg-secondary transition"
                  >
                    Make Admin
                  </button>

                  <button
                    onClick={() => updateRole(user._id, "VENDOR")}
                    className="px-3 py-1 bg-secondary text-white rounded hover:bg-primary transition"
                  >
                    Make Vendor
                  </button>
                </>
              )}

              {user.role === "VENDOR" && !user.isFraud && (
                <button
                  onClick={() => markFraud(user._id)}
                  className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition"
                >
                  Mark as Fraud
                </button>
              )}

              {user.isFraud && (
                <span className="text-red-500 font-semibold">Fraud Vendor</span>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>

  );
};

export default ManageUsers;
