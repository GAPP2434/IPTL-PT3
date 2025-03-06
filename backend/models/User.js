const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: String,
    email: { type: String, uqnique: true },
    password: String
});

module.exports = mongoose.model("User", UserSchema);