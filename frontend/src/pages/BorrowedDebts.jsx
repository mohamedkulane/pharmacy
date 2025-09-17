import axios from "axios"
import { useEffect, useState } from "react"
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { Link } from "react-router-dom";

export default function Debts() {
  const [data, setData] = useState([])
  const [isOpen, setIsOpen] = useState(false)

  function HandleOpen() {
    setIsOpen(!isOpen)
  }

  // form states
  const [companyName, setCompanyName] = useState("")
  const [phone, setPhone] = useState("")
  const [address, setAddress] = useState("")
  const [productName, setProductName] = useState("")
  const [price, setPrice] = useState("")
  const [quantity, setQuantity] = useState("")
  const [paidAmount, setPaidAmount] = useState("")

  // compute totalPrice automatically
  // const totalPrice = Number(price || 0) * Number(quantity || 0)
  const totalPrice = Number(price || 0) * Number(quantity || 0) - Number(paidAmount || 0)


  // post debt
  const HandlePosting = (e) => {
    e.preventDefault()
    axios.post("http://localhost:5000/create/debt", {
      companyName,
      phone,
      address,
      productName,
      price,
      quantity,
      paidAmount,
      totalPrice,
    }).then(() => {
      toast.success("Debt added successfully")
      setIsOpen(false)
      handleFetch()
      // clear inputs
      setCompanyName("")
      setPhone("")
      setAddress("")
      setProductName("")
      setPrice("")
      setQuantity("")
      setPaidAmount("")
    })
  }

  // read debts
  const handleFetch = () => {
    axios.get("http://localhost:5000/read/debts").then((res) => {
      setData(res.data)
    })
  }
  useEffect(() => {
    handleFetch()
  }, [])

  // delete debt
  const HandleDelete = (id) => {
    axios.delete(`http://localhost:5000/delete/debt/${id}`).then(() => {
      toast("Debt deleted successfully", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
      })
      setTimeout(() => {
        handleFetch()
      }, 3000)
    })
  }

  return (
    <>
      <div style={{ display: isOpen ? "none" : "" }} className="pt-7">
        <div className="flex justify-between px-6">
          <div className="flex gap-[38rem] items-center">
            <h1 className="text-3xl font-semibold">Debts:</h1>
            <button
              onClick={HandleOpen}
              className="px-8 py-2 rounded-lg text-2xl text-white bg-blue-500 font-medium"
            >
              <i className="fa-solid fa-plus"></i> Add New
            </button>
          </div>
        </div>

        <table className="text-center mt-3">
          <thead className="bg-blue-50 text-black">
            <tr>
              <th className="px-6 py-2 text-xl font-semibold">ID</th>
              <th className="px-6 py-2 text-xl font-semibold">Company</th>
              <th className="px-6 py-2 text-xl font-semibold">Phone</th>
              <th className="px-6 py-2 text-xl font-semibold">Address</th>
              <th className="px-6 py-2 text-xl font-semibold">Product</th>
              <th className="px-6 py-2 text-xl font-semibold">Price</th>
              <th className="px-6 py-2 text-xl font-semibold">Quantity</th>
              <th className="px-6 py-2 text-xl font-semibold">Paid</th>
              <th className="px-6 py-2 text-xl font-semibold">Total</th>
              <th className="px-6 py-2 text-xl font-semibold">Actions</th>
            </tr>
          </thead>
          {data.map((item) => (
            <tbody
              key={item._id}
              className="text-center text-black text-xl border-b"
            >
              <tr>
                <td className="px-6 py-3">{item.debtId}</td>
                <td className="px-6 py-3">{item.companyName}</td>
                <td className="px-6 py-3">{item.phone}</td>
                <td className="px-6 py-3">{item.address}</td>
                <td className="px-6 py-3">{item.productName}</td>
                <td className="px-6 py-3">${item.price}</td>
                <td className="px-6 py-3">{item.quantity}</td>
                <td className="px-6 py-3">${item.paidAmount}</td>
                <td className="px-6 py-3">
                 ${Number(item.price || 0) * Number(item.quantity || 0) - Number(item.paidAmount || 0)}
                   </td>
                <td className="px-6 py-3">
                  <div className="flex gap-2 items-center">
                    <Link to={`/dashboard/UpdateDebt/${item._id}`}>
                      <i className="fa-solid fa-edit text-blue-500"></i>
                    </Link>
                    <i
                      onClick={() => HandleDelete(item._id)}
                      className="fa-solid fa-trash cursor-pointer "
                    ></i>
                  </div>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>

      <ToastContainer />

      {/* Add form */}
      <div
        style={{ display: isOpen ? "block" : "" }}
        className="w-[500px] mx-auto mt-10 ml-64 p-6 bg-white rounded-lg shadow-md hidden"
      >
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-700">
          Add Debt
        </h2>
        <form className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Company Name"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            className="p-3 border rounded"
          />
          <input
            type="text"
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="p-3 border rounded"
          />
          <input
            type="text"
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="p-3 border rounded"
          />
          <input
            type="text"
            placeholder="Product Name"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            className="p-3 border rounded"
          />
          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="p-3 border rounded"
          />
          <input
            type="number"
            placeholder="Quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="p-3 border rounded"
          />
          <input
            type="number"
            placeholder="Paid Amount"
            value={paidAmount}
            onChange={(e) => setPaidAmount(e.target.value)}
            className="p-3 border rounded"
          />
          <input
            type="text"
            readOnly
            value={`Total: $${totalPrice}`}
            className="p-3 border rounded bg-gray-100"
          />
          <button
            onClick={HandlePosting}
            type="submit"
            className="p-3 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 transition-colors"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  )
}
