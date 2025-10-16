const express = require("express");
const { Signup, login, AdminLogin, getUserById, updateUserName } = require("../controllers/user.controller");


const router = express.Router();

// Routes
router.post("/signup", Signup);
router.post("/login", login);
router.post("/admin-login", AdminLogin);

router.get("/:id", authMiddleware, getUserById);
router.put("/:id", authMiddleware, updateUserName);


module.exports = router;
