const express = require("express");
const { authenticate } = require("../Middlewares/isAuthenticated");
const {
  aler1,
  getAlert1,
  deleteAlert1,
} = require("../Controller.js/alert.controller");

const router = express.Router();

router.route("/create/alert").post(authenticate, aler1);
router.route("/get/alert").get(authenticate, getAlert1);
router.route("/delete/alert").delete(authenticate, deleteAlert1);

module.exports = router;
