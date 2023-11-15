"use client";
import { useRouter } from "next/navigation";
import Breadcrumb from "@/components/Breadcrumb";
import { handleError, httpPost, uploadFile } from "@/utils/rest-client";
import { useContext, useEffect } from "react";
import Swal from "sweetalert2";
import { getShops } from "@/services/shop";
import { appContext } from "@/providers/AppProvider";
import { itemContext } from "@/providers/ItemProvider";
import { getCategories } from "@/services/category";
import ItemForm from "@/components/ItemForm";
import money from "mm-money";

const breadcrumbItems = [
  { label: "Home", href: "/dashboard" },
  { label: "Item", href: "/dashboard/item" },
  { label: "Item Form" },
];

export default function ItemCreateForm() {
  const { setLoading } = useContext(appContext);
  const router = useRouter();
  const { shops, setShops, categories, setCategories } =
    useContext(itemContext);

  useEffect(() => {
    // const token = localStorage.getItem("cupidcash_token");
    // if (!token) {
    //   router.push("/login");
    // }
    setLoading(true);
    Promise.all([getShops(), getCategories()])
      .then(([shopRes, categoryRes]) => {
        setLoading(false);
        setShops(
          shopRes.data.data.map((s) => ({ value: s.id, label: s.name }))
        );
        setCategories(
          categoryRes.data.data.map((c) => ({ value: c.id, label: c.name }))
        );
      })
      .catch((err) => {
        setLoading(false);
        handleError(err, router);
      });
  }, [router]);

  const createItem = async (data) => {
    try {
      let res = null;

      data.shop_id = parseInt(data.shop_id);
      data.price = money.parseNumber(
        data.price.toString().replaceAll("[a-zA-Z]+", "")
      );
      if (!data.shop_id) {
        throw new Error("Invalid shop!");
      }

      setLoading(true);
      if (data.file) {
        res = await uploadFile("/api/image/upload", data.file);
        data.image_url = res.data.url;
      }
      delete data.file;

      res = await httpPost("/api/items", {
        ...data,
        categories: data.categories.map((c) => parseInt(c.value)),
      });
      setLoading(false);
      Swal.fire({
        icon: "success",
        text: res.data.message,
        showConfirmButton: false,
        timer: 5000,
      });
      router.push("/dashboard/item");
    } catch (err) {
      setLoading(false);
      handleError(err, router);
    }
  };

  const handleBackClick = () => {
    router.back();
  };

  return (
    <div className="px-2 pr-6 mb-10 overflow-hidden">
      <div className="flex-grow bg-gray-100 pt-8 mb-6">
        <Breadcrumb items={breadcrumbItems} />
      </div>
      <ItemForm
        categories={categories}
        shops={shops}
        onSubmit={createItem}
        onBackClick={handleBackClick}
      />
    </div>
  );
}
