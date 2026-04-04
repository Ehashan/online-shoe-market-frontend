import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../../components/product-card";
import { FiSearch, FiRefreshCw } from "react-icons/fi";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [images, setImages] = useState([]);
  const [current, setCurrent] = useState(0);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadProducts();
  }, []);

  function loadProducts() {
    axios
      .get(import.meta.env.VITE_BACKEND_URL + "/api/product/")
      .then((res) => {
        setProducts(res.data);

        const imgs = res.data.flatMap((p) => p.images || []);
        setImages(imgs);
      });
  }

  function searchProducts() {
    if (search.trim().length > 0) {
      axios
        .get(
          import.meta.env.VITE_BACKEND_URL +
            "/api/product/search/" +
            search
        )
        .then((res) => {
          setProducts(res.data.products);
        });
    }
  }

  useEffect(() => {
    if (images.length === 0) return;

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [images]);

  return (
    <div className="w-full overflow-x-hidden bg-blue-200">
      
      <div className="max-w-[1400px] mx-auto px-4 flex flex-col gap-8">

        <div className="w-full flex justify-center items-center gap-2 mt-2">

            <input
                type="text"
                placeholder="Search shoes..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full sm:w-[750px] h-[45px] px-4 rounded-xl border border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
            />


            <button
                onClick={searchProducts}
                className="h-[45px] w-[45px] flex items-center justify-center bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition"
            >
                <FiSearch size={20} />
            </button>

            <button
                onClick={loadProducts}
                className="h-[45px] w-[45px] flex items-center justify-center bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition hover:rotate-180 duration-300"
            >
                <FiRefreshCw size={20} />
            </button>

            </div>
        <div className="w-full h-[400px] relative rounded-2xl overflow-hidden">
          
          {images.length > 0 && (
            <img
              src={images[current]}
              className="absolute w-full h-full object-cover transition duration-700"
            />
          )}

          <div className="absolute inset-0 bg-black/50"></div>

          <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-6">
            <h1 className="text-4xl sm:text-5xl font-bold">
              Mega Sale 👟
            </h1>
            <p className="mt-3 text-lg">
              Up to 60% OFF on Shoes
            </p>
          </div>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
            {images.slice(0, 5).map((_, i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full ${
                  i === current % 5 ? "bg-white" : "bg-white/50"
                }`}
              ></div>
            ))}
          </div>
        </div>

        <div className="w-full h-[120px] bg-gradient-to-r from-pink-500 to-orange-400 rounded-2xl flex flex-wrap sm:flex-nowrap items-center justify-center sm:justify-around gap-4 px-4 text-white font-semibold text-sm sm:text-lg overflow-hidden">
          <span>🔥 Flash Deals</span>
          <span>🚚 Free Delivery</span>
          <span>💰 Best Prices</span>
          <span>🎁 Special Offers</span>
        </div>

        <div className="w-full">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Flash Sale
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 ml-8 md:ml-0 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {products.slice(0, 6).map((p) => (
              <ProductCard key={p.productId} product={p} />
            ))}
          </div>
        </div>
        <div className="w-full">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Categories
          </h2>

          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
            {[
              "Sneakers",
              "Sports",
              "Casual",
              "Formal",
              "Sandals",
              "Boots",
              "Running",
              "Kids",
            ].map((cat, i) => (
              <div
                key={i}
                className="bg-white p-4 rounded-xl shadow-sm text-center hover:shadow-lg transition cursor-pointer"
              >
                <p className="text-sm font-medium text-gray-700">
                  {cat}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="w-full">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Just For You
          </h2>

          <div className="grid grid-cols-1  ml-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {products.map((p) => (
              <ProductCard key={p.productId} product={p} />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}