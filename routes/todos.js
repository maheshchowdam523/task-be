import { response } from "../utils";

const express = require("express");
const Todo = require("../models/todo");
const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const todos = await Todo.find({}).sort({ createdAt: -1 });
    return response(res, 200, todos);
  } catch (err) {
    next({ status: 400, message: "failed to get todos" });
  }
});

router.get("/dashboard", async (req, res, next) => {
  try {
    const todos = await Todo.find({}).sort({ updatedAt: -1 });
    const finalResponse = {
      totalCount: todos.length,
      completedCount: todos.filter(a => a.completed === true).length,
      recentTasks: todos.slice(0, 3)
    };
    return response(res, 200, finalResponse);
  } catch (e) {
    next({ status: 400, message: "failed to get dashboard data" });
  }
});
router.post("/", async (req, res, next) => {
  try {
    let body = req.body;
    body._id = uuid.v4();
    body.createdAt = new Date();
    body.updatedAt = new Date();
    const todo = await Todo.create(req.body);
    return response(res, 201, todo);
  } catch (err) {
    console.log(err);
    next({ status: 400, message: "failed to create todo" });
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const updatePayload = Object.assign(req.body);
    updatePayload.updatedAt = new Date();
    const todo = await Todo.findByIdAndUpdate(req.params.id, updatePayload, {
      new: true
    });
    return response(res, 200, todo);
  } catch (err) {
    next({ status: 400, message: "failed to update todo" });
  }
});
router.delete("/:id", async (req, res, next) => {
  try {
    await Todo.findByIdAndRemove(req.params.id);
    return response(res, 200, "todo deleted!");
  } catch (err) {
    next({ status: 400, message: "failed to delete todo" });
  }
});

module.exports = router;
