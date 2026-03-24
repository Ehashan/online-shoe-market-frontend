import { Route, Routes } from "react-router-dom";
import Header from "../components/header";
import ProductsPage from "./client/productsPage";
import ProductOverview from "./client/productOverview";
import CartPage from "./client/cart";
import CheckoutPage from "./client/checkout";




export default function HomePage() {
 return (
     <div className="w-full h-screen h-screen ">
          <Header  />
          <div className="w-full min-h-[calc(100vh-75px)] ">  

            <Routes path="/*">
                <Route path= "/" element={ <h1> Home Page</h1>}/>
                <Route path= "/product" element={<ProductsPage/>}/>
                <Route path= "/*" element={ <h1>404 Not Found</h1>}/> 
                <Route path= "/overview/:id" element={<ProductOverview/>} />
                <Route path= "/contact" element={ <h1>Contact Us</h1>}/>
                <Route path= "/reviews" element={ <h1>Reviews</h1>}/>
                <Route path= "/Cart" element={ <CartPage/>}/>
                <Route path="/checkout" element={ <CheckoutPage/>}/>

                
                


            </Routes>
 
          </div>
       </div>        
    );
}  