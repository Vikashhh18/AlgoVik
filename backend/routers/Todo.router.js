import express from 'express'
import { AddTodo, deleteTodo, getAllTodo, todoCompleted } from '../controllers/Todo.controllers.js';
import { verifyClerk } from '../middleware/verifyClerk.js';

const todoRouter=express.Router();

todoRouter.post("/",verifyClerk,AddTodo);
todoRouter.get("/:userId",verifyClerk,getAllTodo);
todoRouter.delete("/:id",verifyClerk,deleteTodo);
todoRouter.patch("/:id",verifyClerk,todoCompleted)

export default todoRouter;