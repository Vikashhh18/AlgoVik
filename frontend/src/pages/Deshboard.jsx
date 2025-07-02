import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useUser, useAuth } from '@clerk/clerk-react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import axios from 'axios';
import { baseUrl } from '../utils/getUrl';

const Dashboard = () => {
const { user } = useUser();
  const { getToken } = useAuth();
  const userId = user?.id;
  
  const [sheetProgress, setSheetProgress] = useState([]);
  const [mockStats, setMockStats] = useState({ coding: 0, aptitude: 0 });


  const [todos, setTodos] = useState([
    { title: "Solve 2 Medium Questions", done: false },
    { title: "Complete HTML Notes", done: true },
  ]);

  const sheets = [
    { name: 'top75', label: 'Top 75', link: '/75-interview', total: 75 },
    { name: 'top50', label: 'Top 50', link: '/algo-top-questions', total: 50 },
    { name: 'topicWise', label: 'Topic wise questions', link: '/dsa', total: 180 },
  ];

useEffect(() => {
  const fetchTodos = async () => {
    try {
      const res = await axios.get(`${baseUrl}/api/todo/${userId}`);
      setTodos(res.data); // response is an array of todos
      console.log("✅ TODOS:", res.data);
    } catch (err) {
      console.error("❌ Error fetching todos:", err);
    }
  };

  if (userId) fetchTodos();
}, [userId]);


 useEffect(() => {
  const fetchProgress = async () => {
    const token = await getToken();
  try {  
    const sheetResults = await Promise.all(
        
      sheets.map(async (sheet) => {
        try {
          const res = await axios.get(
            `${baseUrl}/api/progress?sheetName=${sheet.name}`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          const solved = res.data.progress.filter(p => p.status === 'solved').length;
          const total = sheet.total;
          const progress = Math.round((solved / total) * 100);
          return { ...sheet, progress };
        } catch {
          return { ...sheet, progress: 0 };
        }
      })
    );
    setSheetProgress(sheetResults);

    try {
      const res = await axios.get(`${baseUrl}/api/mock/data/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res?.data && typeof res.data.coding === "number") {
        setMockStats({
          coding: res.data.coding ?? 0,
          aptitude: res.data.aptitude ?? 0,
        });
      } else {
        console.warn("Unexpected response from /api/mock/data", res.data);
      }
    } catch (error) {
      console.error("Error fetching mock stats:", error);
    }
} catch (error) {
      console.error("Error fetching progress:", error); }
}
if (userId) fetchProgress();
}, [userId]);


  return (
    <div>
      <Navbar />
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-6">
  {/* Welcome Section */}
  <section className="bg-indigo-50 rounded-xl p-6 shadow-sm border border-indigo-100">
    <h2 className="text-2xl font-bold text-indigo-800">Welcome, {user?.firstName || 'Student'} 👋</h2>
    <p className="text-gray-600 mt-2">
      Here's your progress overview. Keep up the great work!
    </p>
  </section>

  {/* Progress Cards */}
  <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
    {sheetProgress.map((sheet, i) => (
      <div key={i} className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 bg-indigo-100 rounded-lg">
            <span className="text-indigo-600">📘</span>
          </div>
          <h3 className="font-medium text-gray-800">{sheet.label}</h3>
        </div>
        
        <div className="mb-4">
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-indigo-500" 
              style={{ width: `${sheet.progress}%` }}
            ></div>
          </div>
          <p className="text-xs text-gray-500 mt-1">{sheet.progress}% completed</p>
        </div>
        
        <Link 
          to={sheet.link}
          className="inline-block text-sm px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          View Sheet
        </Link>
      </div>
    ))}
  </section>

  {/* Stats & Tasks Section */}
  <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
    {/* Mock Tests */}
    <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-purple-100 rounded-lg">
          <span className="text-purple-600">🧠</span>
        </div>
        <h3 className="font-medium text-gray-800">Mock Tests</h3>
      </div>
      
      <div className="space-y-2 text-gray-600">
        <p className="flex justify-between">
          <span>Coding Tests:</span>
          <span className="font-medium">{mockStats?.coding ?? 0}/4 completed</span>
        </p>
        <p className="flex justify-between">
          <span>Aptitude Tests:</span>
          <span className="font-medium">{mockStats?.aptitude ?? 0}/4 completed</span>
        </p>
      </div>
      
      <Link 
        to="/mockhub"
        className="mt-4 inline-block text-sm px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
      >
        Go to MockHub
      </Link>
    </div>

    {/* Tasks */}
    <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-green-100 rounded-lg">
          <span className="text-green-600">📝</span>
        </div>
        <h3 className="font-medium text-gray-800">Your Tasks</h3>
      </div>
      
      <ul className="space-y-2">
        {todos.slice(0, 3).map((todo, index) => (
          <li key={index} className="flex items-center">
            <span className={`mr-2 ${todo.done ? 'text-green-500' : 'text-gray-400'}`}>
              {todo.done ? '✓' : '•'}
            </span>
            <span className={todo.done ? 'line-through text-gray-400' : 'text-gray-600'}>
              {todo.title}
            </span>
          </li>
        ))}
      </ul>
      
      <Link 
        to="/todo"
        className="mt-4 inline-block text-sm px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
      >
        Go to Todo
      </Link>
    </div>
  </section>

  {/* Notes Section */}
  <section className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
    <div className="flex items-center gap-3 mb-4">
      <div className="p-2 bg-blue-100 rounded-lg">
        <span className="text-blue-600">📚</span>
      </div>
      <h3 className="font-medium text-gray-800">Notes</h3>
    </div>
    
    <p className="text-gray-600 mb-4">View and revise your study notes.</p>
    
    <Link 
      to="/notes"
      className="inline-block text-sm px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
    >
      Go to Notes
    </Link>
  </section>

  <section>
    <h3 className="text-lg font-medium text-gray-800 mb-4">Quick Links</h3>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {[
        { label: "DSA", to: "/dsa", icon: "📊", color: "bg-indigo-100" },
        { label: "Mock Tests", to: "/mockhub", icon: "🧪", color: "bg-purple-100" },
        { label: "Todo", to: "/todo", icon: "✅", color: "bg-green-100" },
        { label: "Notes", to: "/notes", icon: "📝", color: "bg-blue-100" },
      ].map((item, i) => (
        <Link
          to={item.to}
          key={i}
          className={`${item.color} p-4 rounded-lg text-center hover:shadow-md transition-all`}
        >
          <div className="text-2xl mb-1">{item.icon}</div>
          <span className="font-medium text-gray-700">{item.label}</span>
        </Link>
      ))}
    </div>
  </section>
</div>
      <Footer />
    </div>
  );
};

export default Dashboard;
