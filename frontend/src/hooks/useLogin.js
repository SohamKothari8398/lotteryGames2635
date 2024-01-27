import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { useNavigate } from "react-router-dom";
import { useService } from "./useService";

export const useLogin = () => {
  const service = useService();
  const [error, setError] = useState(null);
  const [isLoading, setisLoading] = useState(null);
  const { dispatch } = useAuthContext();
  const navigate = useNavigate();

  const login = async (userID, password) => {
    setisLoading(true);
    setError(null);
    try {
      const response = await service.post("/login", { userID, password });
      if (response.data.Status === "Success") {
        if (response.data.role === "admin") {
          alert("Admin Logged In Successfully.");
          navigate("/admin");
        } else if (response.data.role === "agent") {
          alert("Agent Login Successful.");
          navigate("/agent/home");
        } else {
          alert("User Login Successful.");
          navigate("/user/home");
        }
        localStorage.setItem("user", JSON.stringify(response.data));
        dispatch({ type: "LOGIN", payload: response.data });
      } else if (response.data.error === "User not found") {
        alert("User ID not registered. Please register.");
        navigate("/register");
      } else {
        alert("An unexpected error occurred. Please try again.");
      }
    } catch (err) {
      alert("Check and Enter the Correct Password");
      setError("Failed to login. Please try again.");
    } finally {
      setisLoading(false);
    }
  };
  return { login, isLoading, error };
};
