import React from "react";
import { Link } from "react-router";
import errorImg from "../../assets/error-404.png";

const ErrorPage = () => {
  return (
   <div className="min-h-screen flex items-center justify-center bg-base-100 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center text-center px-6">
        {/* Image */}
        <img
          src={errorImg}
          alt="Page Not Found"
          className="h-60 w-60 mb-5"
        />

        {/* Heading */}
        <p className="text-2xl font-semibold mb-6 text-primary dark:text-secondary">
          Oops! Page Not Found
        </p>

        {/* Go Back Button */}
        <Link to="/">
          <button className="bg-primary hover:bg-secondary text-white px-6 py-3 rounded-lg font-semibold shadow-md transition-all duration-200">
            Go Back!
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
