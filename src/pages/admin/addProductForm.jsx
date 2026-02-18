import { Link } from "react-router-dom";

export default function AddProductForm(){
    return(
        <div className="w-full h-full rounded-lg flex justify-center items-center"> 
            <div className="w-[500px] h-[600px] bg-gray-300   rounded-lg shadow-lg flex flex-col items-center ">

                <h1 className="text-3xl font-bold m-[30px]">Add New Product</h1>

                <input 
                    className="w-[400px] h-[50px] rounded-lg border border-gray-1000 text-center m-[5px]"
                    placeholder="Product ID"
                />
                <input 
                    className="w-[400px] h-[50px] rounded-lg border border-gray-500 text-center m-[5px]"  
                    placeholder="Product Name"
                />
                <input 
                    className="w-[400px] h-[50px] rounded-lg border border-gray-500 text-center m-[5px]"  
                    placeholder="Alternative Name"
                />
                <input      
                    className="w-[400px] h-[50px] rounded-lg border border-gray-500 text-center m-[5px]"
                    placeholder="Price"
                />
                <input
                    className="w-[400px] h-[50px] rounded-lg border border-gray-500 text-center m-[5px]"
                    placeholder="Labeled Price"
                />
                <textarea
                    className="w-[400px] h-[50px] rounded-lg border border-gray-500 text-center m-[5px]"
                    placeholder="Description"
                />
                <input
                    className="w-[400px] h-[50px] rounded-lg border border-gray-500 text-center m-[5px]"
                    placeholder="Stock"
                />

                <div className="w-[400px] h-[100px] flex  justify-between items-center ">
                    <Link to={"/admin/products"} className="w-[180px] h-[50px] p-[10px] bg-red-600 text-black text-center  text-2xl rounded-lg cursor-pointer border border-gray-500   hover:bg-red-400 hover:text-white ">
                        Cancel
                    </Link>
                    <button className="w-[180px] h-[50px] p-[10px] bg-green-600 text-black  text-center text-2xl rounded-lg cursor-pointer border border-gray-500   hover:bg-green-400 hover:text-white ">
                        Add Product
                    </button>
                </div>     
                
            </div>
        </div>
    )
} 