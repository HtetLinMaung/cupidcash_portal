"use client";

import Breadcrumb from "@/components/Breadcrumb";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useContext, useEffect } from "react";
import moment from "moment";
import Pagination from "@/components/Pagination";
import { handleError, httpDelete, httpGet } from "@/utils/rest-client";
import Swal from "sweetalert2";
import { appContext } from "@/providers/AppProvider";
import { itemContext } from "@/providers/ItemProvider";
import money from "mm-money";
import { server_domain } from "@/constants";

const breadcrumbItems = [
  { label: "Home", href: "/dashboard" },
  { label: "Item" },
];

export default function ItemsList() {
  const { setLoading } = useContext(appContext);
  const {
    items,
    setItems,
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
  } = useContext(itemContext);
  const router = useRouter();

  const fetchItems = useCallback(() => {
    setLoading(true);
    httpGet("/api/items", {
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
        setItems(res.data.data);
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
    fetchItems();
  }, [page, perPage, search, router, fetchItems]);

  const handleDelete = (item_id) => {
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
        httpDelete(`/api/items/${item_id}`)
          .then((res) => {
            setLoading(false);
            Swal.fire({
              text: res.data.message,
              icon: "success",
              showConfirmButton: false,
              timer: 5000,
            });
            fetchItems();
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
            placeholder="Search items..."
            className="p-2 border rounded-lg border transition focus:border-white focus:outline-none focus:ring-2 focus:ring-c4c4c4"
          />
        </div>

        <Link href="/dashboard/item/create">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
            Create Item
          </button>
        </Link>
      </div>
      {/* Total Rows Section */}
      <div className="my-4">
        <span className="text-gray-600 font-medium">Total Items: </span>
        <span className="text-black font-bold">{total}</span>
      </div>
      <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-200">
            <tr className=" text-left">
              <th className="py-2 px-4 border-b">ID</th>
              <th className="py-2 px-4 border-b">Image</th>
              <th className="py-2 px-4 border-b">Name</th>
              <th className="py-2 px-4 border-b">Description</th>
              <th className="py-2 px-4 border-b">Price</th>
              <th className="py-2 px-4 border-b">Shop</th>
              <th className="py-2 px-4 border-b">Category</th>
              <th className="py-2 px-4 border-b">Time</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b">{item.id}</td>
                <td className="py-2 px-4 border-b">
                  <img
                    style={{
                      minWidth: 100,
                      height: 100,
                      objectFit: "cover",
                    }}
                    className="rounded-xl"
                    src={`${server_domain}${item.image_url}`}
                    alt={item.name}
                  />
                </td>
                <td className="py-2 px-4 border-b">{item.name}</td>
                <td className="py-2 px-4 border-b">{item.description}</td>
                <td className="py-2 px-4 border-b text-right">
                  {money.format(item.price)}
                </td>
                <td className="py-1 px-2 border-b">{item.shop_name}</td>
                <td className="py-2 px-4 border-b">
                  {item.categories.map((c) => c.name).join(", ")}
                </td>
                <td className="py-2 px-4 border-b">
                  {moment(item.created_at + "Z").format(
                    "DD/MM/YYYY hh:mm:ss a"
                  )}
                </td>
                <td className="py-2 px-4 border-b">
                  <div className="flex">
                    <Link
                      className="text-blue-500 hover:underline"
                      href={`/dashboard/item/edit?item_id=${item.id}`}
                    >
                      Edit
                    </Link>

                    <button
                      className="ml-2 text-red-500 hover:underline"
                      onClick={() => handleDelete(item.id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
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
