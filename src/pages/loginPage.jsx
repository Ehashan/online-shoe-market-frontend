import { useState } from "react";
import axios from "axios";  
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";


export default function LoginPage() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState(""); 
    const navigate = useNavigate();



        function handleLogin() {
            // Handle login logic here
            console.log("Email:", email);
            console.log("Password:", password);
            axios.post(import.meta.env.VITE_BACKEND_URL+"/api/user/login",{
                email: email,
                password: password
            }).then((response)=>{
                console.log("Login Successful", response.data);
                toast.success("Login Successful");
                localStorage.setItem("userToken", response.data.token);
                
                const user = response.data.user;
                if(user.role === "admin"){
                    window.location.href = "/admin";
                    //go to admin page
                }else{
                    window.location.href = "/";
                    //go to thr home page
                }
            }
            ).catch((error)=>{
                console.error("Logging failed", error.response.data);
                toast.error(error.response.data.message || "Login failed");
            }
            );


            console.log("Login button clicked");
    }
  
    return (
            <div className="w-full h-screen bg-[url(/login_bg.png)] bg-cover bg-center flex">
                <div className=" w-[50%] h-full"></div>
                <div className=" w-[50%] h-full flex justify-center items-center">
                    <div className="w-[450px] h-[600px] backdrop-blur-xl shadow -xl rounded-xl flex flex-col justify-center items-center ">
                        <input onChange={(e)=>{
                                setEmail(e.target.value)
                            }
                        } className="w-[400px] h-[50px] border border-white rounded-xl text-center m-[5px]" type="email" placeholder="Email" />
                         <input onChange={(e)=>{
                                setPassword(e.target.value)
                            }
                        }className="w-[400px] h-[50px] border border-white rounded-xl text-center m-[5px]" type="password" placeholder="Password" />
                         <button 
                            onClick={handleLogin}
                            className="w-[400px] h-[50px] bg-blue-500 text-white rounded-xl cursor-pointer">Login</button>
                    </div>  

                </div> 
            </div>
    )
}