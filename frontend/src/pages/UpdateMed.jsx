import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

function UpdateMedicine ()
{
    const [name,setName] = useState("")
    const [mImage,setprImage] = useState("")
    const [sell,setSell] = useState("")
    const [quantity,setQuantity] = useState("")
    const [category,setCategory] = useState("")
    const [purchase,setPurchase] = useState("")
    const params = useParams()
    const ReadSingleMedicine = () =>{
        axios.get(`http://localhost:5000/single/medicine/${params.id}`).then((res)=>{
               setName(res.data[0].name)
               setSell(res.data[0].sell)
               setQuantity(res.data[0].quantity)
               setCategory(res.data[0].category)
               setPurchase(res.data[0].purchase)
               setprImage(res.data[0].setprImage)
           })
       }
      useEffect(()=>{
       ReadSingleMedicine()
      },[])


      const formDta = new FormData()
      formDta.append("img",mImage)
       formDta.append("name",name)
       formDta.append("sell",sell)
       formDta.append("purchase",purchase)
       formDta.append("quantity",quantity)
       formDta.append("category",category)
       const navigate = useNavigate()

const updateMedicine = (e)=>{
   e.preventDefault()
   axios.put (`http://localhost:5000/update/medicine/${params.id}`,formDta, {
        headers:{
           "Content-Type": "multipart/form-data"
        }
   }).then(()=>{
      alert("updated")
      navigate("/dashboard/medecine")
   })
}



    return <>
     <div  className="w-[500px] mx-auto mt-10 ml-96 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-700">Add Product</h2>
      <form  className="flex flex-col gap-4">
        <input type="text"  placeholder="Name"  value={name} onChange={(e) => setName(e.target.value)} className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" required />
        <input type="file" placeholder="Image"  onChange={(e) => setprImage(e.target.files[0])} className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" required />
        <input type="number" placeholder="Sell Price" value={sell} onChange={(e) => setSell(e.target.value)} className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" required />
        <input type="number" placeholder="Quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"  required/>
        <input type="text" placeholder="Category"  value={category} onChange={(e) => setCategory(e.target.value)} className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" required />
        <input type="number" placeholder="Purchase Price"  value={purchase} onChange={(e) => setPurchase(e.target.value)} className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" required />
        <button onClick={updateMedicine}  type="submit" className="p-3 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 transition-colors" > Submit
        </button>
      </form>
    </div>
    </>
}
export default UpdateMedicine