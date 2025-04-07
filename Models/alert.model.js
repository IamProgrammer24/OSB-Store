const mongoose = require("mongoose");

const alertSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
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
  },
  { timestamps: true }
);
const Alert = mongoose.model("Alert", alertSchema);
module.exports = { Alert };
