import { Outlet } from "react-router";


const UserDashboard = () => {
  return (
    <div>
      <h2 className="text-2xl text-white text-center font-bold mb-4">Your Dashboard</h2>
      <Outlet />
    </div>
  );
};

export default UserDashboard;
