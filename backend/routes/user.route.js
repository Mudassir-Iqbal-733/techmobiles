const express = require("express");
const { Signup, login, AdminLogin } = require("../controllers/user.controller");


const router = express.Router();

// Routes
router.post("/signup", Signup);
router.post("/login", login);
router.post("/admin-login", AdminLogin);



module.exports = router;
