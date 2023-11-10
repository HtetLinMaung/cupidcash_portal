import Breadcrumb from "@/components/Breadcrumb";

const breadcrumbItems = [
  { label: "Home", href: "/dashboard" },
  { label: "Order" },
];

export default function Order() {
  return (
    <div className="container mx-auto p-4">
      <Breadcrumb items={breadcrumbItems} />
    </div>
  );
}
