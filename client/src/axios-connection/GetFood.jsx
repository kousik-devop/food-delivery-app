import axios from "axios";

const GetFood = async () => {
  try {
    const response = await axios.get("http://localhost:3000/api/food/", {
      withCredentials: true, // Keep this to handle any CORS or cookie-based logic if needed later
    });

    if (response.data && response.data.foodItems) {
      return response.data.foodItems;
    }
    return [];
  } catch (error) {
    console.error("Error fetching food data:", error.response?.data?.message || error.message);
    throw new Error(error.response?.data?.message || "Failed to fetch food data.");
  }
};

export default GetFood;