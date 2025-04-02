import axios from "axios";

export const checkAuth = async () => {
  try {
    const response = await axios.get("http://localhost:3002/check-auth", {
      withCredentials: true,
    });
    return response.data.authenticated; // Assuming backend sends { authenticated: true/false }
  } catch (error) {
    console.error("Auth check failed:", error);
    return false;
  }
};
