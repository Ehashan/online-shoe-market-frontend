import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

export default function ForgetPassword() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  function sendEmail() {
    axios
      .post(import.meta.env.VITE_BACKEND_URL + "/api/user/sendMail", {
        email: email,
      })
      .then(() => {
        setEmailSent(true);
        toast.success("OTP sent to your email");
      })
      .catch(() => {
        toast.error("Something went wrong");
      });
  }

  function changePassword() {
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    axios
      .post(import.meta.env.VITE_BACKEND_URL + "/api/user/changePW", {
        email: email,
        otp: otp,
        password: password,
      })
      .then(() => {
        toast.success("Password updated");
        window.location.href = "/login";
      })
      .catch(() => {
        toast.error("Invalid OTP or error");
      });
  }

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gray-50 px-4">
      
      <div className="w-full max-w-md bg-white p-6 sm:p-8 rounded-2xl shadow-lg">
        
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          {emailSent ? "Reset Password" : "Forgot Password"}
        </h1>

        {!emailSent ? (
          <>
            <div className="mb-4">
              <label className="text-sm text-gray-600">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full mt-1 px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter your email"
              />
            </div>

            <button
              onClick={sendEmail}
              className="w-full bg-indigo-600 text-white py-2.5 rounded-xl hover:bg-indigo-700 transition"
            >
              Send OTP
            </button>
          </>
        ) : (
          <>
            <div className="mb-3">
              <label className="text-sm text-gray-600">OTP</label>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full mt-1 px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter OTP"
              />
            </div>

            <div className="mb-3">
              <label className="text-sm text-gray-600">New Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full mt-1 px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="mb-4">
              <label className="text-sm text-gray-600">Confirm Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full mt-1 px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <button
              onClick={changePassword}
              className="w-full bg-indigo-600 text-white py-2.5 rounded-xl hover:bg-indigo-700 transition"
            >
              Reset Password
            </button>
          </>
        )}

      </div>
    </div>
  );
}