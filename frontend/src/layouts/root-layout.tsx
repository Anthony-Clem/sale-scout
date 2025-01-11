import Footer from "@/components/layout/footer";
import Navbar from "@/components/layout/navbar";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <main className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex flex-1">
        <Outlet />
      </div>
      <Footer />
    </main>
  );
};

export default RootLayout;
