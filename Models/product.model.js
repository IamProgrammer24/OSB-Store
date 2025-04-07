const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    // we need user id and images about product here
    name: {
      type: String,
      required: true,
    },
    semester: {
      type: Number,
    },
    branch: {
      type: String,
    },
    college: {
      type: String,
    },
    phoneNumber: {
      type: Number,
    },
  },
  { timestamps: true }
);
const Product = mongoose.model("Product", productSchema);
module.exports = { Product };
