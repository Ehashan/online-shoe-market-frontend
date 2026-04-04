import { useState } from "react";
import toast from "react-hot-toast";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (!name || !email || !message) {
      toast.error("Please fill all fields");
      return;
    }

    toast.success("Message sent successfully");

    setName("");
    setEmail("");
    setMessage("");
  }

  return (
    <div className="w-full min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-10 py-10">
      
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-10">
        Contact Us 📩
      </h1>

      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
        
        <div className="bg-white p-6 rounded-2xl shadow-md">
          
          <h2 className="text-xl font-semibold mb-4">Send a Message</h2>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            
            <input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />

            <input
              type="email"
              placeholder="Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />

            <textarea
              placeholder="Your Message"
              rows="4"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />

            <button
              type="submit"
              className="bg-indigo-600 text-white py-2.5 rounded-xl hover:bg-indigo-700 transition"
            >
              Send Message
            </button>

          </form>
        </div>

        <div className="flex flex-col justify-center gap-6">
          
          <div className="bg-white p-6 rounded-2xl shadow-md">
            <h3 className="font-semibold text-gray-800 mb-2">📍 Address</h3>
            <p className="text-gray-600">Colombo, Sri Lanka</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-md">
            <h3 className="font-semibold text-gray-800 mb-2">📞 Phone</h3>
            <p className="text-gray-600">+94 77 123 4567</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-md">
            <h3 className="font-semibold text-gray-800 mb-2">✉️ Email</h3>
            <p className="text-gray-600">support@shoestore.com</p>
          </div>

        </div>

      </div>
    </div>
  );
}