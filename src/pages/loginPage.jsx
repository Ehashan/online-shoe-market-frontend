import { useState } from "react";

export default function LoginPage() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function handleLogin() {
        // Handle login logic here
        console.log("Email:", email);
        console.log("Password:", password);
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