import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../components/loader";
import ImageSlider from "../../components/imageSlider";
import getCart, { addToCart } from "../../utils/cart";

export default function ProductOverview() {
	const params = useParams();

	if (params.id == null) {
		window.location.href = "/products";
	}

	const [product, setProduct] = useState(null);
	const [status, setStatus] = useState("loading");
	const navigate = useNavigate();

	useEffect(() => {
		if (status === "loading") {
			axios
				.get(import.meta.env.VITE_BACKEND_URL + "/api/product/" + params.id)
				.then((res) => {
					setProduct(res.data.product);
					setStatus("loaded");
				})
				.catch(() => {
					toast.error("Product is not available!");
					setStatus("error");
				});
		}
	}, [status]);

	return (
		<div className="w-full min-h-screen bg-gray-100 flex justify-center items-start p-3 sm:p-6">

			{status === "loading" && <Loader />}

			{status === "loaded" && (
				<div className="w-full max-w-7xl bg-gray-200 rounded-2xl shadow-lg p-3 sm:p-6 flex flex-col lg:flex-row gap-4 sm:gap-6">

					
					<div className="block lg:hidden px-2">

						<p className="text-gray-500 text-xs sm:text-sm mb-1">
							Home / <span className="text-black font-semibold">Product Details</span>
						</p>

						<h1 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-tight">
							{product.name}
						</h1>

						<p className="text-gray-600 italic text-sm sm:text-base mb-3">
							{product.altNames?.join(" | ")}
						</p>

					</div>

					
					<div className="w-full lg:w-[55%] bg-white rounded-2xl shadow p sm:p-5 flex justify-center items-center ">

						<div className="w-full max-w-md sm:max-w-lg md:max-w-xl ">
							<ImageSlider images={product.images} />
						</div>

					</div>

					
					<div className="w-full lg:w-[45%] flex flex-col justify-center px-2 sm:px-4">

						
						<div className="hidden lg:block">

							<p className="text-gray-500 text-sm mb-2">
								Home / <span className="text-black font-semibold">Product Details</span>
							</p>

							<h1 className="text-4xl font-bold text-gray-900 mb-2">
								{product.name}
							</h1>

							<p className="text-gray-600 italic mb-4">
								{product.altNames?.join(" | ")}
							</p>

						</div>

						
						<div className="flex flex-wrap items-center gap-2 sm:gap-4 mb-4 mt-20 lg:mt-0">

							<h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-black">
								LKR {product.price.toFixed(2)}
							</h2>

							{product.labeledPrice > product.price && (
								<>
									<h2 className="text-sm sm:text-lg line-through text-gray-400">
										LKR {product.labeledPrice.toFixed(2)}
									</h2>

									<span className="bg-red-100 text-red-600 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold">
										{Math.round(
											((product.labeledPrice - product.price) /
												product.labeledPrice) *
												100
										)}% OFF
									</span>
								</>
							)}

						</div>

						<hr className="my-3 sm:my-4" />

						
						<h3 className="font-semibold text-gray-800 text-sm sm:text-base mb-2">
							DESCRIPTION
						</h3>

						<p className="text-gray-600 text-sm sm:text-base mb-4 sm:mb-6">
							{product.description}
						</p>

						<hr className="mb-4 sm:mb-6" />

						
						<div className="flex flex-col sm:flex-row gap-3 sm:gap-4">

							<button
								className="w-full sm:w-[200px] h-[50px] bg-green-600 text-white rounded-full font-semibold hover:bg-green-700 transition-all duration-300"
								onClick={() => {
									addToCart(product, 1);
									toast.success("Product added to cart");
									console.log(getCart());
								}}
							>
								Add to Cart
							</button>

							<button
								className="w-full sm:w-[200px] h-[50px] border-2 border-black text-black rounded-full font-semibold hover:bg-black hover:text-white transition-all duration-300"
								onClick={() => {
									navigate("/checkout", {
										state: {
											items: [
												{
													productId: product.productId,
													name: product.name,
													altNames: product.altNames,
													price: product.price,
													labeledPrice: product.labeledPrice,
													image: product.images[0],
													quantity: 1,
												},
											],
										},
									});
								}}
							>
								Buy Now
							</button>

						</div>

					</div>
				</div>
			)}

			{status === "error" && (
				<div className="text-red-500 text-xl sm:text-2xl font-bold">
					Product not found
				</div>
			)}
		</div>
	);
}