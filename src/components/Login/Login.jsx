import { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router";
import { GoogleAuthProvider, signInWithPopup, sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebase/firebase.init";
import toast, { Toaster } from "react-hot-toast";
import { useAuth } from "../../context/AuthProvider";
import axios from "axios";

const Login = () => {
  const { signInUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showReset, setShowReset] = useState(false);
  const [resetEmail, setResetEmail] = useState("");

  const from = location.state?.from?.pathname || "/";

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signInUser(email, password);

      const { data } = await axios.get(`${BACKEND_URL}/jwt`, {
        params: { email },
      });

      localStorage.setItem("accessToken", data.token);
      toast.success("Login successful!");
      navigate(from, { replace: true });
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const { data } = await axios.post(`${BACKEND_URL}/users/google-login`, {
        name: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        uid: user.uid,
      });

      localStorage.setItem("accessToken", data.token);
      toast.success("Google login successful!");
      navigate('/');
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (!resetEmail) return toast.error("Please enter your email!");

    try {
      await sendPasswordResetEmail(auth, resetEmail);
      toast.success("Password reset email sent!");
      setShowReset(false);
      setResetEmail("");
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  return (
   <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#49c9a5] to-[#4db4d7] p-4">
  <Toaster />

  <div className="flex flex-col lg:flex-row bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden max-w-4xl w-full">
    
    {/* Left Side: Illustration / Info */}
    <div className="hidden lg:flex flex-1 bg-gradient-to-br from-[#34a0a4] to-[#4db4d7] items-center justify-center p-10">
      <div className="text-white text-center">
        <h1 className="text-5xl font-bold mb-4">Welcome Back!</h1>
        <p className="text-lg text-white/80">
          Login to access your account and manage tickets, bookings, or post jobs.
        </p>
      </div>
    </div>

    {/* Right Side: Login Form */}
    <div className="flex-1 p-8 lg:p-12 bg-white/20 backdrop-blur-md">
      <h2 className="text-3xl font-bold text-white mb-6 text-center lg:text-left">
        Login Now
      </h2>

      <form onSubmit={handleLogin} className="space-y-5">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-4 rounded-xl bg-white/20 text-white placeholder-white/70 focus:ring-2 focus:ring-blue-300 outline-none transition"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-4 rounded-xl bg-white/20 text-white placeholder-white/70 focus:ring-2 focus:ring-blue-300 outline-none transition"
          required
        />

        <div className="flex justify-between items-center">
          <span
            className="text-sm text-blue-200 cursor-pointer underline"
            onClick={() => setShowReset(true)}
          >
            Forgot password?
          </span>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white py-3 rounded-xl font-semibold shadow-lg hover:scale-105 transition transform"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      <div className="divider text-white/70 my-6">OR</div>

      <button
        onClick={handleGoogleLogin}
        className="w-full border border-white text-white py-3 rounded-xl hover:bg-white hover:text-black transition"
      >
        Continue with Google
      </button>

      <p className="mt-6 text-white/80 text-center">
        Don't have an account?{" "}
        <Link to="/register" className="underline text-white hover:text-blue-200">
          Register
        </Link>
      </p>
    </div>
  </div>

  {/* Reset Password Modal */}
  {showReset && (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-80">
        <h2 className="text-2xl font-bold mb-4">Reset Password</h2>
        <form onSubmit={handleResetPassword} className="space-y-4">
          <input
            type="email"
            placeholder="Enter your email"
            value={resetEmail}
            onChange={(e) => setResetEmail(e.target.value)}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-300 outline-none"
            required
          />
          <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
            Send Reset Email
          </button>
          <button
            type="button"
            className="w-full border border-gray-300 py-2 rounded-lg hover:bg-gray-100 transition"
            onClick={() => setShowReset(false)}
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  )}
</div>

  );
};

export default Login;
