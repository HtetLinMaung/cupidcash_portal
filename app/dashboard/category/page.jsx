"use client";

import Breadcrumb from "@/components/Breadcrumb";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import moment from "moment";
import Pagination from "@/components/Pagination";
import { httpGet } from "@/utils/rest-client";

const breadcrumbItems = [
  { label: "Home", href: "/dashboard" },
  { label: "Category" },
];

// export default function Category() {
//   return (
//     <div className="flex h-screen overflow-hidden">
//       <div className="flex-grow bg-gray-100 pt-8">
//         <Breadcrumb items={breadcrumbItems} />
//       </div>
//     </div>

//   );
// }

export default function CategoriesList() {
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [pageCounts, setPageCounts] = useState(0);
  const [total, setTotal] = useState(0);
  const router = useRouter();

  const fetchCategories = useCallback(() => {
    httpGet("/api/categories", {
      params: {
        page,
        per_page: perPage,
        search,
      },
    })
      .then((res) => {
        setTotal(res.data.total);
        setPageCounts(res.data.page_counts);
        setCategories(res.data.data);
      })
      .catch((err) => {
        handleError(err, router);
      });
  }, [page, perPage, router, search]);

  useEffect(() => {
    const token = localStorage.getItem("cupidcash_token");
    if (!token) {
      router.push("/login");
    }
    fetchCategories();
  }, [page, perPage, search, router, fetchCategories]);

  const handleDelete = (category_id) => {
    Swal.fire({
      text: "Are you sure you want to delete?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#d1d5db",
      confirmButtonText: "Delete",
    }).then((result) => {
      if (result.isConfirmed) {
        httpDelete(`/api/categories/${category_id}`)
          .then((res) => {
            Swal.fire({
              text: res.data.message,
              icon: "success",
              showConfirmButton: false,
              timer: 5000,
            });
            fetchCategories();
          })
          .catch((err) => {
            handleError(err, router);
          });
      }
    });
  };

  return (
    <div className="px-2 pr-6 h-screen overflow-hidden">
      <div className="flex-grow bg-gray-100 pt-8 mb-6">
        <Breadcrumb items={breadcrumbItems} />
      </div>
      {/* Search Box */}
      <div className="flex mb-4 justify-between">
        <div>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            placeholder="Search categories..."
            className="p-2 border rounded-lg"
          />
        </div>
        {/* Create Category Button */}
        <Link href="/dashboard/category/create">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
            Create Category
          </button>
        </Link>
      </div>
      {/* Total Rows Section */}
      <div className="my-4">
        <span className="text-gray-600 font-medium">Total Categories: </span>
        <span className="text-black font-bold">{total}</span>
      </div>
      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-200">
          <tr className=" text-left">
            <th className="py-2 px-4 border-b">ID</th>
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Description</th>
            <th className="py-2 px-4 border-b">Shop Name</th>
            <th className="py-2 px-4 border-b">Time</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category.id} className="hover:bg-gray-50">
              <td className="py-2 px-4 border-b">{category.id}</td>
              <td className="py-2 px-4 border-b">{category.name}</td>
              <td className="py-2 px-4 border-b">{category.description}</td>
              <td className="py-2 px-4 border-b">{category.shop_name}</td>
              <td className="py-2 px-4 border-b">
                {moment(category.created_at + "Z").format(
                  "DD/MM/YYYY hh:mm:ss a"
                )}
              </td>
              <td className="py-2 px-4 border-b">
                <Link
                  className="text-blue-500 hover:underline"
                  href={`/dashboard/category/edit/${category.id}`}
                >
                  Edit
                </Link>
                {/* Add delete functionality */}
                <button
                  className="ml-2 text-red-500 hover:underline"
                  onClick={() => handleDelete(category.category_id)}
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
