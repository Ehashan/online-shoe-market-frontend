import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import { GrGoogle } from "react-icons/gr";


export default function LoginPage() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
    const loginWithGoogle = useGoogleLogin(
       {
        onSuccess : (res)=>{
          setLoading(true)
          axios.post(import.meta.env.VITE_BACKEND_URL + "/api/user/google",{
            accessToken : res.access_token
          }).then((response)=>{
                console.log("Login Successful", response.data);
        toast.success("Login Successful");
                localStorage.setItem("token", response.data.token)

        const user = response.data.user;
        navigate(user.role === "admin" ? "/admin" : "/");

        setLoading(false);
      });
    }
  });

  function handleLogin() {
    setLoading(true);

    axios.post(import.meta.env.VITE_BACKEND_URL + "/api/user/login", {
      email ,
      password
    })
    .then((response) => {
      toast.success("Login Successful");
      localStorage.setItem("token", response.data.token);

      const user = response.data.user;
      navigate(user.role === "admin" ? "/admin" : "/");

      setLoading(false);
    })
    .catch((error) => {
      toast.error(error.response?.data?.message || "Login failed");
      setLoading(false);
    });
  }

  return (
    <div className="w-full min-h-screen bg-[url(/login_bg.png)] bg-cover bg-center flex items-center justify-end px-4 sm:px-10">

      <div className="hidden lg:flex flex-1 items-center justify-start text-indigo-700 text-shadow-lg pb-80 pl-90">
        <div>
          <h1 className="text-5xl font-bold mb-4">Welcome</h1>
          <h1 className="text-indigo-700 text-2xl sm:text-3xl font-bold mb-2 ml-10">
          ShoeStore
        </h1>
        </div>
      </div>

      <div className="w-full max-w-md h-[600px] backdrop-blur-xl bg-white/10 shadow-xl rounded-2xl p-6 sm:p-8 flex flex-col items-center ">

        <h2 className="lg:text-white text-xl sm:text-2xl font-semibold mb-15 mt-10 sm:textblack">
          Login
        </h2>

        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          className="w-full h-[45px] px-4 mb-6 rounded-xl border border-white bg-transparent text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          className="w-full h-[45px] px-4 mb-15 rounded-xl border border-white bg-transparent text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <button
          onClick={handleLogin}
          className="w-full h-[45px] bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition mb-6"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <button
          onClick={loginWithGoogle}
          className="w-full h-[45px] bg-red-500 text-white rounded-xl flex items-center justify-center gap-2 hover:bg-red-600 transition mb-4"
        >
          <GrGoogle />
          Login with Google
        </button>

        <p className="text-white text-md text-center mb-2">
          Don't have an account?
          <Link to="/register" className="text-blue-400 ml-1 hover:underline">
            Register
          </Link>
        </p>

        <p className="text-gray-300 text-md text-center">
          Forgot password?
          <Link to="/forget" className="text-green-400 ml-1 hover:underline">
            Reset
          </Link>
        </p>

      </div>

    </div>
  );
}