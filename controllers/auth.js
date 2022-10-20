const User = require("../models/user");
const yup = require("yup");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")

const register_page = (req, res) => {
    return res.render("auth/register");
}

const user_schema = yup.object({
    body: yup.object({
        first_name: yup.string().required("First Name is required."),
        last_name: yup.string().required("Last Name is required."),
        email: yup.string().email("Email Address must be valid.").required("Email Address is required."),
        password: yup.string().required("Password is required.")
    })
})

const register = async (req, res) => {
    try {
        await user_schema.validate({
            body: req.body,
            query: req.query,
            params: req.params,
        })
        await User.create(req.body);
        return res.status(201).json({ success: true, message: "Nurse successfully created." })
    } catch (err) {
        if (err.code === 11000) {
            throw new Error("Email Address is already associated with an account.")
        }
        return res.status(500).json({success: false, message: err.message})
    }
}

const login_page = (req, res) => {
    return res.render("auth/login")
}

const login = async (req, res) => {
    try {
        const user = await User.findOne({email: req.body.email}).select("+password");
        
        if (user) {
            const auth = bcrypt.compare(req.body.password, user.password);
            if (auth) {
                const token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {
                    expiresIn: 60 * 30
                })
                res.cookie("digital_nurse_jwt", token, {
                    maxAge: 1000 * 60 * 30,
                    httpOnly: true
                })
                return res.status(200).json({success: true, message: "Logged In Successfully."})
            }
        }
        throw new Error("Invalid Username or Password.")
    } catch (err) {
        console.log (err);
        return res.status(500).json({success: false, message: err.message})
    }
}

const logout = (req, res) => {
    res.cookie("digital_nurse_jwt", "", {
        maxAge: 1
    });
    res.redirect("/login")
}

module.exports = {
    register_page,
    register,
    login_page,
    login,
    logout
}