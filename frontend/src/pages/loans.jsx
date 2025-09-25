import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import Swal from "sweetalert2"

export default function Loans() {
  const [isOpen, setIsOpen] = useState(false)
  const [data, setData] = useState([])
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [address, setAddress] = useState("")
  const [price, setPrice] = useState("")
  const [paid, setPaid] = useState("")
  const [date, setDate] = useState("")

  function handlePost(e) {
    e.preventDefault()

    axios.post("https://pharmacy-backend-2-kalr.onrender.com/create/loan", {
      name,
      address,
      phone,
      price,
      paid,
      date,
    }).then(() => {
      Swal.fire({
        title: "Registered successfully!",
        icon: "success",
      })
      setIsOpen(false)
      handleRead()
      resetForm()
    })
  }

  function handleRead() {
    axios.get("https://pharmacy-backend-2-kalr.onrender.com/read/loan").then((res) => {
      setData(res.data)
    })
  }

  useEffect(() => {
    handleRead()
  }, [])

  // delete
  function handleDelete(id) {
    axios.delete(`https://pharmacy-backend-2-kalr.onrender.com/delete/loan/${id}`).then(() => {
      Swal.fire({
        title: "Deleted successfully!",
        icon: "success",
      })
      handleRead()
    })
  }

  function resetForm() {
    setName("")
    setPhone("")
    setAddress("")
    setPrice("")
    setPaid("")
    setDate("")
  }

  return (
    <div className="mt-16 px-4 sm:px-8">
      {/* Header */}
      <div className="flex  justify-between items-center mb-6">
        <h1 className="text-2xl sm:text-3xl font-semibold text-black underline underline-offset-4">
          My Debts
        </h1>
        <button
          onClick={() => setIsOpen(true)}
          className="mt-3 sm:mt-0 bg-gradient-to-r from-blue-400 via-blue-600 to-blue-400 text-white px-6 py-2 rounded-lg font-medium text-lg hover:opacity-90"
        >
          <i className="fa-solid fa-plus mr-2"></i>Add Debt
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="w-full text-center">
          <thead className="bg-blue-50 text-black">
            <tr>
              <th className="px-4 py-2 text-sm sm:text-lg">Name</th>
              <th className="px-4 py-2 text-sm sm:text-lg">Phone</th>
              <th className="px-4 py-2 text-sm sm:text-lg">Address</th>
              <th className="px-4 py-2 text-sm sm:text-lg">Date</th>
              <th className="px-4 py-2 text-sm sm:text-lg">Price</th>
              <th className="px-4 py-2 text-sm sm:text-lg">Paid</th>
              <th className="px-4 py-2 text-sm sm:text-lg">Remaining</th>
              <th className="px-4 py-2 text-sm sm:text-lg">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr
                key={item._id}
                className="border-b hover:bg-gray-50 transition"
              >
                <td className="px-4 py-2 text-base">{item.name}</td>
                <td className="px-4 py-2 text-base">{item.phone}</td>
                <td className="px-4 py-2 text-base">{item.address}</td>
                <td className="px-4 py-2 text-base">{item.date || "N/A"}</td>
                <td className="px-4 py-2 text-base">${item.price}</td>
                <td className="px-4 py-2 text-base">${item.paid}</td>
                <td className="px-4 py-2 text-base">${item.price - item.paid}</td>
                <td className="px-4 py-2">
                  <div className="flex gap-3 justify-center text-lg">
                    <Link to={`/dashboard/updateLoan/${item._id}`}>
                      <i className="fa-solid fa-edit text-blue-600 cursor-pointer"></i>
                    </Link>
                    <i
                      onClick={() => handleDelete(item._id)}
                      className="fa-solid fa-trash text-red-500 cursor-pointer"
                    ></i>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal Form */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <form
            onSubmit={handlePost}
            className="bg-white p-6 sm:p-8 rounded-xl shadow-lg w-[90%] sm:w-[500px]"
          >
            <h2 className="text-2xl font-bold text-center mb-6 text-gray-700">
              Add Debt
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Name */}
              <div>
                <label className="block font-medium mb-1">Name</label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  placeholder="Patient Name"
                  className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500"
                />
              </div>
              {/* Phone */}
              <div>
                <label className="block font-medium mb-1">Phone</label>
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  type="tel"
                  placeholder="Phone Number"
                  className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500"
                />
              </div>
              {/* Address */}
              <div>
                <label className="block font-medium mb-1">Address</label>
                <input
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  type="text"
                  placeholder="Address"
                  className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500"
                />
              </div>
              {/* Date */}
              <div>
                <label className="block font-medium mb-1">Date</label>
                <input
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  type="date"
                  className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500"
                />
              </div>
              {/* Price */}
              <div>
                <label className="block font-medium mb-1">Price</label>
                <input
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  type="number"
                  placeholder="Price"
                  className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500"
                />
              </div>
              {/* Paid */}
              <div>
                <label className="block font-medium mb-1">Paid</label>
                <input
                  value={paid}
                  onChange={(e) => setPaid(e.target.value)}
                  type="number"
                  placeholder="Paid Amount"
                  className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            {/* Buttons */}
            <div className="mt-6 flex gap-4">
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Submit
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="w-full bg-gray-400 text-white py-2 rounded-lg hover:bg-gray-500 transition"
              >
                Close
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}
