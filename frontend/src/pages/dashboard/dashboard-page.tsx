import DashboardHeader from "@/components/dashboard/dashboard-header";
import Products from "@/components/dashboard/products";

const DashboardPage = () => {
  return (
    <div className="flex-1 flex flex-col p-4 gap-10">
      <DashboardHeader />
      <Products />
    </div>
  );
};

export default DashboardPage;
