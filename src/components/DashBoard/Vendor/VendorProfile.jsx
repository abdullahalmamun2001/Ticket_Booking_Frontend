import  { useContext } from "react";
import { AuthContext } from "../../../context/AuthProvider";
import Loading from "../../Components/Loading"
import NoUser from "../../Components/NoUser";

const VendorProfile = () => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <div>
        <Loading></Loading>
      </div>
    );
  }

  if (!user) {
    return (
      <div><NoUser></NoUser></div>
    );
  }

  return (
    <div
  className="
 max-w-2xl mx-auto p-6 rounded-2xl
    bg-[#ffffff] dark:bg-[#0B2423]
    text-[#1f2937] dark:text-[#f9fafb]
    shadow-lg border
    border-[#018790]/30 dark:border-[#00B7B5]/40
    transition-colors duration-300 max-h-1/2]"
>
  <h2 className="text-2xl font-bold text-center mb-6 text-primary">
    Vendor Profile
  </h2>

  <div className="flex flex-col items-center gap-4">

    {/* Avatar */}
    {user.photoURL ? (
      <img
        src={user.photoURL}
        alt={user.displayName || "User"}
        className="w-24 h-24 rounded-full object-cover ring-4 ring-primary"
      />
    ) : (
      <div
        className="
          w-24 h-24 rounded-full
          bg-primary text-primary-content
          flex items-center justify-center
          text-2xl font-bold
        "
      >
        {user.email?.[0]?.toUpperCase()}
      </div>
    )}

    {/* Info */}
    <div className="w-full space-y-2 text-sm">
      <div className="flex justify-between">
        <span className="text-base-content/60">Name</span>
        <span className="font-medium">
          {user.displayName || "N/A"}
        </span>
      </div>

      <div className="flex justify-between">
        <span className="text-base-content/60">Email</span>
        <span className="font-medium">{user.email}</span>
      </div>

      <div className="flex justify-between">
        <span className="text-base-content/60">Role</span>
        <span className="badge badge-primary badge-outline">
          {user.role || "Vendor"}
        </span>
      </div>
    </div>
  </div>
</div>

  );
};

export default VendorProfile;
