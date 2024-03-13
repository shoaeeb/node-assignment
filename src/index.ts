import express from "express";
import "dotenv/config";
import mongoose from "mongoose";
import taskRoutes from "./routes/tasks";

const app = express();

mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string);
const port = process.env.PORT || 3000;

app.use(express.json());
app.use("/api/v1", taskRoutes);
app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
