import { Link } from "react-router";
import { useUserRole } from "../../Hook/useUserRole";
import Loading from "../Components/Loading";

const DashboardSidebar = () => {
  const { role, loading } = useUserRole();
if(loading){
  return <Loading></Loading>
}
  

  return (
    
    <ul
      className="
  menu p-4 w-64 text-[16px] font-medium
  bg-base-100 text-base-content
  border-r border-base-300
  dark:bg-base-200
"
    >
      {role === "USER" && (
        <>
          <li>
            <Link
              to="/dashboard/user/profile"
              className="rounded-lg hover:bg-primary hover:text-primary-content transition"
            >
              User Profile
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard/user/bookings"
              className="rounded-lg hover:bg-primary hover:text-primary-content transition"
            >
              My Booked Tickets
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard/user/transactions"
              className="rounded-lg hover:bg-primary hover:text-primary-content transition"
            >
              Transaction History
            </Link>
          </li>
        </>
      )}

      {role === "VENDOR" && (
        <>
          <li>
            <Link
              to="/dashboard/vendor/profile"
              className="rounded-lg hover:bg-secondary hover:text-secondary-content transition"
            >
              Vendor Profile
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard/vendor/add-ticket"
              className="rounded-lg hover:bg-secondary hover:text-secondary-content transition"
            >
              Add Ticket
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard/vendor/my-tickets"
              className="rounded-lg hover:bg-secondary hover:text-secondary-content transition"
            >
              My Added Tickets
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard/vendor/bookings"
              className="rounded-lg hover:bg-secondary hover:text-secondary-content transition"
            >
              Requested Bookings
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard/vendor/revenue"
              className="rounded-lg hover:bg-secondary hover:text-secondary-content transition"
            >
              Revenue Overview
            </Link>
          </li>
        </>
      )}

      {role === "ADMIN" && (
        <>
          <li>
            <Link
              to="/dashboard/admin/profile"
              className="rounded-lg hover:bg-accent hover:text-accent-content transition"
            >
              Admin Profile
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard/admin/manage-tickets"
              className="rounded-lg hover:bg-accent hover:text-accent-content transition"
            >
              Manage Tickets
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard/admin/manage-users"
              className="rounded-lg hover:bg-accent hover:text-accent-content transition"
            >
              Manage Users
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard/admin/advertise"
              className="rounded-lg hover:bg-accent hover:text-accent-content transition"
            >
              Advertise Tickets
            </Link>
          </li>
        </>
      )}
    </ul>
  );
};

export default DashboardSidebar;
