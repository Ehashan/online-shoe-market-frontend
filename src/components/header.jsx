import { useState } from "react";
import { BsCart4 } from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link } from "react-router-dom";


export default function Header() {
    const [isOpen, setIsOpen] = useState(true);
    return (
            <header className=" h-[70px] w-full flex justify-start items-center bg-gray-200 shadow-md relative">
            <GiHamburgerMenu className="lg:hidden text-3xl text-green-600 mx-8" onClick={
                ()=>{
                    setIsOpen(true)
                }
            }/> 
            <div className="hidden lg:flex w-[500px] h-full flex justify-evenly items-center text-red-500  text-xl">
            <Link to="/">Home</Link>
            <Link to="/product"> Products</Link>
            <Link to="/contact"> Contact Us</Link>
            <Link to="/reviews"> Reviews </Link>
            <Link to="/cart" className="absolute right-[400px] text-3xl text-red-500"><BsCart4 /></Link>
            </div>
            <div>
                {
                 isOpen&&(
                    <div className="  z-[9999]  fixed top-0 left-0 bg-[#00000080] w-full h-screen">
                        <div className="w-[300px] h-full bg-white  flex flex-col justify-start items-start p-4">
                            <GiHamburgerMenu className="text-3xl text-accent" onClick={()=>setIsOpen(false)} />
                            <Link to="/" className="text-xl text-accent my-4">Home</Link>
                            <Link to="/products" className="text-xl text-accent my-4">Products</Link>
                            <Link to="/contact" className="text-xl text-accent my-4">Contact us</Link>
                            <Link to="/reviews" className="text-xl text-accent my-4">Reviews</Link>
                            <Link to="/cart" className="text-xl text-accent my-4"><BsCart4 /></Link>

                            
                        </div>
                    </div>
                 )
                }
            </div>

            
            </header>  
    )
} 

