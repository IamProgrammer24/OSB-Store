const express = require("express");
const {
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
  getallProduct,
} = require("../Controller.js/product.controller");
const { authenticate } = require("../Middlewares/isAuthenticated");
const { upload } = require("../Middlewares/multer");

const router = express.Router();

// Create Product
router.post("/create", authenticate, upload.array(), createProduct);

// Get All Product
router.get("/getallproducts", authenticate, getallProduct);

// Get Product
router.get("/:id", authenticate, getProduct);

// Update Product
router.put("/:id", authenticate, updateProduct);

// Delete Product
router.delete("/:id", authenticate, deleteProduct);

module.exports = router;
