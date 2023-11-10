import Breadcrumb from "@/components/Breadcrumb";

const breadcrumbItems = [{ label: "Home" }];

export default function Dashboard() {
  return (
    <div className="pt-8 h-screen">
      <Breadcrumb items={breadcrumbItems} />
    </div>
  );
}
