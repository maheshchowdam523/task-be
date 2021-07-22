import { response } from "../utils";

const express = require("express");
const User = require("../models/user");
const router = express.Router();

router.post("/createUser", async (req, res, next) => {
  try {
    const todo = await User.create(req.body);
    return response(res, 200, todo);
  } catch (err) {
    next({ status: 400, message: "failed to create user" });
  }
});

router.post("/", async (req, res, next) => {
  try {
    const todo = await User.findOne({
      username: req.body.username,
      password: req.body.password
    });
    if (todo) {
      return response(res, 200, todo);
    } else {
      return response(res, 400, { message: "Bad Credentials" });
    }
  } catch (err) {
    next({ status: 400, message: "Bad Credentials" });
  }
});

module.exports = router;
