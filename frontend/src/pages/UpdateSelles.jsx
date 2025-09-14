import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

function UpdateSelles ()
{
    const [name,setName] = useState("")
    const [quantity,setQuantity] = useState("")
    const [price,setPrice] = useState("")
    const [product,setProduct] = useState("")
   
    const params = useParams()
    const ReadSingleSales = () =>{
        axios.get(`http://localhost:5100/single/sales/${params.id}`).then((res)=>{
               setName(res.data[0].name)
               setPrice(res.data[0].price)
               setQuantity(res.data[0].quantity)
               setProduct(res.data[0].product)
           })
       }
      useEffect(()=>{
       ReadSingleSales()
      },[])


      const HandleUpdated = (e) =>{
        e.preventDefault()
        axios.put(`http://localhost:5100/update/sales/${params.id}`,{
            "name":name,
            "price":price,
            "quantity":quantity,
            "product":product
        }).then(()=>{
            alert("updated")
        })
    }

    return <>
      <div  className="w-[500px] mx-auto mt-16 ml-96 p-6 bg-white rounded-lg shadow-md ">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-700">Add Product</h2>
      <form  className="flex flex-col gap-4">
        <input type="text"  placeholder="Name"  value={name} onChange={(e) => setName(e.target.value)} className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"  />
        <input type="number" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"  />
        <input type="text" placeholder="Quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"  />
        <input type="text" placeholder="Product name"  value={product} onChange={(e) => setProduct(e.target.value)} className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"  />
        <button onClick={HandleUpdated}  type="submit" className="p-3 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 transition-colors" > Submit
        </button>
      </form>
    </div>
    </>
}
export default UpdateSelles