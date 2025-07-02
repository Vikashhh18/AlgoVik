import React, { useEffect, useState } from 'react';
import { useUser, useAuth } from '@clerk/clerk-react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { baseUrl } from '../../utils/getUrl';

const TodoList = () => {
  // Authentication and state
  const { user } = useUser();
  const { getToken } = useAuth();
  const { isSignedIn } = useUser();
  
  const [todoList, setTodoList] = useState([]);
  const [title, setTitle] = useState('');
  const [topic, setTopic] = useState('');
  const [date, setDate] = useState('');
  const [currentQuote, setCurrentQuote] = useState('');

  const quotes = [
    "Productivity is never an accident. It's always the result of commitment to excellence.",
    "Small daily improvements are the key to staggering long-term results.",
    "The secret of getting ahead is getting started.",
    "You don't have to be great to start, but you have to start to be great.",
    "Every accomplishment starts with the decision to try."
  ];

  const fetchTodo = async () => {
    if (!user) return;
    try {
      const token = await getToken();
      const res = await axios.get(`${baseUrl}/api/todo/${user.id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTodoList(res.data);
      setCurrentQuote(quotes[Math.floor(Math.random() * quotes.length)]);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  useEffect(() => {
    fetchTodo();
  }, [user]);

  const addTodo = async () => {
    if (!isSignedIn) {
       toast.error("Please sign in to continue.");
  return;
    }
    if (!title.trim()) return;
    
    try {
      const token = await getToken();
      await axios.post(
        `${baseUrl}/api/todo`,
        { title, topic, date, complete: false },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchTodo();
      setTitle('');
      setTopic('');
      setDate('');
      toast.success("Task added successfully!");
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  const handleComplete = async (id) => {
    try {
      const token = await getToken();
      await axios.patch(`${baseUrl}/api/todo/${id}`, null, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchTodo();
      toast.success("Task marked as completed!");
    } catch (error) {
      console.error("Error completing todo:", error);
    }
  };
  
  const deleteTodo = async (id) => {
    try {
      const token = await getToken();
      await axios.delete(`${baseUrl}/api/todo/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchTodo();
      toast.success("Task deleted successfully!");
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <header className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
          Achieve More Today
        </h1>
        <p className="text-gray-600 max-w-xl mx-auto">
          {currentQuote || "Every completed task brings you closer to your goals"}
        </p>
      </header>
      <section className="bg-white rounded-xl p-6 max-w-4xl mx-auto mb-8 shadow-sm border border-gray-100">
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="What needs to be done?"
            className="flex-1 px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          
          <select
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="px-4 py-3 border border-gray-200 rounded-lg bg-white text-gray-600"
          >
            <option value="">Category</option>
            <option value="Arrays">Arrays</option>
            <option value="Linked List">Linked List</option>
            <option value="HTML">HTML</option>
            <option value="JavaScript">JavaScript</option>
            <option value="Other">Other</option>
          </select>

          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="px-4 py-3 border border-gray-200 rounded-lg text-gray-600"
          />

          <button
            onClick={addTodo}
            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
          >
            Add Task
          </button>
        </div>
      </section>

      {/* Todo List */}
      <main className="max-w-4xl mx-auto space-y-4">
        {todoList.length === 0 ? (
          <div className="bg-white rounded-xl p-8 text-center">
            <div className="text-5xl mb-4">📝</div>
            <h3 className="text-xl text-gray-500 mb-2">Your task list is empty</h3>
            <p className="text-gray-400">Start by adding your first task</p>
          </div>
        ) : (
          todoList.map((todo) => (
            <article
              key={todo._id}
              className={`bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between ${
                todo.complete ? "opacity-80" : "hover:shadow-md"
              }`}
            >
              <div className="flex items-center gap-4">
                <div 
                  onClick={() => handleComplete(todo._id)}
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center cursor-pointer ${
                    todo.complete ? "bg-blue-100 border-blue-400" : "border-gray-300"
                  }`}
                >
                  {todo.complete && (
                    <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className={`text-lg ${
                    todo.complete ? "line-through text-gray-400" : "text-gray-700"
                  }`}>
                    {todo.title}
                  </h3>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {todo.topic && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
                        {todo.topic}
                      </span>
                    )}
                    {todo.date && (
                      <span className="text-sm text-gray-500 flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {todo.date}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <button
                onClick={() => deleteTodo(todo._id)}
                className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                aria-label="Delete task"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </article>
          ))
        )}
      </main>
    </div>
  );
};

export default TodoList;