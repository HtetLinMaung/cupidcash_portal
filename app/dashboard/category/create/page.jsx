"use client";
import { useRouter } from "next/navigation";
import Breadcrumb from "@/components/Breadcrumb";
import { handleError, httpPost } from "@/utils/rest-client";
import { useContext, useEffect } from "react";
import Swal from "sweetalert2";
import CategoryForm from "@/components/CategoryForm";
import { getShops } from "@/services/shop";
import { categoryContext } from "@/providers/CategoryProvider";

const breadcrumbItems = [
  { label: "Home", href: "/dashboard" },
  { label: "Category", href: "/dashboard/category" },
  { label: "Category Form" },
];

export default function CategoryCreateForm() {
  const router = useRouter();
  const { shops, setShops } = useContext(categoryContext);

  useEffect(() => {
    // const token = localStorage.getItem("cupidcash_token");
    // if (!token) {
    //   router.push("/login");
    // }
    getShops()
      .then((res) => {
        setShops(res.data.data.map((s) => ({ value: s.id, label: s.name })));
      })
      .catch((err) => handleError(err, router));
  }, [router]);

  const createCategory = async (data) => {
    try {
      data.shop_id = parseInt(data.shop_id);
      const res = await httpPost("/api/categories", data);
      Swal.fire({
        icon: "success",
        text: res.data.message,
        showConfirmButton: false,
        timer: 5000,
      });
      router.push("/dashboard/category");
    } catch (err) {
      handleError(err, router);
    }
  };

  const handleBackClick = () => {
    router.back();
  };

  return (
    <div className="px-2 pr-6 h-screen overflow-hidden">
      <div className="flex-grow bg-gray-100 pt-8 mb-6">
        <Breadcrumb items={breadcrumbItems} />
      </div>
      <CategoryForm
        shops={shops}
        onSubmit={createCategory}
        onBackClick={handleBackClick}
      />
    </div>
  );
}
