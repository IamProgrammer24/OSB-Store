const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  const token = req.cookies.auth_token; // Get the token from the cookies

  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.id = decoded.id; // Attach the decoded user data to the request object
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = { authenticate };
