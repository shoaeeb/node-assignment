import express from "express";

import {
  createTask,
  getTask,
  getTasks,
  updateTask,
} from "../controllers/tasks";
import { check } from "express-validator";

const router = express.Router();
// post route- api/v1
router.post(
  "/",
  [
    check("name", "name is required").isString(),
    check("completed", "completed is required").optional().isBoolean(),
  ],
  createTask
);
//get route - api/v1
router.get("/", getTasks);

//get route - api/v1/:id
router.get("/:id", getTask);

//put route - api/v1/:id
router.put(
  "/:id",
  [
    check("name", "name is required").isString(),
    check("completed", "completed is required").optional().isBoolean(),
  ],
  updateTask
);

export default router;
