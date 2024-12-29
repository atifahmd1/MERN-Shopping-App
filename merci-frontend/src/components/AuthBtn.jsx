import React, { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export const AuthBtn = () => {
  const navigate = useNavigate();
  const { authState, logout } = useContext(AuthContext);

  return (
    <div>
      {authState.token ? (
        <button
          onClick={logout}
          className="text-white text-xl font-bold py-2 px-8 rounded bg-red-500 hover:bg-red-700"
        >
          Logout
        </button>
      ) : (
        <button
          onClick={() => navigate("/login")}
          className="text-white text-xl font-bold py-2 px-8 rounded bg-green-500 hover:bg-green-700"
        >
          Login
        </button>
      )}
    </div>
  );
};
