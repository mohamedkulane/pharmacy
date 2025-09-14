import axios from "axios"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import Swal from "sweetalert2"
export default function SignUpForm() {
  const [name,setName]=useState("")
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  const navigate=useNavigate()
  function handleRegister(e){
    e.preventDefault()
    axios.post("http://localhost:5100/create/admin",{
      name,
      email,
      password
    }).then(()=>{
      Swal.fire({
  title: "registered succesfully!",
  icon: "success",
  draggable: true
});
      navigate("/login")
    }).catch((err) => {
    console.error(err.response?.data || err.message);
    alert("registration failed");
  });
  }


  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg ring-1 ring-black/5 overflow-hidden">
        <div className="border-t-4 border-blue-600" />
        <div className="p-8">
          <header className="mb-6">
            <h1 className="text-2xl font-semibold text-black">Create account</h1>
          </header>

          <form className="space-y-4" aria-label="signup form (no functionality)">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-black mb-2">Name</label>
              <input value={name} onChange={(e)=>setName(e.target.value)}
                id="name"
                name="name"
                type="text"
                placeholder="Your full name"
                className="w-full px-4 py-3 rounded-xl border border-blue-100 bg-white text-black placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-500"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-black mb-2">Email</label>
              <input  value={email} onChange={(e)=>setEmail(e.target.value)}
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                className="w-full px-4 py-3 rounded-xl border border-blue-100 bg-white text-black placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-500"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-black mb-2">Password</label>
              <input  value={password} onChange={(e)=>setPassword(e.target.value)}
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-xl border border-blue-100 bg-white text-black placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-500"
              />
            </div>

            <div className="pt-2">
              <button onClick={handleRegister}
                type="button"
                className="w-full rounded-xl py-3 font-semibold text-white bg-blue-600 hover:bg-blue-700 active:translate-y-0.5 transition-transform"
              >
                Create account
              </button>
            </div>

            <div className="text-center text-sm text-slate-500">
              <span>Already have an account?</span>
             <Link to="/login"><button type="button" className="ml-2 font-medium text-black underline decoration-blue-200">Sign in</button></Link> 
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
