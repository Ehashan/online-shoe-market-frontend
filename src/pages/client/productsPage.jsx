import axios from "axios";
import { useEffect, useState } from "react";
import Loader from "../../components/loader";
import ProductCard from "../../components/product-card";

export default function ProductsPage() {
  const [productList, setProductList] = useState([]);
  const [productsLoaded, setProductsLoaded] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (!productsLoaded) {
      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/api/product/")
        .then((res) => {
          setProductList(res.data);
          setProductsLoaded(true);
        });
    }
  }, [productsLoaded]);

  function searchProducts() {
    if (search.trim().length > 0) {
      axios
        .get(
          import.meta.env.VITE_BACKEND_URL +
            "/api/product/search/" +
            search
        )
        .then((res) => {
          setProductList(res.data.products);
        });
    }
  }

  return (
    <div className="w-full min-h-screen bg-gray-50">
      
      <div className="w-full flex flex-col sm:flex-row justify-center items-center gap-3 px-4 py-6">
        
        <input
          type="text"
          placeholder="Search for shoes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-[300px] h-[45px] px-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <button
          onClick={searchProducts}
          className="h-[45px] px-6 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition"
        >
          Search
        </button>

        <button
          onClick={() => setProductsLoaded(false)}
          className="h-[45px] px-6 bg-gray-300 text-gray-700 rounded-xl hover:bg-gray-300 transition"
        >
          Reset
        </button>

      </div>

      {productsLoaded ? (
        <div className="  bg-gray-200 px-4 sm:px-6 lg:px-20 pb-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-10 "> 
            
          {productList.map((product) => (
            <ProductCard key={product.productId} product={product} />
          ))}
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
}