import { useContext, useEffect, useState } from "react";
import { Bar, Doughnut } from "react-chartjs-2";
import axios from "axios";
import { authDataContext } from "../context/AuthConteext";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const AdminDashboard = () => {
  const [stats, setStats] = useState({});
  const { serverUrl } = useContext(authDataContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const res = await axios.get(serverUrl + "/admin/getDashboardStats", { withCredentials: true });
        setStats(res.data);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, [serverUrl]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-xl font-bold text-gray-700">Loading Dashboard...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-8 lg:pl-70 rounded pb-20 lg:pb-10">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-black text-gray-900">Admin Dashboard</h1>
        <p className="text-lg text-gray-600">Real-time analytics and insights for your business</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-5 mb-8">
        <div className="bg-white shadow rounded-2xl p-6 flex flex-col items-center">
          <p className="text-sm font-bold text-blue-700 mb-4">Total Users</p>
          <div className="bg-blue-100 rounded-xl px-6 py-4 w-full text-center">
            <p className="text-xl font-bold text-blue-800">{stats?.totalUsers ?? 0}</p>
          </div>
        </div>

        <div className="bg-white shadow rounded-2xl p-6 flex flex-col items-center">
          <p className="text-sm font-bold text-green-700 mb-4">Orders Today</p>
          <div className="bg-green-100 rounded-xl px-6 py-4 w-full text-center">
            <p className="text-xl font-bold text-green-800">{stats?.totalOrdersToday ?? 0}</p>
          </div>
        </div>

        <div className="bg-white shadow rounded-2xl p-6 flex flex-col items-center">
          <p className="text-sm font-bold text-red-700 mb-4">Pending Orders</p>
          <div className="bg-red-100 rounded-xl px-6 py-4 w-full text-center">
            <p className="text-xl font-bold text-red-800">{stats?.pendingOrders ?? 0}</p>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-8">
        <div className="bg-white shadow rounded-2xl p-2 sm:p-6 h-[180px] sm:h-[400px]">
          <Bar data={{
            labels: ["Total Users", "Orders Today", "Pending Orders"],
            datasets: [{
              label: "Count",
              data: [stats?.totalUsers ?? 0, stats?.totalOrdersToday ?? 0, stats?.pendingOrders ?? 0],
              backgroundColor: ["#3B82F6", "#10B981", "#EF4444"]
            }]
          }} options={{ responsive: true }} />
        </div>
        <div className="bg-white shadow rounded-2xl p-2 sm:p-6 h-[300px] sm:h-[400px]">
          <Doughnut data={{
            labels: ["COD Earnings", "Razorpay Earnings", "Pending Amount"],
            datasets: [{
              data: [stats?.codEarnings ?? 0, stats?.razorpayEarnings ?? 0, stats?.pendingAmount ?? 0],
              backgroundColor: ["#10B981", "#3B82F6", "#EF4444"]
            }]
          }} options={{ responsive: true }} />
        </div>
      </div>

      {/* Earnings Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-5 mt-8">
        <div className="bg-white shadow rounded-2xl p-6 flex flex-col items-center">
          <p className="text-sm font-bold text-green-700 mb-4">COD Earnings</p>
          <div className="bg-green-100 rounded-xl px-6 py-4 w-full text-center">
            <p className="text-xl font-bold text-green-800">₹{stats?.codEarnings ?? 0}</p>
          </div>
        </div>

        <div className="bg-white shadow rounded-2xl p-6 flex flex-col items-center">
          <p className="text-sm font-bold text-blue-700 mb-4">Razorpay Earnings</p>
          <div className="bg-blue-100 rounded-xl px-6 py-4 w-full text-center">
            <p className="text-xl font-bold text-blue-800">₹{stats?.razorpayEarnings ?? 0}</p>
          </div>
        </div>

        <div className="bg-white shadow rounded-2xl p-6 flex flex-col items-center">
          <p className="text-sm font-bold text-red-700 mb-4">Pending Amount</p>
          <div className="bg-red-100 rounded-xl px-6 py-4 w-full text-center">
            <p className="text-xl font-bold text-red-800">₹{stats?.pendingAmount ?? 0}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
