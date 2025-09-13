import {
  Home,
  Pill,
  ShoppingCart,
  Wallet,
  Banknote,
  BarChart,
} from "lucide-react";
import { Link, Outlet } from "react-router-dom";

export function Sidebar() {
  return (
    <div className="flex gap-4">
      <aside className="w-64 bg-white border-r border-blue-100 flex flex-col p-4 min-h-screen">
        <h2 className="text-xl font-bold text-black mb-6">Dashboard</h2>
        <div className="flex-1 space-y-3">
         <Link to="dashboard"> <div className="flex items-center gap-3 px-3 py-2 rounded-lg text-black text-xl font-medium hover:bg-blue-50 cursor-pointer mt-10">
            <Home className="w-8 h-8 text-blue-600" />
            Dashboard
          </div></Link>
         <Link to="medecine"> <div className="flex items-center gap-3 text-xl font-medium px-3 py-2 rounded-lg text-black hover:bg-blue-50 cursor-pointer mt-5">
            <Pill className="w-8 h-8 text-blue-600" />
            Medecines
          </div></Link>
          <Link to="seles"><div className="flex items-center gap-3 text-xl font-medium px-3 py-2 rounded-lg text-black hover:bg-blue-50 cursor-pointer mt-5">
            <ShoppingCart className="w-8 h-8 text-blue-600" />
            Sells
          </div></Link>
          <Link to="borrowed"><div className="flex items-center gap-3 text-xl font-medium px-3 py-2 rounded-lg text-black hover:bg-blue-50 cursor-pointer mt-5">
            <Wallet className="w-8 h-8 text-blue-600" />
            Borrowed Debts
          </div></Link>
         <Link to="loans"> <div className="flex items-center gap-3 text-xl font-medium px-3 py-2 rounded-lg text-black hover:bg-blue-50 cursor-pointer mt-5">
            <Banknote className="w-8 h-8 text-blue-600" />
            Loans
          </div></Link>
          <Link to="reports"><div className="flex items-center gap-3 text-xl font-medium px-3 py-2 rounded-lg text-black hover:bg-blue-50 cursor-pointer mt-5">
            <BarChart className="w-8 h-8 text-blue-600" />
            Reports
          </div></Link>
        </div>
      </aside>
      <div>
        <Outlet/>
      </div>
    </div>
  );
}
