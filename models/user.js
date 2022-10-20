const mongoose = require("mongoose");
const {isEmail} = require("validator");
const bcrypt = require("bcrypt")

const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: "First Name is required.",
    },
    last_name: {
        type: String,
        required: "Last Name is required."
    },
    email: {
        type: String,
        required: "Email Address is required.",
        unique: true,
        validate: [isEmail, "Invalid Email Address"]
    },
    password: {
        type: String,
        required: "Password is required.",
        select: false
    }
}, {
    timestamps: true
})

userSchema.pre("save", async function() {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
});

module.exports = mongoose.model("User", userSchema);