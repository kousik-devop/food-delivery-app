import React, { useState, useEffect } from "react";
import axios from "axios";
import BottomNav from "../../components/partner-components/dashboard/BottomNav";
import { usePartner } from "../../contexts/PartnerContext";
import { useFood } from "../../contexts/FoodContext";


const CreateFoodPage = () => {

  const { partner, token } = usePartner();
  const { refetchFoods } = useFood();


  const [formData, setFormData] = useState({
    restaurantName: partner?.restaurantName || "ABC",
    price: "",
    foodName: "",
    category: "",
    description: "",
    video: null,
    image: null,
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (partner?.restaurantName) {
      setFormData((prev) => ({ ...prev, restaurantName: partner.restaurantName }));
    }
  }, [partner]);

  // Handle text input
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle file input
  const handleFileChange = (e) => {
    setFormData({ ...formData, video: e.target.files[0] });
  };

  // Handle image file input
  const handleImageChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    // Require at least one of video or image
    if (!formData.video && !formData.image) {
      setMessage("Please select an image or video file.");
      setLoading(false);
      return;
    }

    try {
      const data = new FormData();
      data.append("restaurantName", formData.restaurantName);
      data.append("price", formData.price);
      data.append("foodName", formData.foodName);
      data.append("category", formData.category);
      data.append("description", formData.description);
  if (formData.video) data.append("video", formData.video);
  if (formData.image) data.append("image", formData.image);

      console.log("Submitting form with token:", token);
      console.log("Submitting form with partner:", partner);


      if (!partner) {
        setMessage("You must login first.");
        setLoading(false);
        return;
      }

      const res = await axios.post("http://localhost:3000/api/food/", data, {
        headers: {
          // Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });

      setMessage(res.data.message || "Food created successfully!");
      setIsSuccess(true);
      await refetchFoods(); // Immediately refetch the food list
    } catch (err) {
      console.error("❌ Error:", err.response?.data || err.message);
      setMessage(err.response?.data?.message || "Error creating food!");
    } finally {
      setLoading(false);
    }
  };

  const handleAddNew = () => {
    setIsSuccess(false);
    setMessage("");
    setFormData({
      restaurantName: partner?.restaurantName || "ABC",
      price: "",
      foodName: "",
      category: "",
      description: "",
      video: null,
      image: null,
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 pb-20">
      {/* Header */}
      <header className="bg-blue-600 text-white py-4 shadow-md">
        <h1 className="text-xl font-bold text-center">Add New Food</h1>
      </header>

      {/* Form Section */}
      <main className="flex-grow p-6">
        <div className="max-w-lg mx-auto bg-white shadow-lg rounded-xl p-6">
          {isSuccess ? (
            <div className="text-center py-10">
              <svg
                className="w-16 h-16 mx-auto text-green-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              <h2 className="text-2xl font-bold text-gray-800 mt-4">
                Success!
              </h2>
              <p className="text-gray-600 mt-2">{message}</p>
              <button
                onClick={handleAddNew}
                className="mt-6 bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition"
              >
                Add Another Food
              </button>
            </div>
          ) : (
            <>
              <h2 className="text-lg font-semibold mb-4">Food Details</h2>

              {message && (
                <p className="text-center mb-3 text-sm text-red-600">{message}</p>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  name="foodName"
                  placeholder="Food Name"
                  value={formData.foodName}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="number"
                  name="price"
                  placeholder="Price"
                  value={formData.price}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  name="category"
                  placeholder="Category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
                <textarea
                  name="description"
                  placeholder="Description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="file"
                  accept="video/*"
                  name="video"
                  onChange={handleFileChange}
                  className="w-full"
                />

                <div>
                  <label className="block text-sm font-medium text-gray-700 mt-2">Food Image (optional)</label>
                  <input
                    type="file"
                    accept="image/*"
                    name="image"
                    onChange={handleImageChange}
                    className="w-full mt-1"
                  />
                  {formData.image && (
                    <div className="mt-2">
                      <img
                        src={URL.createObjectURL(formData.image)}
                        alt="preview"
                        style={{ width: 120, height: 80, objectFit: 'cover', borderRadius: 8 }}
                      />
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
                >
                  {loading ? "Creating..." : "Create Food"}
                </button>
              </form>
            </>
          )}
        </div>
      </main>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
};

export default CreateFoodPage;
