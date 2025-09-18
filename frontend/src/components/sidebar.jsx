import {
  Home,
  Pill,
  ShoppingCart,
  Wallet,
  Banknote,
  BarChart,
  LogOut
} from "lucide-react";
import { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";

export function Sidebar() {
  const getAdmin = localStorage.getItem("Admin");
  const [isopen, setisopen] = useState(true);
  const navigate=useNavigate()
  function handleLogOut(){
    localStorage.clear()
    navigate("/")
  }

  const [open,setopen]=useState(false)

  return <>
    <div className="sm:flex gap-6 hidden ">
      <aside
        style={{ width: isopen ? "230px" : "80px" }}
        className="bg-blue-600 border-r border-blue-100 flex flex-col  h-screen sticky top-0 left-0   transition-all duration-300"
      >
        {/* Profile Section */}
        <div className="flex items-center gap-3  bg-gradient-to-b from-blue-500 to-blue-300 w-full h-28 pl-3 ">
          <h1 className="w-10 h-10 bg-white text-blue-500 ml-1 pb-1.5 rounded-full text-2xl font-bold text-center flex items-center justify-center">
            {JSON.parse(getAdmin).data?.Admin.name[0]}
          </h1>
          {isopen && (
            <h1 className="text-white text-2xl font-bold">
              Al-Ikhlaas Pharmacy
            </h1>
          )}
        </div>

        {/* Links */}
        <div className="flex-1 space-y-2 ">
          <Link to="maindashboard">
            <div className="flex items-center gap-3 px-3 py-2 rounded-lg  text-white text-xl font-medium hover:bg-blue-50 hover:text-black cursor-pointer mt-8">
              <Home className="w-7 h-7 hover:text-black" />
              {isopen && <span>Dashboard</span>}
            </div>
          </Link>
          <Link to="medecine">
            <div className="flex items-center gap-3 px-3 py-2 rounded-lg  text-white text-xl font-medium hover:bg-blue-50 hover:text-black cursor-pointer mt-4">
              <Pill className="w-7 h-7 hover:text-black" />
              {isopen && <span>Medecines</span>}
            </div>
          </Link>
          <Link to="seles">
            <div className="flex items-center gap-3 px-3 py-2 rounded-lg  text-white text-xl font-medium hover:bg-blue-50 hover:text-black cursor-pointer mt-4">
              <ShoppingCart className="w-7 h-7 hover:text-black" />
              {isopen && <span>Sells</span>}
            </div>
          </Link>
          <Link to="borrowed">
            <div className="flex items-center gap-3 px-3 py-2 rounded-lg text-white text-xl font-medium hover:bg-blue-50 hover:text-black cursor-pointer mt-4">
              <Wallet className="w-7 h-7  hover:text-black" />
              {isopen && <span>Borrowed Debts</span>}
            </div>
          </Link>
          <Link to="loans">
            <div className="flex items-center gap-3 px-3 py-2 rounded-lg text-white text-xl font-medium hover:bg-blue-50 hover:text-black cursor-pointer mt-4">
              <Banknote className="w-7 h-7 hover:text-black" />
              {isopen && <span>Loans</span>}
            </div>
          </Link>
          <Link to="reports">
            <div className="flex items-center gap-3 px-3 py-2 rounded-lg  text-white text-xl font-medium hover:bg-blue-50 hover:text-black cursor-pointer mt-4">
              <BarChart className="w-7 h-7 hover:text-black" />
              {isopen && <span>Reports</span>}
            </div>
          </Link>
        </div>

       
        <button
          onClick={() => setisopen(!isopen)}
          className="absolute bottom-4 right-2 text-2xl text-white hover:text-black"
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
    
    
        {/* Mobile view */}

    <div className="sm:hidden block">
      <aside
        style={{ width: isopen ? "230px" : "80px" }}
        className={` ${open===true?"block":"hidden"} bg-blue-600 border-r border-blue-100 flex flex-col  h-screen absolute top-0 left-0 sm:sticky   transition-all duration-300`}
      >
        {/* Profile Section */}



        <div className="flex items-center gap-3  bg-gradient-to-b from-blue-500 to-blue-300 w-full h-28 pl-3 ">
          <h1 className="w-10 h-10 bg-white text-blue-500 ml-1 pb-1.5 rounded-full text-2xl font-bold text-center flex items-center justify-center">
            {JSON.parse(getAdmin).data?.Admin.name[0]}
          </h1>
          {isopen && (
            <h1 className="text-white text-2xl font-bold">
              Al-Ikhlaas Pharmacy
            </h1>
          )}
        </div>

        {/* Links */}
        <div className="flex-1 space-y-2 ">
          <Link to="maindashboard">
            <div className="flex items-center gap-3 px-3 py-2 rounded-lg  text-white text-xl font-medium hover:bg-blue-50 hover:text-black cursor-pointer mt-8">
              <Home className="w-7 h-7 hover:text-black" />
              {isopen && <span>Dashboard</span>}
            </div>
          </Link>
          <Link to="medecine">
            <div className="flex items-center gap-3 px-3 py-2 rounded-lg  text-white text-xl font-medium hover:bg-blue-50 hover:text-black cursor-pointer mt-4">
              <Pill className="w-7 h-7 hover:text-black" />
              {isopen && <span>Medecines</span>}
            </div>
          </Link>
          <Link to="seles">
            <div className="flex items-center gap-3 px-3 py-2 rounded-lg  text-white text-xl font-medium hover:bg-blue-50 hover:text-black cursor-pointer mt-4">
              <ShoppingCart className="w-7 h-7 hover:text-black" />
              {isopen && <span>Sells</span>}
            </div>
          </Link>
          <Link to="borrowed">
            <div className="flex items-center gap-3 px-3 py-2 rounded-lg text-white text-xl font-medium hover:bg-blue-50 hover:text-black cursor-pointer mt-4">
              <Wallet className="w-7 h-7  hover:text-black" />
              {isopen && <span>Borrowed Debts</span>}
            </div>
          </Link>
          <Link to="loans">
            <div className="flex items-center gap-3 px-3 py-2 rounded-lg text-white text-xl font-medium hover:bg-blue-50 hover:text-black cursor-pointer mt-4">
              <Banknote className="w-7 h-7 hover:text-black" />
              {isopen && <span>Loans</span>}
            </div>
          </Link>
          <Link to="reports">
            <div className="flex items-center gap-3 px-3 py-2 rounded-lg  text-white text-xl font-medium hover:bg-blue-50 hover:text-black cursor-pointer mt-4">
              <BarChart className="w-7 h-7 hover:text-black" />
              {isopen && <span>Reports</span>}
            </div>
          </Link>
        </div>

       
        <button
          onClick={() => setisopen(!isopen)}
          className="absolute bottom-4 right-2 text-2xl text-white hover:text-black"
        >
          {isopen ? (
            <i className="fa-solid fa-angle-left"></i>
          ) : (
            <i className="fa-solid fa-angle-right"></i>
          )}
        </button>
      </aside>
      <div className="flex justify-end sm:hidden ">
      <i onClick={()=>setopen(!open)} className="fa-solid fa-bars text-3xl ml-3 mt-2"></i>
      </div>
      <div className="flex-1 sm:hidden">
        <Outlet />
      </div>
    </div>
    
  </>
}
