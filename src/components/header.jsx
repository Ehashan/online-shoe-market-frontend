import { useState } from "react";
import { BsCart4, BsPerson } from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link } from "react-router-dom";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="w-full h-[70px] bg-white shadow-md flex items-center justify-between px-4 lg:px-12 sticky top-0 z-50">

      <GiHamburgerMenu
        className="text-2xl text-indigo-600 cursor-pointer lg:hidden"
        onClick={() => setIsOpen(true)}
      />

      <h1 className="text-lg sm:text-xl font-bold text-indigo-600">
        ShoeStore
      </h1>

      <div className="flex items-center gap-4">
        
        <Link to="/cart" className="relative text-xl">
          <BsCart4 />
          <span className="absolute -top-2 -right-2 bg-indigo-600 text-white text-xs px-1.5 rounded-full">
            2
          </span>
        </Link>

        <Link to="/login" className="text-xl">
          <BsPerson />
        </Link>

      </div>
      <nav className="hidden lg:flex items-center gap-8 text-gray-700 font-medium font-bold text-lg absolute left-3/4 -translate-x-1/2">
        <Link to="/">Home</Link>
        <Link to="/product">Products</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/reviews">Reviews</Link>
      </nav>

      {isOpen && (
        <div className="fixed top-0 left-0 w-full h-screen bg-black/50 z-50 flex">

          <div className="w-[260px] h-full bg-white p-6 flex flex-col gap-6">

            <GiHamburgerMenu
              className="text-2xl text-indigo-600 cursor-pointer"
              onClick={() => setIsOpen(false)}
            />

            <Link to="/" onClick={()=>setIsOpen(false)}>Home</Link>
            <Link to="/product" onClick={()=>setIsOpen(false)}>Products</Link>
            <Link to="/contact" onClick={()=>setIsOpen(false)}>Contact</Link>
            <Link to="/reviews" onClick={()=>setIsOpen(false)}>Reviews</Link>

          </div>

          <div className="flex-1" onClick={() => setIsOpen(false)}></div>
        </div>
      )}
    </header>
  );
}