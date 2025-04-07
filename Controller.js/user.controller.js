const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../Models/user.model");

const registerUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        message: "Please provide email or password",
        success: false,
      });
    }
    let fullname = email.split("@")[0].trim();

    const saltRounds = 10; // You can adjust the number of salt rounds (higher means more secure but slower)
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const user = new User({
      email,
      password: hashedPassword,
      fullname,
    });
    await user.save();

    if (!user) {
      return res.status(400).json({
        message: "Something went wrong!",
        success: false,
      });
    }
    return res.status(200).json({
      message: "user create successfully!",
      success: true,
    });
  } catch (err) {
    return res.status(400).json({
      error: err.message,
      success: false,
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Please provide correct email",
        success: false,
      });
    }
    if (user) {
      // Compare the entered password with the stored hashed password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({
          message: "Please provide correct password",
          success: false,
        });
      } else {
        // Generate JWT token
        const token = jwt.sign(
          { id: user._id, username: user.fullname }, // Payload
          process.env.JWT_SECRET, // Secret key
          { expiresIn: "1d" } // Token expiration time
        );

        // Set token in HTTP-only cookie
        res.cookie("auth_token", token, {
          httpOnly: true, // Ensure the cookie is accessible only to the server
          secure: process.env.NODE_ENV === "production", // Use secure cookies in production (https)
          maxAge: 1 * 24 * 60 * 60 * 1000, // Cookie expiration time (1 hour)
          sameSite: "Strict", // Prevents the cookie from being sent in cross-site requests
        });

        return res.status(200).json({
          user,
          message: "user loggedin successfully",
          success: true,
        });
      }
    }
  } catch (err) {
    return res.status(400).json({
      error: err.message,
      success: false,
    });
  }
};

// Update User
const updateUser = async (req, res) => {
  try {
    const { fullname } = req.body;
    const id = req.id;

    const user = await User.findByIdAndUpdate(
      { _id: id },
      {
        fullname,
      },
      { new: true }
    );

    if (!user) {
      return res.status(400).json({
        message: "something went wrong",
        success: false,
      });
    }

    return res.status(200).json({
      message: "username update successfully",
      success: true,
    });
  } catch (err) {
    return res.status(400).json({
      error: err.message,
      success: false,
    });
  }
};

// Get User's All Product

const getallProduct = async (req, res) => {
  try {
    const userid = req.id;

    const user = await User.findById(userid).populate("products");

    if (user.products.length > 0) {
      return res.status(200).json({
        products: user.products,
        success: true,
      });
    }
    return res.status(200).json({
      message: "First create products",
    });
  } catch (err) {
    return res.status(400).json({
      error: err.message,
      success: false,
    });
  }
};
module.exports = { registerUser, loginUser, updateUser, getallProduct };
