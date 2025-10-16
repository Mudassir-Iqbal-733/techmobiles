const express = require("express");
const { Signup, login, AdminLogin, getUserById, updateUserName } = require("../controllers/user.controller");
const {AuthCheck} = require("../middlewares/auth.middleware");

const router = express.Router();

// Routes
router.post("/signup", Signup);
router.post("/login", login);
router.post("/admin-login", AdminLogin);

router.get("/me", AuthCheck, getUserById);
router.put("/me", AuthCheck, updateUserName);


module.exports = router;
