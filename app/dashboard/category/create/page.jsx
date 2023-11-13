"use client";
import { useRouter } from "next/navigation";
import Breadcrumb from "@/components/Breadcrumb";
import { handleError, httpPost } from "@/utils/rest-client";
import { useEffect } from "react";
import Swal from "sweetalert2";
import CategoryForm from "@/components/CategoryForm";

const breadcrumbItems = [
  { label: "Home", href: "/dashboard" },
  { label: "Category", href: "/dashboard/category" },
  { label: "Category Form" },
];

export default function CategoryCreateForm() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("cupidcash_token");
    if (!token) {
      router.push("/login");
    }
  }, [router]);

  const createCategory = async (data) => {
    try {
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
    <div className="container mx-auto p-4">
      <Breadcrumb items={breadcrumbItems} />
      <CategoryForm onSubmit={createCategory} onBackClick={handleBackClick} />
    </div>
  );
}
