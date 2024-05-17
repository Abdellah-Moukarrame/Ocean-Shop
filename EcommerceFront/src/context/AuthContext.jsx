import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  const csrf = () => api.get("/sanctum/csrf-cookie");

  const getUser = async () => {
    const { data } = await api.get("/api/user");
    setUser(data);
  };

  const login = async ({ ...data }) => {
    await csrf();
    try {
      await api.post("/login", data);
      await getUser();
      navigate("/verify");
    } catch (e) {
      console.log(e);
      if (e.response.status === 422) {
        setErrors(e.response.data.errors);
      }
    }
  };

  const register = async ({ ...data }) => {
    await csrf();
    try {
      setErrors({});
      await api.post("/register", data);

      navigate("/login", {
        state: { message: "Account created successfully.." },
      });
    } catch (e) {
      console.log(e);
      if (e.response.status === 422) {
        setErrors(e.response.data.errors);
      }
    }
  };

  const logout = () => {
    api.post("/logout").then(() => {
      setUser(null);
      navigate("/", { state: { message: "You have been logged out!" } });
    });
  };

  useEffect(() => {
    if (!user) {
      getUser();
    }
  }, []);

  useEffect(() => {
    const errorTimeout = setTimeout(() => {
      setErrors({});
    }, 5000);

    return () => {
      clearTimeout(errorTimeout);
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        errors,
        getUser,
        login,
        register,
        logout,
        setErrors,
        csrf,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default function useAuthContext() {
  return useContext(AuthContext);
}
