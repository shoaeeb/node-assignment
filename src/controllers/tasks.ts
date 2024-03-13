import { validationResult } from "express-validator";
import Task from "../models/task";
import { Request, Response } from "express";

const createTask = async (req: Request, res: Response) => {
  // Create a new task
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array() });
  }
  try {
    const { name, completed } = req.body; //get the name and completed from the request body
    const task = new Task({ name, completed });
    await task.save();
    res.status(201).json(task); //send the task
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error Creating Tasks" });
  }
};

//get all tasks
const getTasks = async (req: Request, res: Response) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error Fetching Tasks" });
  }
};

const getTask = async (req: Request, res: Response) => {
  try {
    const id = req.params.id.toString();
    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json(task);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error Fetching Task" });
  }
};

const updateTask = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ message: errors.array() });
  try {
    const id = req.params.id.toString();
    const { name, completed } = req.body;
    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { name, completed },
      { new: true }
    );
    res.status(200).json(updatedTask);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error updating task" });
  }
};

export { createTask, getTasks, getTask, updateTask };
