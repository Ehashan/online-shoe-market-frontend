import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaTrashAlt } from "react-icons/fa";
import axios from "axios";
import toast from "react-hot-toast";

export default function CheckoutPage() {
    const location = useLocation();
    const navigate = useNavigate();

    const [cart, setCart] = useState(location.state?.items || []);
    const [refresh, setRefresh] = useState(false);

    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");

    function placeOrder() {
        const orderData = {
            name,
            address,
            phoneNumber,
            billItems: cart.map((item) => ({
                productId: item.productId,
                quantity: item.quantity,
            })),
        };

        const token = localStorage.getItem("token");

        axios.post(
            import.meta.env.VITE_BACKEND_URL + "/api/order",
            orderData,
            {
                headers: {
                    Authorization: "Bearer " + token,
                },
            }
        )
        .then(() => {
            toast.success("Order placed successfully");
            navigate("/");
        })
        .catch((error) => {
            toast.error("Failed to place order");
            console.error(error);
        });
    }

    function getTotal() {
        return cart.reduce(
            (total, item) =>
                total +
                Number(item.price || 0) * Number(item.quantity || 0),
            0
        );
    }

    function getTotalForLabelledPrice() {
        return cart.reduce(
            (total, item) =>
                total +
                Number(item.labeledPrice || 0) *
                    Number(item.quantity || 0),
            0
        );
    }

    return (
        <div className="w-full min-h-screen flex justify-center bg-gray-100 py-10">
            <div className="w-[750px] bg-gray-200 rounded-xl shadow-lg p-6">

                <h1 className="text-3xl font-bold mb-5">Shopping Cart</h1>

                {cart.map((item, index) => (
                    <div
                        key={index}
                        className="w-full flex items-center justify-between bg-white rounded-xl p-3 my-3 shadow"
                    >
                        <img
                            src={item.image}
                            className="h-[90px] w-[90px] object-cover rounded-lg"
                        />

                        <div className="flex flex-col w-[250px]">
                            <h1 className="text-lg font-semibold">
                                {item.name}
                            </h1>

                            <h2 className="text-sm text-gray-500">
                                {item.altNames?.join(" | ") || ""}
                            </h2>

                            <h2 className="text-lg font-bold text-green-600">
                                LKR: {Number(item.price || 0).toFixed(2)}
                            </h2>
                        </div>

                        <div className="flex items-center gap-3">
                            <button
                                className="w-[35px] h-[35px] bg-gray-300 rounded-lg"
                                onClick={() => {
                                    const newCart = [...cart];
                                    newCart[index].quantity =
                                        Math.max(
                                            1,
                                            newCart[index].quantity - 1
                                        );
                                    setCart(newCart);
                                    setRefresh(!refresh);
                                }}
                            >
                                -
                            </button>

                            <h1 className="w-[30px] text-center">
                                {item.quantity}
                            </h1>

                            <button
                                className="w-[35px] h-[35px] bg-gray-300 rounded-lg"
                                onClick={() => {
                                    const newCart = [...cart];
                                    newCart[index].quantity += 1;
                                    setCart(newCart);
                                    setRefresh(!refresh);
                                }}
                            >
                                +
                            </button>

                            <button
                                className="px-4 py-2 bg-red-500 text-white rounded-lg"
                                onClick={() => {
                                    const newCart = cart.filter(
                                        (p) =>
                                            p.productId !==
                                            item.productId
                                    );
                                    setCart(newCart);
                                    setRefresh(!refresh);
                                }}
                            >
                                <FaTrashAlt />
                            </button>
                        </div>
                    </div>
                ))}

                
                <div className="mt-6 border-t pt-4 space-y-2 flex flex-col items-end">

                    <div className="flex justify-end w-full">
                        <h1 className="w-[150px] text-end">Total</h1>
                        <h1 className="w-[150px] text-end">
                            {getTotalForLabelledPrice().toFixed(2)}
                        </h1>
                    </div>

                    <div className="flex justify-end w-full">
                        <h1 className="w-[150px] text-end">Discount</h1>
                        <h1 className="w-[150px] text-end text-gray-500 border-b">
                            -
                            {(
                                getTotalForLabelledPrice() - getTotal()
                            ).toFixed(2)}
                        </h1>
                    </div>

                    <div className="flex justify-end w-full">
                        <h1 className="w-[150px] text-end font-bold">
                            Net Total
                        </h1>
                        <h1 className="w-[150px] text-end font-bold border-b-4 border-double">
                            LKR {getTotal().toFixed(2)}
                        </h1>
                    </div>

                    
                    <div className="flex justify-end w-full mt-4">
                        <span className="w-[150px] text-end pr-2">Name</span>
                        <input
                            className="w-[300px] h-[40px] border rounded-lg text-center"
                            value={name}
                            onChange={(e) =>
                                setName(e.target.value)
                            }
                        />
                    </div>

                    <div className="flex justify-end w-full">
                        <span className="w-[150px] text-end pr-2">
                            Address
                        </span>
                        <input
                            className="w-[300px] h-[40px] border rounded-lg text-center"
                            value={address}
                            onChange={(e) =>
                                setAddress(e.target.value)
                            }
                        />
                    </div>

                    <div className="flex justify-end w-full">
                        <span className="w-[150px] text-end pr-2">
                            Phone
                        </span>
                        <input
                            className="w-[300px] h-[40px] border rounded-lg text-center"
                            value={phoneNumber}
                            onChange={(e) =>
                                setPhoneNumber(e.target.value)
                            }
                        />
                    </div>

                    <button
                        className="mt-4 w-[200px] h-[45px] bg-green-600 text-white rounded-lg"
                        onClick={placeOrder}
                    >
                        Place Order
                    </button>
                </div>
            </div>
        </div>
    );
}