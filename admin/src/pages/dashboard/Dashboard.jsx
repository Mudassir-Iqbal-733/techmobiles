import React from "react";
import StoreCard from "../../components/dashboard/StoreCard";
import SalesRevenueChart from "../../components/dashboard/SalesRevenueChart";
import ChannelAnalyticsChart from "../../components/dashboard/ChannelAnalyticsChart";
import SalesChart from "../../components/dashboard/SalesChart";
import TopMobilesTable from "../../components/dashboard/TopMobilesTable";

const Dashboard = () => {
  return (
    <>
      <div className="mb-6">
        <h1 className="text-3xl mb-6 py-6 text-center dark:text-white">
          Welcome back to Admin Dashboard
        </h1>
        <StoreCard />
      </div>

      <div className="grid grid-cols-6 gap-6">
        {/* Left Side (Charts + Table) */}
        <div className="col-span-6 lg:col-span-4 flex flex-col space-y-6">
          <SalesRevenueChart />
          <TopMobilesTable />
        </div>

        {/* Right Side (Analytics) */}
        <div className="col-span-6 lg:col-span-2 flex flex-col space-y-6">
          <ChannelAnalyticsChart />
          <SalesChart />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
