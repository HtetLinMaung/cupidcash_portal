import React, { useState, useEffect, useContext } from "react";
import moment from "moment";
import Swal from "sweetalert2";
import money from "mm-money";
function PurchaseForm({ purchases = {}, shops = [], onSubmit, onBackClick }) {
  const [formData, setFormData] = useState({
    total_cost: purchases.total_cost || "0.00",
    purchase_date: purchases.purchase_date
      ? moment(purchases.purchase_date).format("YYYY-MM-DD")
      : moment().format("YYYY-MM-DD"),
    shop_id: purchases.shop_id || "0",
    purchase_details: purchases.purchase_details || [],
  });

  const [itemDetail, setItemDetail] = useState({
    ingredient_id: purchases.ingredient_id || "0",
    quantity_purchased: purchases.quantity_purchased || "0.00",
    unit: purchases.unit || "Kg",
    buying_price_per_unit: purchases.buying_price_per_unit || "0.00",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "ingredient_shop_id") {
      // If the selected field is shop_id, update itemDetail
      setItemDetail((prevItemDetail) => ({
        ...prevItemDetail,
        ingredient_id: value,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const addItem = () => {
    // if (
    //   !itemDetail.ingredient_id ||
    //   itemDetail.ingredient_id === "0" ||
    //   !itemDetail.quantity_purchased ||
    //   itemDetail.quantity_purchased === "0.00" ||
    //   !itemDetail.buying_price_per_unit ||
    //   itemDetail.buying_price_per_unit === "0.00"
    // ) {
    //   return Swal.fire({
    //     icon: "error",
    //     text: "Please Fill All Forms",
    //     showConfirmButton: false,
    //     timer: 5000,
    //   });
    // }
    setFormData((prevData) => {
      const updatedData = {
        ...prevData,
        purchase_details: [...prevData.purchase_details, itemDetail],
      };
      return updatedData;
    });
    console.log("itemDetail", formData);
  };

  useEffect(() => {
    // Your useEffect logic goes here (if needed)
  }, []);

  const handleSubmit = () => {
    const formattedData = {
      total_cost: parseFloat(formData.total_cost),
      purchase_date: formData.purchase_date,
      shop_id: parseInt(formData.shop_id),
      purchase_details: formData.purchase_details.map((detail) => ({
        ingredient_id: parseInt(detail.ingredient_id),
        quantity_purchased: parseFloat(detail.quantity_purchased),
        unit: detail.unit,
        buying_price_per_unit: parseFloat(detail.buying_price_per_unit),
      })),
    };

    onSubmit(formattedData);
  };

  const deleteItem = (index) => {
    setFormData((prevData) => {
      const updatedPurchaseDetails = [...prevData.purchase_details];
      updatedPurchaseDetails.splice(index, 1);
      return {
        ...prevData,
        purchase_details: updatedPurchaseDetails,
      };
    });
  };
  const showshop = (ingredientId) => {
    const shop = shops.find((shop) => shop.value == ingredientId);
    return shop ? shop.label : "Unknown Shop";
  };

  return (
    <div className="w-full mx-auto mt-5 p-6 bg-white shadow-md rounded-lg">
      <form className="space-y-6">
        <div className="flex space-x-6">
          <div className="flex-1">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="total_cost"
            >
              Total Cost
            </label>
            <input
              onBlur={(e) =>
                setFormData({
                  ...formData,
                  total_cost: money.format(e.target.value),
                })
              }
              className="w-full p-2 rounded-lg border transition focus:border-white focus:outline-none focus:ring-2 focus:ring-c4c4c4"
              id="total_cost"
              type="text"
              name="total_cost"
              value={formData.total_cost}
              onChange={handleChange}
            />
          </div>
          <div className="flex-1">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="purchase_date"
            >
              Date
            </label>
            <input
              value={formData.purchase_date}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  purchase_date: e.target.value,
                })
              }
              type="date"
              className="p-2 w-full rounded-lg border transition focus:border-white focus:outline-none focus:ring-2 focus:ring-c4c4c4"
            />
          </div>
        </div>

        <div className="flex space-x-6">
          <div className="flex-1">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="shop_id"
            >
              Shop
            </label>
            <select
              className="w-full p-2 rounded-lg border transition focus:border-white focus:outline-none focus:ring-2 focus:ring-c4c4c4 "
              id="shop_id"
              name="shop_id"
              value={formData.shop_id}
              onChange={handleChange}
              required
            >
              <option value="0">Select a Shop</option>
              {shops.map((shop) => (
                <option key={shop.value} value={shop.value}>
                  {shop.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        <hr />
      </form>
      <div className="space-y-6 pt-4">
        <div className="flex">
          <label
            className="block text-gray-700 underline text-sm font-bold mb-2"
            htmlFor="shop_id"
          >
            Item Detail
          </label>
          <div
            className="ml-auto cursor-pointer bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline"
            onClick={() => {
              addItem();
            }}
          >
            Add
          </div>
        </div>
        <div>
          {formData.purchase_details.map((detail, index) => (
            <div key={index} className="flex items-center mb-2">
              <div className="mr-2 text-gray-500">
                {showshop(detail.ingredient_id)}
              </div>

              <div className="mr-2 text-gray-500">
                {detail.quantity_purchased}
              </div>
              <div className="mr-2 text-gray-500">{detail.unit}</div>
              <div className="mr-2 text-gray-500">
                {detail.buying_price_per_unit}
              </div>
              <button
                className="text-red-500"
                onClick={() => deleteItem(index)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
        <div className="flex space-x-6">
          <div className="flex-1">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="shop_id"
            >
              Ingredient
            </label>
            <select
              className=" w-full p-2 rounded-lg border transition focus:border-white focus:outline-none focus:ring-2 focus:ring-c4c4c4"
              id="ingredient_shop_id"
              name="ingredient_shop_id"
              value={itemDetail.ingredient_id}
              onChange={handleChange}
              required
            >
              <option value="0">Select a Ingredient</option>
              {shops.map((shop) => (
                <option key={shop.value} value={shop.value}>
                  {shop.label}
                </option>
              ))}
            </select>
          </div>
          <div className="flex-1">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="purchase_date"
            >
              Quantity Purchased
            </label>
            <input
              onBlur={(e) =>
                setItemDetail({
                  ...itemDetail,
                  quantity_purchased: money.format(
                    itemDetail.quantity_purchased
                  ),
                })
              }
              className="w-full p-2 rounded-lg border transition focus:border-white focus:outline-none focus:ring-2 focus:ring-c4c4c4"
              id="quantity_purchased"
              type="text"
              name="quantity_purchased"
              value={itemDetail.quantity_purchased}
              onChange={(e) =>
                setItemDetail({
                  ...itemDetail,
                  quantity_purchased: e.target.value,
                })
              }
            />
          </div>
        </div>

        <div className="flex space-x-6">
          <div className="flex-1">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="purchase_date"
            >
              Unit
            </label>
            <input
              onBlur={(e) =>
                setItemDetail({
                  ...formData,
                  unit: e.target.value,
                })
              }
              className="w-full p-2 rounded-lg border transition focus:border-white focus:outline-none focus:ring-2 focus:ring-c4c4c4"
              id="unit"
              type="text"
              name="unit"
              value={itemDetail.unit}
              onChange={(e) =>
                setItemDetail({
                  ...itemDetail,
                  unit: e.target.value,
                })
              }
            />
          </div>
          <div className="flex-1">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="purchase_date"
            >
              Buying Price Per Unit
            </label>
            <input
              onBlur={(e) =>
                setFormData({
                  ...formData,
                  buying_price_per_unit: money.format(e.target.value),
                })
              }
              className="w-full p-2 rounded-lg border transition focus:border-white focus:outline-none focus:ring-2 focus:ring-c4c4c4"
              id="buying_price_per_unit"
              type="text"
              name="buying_price_per_unit"
              value={itemDetail.buying_price_per_unit}
              onChange={(e) =>
                setItemDetail({
                  ...itemDetail,
                  buying_price_per_unit: e.target.value,
                })
              }
            />
          </div>
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
          onClick={() => {
            handleSubmit();
          }}
        >
          {purchases.id ? "Update" : "Create"}
        </button>
      </div>
    </div>
  );
}

export default PurchaseForm;
