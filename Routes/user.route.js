const express = require("express");
const {
  registerUser,
  loginUser,
  updateUser,
  getallProduct,
} = require("../Controller.js/user.controller");
const { authenticate } = require("../Middlewares/isAuthenticated");
const router = express.Router();

// Register User
router.post("/registeruser", registerUser);

// Login User
router.post("/loginuser", loginUser);

// Update User
router.put("/update", authenticate, updateUser);

// Get User All Products
router.get("/products", authenticate, getallProduct);

module.exports = router;
