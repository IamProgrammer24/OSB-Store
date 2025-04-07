const { Product } = require("../Models/product.model");
const { User } = require("../Models/user.model");
const { matchJobWithAlerts } = require("../Controller.js/alert.controller");

// Create Product
const createProduct = async (req, res) => {
  try {
    const { name, semester, branch, college, phoneNumber } = req.body;
    // const files = req.files;

    if (!name || !semester || !branch || !college || !phoneNumber) {
      return res.status(400).json({
        message: "please provide all the fields",
        success: false,
      });
    }
    const product = Product({
      name,
      semester,
      branch,
      college,
      phoneNumber,
    });
    await product.save();

    // Saving product id into user collection

    await User.findByIdAndUpdate(
      { _id: req.id },
      {
        $push: { products: product._id },
      },
      { new: true }
    );

    await matchJobWithAlerts(product);

    if (!product) {
      return res.status(400).json({
        message: "something went wrong",
        success: false,
      });
    }

    return res.status(200).json({
      message: "product created successfully",
      success: true,
    });
  } catch (err) {
    return res.status(400).json({
      error: err.message,
      success: false,
    });
  }
};

// Get Products

const getProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById({ _id: id });
    if (!product) {
      return res.status(400).json({
        message: "Could not find Product",
        success: false,
      });
    }
    return res.status(200).json({
      product,
      success: true,
    });
  } catch (err) {
    return res.status(400).json({
      error: err.message,
      message: "this is get route",
      success: false,
    });
  }
};

// Get All Products

const getallProduct = async (req, res) => {
  try {
    const { name, semester, branch, college } = req.query;

    const filter = {};
    if (name) filter.name = { $regex: name, $options: "i" };
    if (semester) filter.semester = semester;
    if (branch) filter.branch = { $regex: branch, $options: "i" };
    if (college) filter.college = { $regex: college, $options: "i" };

    // If no filters are provided, return all products
    if (Object.keys(filter).length === 0) {
      const products = await Product.find();
      if (!products || products.length === 0) {
        return res.status(404).json({
          message: "No products found",
          success: false,
        });
      }
      return res.status(200).json({
        products,
        success: true,
      });
    } else {
      // Apply the filter and return the filtered products
      const products = await Product.find(filter);

      if (!products || products.length === 0) {
        return res.status(404).json({
          message: "No matching products found",
          success: false,
        });
      }

      return res.status(200).json({
        products,
        success: true,
      });
    }
  } catch (err) {
    return res.status(500).json({
      error: err.message,
      success: false,
    });
  }
};

// Update Product

const updateProduct = async (req, res) => {
  try {
    const { name, semester, branch, college, phoneNumber } = req.body;
    const { id } = req.params;

    const product = await Product.findByIdAndUpdate(
      id,
      {
        name,
        semester,
        branch,
        college,
        phoneNumber,
      },
      { new: true }
    );

    if (!product) {
      return res.status(400).json({
        message: "something went wrong",
        success: false,
      });
    }
    return res.status(200).json({
      message: "product updated successfully",
      success: true,
    });
  } catch (err) {
    return res.status(400).json({
      error: err.message,
      success: false,
    });
  }
};

// Delete Product

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete({ _id: id });
    if (!product) {
      return res.status(400).json({
        message: "something went wrong",
        success: false,
      });
    }
    return res.status(200).json({
      message: "Product deleted successfully",
      success: true,
    });
  } catch (err) {
    return res.status(200).json({
      error: err.message,
      success: false,
    });
  }
};

module.exports = {
  createProduct,
  updateProduct,
  getProduct,
  deleteProduct,
  getallProduct,
};
