const router = require("express").Router();
const {register_page, register, login_page, login, logout} = require("../controllers/auth");

router.route("/register").get(register_page).post(register);
router.route("/login").get(login_page).post(login)
router.route("/logout").get(logout)

module.exports = router;