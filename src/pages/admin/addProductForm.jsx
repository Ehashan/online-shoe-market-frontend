import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import MediaUpload from "../../utils/mediaUpload";
export default function AddProductForm(){

    const [productId, setProductId] = useState("");
    const [name, setName] = useState("");
    const [alternativeName, setAlternativeName] = useState("");
    const [price, setPrice] = useState("");
    const [labeledPrice, setLabeledPrice] = useState("");
    const [description, setDescription] = useState("");
    const [stock, setStock] = useState("");
    const [images, setImages] = useState([]);
    const navigate = useNavigate();

    async function handleSubmit(){
        
        const promisesARRAY = []
        for(let i=0; i<images.length; i++){
            const promise = MediaUpload(images[i])
            promisesARRAY[i] = promise
        }

        try{
        const result = await Promise.all(promisesARRAY)

        const alternativeNameInArray = alternativeName.split(",")
        const product = {
            productId: productId,
            name: name,
            alternativeName: alternativeNameInArray,
            price: price,
            labeledPrice: labeledPrice,
            description: description,
            stock: stock,
            images : result
        } 

        const token = localStorage.getItem("token")
        console.log(token)

        await axios
            .post(import.meta.env.VITE_BACKEND_URL+"/api/product", product, {
                headers: {
                    Authorization: "Bearer " +token,
                },
            })
        toast.success("Product added successfully")
        navigate("/admin/products")

        }catch(error){
            console.log(error)
            toast.error("Failed to upload images")
        }
       
    }



    return(
        <div className="w-full h-full rounded-lg flex justify-center items-center"> 
            <div className="w-[500px] h-[600px] bg-gray-300   rounded-lg shadow-lg flex flex-col items-center ">

                <h1 className="text-3xl font-bold m-[30px]">Add New Product</h1>

                <input 
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
                    value={alternativeName}
                    onChange={
                        (e)=>{
                            setAlternativeName(e.target.value)
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
                        Add Product
                    </button>
                </div>     
                
            </div>
        </div>
    )
} 