// import express from 'express';
// import 'dotenv/config';
// import cors from 'cors';
// import { dbConnection } from './utils/dbConnection.js';
// import progressRouter from './routers/progress.router.js';
// import todoRouter from './routers/Todo.router.js';
// import mockRouter from './routers/Mock.router.js';
// import codeRunnerRoutes from './routers/ComilerRoute.js'

// const app = express();
// const port = process.env.PORT || 4000;

// // Connect to MongoDB
// dbConnection();


// const allowedOrigins = [
//   'http://localhost:5173',              
//   'https://algovik.vercel.app'         
// ];

// app.use(cors({
//   origin: function (origin, callback) {
//     if (!origin || allowedOrigins.includes(origin)) {
//       callback(null, true);
//     } else {
//       callback(new Error('Not allowed by CORS'));
//     }
//   },
//   credentials: true,
// }));

// // Middleware
// app.use(express.json());

// // Routes
// app.use('/api/progress', progressRouter);
// app.use('/api/todo', todoRouter);
// app.use('/api/mock', mockRouter);
// // app.use('/api/compiler', comilerRouter);
// app.use('/api/code-runner', codeRunnerRoutes);

// app.get('/', (req, res) => {
//   res.send('API is working!');
// }); 


// app.use((req, res) => {
//   res.status(404).json({ message: 'Route not found' });
// });

// app.use((err, req, res, next) => {
//   console.error('Server Error:', err.stack);
//   res.status(500).json({ message: 'Internal Server Error' });
// });

// // Start Server
// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });
import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import { dbConnection } from './utils/dbConnection.js';
import progressRouter from './routers/progress.router.js';
import todoRouter from './routers/Todo.router.js';
import mockRouter from './routers/Mock.router.js';
import codeRunnerRoutes from './routers/ComilerRoute.js';
import problemRouter from './routers/problem.route.js';
// import problemRouter from './routers/problem.router.js'; // Add this import

const app = express();
const port = process.env.PORT || 4000;

// Connect to MongoDB
dbConnection();

const allowedOrigins = [
  'http://localhost:5173',              
  'https://algovik.vercel.app'         
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));

// Middleware
app.use(express.json());

// Routes
app.use('/api/progress', progressRouter);
app.use('/api/todo', todoRouter);
app.use('/api/mock', mockRouter);
app.use('/api/code-runner', codeRunnerRoutes);
app.use('/api/problems', problemRouter); // Add this line
// app.use('/api/problems', problemRouter);

app.get('/', (req, res) => {
  res.send('API is working!');
}); 

app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

app.use((err, req, res, next) => {
  console.error('Server Error:', err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});

// Start Server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});