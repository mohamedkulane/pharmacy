import axios from "axios"
import { useEffect, useState } from "react"
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { Link } from "react-router-dom";

export default function Medecine(){
    const [data,setData] = useState([])
    const [isOpen,setIsOpen] = useState(false)
    function HandleOpen(){
        if(isOpen==false)
        {
            setIsOpen(true)
        }
        else{
            setIsOpen(false)
        }
    }
    // posting
    const [name,setName] = useState("")
    const [mImage,setprImage] = useState("")
    const [sell,setSell] = useState("")
    const [quantity,setQuantity] = useState("")
    const [profit,setProfit] = useState("")
    const [category,setCategory] = useState("")
    const [purchase,setPurchase] = useState("")
    const formDta = new FormData()
       formDta.append("img",mImage)
       formDta.append("name",name)
       formDta.append("sell",sell)
       formDta.append("profit",profit)
       formDta.append("purchase",purchase)
       formDta.append("quantity",quantity)
       formDta.append("category",category)
   const HandlePosting = (e) =>{ 
   e.preventDefault()
  axios.post("http://localhost:5100/create/medicine",formDta).then(()=>{
           alert("success")
           setIsOpen(false)
           handlePost()
       })
    }

//   read
    const handlePost=()=>{
        axios.get("http://localhost:5100/read/medicine").then((res)=>{
             setData(res.data)
        })
    }
    useEffect(()=>{
        handlePost()
    },[])

    // delee
    const HandleDelete = (id)=>{
        axios.delete(`http://localhost:5100/delete/medicine/${id}`).then(()=>{
            
            toast("Delete medicine Success",{
                position: "top-right",
                autoClose:2000,
                hideProgressBar:false,
               })   
               
             setTimeout(() => {
                handlePost();
            }, 3000);
        })
    }


    return <>
     <div  style={{display:isOpen==true?"none":""}} className="pt-7  ">
        <div className="ml-96 flex justify-between px-6">
            <div>
                <button onClick={HandleOpen} className="px-8 py-2 rounded-lg text-2xl text-white bg-blue-300">Add New</button>
            </div>
          
        </div>
     <table className="text-center mt-3 ml-20 w-[900px]   rounded-2xl overflow-hidden">
          <thead class="bg-blue-500 text-white ">
            <tr>
              <th class="px-2 py-2 text-center text-xl font-semibold">ID</th>
              <th class="px-2 py-2 text-center text-xl font-semibold">image</th>
              <th class="px-2 py-2 text-center text-xl font-semibold">Name</th>
              <th class="px-2 py-2 text-center text-xl font-semibold">sell</th>
              <th class="px-2 py-2 text-center text-xl font-semibold">purchase</th>
              <th class="px-2 py-2 text-center text-xl font-semibold">profit</th>
              <th class="px-2 py-2 text-center text-xl font-semibold">category</th>
              <th class="px-2 py-2 text-center text-xl font-semibold">quantity</th>
            
              <th class="px-2 py-2 text-center text-xl font-semibold">Actions</th>
            </tr>
          </thead>
        {
            data.map((item)=>{
                return  <tbody class="text-center text-black text-2xl">
                <tr class=" border-black border-b-2">
                  <td class="px-4 py-3">{item.prId}</td>
                  <td class="px-4 py-3"> <img className="w-16 border-2 border-blue-500  " src={`http://localhost:5100/allImg/${item.mImage}`} alt="" /></td>
                  <td class="px-4 py-3">{item.name}</td>
                  <td class="px-4 py-3">{item.sell}</td>
                  <td class="px-4 py-3">{item.purchase}</td>
                  <td class="px-4 py-3">{item.profit}</td>
                  <td class="px-4 py-3">{item.category}</td>
                  <td class="px-4 py-3">{item.quantity}</td>
                  <td class="px-4 py-3">
                    <div className="space-x-5">
                <Link to={`/Updatemedicine/${item._id}`}><i className="fa-solid fa-edit text-green-500"></i></Link>     
               <i onClick={()=> HandleDelete(item._id)}  className="fa-solid fa-trash text-red-600"></i>
                  </div>
                  </td>
                </tr>  
              </tbody>
            })
        }
        
             
          </table>
          </div>
          <ToastContainer/>

        
    <div style={{display:isOpen==true?"block":""}} className="w-[500px] mx-auto mt-10 ml-64 p-6 bg-white rounded-lg shadow-md hidden">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-700">Add Product</h2>
      <form  className="flex flex-col gap-4">
        <input type="text"  placeholder="Name"  value={name} onChange={(e) => setName(e.target.value)} className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" required />
        <input type="file" placeholder="Image"  onChange={(e) => setprImage(e.target.files[0])} className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" required />
        <input type="number" placeholder="Sell Price" value={sell} onChange={(e) => setSell(e.target.value)} className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" required />
        <input type="number" placeholder="Quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"  required/>
        <input type="number" placeholder="Profit" value={profit} onChange={(e) => setProfit(e.target.value)} className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" required/>
        <input type="text" placeholder="Category"  value={category} onChange={(e) => setCategory(e.target.value)} className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" required />
        <input type="number" placeholder="Purchase Price"  value={purchase} onChange={(e) => setPurchase(e.target.value)} className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" required />
        <button onClick={HandlePosting} type="submit" className="p-3 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 transition-colors" > Submit
        </button>
      </form>
    </div>
    
    
    </>
    
}