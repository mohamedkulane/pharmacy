import { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import "react-toastify/dist/ReactToastify.css";

export default function Reports() {
  const [activeSection, setActiveSection] = useState("debts");
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [medecine, setMedeicne] = useState([]);
  const [product, setProduct] = useState("");
  const [price, setPrice] = useState("");

  const fetchData = async () => {
    try {
      let url = "";
      if (activeSection === "debts") url = "https://pharmacy-backend-2-kalr.onrender.com/read/debts";
      if (activeSection === "loans") url = "https://pharmacy-backend-2-kalr.onrender.com/read/loan";
      if (activeSection === "medicine") url = "https://pharmacy-backend-2-kalr.onrender.com/read/medicine";
      if (activeSection === "sales") url = "https://pharmacy-backend-2-kalr.onrender.com/read/sales";
      const res = await axios.get(url);
      setData(res.data);
    } catch (err) {
      toast.error(`Failed to fetch ${activeSection} data`);
    }
  };

  useEffect(() => {
    fetchData();
  }, [activeSection]);

  const filteredData = data.filter((item) =>
    (item.companyName || item.name || "")
      .toLowerCase()
      .includes(search.toLowerCase()) ||
    (item.productName || item.product || "")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const exportExcel = () => {
    if (!data.length) return toast.error("No data to export!");
    let exportData = [];

    if (activeSection === "medicine") {
      exportData = filteredData.map((item, index) => ({
        ID: index + 1,
        Name: item.name,
        ImageURL: `https://pharmacy-backend-2-kalr.onrender.com/allImg/${item.mImage}`,
        SellPrice: item.sell,
        PurchasePrice: item.purchase,
        Profit: item.sell - item.purchase,
        Category: item.category,
        Quantity: item.quantity,
      }));
    } else if (activeSection === "sales") {
      exportData = filteredData.map((item, index) => ({
        ID: index + 1,
        Name: item.name,
        Product: item.product,
        Price: item.price,
        Quantity: item.quantity,
      }));
    } else {
      exportData = filteredData.map((item, index) => ({
        ID: index + 1,
        Name: item.name || item.companyName,
        Phone: item.phone || "-",
        Address: item.address || "-",
        Product: item.product || item.productName || "-",
        Total: item.price || 0,
        Paid: item.paid || 0,
        Remaining: (item.price || 0) - (item.paid || 0),
      }));
    }

    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, activeSection);
    const buf = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    saveAs(
      new Blob([buf], { type: "application/octet-stream" }),
      `${activeSection}_report.xlsx`
    );
  };

  function handleReadMedecine() {
    axios.get("https://pharmacy-backend-2-kalr.onrender.com/read/medicine").then((res) => {
      setMedeicne(res.data);
    });
  }
  useEffect(() => {
    if (product) {
      const med = medecine.find((m) => m.name === product);
      setPrice(med?.sell || 0);
    } else {
      setPrice(0);
    }
    handleReadMedecine();
  }, [product, medecine]);

  return (
    <div className="p-4 sm:p-6">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center">
        {activeSection.charAt(0).toUpperCase() + activeSection.slice(1)} Reports
      </h1>

      {/* Section Buttons */}
      <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-4">
        {["debts", "loans", "sales", "medicine"].map((section) => (
          <button
            key={section}
            className={`px-3 sm:px-4 py-2 rounded text-sm sm:text-base ${
              activeSection === section
                ? "bg-blue-600 text-white"
                : "bg-gray-200"
            }`}
            onClick={() => setActiveSection(section)}
          >
            {section.charAt(0).toUpperCase() + section.slice(1)}
          </button>
        ))}
        <button
          className="px-3 sm:px-4 py-2 rounded bg-green-600 text-white text-sm sm:text-base"
          onClick={exportExcel}
        >
          Export to Excel
        </button>
      </div>

      {/* Search */}
      <div className="flex justify-center mb-4">
        <input
          type="text"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded p-2 w-full sm:w-1/2 md:w-1/3 text-sm sm:text-base"
        />
      </div>

      {/* Table */}
      <div className="bg-white rounded shadow p-2 sm:p-4 overflow-x-auto">
        <table className="min-w-full text-xs sm:text-sm md:text-base border border-gray-200">
          <thead className="bg-blue-50">
            <tr>
              <th className="px-2 sm:px-4 py-2">ID</th>
              {activeSection === "medicine" && <th>Image</th>}
              <th>{activeSection !== "medicine" ? "Name" : "Product"}</th>
              {activeSection !== "medicine" &&
                activeSection !== "sales" && <th>Phone</th>}
              {activeSection !== "medicine" &&
                activeSection !== "sales" && <th>Address</th>}
              <th>
                {activeSection === "medicine"
                  ? null
                  : "Product" || activeSection === "Loans"
                  ? null
                  : "Product"}
              </th>
              {activeSection === "medicine" ? <th>Sell</th> : <th>Price</th>}
              {activeSection === "medicine" && <th>Purchase</th>}
              {activeSection === "medicine" && <th>Profit</th>}
              {activeSection === "medicine" && <th>Quantity</th>}
              {activeSection === "sales" && <th>Quantity</th>}
              {activeSection !== "medicine" &&
                activeSection !== "sales" && <th>Paid</th>}
              {activeSection !== "medicine" &&
                activeSection !== "sales" && <th>Remaining</th>}
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item, index) => (
              <tr
                key={item._id}
                className="text-center border-b text-xs sm:text-sm md:text-base"
              >
                <td className="px-2 sm:px-4 py-2">{index + 1}</td>
                {activeSection === "medicine" && (
                  <td>
                    <img
                      src={`https://pharmacy-backend-2-kalr.onrender.com/allImg/${item.mImage}`}
                      alt={item.name}
                      className="w-10 h-10 sm:w-14 sm:h-14 mx-auto object-cover"
                    />
                  </td>
                )}
                <td>{item.name || item.companyName}</td>

                {activeSection !== "medicine" &&
                  activeSection !== "sales" && <td>{item.phone || "-"}</td>}
                {activeSection !== "medicine" &&
                  activeSection !== "sales" && <td>{item.address || "-"}</td>}

                <td>{item.names || item.productName || item.product || "-"}</td>

                {/* Sales */}
                {activeSection === "sales" && (
                  <>
                    <td>
                      $
                      {medecine.find((m) => m.name === item.product)?.sell || 0}
                    </td>
                    <td>{item.quantity}</td>
                  </>
                )}

                {/* Medicine */}
                {activeSection === "medicine" && (
                  <>
                    <td>${item.sell || item.price}</td>
                    <td>${item.purchase}</td>
                    <td>${item.sell - item.purchase}</td>
                    <td>{item.quantity}</td>
                  </>
                )}

                {/* Debts & Loans */}
                {activeSection !== "medicine" &&
                  activeSection !== "sales" && (
                    <>
                      <td>${item.price}</td>
                      <td>${item.paid || item.paidAmount || 0}</td>
                      <td>
                        ${ (item.price || 0) - (item.paid || item.paidAmount || 0) }
                      </td>
                    </>
                  )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
}
