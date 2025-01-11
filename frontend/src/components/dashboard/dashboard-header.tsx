import TrackProduct from "./track-product";

const DashboardHeader = () => {
  return (
    <header className="flex flex-col sm:flex-row gap-3 items-center sm:justify-between">
      <h1 className="text-3xl font-bold">Tracking Products</h1>
      <TrackProduct />
    </header>
  );
};

export default DashboardHeader;
