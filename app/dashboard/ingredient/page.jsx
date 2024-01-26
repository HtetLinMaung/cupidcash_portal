"use client";

import Breadcrumb from "@/components/Breadcrumb";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useContext, useEffect } from "react";
import moment from "moment";
import Pagination from "@/components/Pagination";
import { handleError, httpDelete, httpGet } from "@/utils/rest-client";
import Swal from "sweetalert2";
import { ingredientContext } from "@/providers/IngredientProvider";
import { appContext } from "@/providers/AppProvider";

export default function IngredientsList() {
  const { setLoading } = useContext(appContext);
  const {
    ingredients,
    setIngredients,
    search,
    setSearch,
    page,
    setPage,
    perPage,
    setPerPage,
    pageCounts,
    setPageCounts,
    total,
    setTotal,
  } = useContext(ingredientContext);
  const router = useRouter();

  const fetchIngredients = useCallback(() => {
    setLoading(true);
    httpGet("/api/ingredients", {
      params: {
        page,
        per_page: perPage,
        search,
      },
    })
      .then((res) => {
        setLoading(false);
        setTotal(res.data.total);
        setPageCounts(res.data.page_counts);
        setIngredients(res.data.data);
      })
      .catch((err) => {
        setLoading(false);
        handleError(err, router);
      });
  }, [page, perPage, router, search]);

  useEffect(() => {
    const token = localStorage.getItem("cupidcash_token");
    if (!token) {
      router.push("/login");
    }
    fetchIngredients();
  }, [page, perPage, search, router, fetchIngredients]);

  const handleDelete = (ingredient_id) => {
    Swal.fire({
      text: "Are you sure you want to delete?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#d1d5db",
      confirmButtonText: "Delete",
    }).then((result) => {
      if (result.isConfirmed) {
        setLoading(true);
        httpDelete(`/api/ingredients/${ingredient_id}`)
          .then((res) => {
            setLoading(false);
            Swal.fire({
              text: res.data.message,
              icon: "success",
              showConfirmButton: false,
              timer: 5000,
            });
            fetchCategories();
          })
          .catch((err) => {
            setLoading(false);
            handleError(err, router);
          });
      }
    });
  };

  return (
    <div className="px-2 pr-6 pb-6">
      {/* Search Box */}
      <div className="flex mb-4 justify-between">
        <div>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            placeholder="Search ingredients..."
            className="p-2 border rounded-lg"
          />
        </div>
        {/* Create Ingredient Button */}
        <Link href="/dashboard/ingredient/create">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
            Create Ingredient
          </button>
        </Link>
      </div>
      {/* Total Rows Section */}
      <div className="my-4">
        <span className="text-gray-600 font-medium">Total Ingredients: </span>
        <span className="text-black font-bold">{total}</span>
      </div>
      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-200">
          <tr className=" text-left">
            <th className="py-2 px-4 border-b">ID</th>
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Stock Quantity</th>
            <th className="py-2 px-4 border-b">Unit</th>
            <th className="py-2 px-4 border-b">Reorder Level</th>
            <th className="py-2 px-4 border-b">Expiry Date</th>
            <th className="py-2 px-4 border-b">Time</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {ingredients.map((ingredient) => (
            <tr key={ingredient.ingredient_id} className="hover:bg-gray-50">
              <td className="py-2 px-4 border-b">{ingredient.ingredient_id}</td>
              <td className="py-2 px-4 border-b">{ingredient.name}</td>
              <td className="py-2 px-4 border-b">
                {ingredient.stock_quantity}
              </td>
              <td className="py-2 px-4 border-b">{ingredient.unit}</td>
              <td className="py-2 px-4 border-b">{ingredient.reorder_level}</td>
              <td className="py-2 px-4 border-b">{ingredient.expiry_date}</td>

              <td className="py-2 px-4 border-b">
                {moment(ingredient.created_at + "Z").format(
                  "DD/MM/YYYY hh:mm:ss a"
                )}
              </td>
              <td className="py-2 px-4 border-b">
                <Link
                  className="text-blue-500 hover:underline"
                  href={`/dashboard/ingredient/edit?ingredient_id=${ingredient.ingredient_id}`}
                >
                  Edit
                </Link>
                {/* Add delete functionality */}
                <button
                  className="ml-2 text-red-500 hover:underline"
                  onClick={() => handleDelete(ingredient.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Pagination Controls */}
      <Pagination
        page={page}
        pageCounts={pageCounts}
        onPageChange={setPage}
        perPage={perPage}
        onPerPageChange={(p) => {
          setPerPage(p);
          setPage(1);
        }}
      />
    </div>
  );
}