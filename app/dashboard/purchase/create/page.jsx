"use client";
import { appContext } from "@/providers/AppProvider";
import { categoryContext } from "@/providers/CategoryProvider";
import { getShops } from "@/services/shop";
import { handleError, httpPost } from "@/utils/rest-client";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";
import Swal from "sweetalert2";
import PurchaseForm from "@/components/PurchaseForm";
import { purchaseContext } from "@/providers/PurchaseProvider";
export default function CreatePurchase() {
  const { setLoading } = useContext(appContext);
  const router = useRouter();
  const { shops, setShops } = useContext(categoryContext);
  useEffect(() => {
    setLoading(true);
    getShops()
      .then((res) => {
        setLoading(false);
        setShops(res.data.data.map((s) => ({ value: s.id, label: s.name })));
      })
      .catch((err) => {
        setLoading(false);
        handleError(err, router);
      });
  }, [router]);

  const CreatePurchase = async (data) => {
    try {
      data.shop_id = parseInt(data.shop_id);
      if (!data.shop_id) {
        throw new Error("Invalid shop!");
      }

      setLoading(true);
      console.log("Save Purchase", data);
      const res = await httpPost("/api/purchases", data);

      setLoading(false);
      Swal.fire({
        icon: "success",
        text: res.data.message,
        showConfirmButton: false,
        timer: 5000,
      });
      router.push("/dashboard/purchase");
    } catch (err) {
      setLoading(false);
      handleError(err, router);
    }
  };

  const handleBackClick = () => {
    router.back();
  };

  return (
    <div className="px-2 pr-6 pb-6">
      <div className="flex-grow bg-gray-100 pt-8 mb-6"></div>
      <PurchaseForm
        shops={shops}
        onSubmit={CreatePurchase}
        onBackClick={handleBackClick}
      />
    </div>
  );
}
