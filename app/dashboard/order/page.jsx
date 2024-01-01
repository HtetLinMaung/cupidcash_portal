"use client";

import { appContext } from "@/providers/AppProvider";
import { dashboardContext } from "@/providers/DashboardProvider";
import { itemContext } from "@/providers/ItemProvider";
import { httpGet } from "@/utils/rest-client";
import { useRouter } from "next/navigation";
import { useCallback, useContext, useEffect } from "react";

export default function AddOrder() {
  const router = useRouter();
  const { setLoading } = useContext(appContext);
  const { selectedTable, setSelectedTable } = useContext(dashboardContext);
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
        console.log("items", items);
      })
      .catch((err) => {
        setLoading(false);
        handleError(err, router);
      });
  }, [page, perPage, router, search]);

  useEffect(() => {
    // loadTables({ search });
    fetchItems();
  }, [search, fetchItems]);

  return (
    <div className=" flex">
      <div
        className="flex-grow "
        style={{ paddingRight: selectedTable == 0 ? 0 : "24rem" }}
      >
        <div className="flex-grow overflow-auto">
          <div>
            {/* Search bar */}
            <div className="mb-4">
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                type="text"
                placeholder="Type to search..."
                className="w-full p-4 rounded-md border transition focus"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
