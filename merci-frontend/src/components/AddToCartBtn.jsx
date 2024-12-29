// src/components/AddToCartButton.js
import { useState, useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { useDispatch, useSelector } from "react-redux";

const AddToCartButton = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [inCart, setInCart] = useState(false);
  const { authState, setRedirectAfterLogin } = useContext(AuthContext);

  const cartItems = useSelector((state) => state.cart.items);
  useEffect(() => {
    const productInCart = cartItems.some((item) => item?._id === product?._id);
    setInCart(productInCart);
  }, [cartItems, product?._id]);

  const handleAddToCart = () => {
    if (authState.token) {
      if (inCart) {
        navigate("/user/cart");
      } else {
        setInCart(true);
        dispatch(addItemToCart(product));
      }
    } else {
      // Set redirect path after login and the current location
      setRedirectAfterLogin(location.pathname);
      navigate("/login");
    }
  };

  return (
    <button
      onClick={handleAddToCart}
      className={`text-white font-bold py-2 px-2 rounded ${
        inCart
          ? "bg-green-500 hover:bg-green-700"
          : "bg-blue-500 hover:bg-blue-700"
      }`}
    >
      {inCart ? "Go to Cart" : "Add to Cart"}
    </button>
  );
};

export default AddToCartButton;
