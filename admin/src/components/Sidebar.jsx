import React, { useState } from "react";
import {
  LayoutDashboard,
  FilePlus2,
  Package,
  Receipt,
  ShoppingCart,
  Users,
  CreditCard,
  Calendar,
  X,
  Menu,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const menuItems = [
  { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  { name: "Products", path: "/dashboard/products", icon: Package },
  { name: "Create Product", path: "/dashboard/create", icon: FilePlus2 },
  { name: "Transactions", path: "/dashboard/transactions", icon: Receipt },
  { name: "Orders", path: "/dashboard/orders", icon: ShoppingCart },
  { name: "Customers", path: "/dashboard/customers", icon: Users },
  { name: "Payments", path: "/dashboard/payments", icon: CreditCard },
  { name: "Calendar", path: "/dashboard/calendar", icon: Calendar },
];

const Sidebar = () => {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* ✅ Toggle Button (☰ / X) */}
      <button
        onClick={() => setOpen(!open)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-cyan-500 text-white rounded-md shadow-md"
      >
        {open ? <X size={22} /> : <Menu size={22} />}
      </button>

      {/* ✅ Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white dark:bg-gray-900 shadow-lg border-r border-gray-200 dark:border-gray-700 
        transform ${open ? "translate-x-0" : "-translate-x-full"} 
        transition-transform duration-300 ease-in-out lg:translate-x-0 z-40`}
      >
        {/* Header */}
        <div className="flex items-center justify-center h-16 border-b border-gray-200 dark:border-gray-700">
          <h1 className="text-xl font-bold text-gray-800 dark:text-gray-100">
            My Dashboard
          </h1>
        </div>

        {/* Navigation */}
        <nav className="mt-6">
          <ul className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const active = location.pathname === item.path;

              return (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    onClick={() => setOpen(false)} // close when clicking a link (mobile)
                    className={`flex items-center gap-3 px-4 py-3 mx-2 rounded-lg text-sm font-medium transition-colors
                      ${
                        active
                          ? "bg-cyan-500 text-white"
                          : "text-gray-700 dark:text-gray-300 hover:bg-cyan-100 dark:hover:bg-gray-800"
                      }`}
                  >
                    <Icon
                      size={18}
                      className={`${active ? "text-white" : "text-cyan-500"}`}
                    />
                    {item.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
