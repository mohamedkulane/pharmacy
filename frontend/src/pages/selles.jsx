import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useReactToPrint } from "react-to-print";

export default function SalesPage() {
  const [medecine, setMedecine] = useState([]);
  const [cart, setCart] = useState([]);
  const [name, setName] = useState("");
  const [product, setProduct] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState(0);
  const [sales, setSales] = useState([]);

  const invoiceRefs = useRef({});
  const [currentInvoice, setCurrentInvoice] = useState(null);

  // Fetch medicines
  useEffect(() => {
    axios.get("https://pharmacy-backend-2-kalr.onrender.com/read/medicine")
      .then(res => setMedecine(res.data))
      .catch(err => console.error(err));
  }, []);

  // Fetch sales
  const fetchSales = () => {
    axios.get("https://pharmacy-backend-2-kalr.onrender.com/read/sales")
      .then(res => setSales(res.data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchSales();
  }, []);

  // Update price when product changes
  useEffect(() => {
    if (product) {
      const med = medecine.find(m => m.name === product);
      setPrice(med?.sell || 0);
    } else {
      setPrice(0);
    }
  }, [product, medecine]);

  // Add to cart
  const addToCart = (e) => {
    e.preventDefault();
    if (!product || !quantity) {
      toast.error("Please select product and quantity");
      return;
    }
    const total = price * quantity;
    setCart([...cart, { product, quantity, price, total }]);
    setProduct("");
    setQuantity("");
    setPrice(0);
  };

  // Submit sale
  const handleSubmitSale = () => {
    if (!name || cart.length === 0) {
      toast.error("Customer name and at least one product required!");
      return;
    }

    const itemsToSend = cart.map(({ product, quantity }) => {
      const med = medecine.find(m => m.name === product);
      return {
        product,
        quantity,
        price: med?.sell || 0
      };
    });

    axios.post("https://pharmacy-backend-2-kalr.onrender.com/create/sales", { name, items: itemsToSend })
      .then(() => {
        toast.success("Sale created successfully!");
        setName("");
        setCart([]);
        fetchSales();
      })
      .catch(err => {
        toast.error(err.response?.data?.message || "Error creating sale");
      });
  };

  // Print invoice
  const handlePrint = useReactToPrint({
    content: () => currentInvoice,
  });

  const totalAmount = cart.reduce((sum, item) => sum + item.total, 0);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold mb-4">Sales & Invoice</h1>

      {/* Sale Form */}
      <form className="flex flex-col gap-4 w-[400px] mb-6">
        <input
          type="text"
          placeholder="Customer Name"
          value={name}
          onChange={e => setName(e.target.value)}
          className="p-2 border rounded"
        />
        <select
          value={product}
          onChange={e => setProduct(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="">Select Product</option>
          {medecine.map(m => (
            <option key={m._id} value={m.name}>{m.name}</option>
          ))}
        </select>
        <input
          type="number"
          placeholder="Quantity"
          value={quantity}
          onChange={e => setQuantity(e.target.value)}
          className="p-2 border rounded"
        />
        {product && (
          <input
            type="number"
            value={price}
            readOnly
            className="p-2 border rounded bg-gray-100"
          />
        )}
        <button
          onClick={addToCart}
          className="p-2 bg-blue-500 text-white rounded"
        >
          Add to Cart
        </button>
      </form>

      {/* Cart Table */}
      {cart.length > 0 && (
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">Cart</h2>
          <table className="w-full border text-center">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2">Product</th>
                <th className="border p-2">Qty</th>
                <th className="border p-2">Price</th>
                <th className="border p-2">Total</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((c, i) => (
                <tr key={i}>
                  <td className="border p-2">{c.product}</td>
                  <td className="border p-2">{c.quantity}</td>
                  <td className="border p-2">${c.price}</td>
                  <td className="border p-2">${c.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <h3 className="text-xl font-bold mt-4">Grand Total: ${totalAmount}</h3>
          <button
            onClick={handleSubmitSale}
            className="p-2 bg-green-500 text-white rounded mt-4"
          >
            Save Sale
          </button>
        </div>
      )}

      {/* Sales List */}
      <h2 className="text-2xl font-semibold mb-2">All Sales</h2>
      {sales.map((s) => {
        const saleTotal = s.items?.reduce((sum, item) => sum + (item.price || 0) * item.quantity, 0) || 0;
        return (
          <div key={s._id} className="mb-6 border p-4 rounded">
            <p><strong>Customer:</strong> {s.name}</p>
            <p><strong>Products:</strong> {s.items?.map(item => item.product).join(", ")}</p>
            <p><strong>Total:</strong> ${saleTotal}</p>
            <button
              onClick={() => {
                setCurrentInvoice(invoiceRefs.current[s._id]);
                setTimeout(() => handlePrint(), 100);
              }}
              className="p-2 bg-purple-500 text-white rounded mt-2"
            >
              Print Invoice
            </button>

            {/* Hidden Invoice */}
            <div
              ref={el => invoiceRefs.current[s._id] = el}
              style={{ display: 'none' }}
            >
              <h1 className="text-2xl font-bold text-center">Pharmacy Invoice</h1>
              <p className="mt-2">Customer: {s.name}</p>
              <table className="w-full mt-4 border">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="border p-2">Product</th>
                    <th className="border p-2">Qty</th>
                    <th className="border p-2">Price</th>
                    <th className="border p-2">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {s.items?.map((item, i) => (
                    <tr key={i}>
                      <td className="border p-2">{item.product}</td>
                      <td className="border p-2">{item.quantity}</td>
                      <td className="border p-2">${item.price}</td>
                      <td className="border p-2">${item.price * item.quantity}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <h2 className="text-xl font-semibold mt-4">Grand Total: ${saleTotal}</h2>
            </div>
          </div>
        )
      })}

      <ToastContainer />
    </div>
  );
}
