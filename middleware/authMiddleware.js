const User = require("../models/user");
const jwt = require("jsonwebtoken");

const protect = async (req, res, next) => {
    const token = req.cookies.digital_nurse_jwt;
    if (token) {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);
        if (user) {
            res.locals.user = user;
            return next()
        }
    }

    return res.redirect("/login");
}

const check_user = async(req, res, next) => {
    const token = req.cookies.digital_nurse_jwt;
    if (token) {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);
        if (user) {
            res.locals.user = user;
        }
    }
    res.locals.user = null;
    return next();
}

module.exports = {protect, check_user}