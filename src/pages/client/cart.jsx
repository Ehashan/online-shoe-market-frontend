import getCart, { addToCart, getTotal, getTotalForLabelledPrice, removeFromCart } from "../../utils/cart"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { FaTrashAlt } from "react-icons/fa"

export default function CartPage(){
    const [cartLoaded , setCartLoaded] = useState(false)
    const [cart , setCart] = useState([])
    const navigate = useNavigate();

    useEffect(()=>{
        if(!cartLoaded){
            const cart = getCart()
            setCart(cart)
            setCartLoaded(true)
        }
    },[cartLoaded])

    return(
        <div className="w-full min-h-screen flex justify-center bg-gray-100 px-3 sm:px-6 py-6 sm:py-10">

            <div className="w-full max-w-4xl bg-gray-200 rounded-2xl shadow-lg p-4 sm:p-6">

                <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800">
                    Shopping Cart
                </h1>

                {/* CART ITEMS */}
                <div className="flex flex-col gap-4">

                    {
                        cart.map((item , index)=>(
                            <div key={index} className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 bg-gray-50 rounded-xl p-4 shadow-sm">

                               
                                <img 
                                    src={item.image} 
                                    className="w-[80px] h-[80px] sm:w-[100px] sm:h-[100px] object-contain rounded-lg bg-white p-2"
                                />

                                
                                <div className="flex flex-col flex-1 text-center sm:text-left">
                                    <h1 className="text-base sm:text-lg font-semibold text-gray-800">
                                        {item.name}
                                    </h1>

                                    <h2 className="text-xs sm:text-sm text-gray-500 truncate">
                                        {item.altNames?.join(" | ")}
                                    </h2>

                                    <h2 className="text-base sm:text-lg font-bold text-green-600 mt-1">
                                        LKR {item.price.toFixed(2)}
                                    </h2>
                                </div>

                                {/* ACTIONS */}
                                <div className="flex items-center gap-3">

                                    <button
                                        className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-gray-200 hover:bg-gray-300 text-lg font-bold"
                                        onClick={()=>{
                                            addToCart(item,-1)
                                            setCartLoaded(false)
                                        }}
                                    >
                                        -
                                    </button>

                                    <h1 className="text-base sm:text-lg font-semibold w-[30px] text-center">
                                        {item.quantity}
                                    </h1>

                                    <button
                                        className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-gray-200 hover:bg-gray-300 text-lg font-bold"
                                        onClick={()=>{
                                            addToCart(item,1)
                                            setCartLoaded(false)
                                        }}
                                    >
                                        +
                                    </button>

                                    <button
                                        className="ml-2 p-2 bg-red-500 text-white rounded-lg hover:bg-red-700 transition"
                                        onClick={()=>{
                                            removeFromCart(item.productId)
                                            setCartLoaded(false)
                                        }}
                                    >
                                        <FaTrashAlt />
                                    </button>

                                </div>

                            </div>
                        ))
                    }

                </div>

                
                <div className="mt-8 border-t pt-6 flex flex-col items-end gap-2 text-sm sm:text-lg">

                    <div className="flex justify-between w-full sm:w-[300px]">
                        <span>Total</span>
                        <span>{getTotalForLabelledPrice().toFixed(2)}</span>
                    </div>

                    <div className="flex justify-between w-full sm:w-[300px] text-gray-500 border-b pb-2">
                        <span>Discount</span>
                        <span>
                            -{(getTotalForLabelledPrice()-getTotal()).toFixed(2)}
                        </span>
                    </div>

                    <div className="flex justify-between w-full sm:w-[300px] font-bold text-black text-lg sm:text-xl">
                        <span>Net Total</span>
                        <span>LKR {getTotal().toFixed(2)}</span>
                    </div>

                    <button
                        className="mt-4 w-full sm:w-[220px] h-[45px] bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                        onClick={()=>{
                            navigate("/checkout",{
                                state:{ items: cart }
                            })
                        }}
                    >
                        Proceed to Checkout
                    </button>

                </div>

            </div>

        </div>
    )
}