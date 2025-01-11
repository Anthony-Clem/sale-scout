import { ShinyButton } from "@/components/common/shiny-button";

const HomePage = () => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center gap-2 overflow-y-auto">
      <h1 className="text-3xl font-bold text-center">
        SaleScout - Your{" "}
        <span className="underline underline-offset-2 text-red-600">
          Ultimate
        </span>{" "}
        Price Tracker
      </h1>
      <h2 className="text-lg text-muted-foreground font-semibold italic text-center">
        "Find the Best Deals Without the Hassle!"
      </h2>
      <p className="text-sm text-center font-bold text-muted-foreground">
        (Ensure you are running this on a non-IOS device. Otherwise this will
        not work)
      </p>
      <ShinyButton className="px-6 py-2" to="/dashboard">
        Track Products Now
      </ShinyButton>
    </div>
  );
};

export default HomePage;
