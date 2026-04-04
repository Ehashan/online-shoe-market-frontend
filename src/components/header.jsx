import { useState } from "react";
import { BsCart4 } from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link } from "react-router-dom";
import UserData from "./userData";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="w-full h-[70px] bg-white backdrop-blur-md shadow-sm flex items-center justify-between px-4 sm:px-6 lg:px-12 sticky top-0 z-50 ">
      <h1 className="text-xl sm:text-2xl font-bold text-indigo-600">ShoeStore</h1>

      <nav className="hidden lg:flex items-center gap-8 text-gray-700 font-medium ">
        <Link to="/" className="hover:text-indigo-600 transition">Home</Link>
        <Link to="/product" className="hover:text-indigo-600 transition">Products</Link>
        <Link to="/contact" className="hover:text-indigo-600 transition">Contact</Link>
        <Link to="/reviews" className="hover:text-indigo-600 transition">Reviews</Link>
        <UserData />
        <Link to="/cart" className="relative text-2xl hover:text-indigo-600 transition">
          <BsCart4 />
          <span className="absolute -top-2 -right-2 bg-indigo-600 text-white text-xs px-1.5 rounded-full">2</span>
        </Link>
      </nav>

      <GiHamburgerMenu
        className="lg:hidden text-3xl text-indigo-600 cursor-pointer"
        onClick={() => setIsOpen(true)}
      />

      {isOpen && (
        <div className="fixed top-0 left-0 w-full h-screen bg-black/50 z-50 flex">
          <div className="w-[260px] sm:w-[300px] h-full bg-white p-6 flex flex-col gap-6 shadow-xl">
            <GiHamburgerMenu
              className="text-3xl text-indigo-600 cursor-pointer"
              onClick={() => setIsOpen(false)}
            />

            <Link to="/" onClick={() => setIsOpen(false)} className="text-lg font-medium hover:text-indigo-600">Home</Link>
            <Link to="/product" onClick={() => setIsOpen(false)} className="text-lg font-medium hover:text-indigo-600">Product</Link>
            <Link to="/contact" onClick={() => setIsOpen(false)} className="text-lg font-medium hover:text-indigo-600">Contact</Link>
            <Link to="/reviews" onClick={() => setIsOpen(false)} className="text-lg font-medium hover:text-indigo-600">Reviews</Link>

            <UserData />

            <Link to="/cart" onClick={() => setIsOpen(false)} className="relative text-2xl mt-2">
              <BsCart4 />
              <span className="absolute -top-2 -right-2 bg-indigo-600 text-white text-xs px-1.5 rounded-full">2</span>
            </Link>
          </div>

          <div className="flex-1" onClick={() => setIsOpen(false)}></div>
        </div>
      )}
    </header>
  );
}