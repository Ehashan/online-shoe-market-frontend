import axios from "axios"
import { FaPlus } from "react-icons/fa"
import { Link } from "react-router-dom";
import { useEffect, useState } from "react"


export default function AdminProductsPage(){

    const [products, setProducts] = useState([])
    useEffect(
        ()=>{
               axios.get(import.meta.env.VITE_BACKEND_URL+"/api/product").then(
                (response)=>{
                    console.log("Products fetched", response.data);
                    setProducts(response.data)
                }
            )

        },
        []
    )

 
    return (
        <div  className="w-full h-full rounded-lg relative " >
            <Link to={"/admin/addProduct"} className="p-[12px] bg-gray-700 text-white absolute bottom-5 right-5 items-center text-3xl rounded-full cursor-pointer hover:bg-gray-400 hover:text-gray-700 " >
                <FaPlus />
            </Link>
            <table className="w-full ">
                <thead>
                    <tr>
                        <th className=" p-2">ProductID</th>
                        <th className=" p-2">Name</th>
                        <th className=" p-2">Price</th>
                        <th className=" p-2">Labled Price</th>
                        <th className=" p-2">Stock</th>
                    </tr>
                </thead>
                <tbody>
                    {
                products.map(
                    (product,index)=>{
                        console.log("mapping"+product.productId)
                        return(
                            <tr key={index} className="border-b-2 border-gray-300 text-black text-center hover:bg-gray-700 hover:text-white cursor-pointer">
                                <td className="p-2">{product.productId}</td>
                                <td className="p-2">{product.name}</td>
                                <td className="p-2">{product.price}</td>
                                <td className="p-2">{product.labeledPrice}</td>
                                <td className="p-2">{product.stock}</td>    
                            </tr>
                        )                                                         
                    }
                )
            }

                </tbody>
            </table>
            
        </div>
    )
}

//https://vgdtsbzosyukqvlhysfy.supabase.co