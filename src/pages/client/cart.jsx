import getCart, { addToCart, getTotal, getTotalForLabelledPrice, removeFromCart } from "../../utils/cart"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { FaTrashAlt } from "react-icons/fa"

export default function CartPage(){
    const [cartLoaded , setCartLoaded] = useState(false)
    const [cart , setCart] = useState([])
    const navigate = useNavigate();
    useEffect(()=>{
        if(cartLoaded == false){
            const cart = getCart()
            setCart(cart)
            setCartLoaded(true)
        }
    },[cartLoaded])
    return(
        <div className="w-full min-h-screen flex justify-center bg-gray-100 py-[40px] ">
            <div className="w-[750px] bg-gray-200 rounded-xl shadow-lg p-[25px]">
                <h1 className="text-3xl font-bold mb-[20px]">Shopping Cart</h1>
                {
                    cart.map((item , index)=>{
                        return(
                            <div key={index} className="w-full flex items-center justify-between bg-gray-100 rounded-xl p-[12px] my-[10px] shadow-sm ">
                                
                                <img src={item.image} className="h-[90px] w-[90px] object-cover rounded-lg"/>
                                <div className="flex flex-col w-[300px] overflow-hidden">
                                    <h1 className="text-lg font-semibold">{item.name}</h1>
                                    <h2 className="text-sm text-gray-500 truncate">{item.altNames.join(" | ")}</h2>
                                    <h2 className="text-lg font-bold text-green-600 ">LKR: {item.price.toFixed(2)}</h2>
                                </div>
                                <div className="flex items-center gap-3">
                                    <button className="w-[35px] h-[35px] rounded-lg bg-gray-300 hover:bg-gray-400 text-lg font-bold cursor-pointer"
                                    onClick={()=>{
                                        addToCart(item,-1)
                                        setCartLoaded(false)
                                    }}>-</button>
                                        <h1 className="text-lg font-semibold w-[30px] text-center">{item.quantity}</h1>
                                    <button className="w-[35px] h-[35px] rounded-lg bg-gray-300 hover:bg-gray-400 text-lg font-bold cursor-pointer"
                                    onClick={()=>{
                                        addToCart(item,1)
                                        setCartLoaded(false)
                                    }}>+</button>

                                    <button className="px-[20px] py-[8px] bg-red-500 text-white text-xl rounded-lg hover:bg-red-800 hover:text-white cursor-pointer" 
                                onClick={()=>{
                                    removeFromCart(item.productId)
                                    setCartLoaded(false)
                                }}>
                                    <FaTrashAlt />
                                </button>

                                </div>
                                
                            </div>
                        )

                    })
                }
               <div className="w-full flex flex-col items-end mt-[30px] space-y-[10px] border-t pt-[15px]">
                <div className="w-full flex justify-end">
                    <h1 className="w-[150px] text-xl font-semibold text-end pr-2">Total</h1>
                    <h1 className="w-[150px] text-xl font-semibold text-end pr-2"> {getTotalForLabelledPrice().toFixed(2)}</h1>
                </div>
                <div className="w-full  flex justify-end">
                    <h1 className="w-[150px] text-xl font-semibold text-end pr-2 ">Discount</h1>
                    <h1 className="w-[150px] text-xl font-semibold text-end pr-2 border-b-2 text-gray-500">-{(getTotalForLabelledPrice()-getTotal()).toFixed(2)}</h1>
                </div>
                <div className="w-full  flex justify-end">
                    <h1 className="w-[150px] text-xl font-semibold text-end pr-2">Net total</h1>
                    <h1 className="w-[150px] text-xl font-semibold text-end pr-2 border-b-4 border-double font-bold text-black"> LKR.  {getTotal().toFixed(2)}</h1>
                </div>
                <div className="w-full  flex justify-end mt-4">
                    <button className="w-[180px] h-[45px] bg-green-600 text-white text-lg rounded-lg hover:bg-green-800 hover:text-white cursor-pointer" onClick={()=>{
                        navigate("/checkout",
                            {
                                state : {
                                    items : cart
                                }
                            }
                        )
                    }}> Proceed to Checkout </button>
                </div>
            </div>
        </div>
        </div>
    )
}