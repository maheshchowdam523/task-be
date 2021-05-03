const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
    _id: {type: String, unique: true},
    name: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date
    },
    updatedAt: {
        type: Date
    }
});

const todoModel = mongoose.model("Todo", todoSchema);

module.exports = todoModel;
