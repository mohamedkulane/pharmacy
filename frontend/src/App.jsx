import { Route, Routes } from "react-router-dom";
import SignUpForm from "./pages/signUp";
import Medecine from "./pages/medecine";
import Reports from "./pages/reports";
import BorrowedDebts from "./pages/BorrowedDebts";
import Selles from "./pages/selles";
import Loans from "./pages/loans";
import Dashboard from "./pages/dashboard";
import Login from "./pages/login";
import MainDashboard from "./pages/mianDashboard";
import UpdateLoans from "./pages/upadateLoan";
import UpdateMedicine from "./pages/UpdateMed";
import UpdateSelles from "./pages/UpdateSelles";
import { ToastContainer } from "react-toastify";


export default function App(){
  return <div>
    <Routes>
      <Route path="/" element={<SignUpForm/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="dashboard" element={<Dashboard/>}>
      <Route path="medecine" element={<Medecine/>}/>
      <Route path="maindashboard" element={<MainDashboard/>}/>
      <Route path="reports" element={<Reports/>}/>
      <Route path="updateLoan/:id" element={<UpdateLoans/>}/>
      <Route path="borrowed" element={<BorrowedDebts/>}/>
      <Route path="seles" element={<Selles/>}/>
      <Route path="loans" element={<Loans/>}/>
      </Route>
      <Route path="/Updatemedicine/:id" element={<UpdateMedicine/>}/>
      <Route path="/Updateselles/:id" element={<UpdateSelles/>}/>
    </Routes>
      <ToastContainer  position="top-center" autoClose={3000} />
  </div>
}