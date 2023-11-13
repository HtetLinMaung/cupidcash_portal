import { useState } from "react";

function CategoryForm({ category = {}, onSubmit, onBackClick }) {
  const [formData, setFormData] = useState({
    name: category.name || "",
    description: category.description || "",
    shop_id: category.shop_id || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="w-full mx-auto mt-5 p-6 bg-white shadow-md rounded-lg">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex space-x-6">
          <div className="flex-1">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              Name
            </label>
            <input
              className="w-full p-2 border rounded-lg"
              id="name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="flex space-x-6">
          <div className="flex-1">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="description"
            >
              Description
            </label>
            <textarea
              className="w-full p-2 border rounded-lg"
              id="description"
              name="description"
              cols="30"
              rows="10"
              value={formData.description}
              onChange={handleChange}
              required
            ></textarea>
          </div>
        </div>

        <div className="flex space-x-6">
          <div className="flex-1">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="shop"
            >
              Shop
            </label>
            <select
              className="w-full p-2 border rounded-lg"
              id="shop"
              name="shop"
              value={formData.shop}
              onChange={handleChange}
              required
            >
              {/* Replace these options with actual shop data */}
              <option value="">Select a Shop</option>
              <option value="shop1">Shop 1</option>
              <option value="shop2">Shop 2</option>
              <option value="shop3">Shop 3</option>
              {/* Add more options as needed */}
            </select>
          </div>
        </div>

        <div className="flex justify-end mt-6">
          <button
            onClick={(e) => {
              e.preventDefault();
              onBackClick(e);
            }}
            className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 mr-2"
          >
            Back
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline"
            type="submit"
          >
            {category.id ? "Update" : "Create"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default CategoryForm;
