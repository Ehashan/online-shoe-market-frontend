import { Link } from "react-router-dom";

export default function Header() {
    return (
            <header className="h-[70px] w-full flex justify-center items-center bg-gray-250">
            <div className="w-[500px] h-full flex justify-evenly items-center text-red-500 text-xl">
            <Link to="/">Home</Link>
            <Link to="/product"> Products</Link>
            <Link to="/contact"> Contact Us</Link>
            <Link to="/reviews"> Reviews </Link>
            </div>

            </header>  
    )
} 

