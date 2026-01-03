import  { useState } from "react";
import { useAuth } from "../../context/AuthProvider.jsx";
import { useNavigate, Link, useLocation } from "react-router";
import {
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { auth, db } from "../../firebase/firebase.init";
import toast, { Toaster } from "react-hot-toast";
import { doc, setDoc } from "firebase/firestore";

const Register = () => {
  const { createUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [name, setName] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const validatePassword = (password) => {
    const uppercase = /[A-Z]/.test(password);
    const lowercase = /[a-z]/.test(password);
    const minLength = password.length >= 6;
    return uppercase && lowercase && minLength;
  };
  const handleRegister = async (e) => {
    e.preventDefault();

    if (!validatePassword(password)) {
      toast.error(
        "Password must include uppercase, lowercase & min 6 characters."
      );
      return;
    }

    setLoading(true);

    try {
      const result = await createUser(email, password);
      const user = result.user;

      await updateProfile(user, {
        displayName: name,
        photoURL: photoURL || null,
      });
      
      toast.success("Registration successful!");
      setLoading(false); 
      navigate(from, { replace: true });
      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        role: "USER",
      });
      
    } catch (error) {
      console.error(error);
      toast.error(error.message);
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      toast.success("Google login successful!");
      navigate(from, { replace: true });
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#49c9a5] to-[#4db4d7] p-4">
  <Toaster />

  <div className="flex flex-col lg:flex-row-reverse w-full max-w-4xl shadow-2xl rounded-xl overflow-hidden bg-white/5 backdrop-blur-md">
    
    {/* Left Text Section */}
    <div className="flex-1 flex flex-col justify-center p-8 text-white">
      <h1 className="text-5xl font-bold mb-4">Register now!</h1>
      <p className="text-lg">
        Create your account to access TicketBari services. Join and start managing your tickets easily.
      </p>
    </div>

    {/* Form Section */}
    <div className="flex-1 p-8 bg-gradient-to-br from-[#49c9a5] to-[#4db4d7]">
      <form onSubmit={handleRegister} className="space-y-4">
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="input input-bordered w-full bg-[#3a826d] text-white placeholder-white"
          required
        />

        <input
          type="text"
          placeholder="Photo URL"
          value={photoURL}
          onChange={(e) => setPhotoURL(e.target.value)}
          className="input input-bordered w-full bg-[#3a826d] text-white placeholder-white"
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input input-bordered w-full bg-[#3a826d] text-white placeholder-white"
          required
        />

        <input
          type="password"
          placeholder="Password (A-Z, a-z, 6+ chars)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input input-bordered w-full bg-[#3a826d] text-white placeholder-white"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-lg font-semibold bg-primary hover:bg-secondary text-white transition-all"
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </form>

      <div className="divider text-white">OR</div>

      <button
        onClick={handleGoogleLogin}
        className="w-full py-3 rounded-lg border border-white text-white hover:bg-white hover:text-[#49c9a5] transition-all"
      >
        Continue with Google
      </button>

      <p className="mt-4 text-center text-white">
        Already have an account?{" "}
        <Link to="/login" className="underline font-semibold">
          Login
        </Link>
      </p>
    </div>
  </div>
</div>

  );
};

export default Register;
