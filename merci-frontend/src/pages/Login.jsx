import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { authenticateUser } from "../api/userApi";
import { AuthContext } from "../contexts/AuthContext";
import { useDispatch } from "react-redux";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login, redirectAfterLogin } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await authenticateUser({ email, password });
      if (response.status === 200) {
        login(response.data.user, response.data.token);

        // If redirectAfterLogin is set, navigate to that path
        if (redirectAfterLogin) {
          dispatch(addToCart({ productId: productId }));
          navigate(redirectAfterLogin);
        } else {
          navigate("/");
        }
      } else {
        setError("Invalid email or password");
      }
    } catch (err) {
      setError("Error logging in. Please try again.");
    }
  };

  return (
    <div className="container mx-auto p-4 mt-16">
      <div className="max-w-md mx-auto bg-white p-8 border border-gray-300 rounded">
        <h2 className="text-2xl font-bold mb-4 flex justify-center items-center">
          Login
        </h2>

        {error && <div className="mb-4 text-red-500 text-center">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="abc@xyz.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
