import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { useParams } from "react-router-dom"
import Loader from "../../components/loader"

export default function ProductOverview() {
    const params = useParams()
    console.log(params.id)
    if (params.id === null){
        window.location.href = "/products"
    }


    const [product, setProduct] = useState(null)
    const [status, setStatus] = useState("loading")

    useEffect(
        ()=>{
            if(status === "loading"){
                fetch(import.meta.env.VITE_BACKEND_URL+"/api/product/"+params.id).then(
                    (response)=>{       
                       setProduct(response.data)
                       setStatus("loaded")
                    }
                ).catch(
                    ()=>{
                        toast.error("Failed to load product")
                        setStatus("error")
                    }
                )
            }
        },[status]
    )


    return (
        <div className="w-full h-full ">
            {
                status == "loading" && <Loader/>
            }
            {
                status == "loaded" && 
                <div className="w-full h-full flex flex-col items-center ">
                    <h1 className="text-3xl font-bold"> {product.name} </h1>
                    <p className="text-xl"> {product.description} </p>          
                </div>
            }
            {
                status == "error" && <div className="w-full h-full flex justify-center items-center ">
                    <h1 className="text-3xl font-bold text-red-500"> Failed to load product </h1>
                </div>  
            }
        </div>
    )
}   