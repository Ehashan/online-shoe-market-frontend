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
		<div className="w-full min-h-screen bg-gray-100 flex justify-center items-center p-6">

			{status === "loading" && <Loader />}

			{status === "loaded" && (
				<div className="w-full max-w-6xl h-[500px] bg-gray-300 rounded-2xl shadow-lg p-6 flex flex-col lg:flex-row gap-6">

					<div className="w-full lg:w-[70%] bg-white rounded-2xl shadow p-5 flex flex-col items-center">
						<div className="w-full h-full flex justify-center">
							<ImageSlider images={product.images} />
						</div>
					</div>

					<div className="w-full lg:w-[50%] flex flex-col justify-center px-4">

						<p className="text-gray-500 mb-2 text-sm">
							Home / <span className="text-black font-semibold">Product Details</span>
						</p>

						<h1 className="text-4xl font-bold text-gray-900 mb-2">
							{product.name}
						</h1>

						<p className="text-gray-700 italic mb-4">
							{product.altNames?.join(" | ")}
						</p>

						<div className="flex items-center gap-4 mb-4">
							<h2 className="text-3xl font-bold text-black">
								LKR {product.price.toFixed(2)}
							</h2>

							{product.labeledPrice > product.price && (
								<>
									<h2 className="text-lg line-through text-gray-400">
										LKR {product.labeledPrice.toFixed(2)}
									</h2>

									<span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-semibold">
										{Math.round(
											((product.labeledPrice - product.price) /
												product.labeledPrice) *
												100
										)}% OFF
									</span>
								</>
							)}
						</div>

						<hr className="my-4 text-white" />

						<h3 className="font-semibold text-gray-800 mb-2">
							DESCRIPTION
						</h3>

						<p className="text-gray-600 mb-6">
							{product.description}
						</p>

						<hr className="mb-6 text-white" />

						<div className="flex gap-4">

							<button
								className="w-[200px] h-[55px] border border-black bg-green-600 text-black hover:text-white rounded-full font-semibold hover:bg-green-800 transition-all duration-300 shadow-md"
								onClick={() => {
									addToCart(product, 1);
									toast.success("Product added to cart");
									console.log(getCart());
								}}
							>
								Add to Cart
							</button>

							<button
								className="w-[200px] h-[55px] border-2 border-black text-black rounded-full font-semibold hover:bg-black hover:text-white transition-all duration-300"
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
				<div className="text-red-500 text-2xl font-bold">
					Product not found
				</div>
			)}
		</div>
	);
}