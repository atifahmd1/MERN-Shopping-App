// src/components/BuyNowButton.js
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const BuyNowButton = ({ productId }) => {
  const { authState, setRedirectAfterLogin } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleBuyNow = () => {
    if (authState.token) {
      // Add product to cart and navigate to cart page
      navigate("/cart");
      // Here you can add logic to add the product to the cart
    } else {
      // Set redirect path after login and navigate to login page
      setRedirectAfterLogin(`/buy/${productId}`);
      navigate("/login");
    }
  };

  return (
    <button onClick={handleBuyNow} className="btn btn-primary">
      Buy Now
    </button>
  );
};

export default BuyNowButton;
