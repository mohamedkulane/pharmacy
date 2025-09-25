import { useEffect, useState } from "react";
import axios from "axios";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Legend,
} from "recharts";

export default function MainDashboard() {
  const [medicines, setMedicines] = useState([]);
  const [sales, setSales] = useState([]);
  const [loans, setLoans] = useState([]);
  const [debts, setDebts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [medRes, salesRes, loanRes, debtRes] = await Promise.all([
          axios.get("https://pharmacy-backend-2-kalr.onrender.com/read/medicine"),
          axios.get("https://pharmacy-backend-2-kalr.onrender.com/read/sales"),
          axios.get("https://pharmacy-backend-2-kalr.onrender.com/read/loan"),
          axios.get("https://pharmacy-backend-2-kalr.onrender.com/read/debts"),
        ]);

        const medicinesData = medRes.data;

        // Flatten sales.items[]
        const flattenedSales = salesRes.data.flatMap((s) =>
          s.items.map((item) => {
            const med = medicinesData.find((m) => m.name === item.product);
            return {
              customer: s.name,
              product: item.product,
              quantity: item.quantity,
              price: item.price || med?.sell || 0,
              createdAt: s.createdAt,
            };
          })
        );

        setMedicines(medicinesData);
        setSales(flattenedSales);
        setLoans(loanRes.data);
        setDebts(debtRes.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  // --------- Totals ----------
  const totalMedicines = medicines.filter((m) => m.quantity > 0).length;
  const totalSales = sales.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const totalLoans = loans.reduce(
    (acc, item) => acc + (item.price - item.paid),
    0
  );
  const totalDebts = debts.reduce(
    (acc, item) => acc + (item.price - item.paidAmount),
    0
  );

  // --------- Charts ----------
  // Sales by Product
  const salesByProduct = [];
  sales.forEach((s) => {
    const existing = salesByProduct.find((p) => p.name === s.product);
    if (existing) existing.value += s.price * s.quantity;
    else salesByProduct.push({ name: s.product, value: s.price * s.quantity });
  });

  // Loans chart
  const loansChartData = loans.map((loan) => ({
    name: loan.name,
    Paid: loan.paid,
    Unpaid: loan.price - loan.paid,
  }));

  // Debts chart
  const debtsChartData = debts.map((debt) => ({
    name: debt.companyName,
    Paid: debt.paidAmount,
    Unpaid: debt.price - debt.paidAmount,
  }));

  // Medicines by Category
  const medicineByCategory = [];
  medicines
    .filter((m) => m.quantity > 0)
    .forEach((m) => {
      const existing = medicineByCategory.find(
        (c) => c.category === m.category
      );
      if (existing) existing.value += 1;
      else medicineByCategory.push({ category: m.category, value: 1 });
    });

  const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#A28FD0",
    "#FF6B6B",
  ];

  return (
    <div className="p-6 min-h-screen ">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Dashboard Overview
      </h1>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-6 rounded shadow text-center">
          <h2 className="text-xl font-semibold">Total Medicines</h2>
          <p className="text-3xl mt-2">{totalMedicines}</p>
        </div>
        <div className="bg-white p-6 rounded shadow text-center">
          <h2 className="text-xl font-semibold">Total Sales</h2>
          <p className="text-3xl mt-2">${totalSales}</p>
        </div>
        <div className="bg-white p-6 rounded shadow text-center">
          <h2 className="text-xl font-semibold">Total Loans & Debts</h2>
          <div className="flex gap-1 text-center justify-center">
            <p className="text-3xl mt-2">${totalLoans}/</p>
            <p className="text-3xl mt-2">${totalDebts}</p>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-xl font-semibold mb-4 text-center">
            Sales by Product
          </h2>
          <PieChart width={300} height={300}>
            <Pie
              data={salesByProduct}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              label
            >
              {salesByProduct.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </div>

        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-xl font-semibold mb-4 text-center">
            Loans Paid vs Unpaid
          </h2>
          <BarChart sm:width={400} width={300} height={300} data={loansChartData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="Paid" fill="#82ca9d" />
            <Bar dataKey="Unpaid" fill="#8884d8" />
          </BarChart>
        </div>
      </div>

      {/* Medicines & Debts Charts */}
      <div className="flex gap-3 flex-wrap">
        <div className="bg-white p-6 rounded shadow mt-6">
          <h2 className="text-xl font-semibold mb-4 text-center">
            Medicines by Category
          </h2>
          <BarChart sm:width={400} width={333} height={300} data={medicineByCategory}>
            <XAxis dataKey="category" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#FF8042" />
          </BarChart>
        </div>
        <div className="bg-white p-6 rounded shadow mt-6">
          <h2 className="text-xl font-semibold mb-4 text-center">
            Debts Paid vs Unpaid
          </h2>
          <BarChart sm:width={400} width={330} height={300} data={debtsChartData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="Paid" fill="#ADD8E6" />
            <Bar dataKey="Unpaid" fill="#8884d8" />
          </BarChart>
        </div>
      </div>
    </div>
  );
}
