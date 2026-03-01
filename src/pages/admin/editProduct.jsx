import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import MediaUpload from "../../utils/mediaUpload"; 

export default function EditProductForm(){
    const locationData = useLocation() 
    const navigate = useNavigate();
    if(locationData.state == null){
        toast.error("No product data provided")
        window.location.href = "/admin/products"
    }
    const [productId, setProductId] = useState(locationData.state.productId);
    const [name, setName] = useState(locationData.state.name);
    const [altNames, setAltNames] = useState(locationData.state.altNames.join(","));
    const [price, setPrice] = useState(locationData.state.price);
    const [labeledPrice, setLabeledPrice] = useState(locationData.state.labeledPrice);
    const [description, setDescription] = useState(locationData.state.description);
    const [stock, setStock] = useState(locationData.state.stock);
    const [images, setImages] = useState([]);
    

    async function handleSubmit(){
    
        const promisesARRAY = []
        for(let i=0; i<images.length; i++){
            const promise = MediaUpload(images[i])
            promisesARRAY[i] = promise
        }

        try{
        let result = await Promise.all(promisesARRAY)

        if(result.length == 0){
            result = locationData.state.images
        }

        const altNamesInArray = altNames.split(",")
        const product = {
            productId: productId,
            name: name,
            altNames: altNamesInArray,
            price: price,
            labeledPrice: labeledPrice,
            description: description,
            stock: stock,
            images : result
        } 

        const token = localStorage.getItem("token")
        console.log(token)

        await axios
            .put(import.meta.env.VITE_BACKEND_URL+"/api/product/"+productId, product, {
                headers: {
                    Authorization: "Bearer " +token,
                },
            })
        toast.success("Product updated successfully")
        navigate("/admin/products")

        }catch(error){
            console.log(error)
            toast.error("Failed to update images")
        }
       
    }



    return(
        <div className="w-full h-full rounded-lg flex justify-center items-center"> 
            <div className="w-[500px] h-[600px] bg-gray-300   rounded-lg shadow-lg flex flex-col items-center ">

                <h1 className="text-3xl font-bold m-[30px]">Edit Product</h1>

                <input 
                    disabled
                    value={productId}
                    onChange={
                        (e)=>{
                            setProductId(e.target.value)
                        }
                    }
                    className="w-[400px] h-[50px] rounded-lg border border-gray-500 text-center m-[5px]"
                    placeholder="Product ID"
                />
                <input 
                    value={name}
                    onChange={
                        (e)=>{
                            setName(e.target.value)
                        }
                    }
                    className="w-[400px] h-[50px] rounded-lg border border-gray-500 text-center m-[5px]"  
                    placeholder="Product Name"
                />
                <input 
                    value={altNames}
                    onChange={
                        (e)=>{
                            setAltNames(e.target.value)
                        }
                    }
                    className="w-[400px] h-[50px] rounded-lg border border-gray-500 text-center m-[5px]"  
                    placeholder="Alternative Name"
                />
                <input 
                    value={price}
                    onChange={
                        (e)=>{
                            setPrice(e.target.value)
                        }
                    }   
                    type="number"  
                    className="w-[400px] h-[50px] rounded-lg border border-gray-500 text-center m-[5px]"
                    placeholder="Price"
                />
                <input
                    value={labeledPrice}
                    onChange={
                        (e)=>{
                            setLabeledPrice(e.target.value)
                        }
                    }
                    type="number"
                    className="w-[400px] h-[50px] rounded-lg border border-gray-500 text-center m-[5px]"
                    placeholder="Labeled Price"
                />
                <textarea
                    value={description}
                    onChange={
                        (e)=>{
                            setDescription(e.target.value)
                        }
                    }
                    className="w-[400px] h-[50px] rounded-lg border border-gray-500 text-center m-[5px]"
                    placeholder="Description"
                />
                <input 
                    type="file"
                    onChange={
                        (e)=>{
                            setImages(e.target.files)
                        }
                    }
                    multiple
                    className="w-[400px] h-[50px] rounded-lg border border-gray-500 text-center m-[5px]"
                    placeholder="Upload Images"

                />
                
                <input  //images
                
                    value={stock}
                    onChange={
                        (e)=>{
                            setStock(e.target.value)
                        }
                    }
                    
                    type="number"
                    className="w-[400px] h-[50px] rounded-lg border border-gray-500 text-center m-[5px]"
                    placeholder="Stock"
                />

                <div className="w-[400px] h-[100px] flex  justify-between items-center ">
                    <Link to={"/admin/products"} className="w-[180px] h-[50px] p-[10px] bg-red-600 text-black text-center  text-2xl rounded-lg cursor-pointer border border-gray-500   hover:bg-red-400 hover:text-white ">
                        Cancel
                    </Link>
                    <button onClick={handleSubmit} className="w-[180px] h-[50px] p-[10px] bg-green-600 text-black  text-center text-2xl rounded-lg cursor-pointer border border-gray-500   hover:bg-green-400 hover:text-white ">
                        Edit Product
                    </button>
                </div>     
                
            </div>
        </div>
    )
} 