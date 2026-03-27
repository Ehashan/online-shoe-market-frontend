import axios from "axios"
import {FaPlus, FaTrashAlt } from "react-icons/fa"
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react"
import { GrEdit } from "react-icons/gr";
import toast from "react-hot-toast";
import Loader from "../../components/loader";


export default function AdminProductsPage(){

    const [products, setProducts] = useState([])
    const [loaded, setLoaded] = useState(false)
    const navigate = useNavigate()

    useEffect(
        ()=>{
               if(!loaded){ 
               axios.get(import.meta.env.VITE_BACKEND_URL+"/api/product").then(
                (response)=>{
                    console.log(response.data)
                    setProducts(response.data)
                    setLoaded(true)
                }
                )
            }
        }
        ,[loaded]
    )

    async function deleteProduct(id){
        const token = localStorage.getItem("token")
        if(token == null){
            toast.error("You must be logged in to delete a product")
            return
        }
        try{
            await axios.delete(import.meta.env.VITE_BACKEND_URL+"/api/product/"+id, {
                headers: {
                    Authorization: "Bearer " +token
                }
            })
            setLoaded(false)
            toast.success("Product deleted successfully")
        }catch(error) {
            console.log(error)
            toast.error("Failed to delete product")
            return
        }
    }
 
    return (
        <div  className="w-full h-full rounded-lg relative " >
            <Link to={"/admin/addProduct"} className="p-[12px] bg-gray-700 text-white absolute bottom-5 right-5 items-center text-3xl rounded-full cursor-pointer hover:bg-gray-400 hover:text-gray-700 " >
                <FaPlus />
            </Link>
            {loaded&&<table className="w-full ">
                <thead>
                    <tr>
                        <th className=" p-2">ProductID</th>
                        <th className=" p-2">Name</th>
                        <th className=" p-2">Price</th>
                        <th className=" p-2">Labled Price</th>
                        <th className=" p-2">Stock</th>
                        <th className=" p-2">Action</th>

                    </tr>
                </thead>
                <tbody>
                    {
                products.map(
                    (product,index)=>{
                        return(
                            <tr key={index} className="border-b-2 border-gray-300 text-black text-center hover:bg-gray-500 hover:text-white ">
                                <td className="p-2">{product.productId}</td>
                                <td className="p-2">{product.name}</td>
                                <td className="p-2">{product.price}</td>
                                <td className="p-2">{product.labeledPrice}</td>
                                <td className="p-2">{product.stock}</td>    
                                <td className="p-2">
                                    <div className="w-full h-full flex justify-center gap-3">
                                        <FaTrashAlt onClick={()=>{
                                            deleteProduct(product.productId)
                                        }} className="text-[25px] m-[10px] hover:text-red-500 cursor-pointer" />
                                        <GrEdit onClick={()=>{
                                            navigate("/admin/editProduct",{
                                                state:product
                                            })
                                        }} className="text-[25px] m-[10px] hover:text-blue-500 cursor-pointer" />

                                    </div>
                                </td>
                            </tr>
                        )                                                         
                    }
                )
            }

                </tbody>
            </table>}
            {
            !loaded&&
                
              <Loader />

            }
        </div>
    )
}

//https://vgdtsbzosyukqvlhysfy.supabase.co