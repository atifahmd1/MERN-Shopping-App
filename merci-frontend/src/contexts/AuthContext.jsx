// src/contexts/AuthContext.js
import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchUser } from "../api/userApi";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    user: null,
    token: null,
    loading: true,
  });

  const [redirectAfterLogin, setRedirectAfterLogin] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("token: ", token);
    if (token) {
      fetchUser(token)
        .then((response) => {
          setAuthState({ user: response.data, token, loading: false });
        })
        .catch(() => {
          setAuthState({ user: null, token: null, loading: false });
        });
    } else {
      setAuthState({ user: null, token: null, loading: false });
    }
  }, []);

  const login = (user, token) => {
    localStorage.setItem("token", token);
    setAuthState({ user, token, loading: false });

    // Redirect after login
    if (redirectAfterLogin) {
      navigate(redirectAfterLogin);
      setRedirectAfterLogin(null);
    } else {
      navigate("/");
      // window.location.reload();
      console.log("login successful");
      // console.log(user);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setAuthState({ user: null, token: null, loading: false });
    navigate("/");
  };

  return (
    <AuthContext.Provider
      value={{ authState, setAuthState, login, logout, setRedirectAfterLogin }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
