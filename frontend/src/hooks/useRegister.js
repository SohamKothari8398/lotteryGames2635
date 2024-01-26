import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useRegister = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useAuthContext();

  const register = async (userId, mobileNumber, password, promoCode) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userID: userId,
          mobileNumber,
          password,
          promoCode,
        }),
      });

      const json = await response.json();

      if (!response.ok) {
        setIsLoading(false);
        setError(json.error);
      }

      if (response.ok) {
        setIsLoading(false);
        setError(null);
        localStorage.setItem("user", JSON.stringify(response.data));
        dispatch({ type: "REGISTER", payload: response.data });
      }
    } catch (error) {
      console.error("Caught Error:", error);
      setError("Something went wrong during registration.");
      setIsLoading(false);
    }
  };

  return { register, isLoading, error };
};
