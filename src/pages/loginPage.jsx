import { useState } from "react";
import axios from "axios";  
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";


export default function LoginPage() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState(""); 
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)


        function handleLogin() {
            // Handle login logic here
            setLoading(true)
            axios.post(import.meta.env.VITE_BACKEND_URL+"/api/user/login",{
                email: email,
                password: password
            }).then((response)=>{
                console.log("Login Successful", response.data);
                toast.success("Login Successful");
                localStorage.setItem("token", response.data.token)
                
                const user = response.data.user;
                if(user.role === "admin"){
                    navigate("/admin");
                    //go to admin page
                }else{
                    navigate("/");
                    //go to thr home page
                }
                setLoading(false)
            }
            ).catch((error)=>{
                console.error("Logging failed", error.response.data);
                toast.error(error.response.data.message || "Login failed");
                setLoading(false)
            }
            );


            console.log("Login button clicked");
    }
  
    return (
            <div className="w-full h-screen bg-[url(/login_bg.png)] bg-cover bg-center flex"> 
                <div className=" w-[50%] h-full"></div>
                <div className=" w-[50%] h-full flex justify-center items-center">
                    <div className="w-[450px] h-[600px] backdrop-blur-xl shadow -xl rounded-xl flex flex-col justify-center items-center ">
                        <h1 className="text-white text-3xl font-bold mb-4">Login</h1>
                        <input onChange={(e)=>{
                                setEmail(e.target.value)
                            }
                        } className="w-[400px] h-[50px] border border-white rounded-xl text-white text-center m-[5px]" type="email" placeholder="Email" />
                         <input onChange={(e)=>{
                                setPassword(e.target.value) 
                            }
                        }className="w-[400px] h-[50px] border border-white rounded-xl text-white text-center m-[5px]" type="password" placeholder="Password" />
                         <button 
                            onClick={handleLogin}
                            className="w-[400px] h-[50px] bg-blue-500 text-white rounded-xl m-[5px] cursor-pointer">
                                
                            {loading ? "Logging in..." : "Login"}
                            </button>
                            <p className="text-white text center m-[10]px">
                                Don't have an account?
                                &nbsp;
                                 <span className="text-blue-500 hover:text-blue-700  cursor-pointer">
                                    <Link to="/register"> Register here </Link>
                                 </span>
                            </p>
                    </div>  

                </div> 
            </div>
    )
}