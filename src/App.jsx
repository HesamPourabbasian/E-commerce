import { useState } from "react";
import { CustomCarousel } from "./components/carousel/carousel";
import Countdown from "./components/countdown/countdown";
import Ctitle from "./components/countdown/countdownTitle";
import Footer from "./components/footer/footer";
import Navbar from "./components/navbar/navbar";
import Products from "./components/products/products";
import Timeline from "./components/timeline /timeline";

export default function App() {
  const [cart, setCart] = useState([]);
  const [isCartVisible, setIsCartVisible] = useState(false); // New state for cart visibility

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find(
        (item) => item.name === product.name
      );
      if (existingProduct) {
        return prevCart.map((item) =>
          item.name === product.name
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productName) => {
    setCart(
      (prevCart) => prevCart.filter((item) => item.name !== productName) // Remove product by name
    );
  };

  const toggleCart = () => {
    setIsCartVisible(!isCartVisible); // Toggle visibility of the cart
  };

  return (
    <div className="app bg-[url('https://images5.alphacoders.com/646/thumb-350-646221.webp')] bg-cover bg-center h-auto w-[99%] max-w-[1480px] mx-auto bg-slate-500">
      <Navbar cart={cart} toggleCart={toggleCart} />
      <CustomCarousel />
      <Timeline />
      <Ctitle />
      <Countdown />
      <Products addToCart={addToCart} />
      <Footer />

      {/* Display cart sidebar */}
      <div
        className={`fixed top-0 right-0 z-20 h-full w-1/3 bg-black p-4 transform transition-transform duration-500 ${
          isCartVisible ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <h2 className="text-2xl font-bold text-red-600">Your Cart</h2>
        <ul>
          {cart.map((item, index) => (
            <li key={index} className="flex justify-between">
              <span>
                {item.name} (x{item.quantity})
              </span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
              <button
                className="ml-2 text-red-500"
                onClick={() => removeFromCart(item.name)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
        <div className="mt-4">
          <span className="text-lg font-bold text-red-600">
            Total: $
            {cart
              .reduce((sum, item) => sum + item.price * item.quantity, 0)
              .toFixed(2)}
          </span>
        </div>
        <button
          className="mt-4 btn btn-secondary"
          onClick={toggleCart} // Close the cart
        >
          Close Cart
        </button>
      </div>

      {/* Overlay for the cart */}
      <div
        className={`fixed inset-0 bg-gray-500 bg-opacity-50 z-10 transition-opacity duration-500 ${
          isCartVisible
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={toggleCart}
      ></div>
    </div>
  );
}
