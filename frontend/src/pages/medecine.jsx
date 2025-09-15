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
    const [category,setCategory] = useState("")
    const [purchase,setPurchase] = useState("")
    const formDta = new FormData()
       formDta.append("img",mImage)
       formDta.append("name",name)
       formDta.append("sell",sell)
       formDta.append("purchase",purchase)
       formDta.append("quantity",quantity)
       formDta.append("category",category)
   const HandlePosting = (e) =>{ 
   e.preventDefault()
  axios.post("http://localhost:5000/create/medicine",formDta).then(()=>{
           alert("success")
           setIsOpen(false)
           handlePost()
       })
    }

//   read
    const handlePost=()=>{
        axios.get("http://localhost:5000/read/medicine").then((res)=>{
             setData(res.data)
        })
    }
    useEffect(()=>{
        handlePost()
    },[])

    // delee
    const HandleDelete = (id)=>{
        axios.delete(`http://localhost:5000/delete/medicine/${id}`).then(()=>{
            
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
        <div className=" flex justify-between px-6">
            <div className="flex gap-[34rem] items-center">
              <h1 className="text-3xl font-semibold">Our Medecine</h1>
                <button onClick={HandleOpen} className="px-8 py-2 rounded-lg  text-2xl text-white bg-blue-500">Add New</button>
  
            </div>
          
        </div>
     <table className="text-center mt-4   border-l border-r ">
          <thead class="bg-blue-50 text-black ">
            <tr>
              <th class="px-6 py-2 text-center text-xl font-semibold">ID</th>
              <th class="px-6 py-2 text-center text-xl font-semibold">image</th>
              <th class="px-6 py-2 text-center text-xl font-semibold">Name</th>
              <th class="px-6 py-2 text-center text-xl font-semibold">sell</th>
              <th class="px-6 py-2 text-center text-xl font-semibold">purchase</th>
              <th class="px-6 py-2 text-center text-xl font-semibold">profit</th>
              <th class="px-6 py-2 text-center text-xl font-semibold">category</th>
              <th class="px-6 py-2 text-center text-xl font-semibold">quantity</th>
            
              <th class="px-2 py-2 text-center text-xl font-semibold">Actions</th>
            </tr>
          </thead>
        {
            data.map((item)=>{
                return  <tbody class="text-center text-black text-2xl">
                <tr class=" border-b ">
                  <td class="px-10 py-3">{item.prId}</td>
                  <td> <img className="w-14 h-14 border-2 border-blue-50  rounded-lg" src={`http://localhost:5000/allImg/${item.mImage}`} alt="" /></td>
                  <td class="px-5 py-3">{item.name}</td>
                  <td class="px-5 py-3">${item.sell}</td>
                  <td class="px-5 py-3">${item.purchase}</td>
                  <td class="px-5 py-3">{item.sell-item.purchase}</td>
                  <td class="px-5 py-3">{item.category}</td>
                  <td class="px-5 py-3">{item.quantity}</td>
                  <td class="px-5 py-3">
                    <div className="flex gap-2 items-center">
                <Link to={`/dashboard/Updatemedicine/${item._id}`}><i className="fa-solid fa-edit text-blue-500"></i></Link>     
               <i onClick={()=> HandleDelete(item._id)}  className="fa-solid fa-trash "></i>
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
<form className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-2xl shadow-lg">
  <div className="flex flex-col">
    <label className="mb-1 font-semibold text-gray-700">Name</label>
    <input
      type="text"
      placeholder="Enter name"
      value={name}
      onChange={(e) => setName(e.target.value)}
      className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      required
    />
  </div>

  <div className="flex flex-col">
    <label className="mb-1 font-semibold text-gray-700">Image</label>
    <input
      type="file"
      onChange={(e) => setprImage(e.target.files[0])}
      className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      required
    />
  </div>

  <div className="flex flex-col">
    <label className="mb-1 font-semibold text-gray-700">Sell Price</label>
    <input
      type="number"
      placeholder="Enter sell price"
      value={sell}
      onChange={(e) => setSell(e.target.value)}
      className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      required
    />
  </div>

  <div className="flex flex-col">
    <label className="mb-1 font-semibold text-gray-700">Quantity</label>
    <input
      type="number"
      placeholder="Enter quantity"
      value={quantity}
      onChange={(e) => setQuantity(e.target.value)}
      className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      required
    />
  </div>

  <div className="flex flex-col">
    <label className="mb-1 font-semibold text-gray-700">Category</label>
    <input
      type="text"
      placeholder="Enter category"
      value={category}
      onChange={(e) => setCategory(e.target.value)}
      className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      required
    />
  </div>

  <div className="flex flex-col">
    <label className="mb-1 font-semibold text-gray-700">Purchase Price</label>
    <input
      type="number"
      placeholder="Enter purchase price"
      value={purchase}
      onChange={(e) => setPurchase(e.target.value)}
      className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      required
    />
  </div>

  <div className="md:col-span-2 flex justify-end">
    <button
      onClick={HandlePosting}
      type="submit"
      className="w-full py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition-colors"
    >
      Submit
    </button>
  </div>
</form>

    </div>
    
    
    </>
    
}