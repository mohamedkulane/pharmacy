import {
  Home,
  Pill,
  ShoppingCart,
  Wallet,
  Banknote,
  BarChart,
} from "lucide-react";
import { useState } from "react";
import { Link, Outlet } from "react-router-dom";

export function Sidebar() {
  const getAdmin = localStorage.getItem("Admin");
  const [isopen, setisopen] = useState(true);

  return (
    <div className="flex gap-6">
      <aside
        style={{ width: isopen ? "220px" : "80px" }}
        className="bg-white border-r border-blue-100 flex flex-col p-3 h-screen sticky top-0 left-0   transition-all duration-300"
      >
        {/* Profile Section */}
        <div className="flex items-center gap-2 mt-3 ml-1">
          <h1 className="w-9 h-9 bg-blue-600 text-white ml-1 pb-1.5 rounded-full text-2xl font-bold text-center flex items-center justify-center">
            {JSON.parse(getAdmin).data?.Admin.name[0]}
          </h1>
          {isopen && (
            <h1 className="text-black text-lg font-medium">
              Admin_<br /> {JSON.parse(getAdmin).data?.Admin.name}
            </h1>
          )}
        </div>

        {/* Links */}
        <div className="flex-1 space-y-2">
          <Link to="maindashboard">
            <div className="flex items-center gap-3 px-3 py-2 rounded-lg text-black text-xl font-medium hover:bg-blue-50 cursor-pointer mt-8">
              <Home className="w-7 h-7 text-blue-600" />
              {isopen && <span>Dashboard</span>}
            </div>
          </Link>
          <Link to="medecine">
            <div className="flex items-center gap-3 px-3 py-2 rounded-lg text-black text-xl font-medium hover:bg-blue-50 cursor-pointer mt-4">
              <Pill className="w-7 h-7 text-blue-600" />
              {isopen && <span>Medecines</span>}
            </div>
          </Link>
          <Link to="seles">
            <div className="flex items-center gap-3 px-3 py-2 rounded-lg text-black text-xl font-medium hover:bg-blue-50 cursor-pointer mt-4">
              <ShoppingCart className="w-7 h-7 text-blue-600" />
              {isopen && <span>Sells</span>}
            </div>
          </Link>
          <Link to="borrowed">
            <div className="flex items-center gap-3 px-3 py-2 rounded-lg text-black text-xl font-medium hover:bg-blue-50 cursor-pointer mt-4">
              <Wallet className="w-7 h-7 text-blue-600" />
              {isopen && <span>Borrowed Debts</span>}
            </div>
          </Link>
          <Link to="loans">
            <div className="flex items-center gap-3 px-3 py-2 rounded-lg text-black text-xl font-medium hover:bg-blue-50 cursor-pointer mt-4">
              <Banknote className="w-7 h-7 text-blue-600" />
              {isopen && <span>Loans</span>}
            </div>
          </Link>
          <Link to="reports">
            <div className="flex items-center gap-3 px-3 py-2 rounded-lg text-black text-xl font-medium hover:bg-blue-50 cursor-pointer mt-4">
              <BarChart className="w-7 h-7 text-blue-600" />
              {isopen && <span>Reports</span>}
            </div>
          </Link>
        </div>

        {/* Toggle button */}
        <button
          onClick={() => setisopen(!isopen)}
          className="absolute bottom-4 right-2 text-2xl text-gray-700 hover:text-blue-600"
        >
          {isopen ? (
            <i className="fa-solid fa-angle-left"></i>
          ) : (
            <i className="fa-solid fa-angle-right"></i>
          )}
        </button>
      </aside>

      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
}
