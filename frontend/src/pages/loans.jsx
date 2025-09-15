import axios from "axios"
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import Swal from "sweetalert2"

export default function Loans(){
    const [isopen,setIsopen]=useState(false)
    const [data,setData]=useState([])
    const [name,setname]=useState("")
    const [phone,setPhone]=useState("")
    const [address,setAddress]=useState("")
    const [price,setPrice]=useState("")
    const [paid,setPaid]=useState("")

    function handlePost(e){
        e.preventDefault()

        axios.post("http://localhost:5000/create/loan",{
          name,
          address,
          phone,
          price,
          paid
        }).then(()=>{
          Swal.fire({
            title: "registered succesfully!",
            icon: "success",
            draggable: true
          });
          setIsopen(false)
          handleRead()
        
        })

    }

    function handleRead(){
      axios.get("http://localhost:5000/read/loan").then((res)=>{
        setData(res.data)
      })
    }
    
    useEffect(()=>{
      handleRead()
    },[])

    // delete
    function handleDelete(id){
      axios.delete(`http://localhost:5000/delete/loan/${id}`).then(()=>{
        Swal.fire({
            title: "Success delete!",
            icon: "success",
            draggable: true
          });
          handleRead()
      })
    }
    return <div className="mt-14">
        <div className="flex gap-[40rem] items-center">
            <h1 className="text-3xl font-semibold text-black underline-offset-4 underline">My Debts:</h1>
            <div>
            <button onClick={()=>setIsopen(true)} className="bg-gradient-to-r from-blue-400 via-blue-600 to-blue-400 active:bg-blue-700 text-white px-10 py-3 rounded-lg font-medium ml-2 text-xl" ><i className="fa-solid fa-plus text-xl"></i>Add Debt</button>
        </div>
        </div>

        <table className="mt-5 p-3">
            <thead className="bg-blue-50 text-black">
                <tr>
                    <th className="px-7 py-3 text-xl font-medium">Names</th>
                    <th className="px-7 py-3 text-xl font-medium">Phone</th>
                    <th className="px-7 py-3 text-xl font-medium">Address</th>
                    <th className="px-7 py-3 text-xl font-medium">Data</th>
                    <th className="px-7 py-3 text-xl font-medium">Price</th>
                    <th className="px-7 py-3 text-xl font-medium">Paid</th>
                    <th className="px-7 py-3 text-xl font-medium">TotalPrice</th>
                    <th className="px-7 py-3 text-xl font-medium">Actions</th>
                </tr>
            </thead>
            {
              data.map((item)=>{
                return  <tbody className="text-center border-b">
                <td className="px-7 py-2 text-xl text-left font-medium">{item.name}</td>
                <td className="px-7 py-2 text-xl font-medium">{item.phone}</td>
                <td className="px-7 py-2 text-xl font-medium">{item.address}</td>
                <td className="px-7 py-2 text-xl font-medium">12/3/22</td>
                <td className="px-5 py-2 text-xl font-medium">${item.price}</td>
                <td className="px-5 py-2 text-xl font-medium">${item.paid}</td>
                <td className="px-5 py-2 text-xl font-medium">${item.price-item.paid}</td>
                <td className="px-7 py-2 text-xl font-medium">
                    <div className="cursor-pointer">
                       <Link to={`/dashboard/updateLoan/${item._id}`}> <i className="fa-solid fa-edit text-blue-600 mr-1"></i></Link>
                        <i onClick={()=>handleDelete(item._id)} className="fa-solid fa-trash  active:text-red-600"></i>
                    </div>
                </td>
            </tbody>
              })
            }
            
        </table>

         <div  className="h-56 w-72 absolute top-10 right-[270px] ">
      <form style={{display:isopen===true?"block":""}} className="bg-white p-8 rounded-xl shadow-lg w-[520px] border-t hidden">
        <h2 className="text-2xl font-bold text-black mb-6 text-center">
          Patient Form
        </h2>
        <div className="grid grid-cols-2 gap-3">
        {/* Name */}
        <div className="mb-4">
          <label className="block text-black font-semibold mb-1">Name</label>
          <input value={name} onChange={(e)=>setname(e.target.value)}
            type="text"
            placeholder="Patient Name"
            className="w-56 px-4 py-2 border border-black rounded outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Phone */}
        <div className="mb-4">
          <label className="block text-black font-semibold mb-1">Phone</label>
          <input value={phone} onChange={(e)=>setPhone(e.target.value)}
            type="tel"
            placeholder="Phone Number"
            className="w-60 px-4 py-2 border border-black rounded outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Address */}
        <div className="mb-4">
          <label className="block text-black font-semibold mb-1">Address</label>
          <input value={address} onChange={(e)=>setAddress(e.target.value)}
            type="text"
            placeholder="Address"
            className="w-56 px-4 py-2 border border-black rounded outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Local Date */}
        <div className="mb-4">
          <label className="block text-black font-semibold mb-1">Local Date</label>
          <input
            type="date"
            className="w-60 px-4 py-2 border border-black rounded outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Price */}
        <div className="mb-4">
          <label className="block text-black font-semibold mb-1">Price</label>
          <input value={price} onChange={(e)=>setPrice(e.target.value)}
            type="number"
            placeholder="Price"
            className="w-56 px-4 py-2 border border-black rounded outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Paid */}
        <div className="mb-4">
          <label className="block text-black font-semibold mb-1">Paid</label>
          <input value={paid} onChange={(e)=>setPaid(e.target.value)}
            type="number"
            placeholder="Paid Amount"
            className="w-60 px-4 py-2 border border-black rounded outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Total Price */}
   
        
        {/* Submit Button */}
        <button onClick={handlePost}
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700 transition"
        >
          Submit
        </button>
        <button onClick={(e)=>setIsopen(false)}
         
          className="w-full bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700 transition"
        >
          Close
        </button>
        </div>
      </form>
    </div>
    </div>
}