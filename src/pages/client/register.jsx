import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

export default function RegistrationPage() {

    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    function handleRegister() {

        // 🔥 Password match validation
        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        if (!email || !firstName || !lastName || !phone || !password) {
            toast.error("Please fill all fields");
            return;
        }

        setLoading(true);

        axios.post(import.meta.env.VITE_BACKEND_URL + "/api/user/", {
            email,
            firstName,
            lastName,
            phone,
            password
        })
        .then(() => {
            toast.success("Registration Successful");
            navigate("/login");
        })
        .catch((error) => {
            toast.error(error.response?.data?.message || "Registration failed");
        })
        .finally(() => {
            setLoading(false);
        });
    }

    return (
        <div className="w-full h-screen bg-[url(/login_bg.png)] bg-cover bg-center flex">
            
            <div className="w-[50%] h-full"></div>

            <div className="w-[50%] h-full flex justify-center items-center">
                <div className="w-[450px] h-[700px] backdrop-blur-xl shadow-xl rounded-xl flex flex-col justify-center items-center">

                    <h1 className="text-white text-3xl font-bold mb-4">Register</h1>

                    <input
                        onChange={(e)=>setFirstName(e.target.value)}
                        className="w-[400px] h-[50px] border border-white rounded-xl  text-white text-center m-[5px]"
                        type="text"
                        placeholder="First Name"
                    />

                    <input
                        onChange={(e)=>setLastName(e.target.value)}
                        className="w-[400px] h-[50px] border border-white rounded-xl text-white text-center m-[5px]"
                        type="text"
                        placeholder="Last Name"
                    />

                    <input
                        onChange={(e)=>setEmail(e.target.value)}
                        className="w-[400px] h-[50px] border border-white rounded-xl text-white text-center m-[5px]"
                        type="email"
                        placeholder="Email"
                    />

                    <input
                        onChange={(e)=>setPhone(e.target.value)}
                        className="w-[400px] h-[50px] border border-white rounded-xl text-white text-center m-[5px]"
                        type="text"
                        placeholder="Phone Number"
                    />

                    <input
                        onChange={(e)=>setPassword(e.target.value)}
                        className="w-[400px] h-[50px] border border-white rounded-xl text-white text-center m-[5px]"
                        type="password"
                        placeholder="Password"
                    />

                    <input
                        onChange={(e)=>setConfirmPassword(e.target.value)}
                        className="w-[400px] h-[50px] border border-white rounded-xl text-white text-center m-[5px]"
                        type="password"
                        placeholder="Confirm Password"
                    />

                    <button
                        onClick={handleRegister}
                        className="w-[400px] h-[50px] bg-green-500 text-white rounded-xl m-[10px] cursor-pointer hover:bg-green-600">
                        
                        {loading ? "Registering..." : "Register"}
                    </button>

                    <p className="text-white text-center m-[10px]">
                        Already have an account?
                        &nbsp;
                        <span className="text-blue-400 hover:text-blue-600 cursor-pointer">
                            <Link to="/login"> Login here </Link>
                        </span>
                    </p>

                </div>
            </div>
        </div>
    );
}