const mongoose = require("mongoose");

let userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: {type:Number, required: true},
    email: {type: String, required: false}
});

let User = mongoose.model("users", userSchema); //model名称会默认变成复数形式，比如：child -> children

module.exports = User;