import axios from "axios";
import { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";

export default function Medecine() {
  const [data, setData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  function HandleOpen() {
    setIsOpen(!isOpen);
  }

  // posting
  const [name, setName] = useState("");
  const [mImage, setprImage] = useState("");
  const [sell, setSell] = useState("");
  const [quantity, setQuantity] = useState("");
  const [category, setCategory] = useState("");
  const [purchase, setPurchase] = useState("");
  const [search, setSearch] = useState("");

  const formDta = new FormData();
  formDta.append("img", mImage);
  formDta.append("name", name);
  formDta.append("sell", sell);
  formDta.append("purchase", purchase);
  formDta.append("quantity", quantity);
  formDta.append("category", category);

  const HandlePosting = (e) => {
    e.preventDefault();
    axios.post("https://pharmacy-backend-2-kalr.onrender.com/create/medicine", formDta).then(() => {
      toast.success("Medicine Added!");
      setIsOpen(false);
      handlePost();
    });
  };

  // read
  const handlePost = () => {
    axios.get("https://pharmacy-backend-2-kalr.onrender.com/read/medicine").then((res) => {
      setData(res.data);
    });
  };
  useEffect(() => {
    handlePost();
  }, []);

  // delete
  const HandleDelete = (id) => {
    axios.delete(`https://pharmacy-backend-2-kalr.onrender.com/delete/medicine/${id}`).then(() => {
      toast("Delete medicine Success", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
      });

      setTimeout(() => {
        handlePost();
      }, 2000);
    });
  };

  return (
    <>
      {/* List Section */}
      <div style={{ display: isOpen ? "none" : "block" }} className="pt-7">
        <div className="flex justify-between px-4 sm:px-6">
          <h1 className="text-2xl sm:text-3xl font-semibold">Our Medicine</h1>
          <button
            onClick={HandleOpen}
            className="px-4 sm:px-8 py-2 rounded-lg text-lg sm:text-2xl text-white bg-blue-500"
          >
            Add New
          </button>
        </div>

        {/* Table wrapper with horizontal scroll on small screens */}
        <div className="overflow-x-auto mt-4">
          <table className="min-w-full border border-gray-200 text-center">
            <thead className="bg-blue-50 text-black text-sm sm:text-lg">
              <tr>
                <th className="px-3 sm:px-6 py-2">ID</th>
                <th className="px-3 sm:px-6 py-2">Image</th>
                <th className="px-3 sm:px-6 py-2">Name</th>
                <th className="px-3 sm:px-6 py-2">Sell</th>
                <th className="px-3 sm:px-6 py-2">Purchase</th>
                <th className="px-3 sm:px-6 py-2">Profit</th>
                <th className="px-3 sm:px-6 py-2">Category</th>
                <th className="px-3 sm:px-6 py-2">Quantity</th>
                <th className="px-3 sm:px-6 py-2">Actions</th>
              </tr>
            </thead>
            <tbody className="text-black text-sm sm:text-lg">
              {data
                .filter((item) => item.quantity > 0)
                .map((item) => (
                  <tr key={item._id} className="border-b">
                    <td className="px-3 sm:px-6 py-2">{item.prId}</td>
                    <td className="py-2">
                      <img
                        className="w-12 h-12 sm:w-14 sm:h-14 border rounded-lg"
                        src={`https://pharmacy-backend-2-kalr.onrender.com/allImg/${item.mImage}`}
                        alt={item.name}
                      />
                    </td>
                    <td className="px-3 sm:px-6 py-2">{item.name}</td>
                    <td className="px-3 sm:px-6 py-2">${item.sell}</td>
                    <td className="px-3 sm:px-6 py-2">${item.purchase}</td>
                    <td className="px-3 sm:px-6 py-2">
                      {item.sell - item.purchase}
                    </td>
                    <td className="px-3 sm:px-6 py-2">{item.category}</td>
                    <td className="px-3 sm:px-6 py-2">{item.quantity}</td>
                    <td className="px-3 sm:px-6 py-2">
                      <div className="flex gap-2 justify-center">
                        <Link to={`/dashboard/Updatemedicine/${item._id}`}>
                          <i className="fa-solid fa-edit text-blue-500"></i>
                        </Link>
                        <i
                          onClick={() => HandleDelete(item._id)}
                          className="fa-solid fa-trash cursor-pointer text-red-500"
                        ></i>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      <ToastContainer />

      {/* Form Section */}
      <div
        style={{ display: isOpen ? "block" : "none" }}
        className="max-w-lg w-full mx-auto mt-8 p-4 sm:p-6 bg-white rounded-lg shadow-md"
      >
        <h2 className="text-xl sm:text-2xl font-bold text-center mb-4 text-gray-700">
          Add Product
        </h2>
        <form
          onSubmit={HandlePosting}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6"
        >
          <div className="flex flex-col">
            <label className="mb-1 font-semibold text-gray-700">Name</label>
            <input
              type="text"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="p-2 sm:p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 font-semibold text-gray-700">Image</label>
            <input
              type="file"
              onChange={(e) => setprImage(e.target.files[0])}
              className="p-2 sm:p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 font-semibold text-gray-700">Sell Price</label>
            <input
              type="number"
              value={sell}
              onChange={(e) => setSell(e.target.value)}
              className="p-2 sm:p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 font-semibold text-gray-700">Quantity</label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="p-2 sm:p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 font-semibold text-gray-700">Category</label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="p-2 sm:p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 font-semibold text-gray-700">
              Purchase Price
            </label>
            <input
              type="number"
              value={purchase}
              onChange={(e) => setPurchase(e.target.value)}
              className="p-2 sm:p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="md:col-span-2">
            <button
              type="submit"
              className="w-full py-2 sm:py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
