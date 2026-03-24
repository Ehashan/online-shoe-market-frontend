import { BsCart4 } from "react-icons/bs";
import { Link } from "react-router-dom";


export default function Header() {
    return (
            <header className="h-[70px] w-full flex justify-center items-center bg-gray-200 shadow-md relative">
            <div className="w-[500px] h-full flex justify-evenly items-center text-red-500 text-xl">
            <Link to="/">Home</Link>
            <Link to="/product"> Products</Link>
            <Link to="/contact"> Contact Us</Link>
            <Link to="/reviews"> Reviews </Link>
            <Link to="/cart" className="absolute right-[400px] text-3xl text-red-500"><BsCart4 /></Link>
            </div>

            
            </header>  
    )
} 

