import axios from "axios"
import { useEffect, useState } from "react"
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { Link } from "react-router-dom";


export default function Selles(){
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
    const [quantity,setQuantity] = useState("")
    const [price,setPrice] = useState("")
    const [product,setProduct] = useState("")

    const Handleposting = (e) =>{
        e.preventDefault()
        axios.post("http://localhost:5000/create/sales",{
            "name":name,
            "quantity":quantity,
            "price":price,
            "product":product
        }).then(()=>{
            alert("succes")
            setIsOpen(false)
            handlePost()
        })
    }

//   read
    const handlePost=()=>{
        axios.get("http://localhost:5000/read/sales").then((res)=>{
             setData(res.data)
        })
    }
    useEffect(()=>{
        handlePost()
    },[])

    // delee
    const HandleDelete = (id)=>{
        axios.delete(`http://localhost:5000/delete/sales/${id}`).then(()=>{  
            toast("Delete sales Success",{
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
            <div className="flex gap-[36rem] items-center">
                <h1 className="text-3xl font-semibold">Selles:</h1>
                <button onClick={HandleOpen} className="px-8 py-2 rounded-lg text-2xl text-white bg-blue-500 font-medium"> <i className="fa-solid fa-plus"></i>Add New</button>
            </div>
          
        </div>
     <table className="text-center mt-3    ">
          <thead class="bg-blue-50 text-black ">
            <tr>
              <th class="px-7 py-2 text-center text-2xl font-semibold">ID</th>
              <th class="px-7 py-2 text-center text-2xl font-semibold">Name of Patient</th>
              <th class="px-7 py-2 text-center text-2xl font-semibold">productName</th>
              <th class="px-7 py-2 text-center text-2xl font-semibold">price</th>
              <th class="px-7 py-2 text-center text-2xl font-semibold">quantity</th>
              <th class="px-7 py-2 text-center text-2xl font-semibold">Actions</th>
            </tr>
          </thead>
        {
            data.map((item)=>{
                return  <tbody class="text-center text-black text-2xl">
                <tr class="  border-b">
                  <td class="px-6 py-3">{item.seId}</td>
                  <td class="px-6 py-3">{item.name}</td>
                  <td class="px-6 py-3">{item.product}</td>
                  <td class="px-6 py-3">${item.price}</td>
                  <td class="px-6 py-3">{item.quantity}</td>
                  <td class="px-6 py-3">
                    <div className="flex gap-2 items-center">
             <Link to={`/dashboard/Updateselles/${item._id}`}> <i className="fa-solid fa-edit text-blue-500"></i>  </Link>  
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
      <form  className="flex flex-col gap-4">
        <input type="text"  placeholder="Name"  value={name} onChange={(e) => setName(e.target.value)} className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"  />
        <input type="number" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"  />
        <input type="text" placeholder="Quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"  />
        <input type="text" placeholder="Product name"  value={product} onChange={(e) => setProduct(e.target.value)} className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"  />
        <button onClick={Handleposting} type="submit" className="p-3 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 transition-colors" > Submit
        </button>
      </form>
    </div>
    </>  
}