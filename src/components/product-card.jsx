import { Link } from "react-router-dom"

export default function ProductCard(props) {

    const  product  = props.product
   
    return (
        <Link to={/overview/+product.productId} className="w-[250px] h-[350px] m-5  shadow-2xl rounded-xl   " > 
             
             <img className="w-full h-[220px] object-cover" src={product.images[0]} />

             <div className="h-[110px] w-full flex flex-col justify-center  px-4">

                <p className="text-gray-500">{product.productId}</p> 
                <p className="text-lg font-bold">{product.name}</p>
                <p className="text-lg text-red-500">{product.price.toFixed(2)} 
                    <span>
                        {product.labeledPrice && <span className="line-through text-sm text-gray-500 ml-2">{product.labeledPrice.toFixed(2)}</span>}
                    </span>
                </p>

             </div>

        </Link>
    )
} 
 