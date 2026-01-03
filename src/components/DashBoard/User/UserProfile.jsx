import  { useContext } from "react";
import { AuthContext } from "../../../context/AuthProvider";
import Loading from "../../Components/Loading";

const UserProfile = () => {
const { user, loading } = useContext(AuthContext);



  if (!user) {
    return (
      <div className="flex justify-center items-center h-32 text-lg font-semibold text-gray-600">
        No user data available.
      </div>
    );
  }
    if (loading) {
    return (
      <div>
        <Loading></Loading>
      </div>
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
    transition-colors duration-300
  "
>
  <div className="flex flex-col items-center gap-4">

    {/* Avatar */}
    {user.photoURL ? (
      <img
        src={user.photoURL}
        alt={user.displayName || "User"}
        className="
          w-28 h-28 rounded-full object-cover
          ring-4 ring-[#018790] dark:ring-[#00B7B5]
        "
      />
    ) : (
      <div
        className="
          w-28 h-28 rounded-full
          flex items-center justify-center
          text-3xl font-bold
          bg-[#018790] dark:bg-[#00B7B5]
          text-white
        "
      >
        {user.email?.[0]?.toUpperCase()}
      </div>
    )}

    {/* Name */}
    <h2 className="text-2xl font-semibold">
      {user.displayName || "N/A"}
    </h2>

    {/* Role Badge */}
    <span
      className="
        px-4 py-1 rounded-full text-sm font-semibold
        border
        border-[#018790] dark:border-[#00B7B5]
        text-[#018790] dark:text-[#00B7B5]
      "
    >
      {user.role || "User"}
    </span>

    {/* Divider */}
    <div className="w-full h-px bg-[#018790]/20 dark:bg-[#00B7B5]/30 my-4"></div>

    {/* Info Section */}
    <div className="w-full space-y-3 text-sm">

      <div className="flex justify-between">
        <span className="opacity-70">Email</span>
        <span className="font-medium">{user.email}</span>
      </div>

      <div className="flex justify-between">
        <span className="opacity-70">Account Type</span>
        <span className="font-medium">
          {user.role || "User"}
        </span>
      </div>

    </div>
  </div>
</div>


  );
};

export default UserProfile;
