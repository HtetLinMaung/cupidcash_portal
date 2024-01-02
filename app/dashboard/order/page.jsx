"use client";

import { appContext } from "@/providers/AppProvider";
import { dashboardContext } from "@/providers/DashboardProvider";
import { itemContext } from "@/providers/ItemProvider";
import { handleError, httpGet } from "@/utils/rest-client";
import { useRouter } from "next/navigation";
import { useCallback, useContext, useEffect, useState } from "react";
import { server_domain } from "@/constants";

const PosSystem = ({ items }) => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categorizedItems = {};

  items.forEach((item) => {
    item.categories.forEach((category) => {
      if (!categorizedItems[category.name]) {
        categorizedItems[category.name] = [];
      }
      categorizedItems[category.name].push(item);
    });
  });

  return (
    <div>
      {/* Display "All" option */}
      <div key="All">
        <strong
          onClick={() => setSelectedCategory("All")}
          style={{ cursor: "pointer", textDecoration: "underline" }}
        >
          All
        </strong>
      </div>

      {/* Display all categories */}
      {Object.keys(categorizedItems).map((categoryName) => (
        <div key={categoryName}>
          <strong
            onClick={() => setSelectedCategory(categoryName)}
            style={{ cursor: "pointer", textDecoration: "underline" }}
          >
            {categoryName}
          </strong>
        </div>
      ))}

      {/* Display items based on the selected category */}
      <div className="bg-transparent w-full p-4 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-8 gap-4 ">
        {categorizedItems[selectedCategory]?.map((item) => (
          <div
            key={item.name}
            className="items-center gap-4"
            style={{
              background: "var(--secondary-color)",
              "border-bottom-left-radius": "0.75rem",
              "border-bottom-right-radius": "0.75rem",
            }}
          >
            <div>
              {item.image_url && (
                <img
                  style={{
                    height: "123px",
                    objectFit: "cover",
                    "border-top-left-radius": "0.75rem",
                    "border-top-right-radius": "0.75rem",
                  }}
                  src={`${server_domain}${item.image_url}`}
                  alt={item.name}
                  className="w-full "
                />
              )}
            </div>
            <div style={{ padding: "8px" }}>{item.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default function AddOrder() {
  const router = useRouter();
  const { setLoading } = useContext(appContext);
  const { selectedTable } = useContext(dashboardContext);
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
      })
      .catch((err) => {
        setLoading(false);
        handleError(err, router);
      });
  }, [
    page,
    perPage,
    router,
    search,
    setItems,
    setLoading,
    setTotal,
    setPageCounts,
  ]);

  useEffect(() => {
    fetchItems();
  }, [search]);

  return (
    <div className="flex">
      <div
        className="flex-grow"
        style={{ paddingRight: selectedTable === 0 ? 0 : "24rem" }}
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
          <div>
            <PosSystem items={items} />
          </div>
        </div>
      </div>
    </div>
  );
}
