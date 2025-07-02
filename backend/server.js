import express from 'express';
import 'dotenv/config' 
import { dbConnection } from './utils/dbConnection.js';
const app=express();
import cors from 'cors'
import router from './routers/progress.router.js';
import todoRouter from './routers/Todo.router.js';
import mockRouter from './routers/Mock.router.js';

const port=process.env.PORT||4000;


console.log("Loaded secret:", process.env.CLERK_SECRET_KEY);

// middleware 
app.use(express.json());
app.use(cors())


// routes for progress 
app.use("/api/progress",router);
app.use("/api/todo",todoRouter);
app.use("/api/mock",mockRouter);

app.get("/",(req,res)=>{
    return res.send("hello");
})


// database connection 
dbConnection()

app.listen(port,()=>{
    console.log("server will run at port no ",port)
})