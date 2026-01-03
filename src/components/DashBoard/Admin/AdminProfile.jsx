import  { useContext } from "react";
import { AuthContext } from "../../../context/AuthProvider";

const AdminProfile = () => {
  const { user, loading } = useContext(AuthContext);
 if (loading) {
    return (
      <div className="bg-green-300 flex justify-center items-center h-32 text-lg font-semibold text-gray-600">
        Loading profile...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="bg-green-300 flex justify-center items-center h-32 text-lg font-semibold text-gray-600">
        No user data available.
      </div>
    );
  }
  return (
   <div
  className="
    max-w-2xl mx-auto p-6 rounded-2xl
    bg-base-100 text-base-content
    shadow-lg border border-base-300
  "
>
  <div className="flex flex-col items-center gap-4">

    {/* Avatar */}
    {user?.photoURL ? (
      <img
        src={user.photoURL}
        alt="Admin"
        className="w-28 h-28 rounded-full object-cover ring-4 ring-accent"
      />
    ) : (
      <div
        className="
          w-28 h-28 rounded-full
          bg-accent text-accent-content
          flex items-center justify-center
          text-3xl font-bold
        "
      >
        {user?.email?.[0]?.toUpperCase()}
      </div>
    )}

    {/* Name */}
    <h2 className="text-2xl font-semibold">
      {user?.displayName || "Admin"}
    </h2>

    {/* Role Badge */}
    <span className="badge badge-accent badge-outline px-4 py-3">
      Admin
    </span>

    {/* Divider */}
    <div className="divider"></div>

    {/* Info Section */}
    <div className="w-full space-y-3 text-sm">

      <div className="flex justify-between">
        <span className="text-base-content/60">Email</span>
        <span className="font-medium">{user?.email}</span>
      </div>

      <div className="flex justify-between">
        <span className="text-base-content/60">Account Type</span>
        <span className="font-medium">Administrator</span>
      </div>

    </div>
  </div>
</div>

  );
};

export default AdminProfile;
