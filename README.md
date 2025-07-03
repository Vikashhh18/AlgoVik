# AlgoVik - Full Stack DSA Tracker 🚀

**AlgoVik** is a full-stack web application designed to help students and developers track their Data Structures and Algorithms (DSA) preparation. It includes interactive question tracking, mock interviews, aptitude tests, notes, and a personal to-do list.

---

## 🔥 Features

- ✅ **DSA Tracker** – Practice and track problems topic-wise
- ✅ **Top 75 Questions** – Curated must-solve problems
- ✅ **Mock Interviews** – Attempt MCQs + coding rounds like real interviews
- ✅ **Aptitude Section** – Logical, verbal, and quantitative questions
- ✅ **Notes Hub** – Read & download notes for HTML, CSS, JS, etc.
- ✅ **Todo List** – Add daily tasks, goals, or notes
- ✅ **User Progress Tracking** – Saved with Clerk Auth + MongoDB
- ✅ **Responsive UI** – Fully mobile + desktop responsive

---

## 🛠 Tech Stack

### Frontend
- React.js + Vite
- Tailwind CSS
- React Router
- Axios
- Clerk (Authentication)

### Backend
- Node.js + Express
- MongoDB + Mongoose
- Render (Hosting)
- Clerk Webhook Integration

---

## 📂 Project Structure

mainProject/
├── frontend/ # React frontend (Vercel)
│ ├── public/
│ ├── src/
│ ├── vite.config.js
│ ├── vercel.json
│ └── .env
├── backend/ # Express backend (Render)
│ ├── routers/
│ ├── models/
│ ├── utils/
│ ├── server.js
│ └── .env

yaml
Copy
Edit

---

## 🚀 Deployment

### Frontend (Vercel)
- Deploy the `/frontend` folder only.
- Set the environment variable:
VITE_BACKEND_URL=https://algovik.onrender.com

pgsql
Copy
Edit
- Ensure `vercel.json` is inside `/frontend`:
```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
Backend (Render)
Deploy the /backend folder.

Set these environment variables:

ini
Copy
Edit
MONGO_URI=your_mongodb_url
CLERK_SECRET_KEY=your_clerk_secret
CORS must allow:

bash
Copy
Edit
https://algovik.vercel.app
http://localhost:5173  (for local development)
📸 Screenshot

![Uploading screencapture-algovik-vercel-app-2025-07-03-02_00_31.png…]()


🙌 Credits
Built with ❤️ by Vikash Sharma
