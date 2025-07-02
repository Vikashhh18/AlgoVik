import { Todo } from "../model/Todo.model.js";

export const AddTodo = async (req, res) => {
  const userId = req.auth?.userId;
  if (!userId) {
    return res.status(401).json({ message: "Unauthorized. User not logged in." });
  }

  const { title, topic, date, complete } = req.body;
  if (!title || !topic || !date) {
    return res.status(400).json({ message: "Missing value" });
  }

  try {
    const newTodo = await Todo.create({
      userId, title, topic, date, complete: complete || false
    });
    return res.status(201).json(newTodo);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


export const getAllTodo=async(req,res)=>{
    const {userId}=req.params;
    try {
       const todos = await Todo.find({ userId });

        if(!todos){
            return res.status(401).json({ message: "todo is empty" });
        }
        return res.status(201).json(todos);
    } catch (error) {
        return res.status(401).json({ message:error });
    }
}

export const deleteTodo=async(req,res)=>{
    const { id } = req.params;
    
    try {
        await Todo.findByIdAndDelete(id);
        return res.status(201).json({message:"deleted"})
    } catch (error) {
        return res.status(401).json({message:error})
    }
}

export const todoCompleted = async (req, res) => {
  const { id } = req.params;
  try {
    const todo = await Todo.findById(id);
    if (!todo) return res.status(404).json({ message: "Not found" });

    todo.complete = !todo.complete;
    await todo.save();
    return res.status(200).json(todo);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};