import mongoose from "mongoose";

type TaskType = {
  name: string;
  completed: boolean;
};

const taskSchema = new mongoose.Schema<TaskType>({
  name: {
    type: String,
    required: [true, "Name is required!"],
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

const Task = mongoose.model<TaskType>("Task", taskSchema);

export default Task;
