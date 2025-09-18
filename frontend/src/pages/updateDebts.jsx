import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { toast,  } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

export default function UpdateDebts(){
    const [companyName,setcompanyName]=useState("")
    const [phone,setPhone]=useState("")
    const [address,setAddress]=useState("")
    const [price,setPrice]=useState("")
    const [quantity,setQuantity]=useState("")
    const [paidAmount,setPaid]=useState("")
    const [productName,setproduct]=useState("")

const navigate=useNavigate()
const params=useParams()
    function handleReadSingle(){
        axios.get(`http://localhost:5000/single/debt/${params.id}`).then((res)=>{
            setcompanyName(res.data[0].companyName),
            setPhone(res.data[0].phone),
            setAddress(res.data[0].address),
            setPrice(res.data[0].price),
            setQuantity(res.data[0].quantity),
            setPaid(res.data[0].paidAmount),
            setproduct(res.data[0].productName)
            })

    }
useEffect(()=>{
    handleReadSingle()
},[])

    function handleUpdate(e){
        e.preventDefault()
      axios.put(`http://localhost:5000/update/debt/${params.id}`,{
        companyName,
        phone,
        address,
        price,
        quantity,
        paidAmount,
        productName
        

      }).then((res)=>{
        toast.success("Updated succesfully")

        navigate("/dashboard/borrowed")
      }).catch((error) => {
          if(error){
            toast.error("update Failed")
          }
        })
    }
    



    return <div className="mt-14 sm:mt-4">
       

         <div  className="h-56 w-72 sm:ml-32 ml-3 ">
      <form  className="bg-white p-8 rounded-xl shadow-lg sm:w-[520px] w-[400px] border-t ">
        <h2 className="text-2xl font-bold text-black mb-6 text-center">
          Debts Form
        </h2>
        <div className="grid sm:grid-cols-2 grid-cols-1 gap-3 ">
        {/* Name */}
        <div className="mb-4">
          <label className="block text-black font-semibold mb-1">CompanyName</label>
          <input value={companyName} onChange={(e)=>setcompanyName(e.target.value)}
            type="text"
            placeholder="Patient Name"
            className="sm:w-56 w-full px-4 py-2 border border-black rounded outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-black font-semibold mb-1">Name</label>
          <input value={productName} onChange={(e)=>setproduct(e.target.value)}
            type="text"
            placeholder="Patient Name"
            className="sm:w-56 w-full px-4 py-2 border border-black rounded outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Phone */}
        <div className="mb-4">
          <label className="block text-black font-semibold mb-1">Phone</label>
          <input value={phone} onChange={(e)=>setPhone(e.target.value)}
            type="tel"
            placeholder="Phone Number"
            className="sm:w-60 w-full px-4 py-2 border border-black rounded outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Address */}
        <div className="mb-4">
          <label className="block text-black font-semibold mb-1">Address</label>
          <input value={address} onChange={(e)=>setAddress(e.target.value)}
            type="text"
            placeholder="Address"
            className="sm:w-56 w-full px-4 ml-3 py-2 border border-black rounded outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>


        {/* Price */}
        <div className="mb-4">
          <label className="block text-black font-semibold mb-1">Price</label>
          <input value={price} onChange={(e)=>setPrice(e.target.value)}
            type="number"
            placeholder="Price"
            className="sm:w-56 w-full px-4 py-2 border border-black rounded outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-black font-semibold mb-1">Qunatity</label>
          <input value={quantity} onChange={(e)=>setQuantity(e.target.value)}
            type="number"
            placeholder="Price"
            className="sm:w-56 w-full px-4 py-2 border border-black rounded outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Paid */}
        <div className="mb-4">
          <label className="block text-black font-semibold mb-1">Paid</label>
          <input value={paidAmount} onChange={(e)=>setPaid(e.target.value)}
            type="number"
            placeholder="Paid Amount"
            className="sm:w-60 w-full px-4 py-2 border border-black rounded outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

   
        </div>
        
        {/* Submit Button */}
        <button  onClick={handleUpdate}
          type="submit"
          className="w-full bg-blue-600 text-white py-2 ml-3 rounded font-semibold hover:bg-blue-700 transition"
        >
          Submit
        </button>
      </form>
    </div>

    </div>
}