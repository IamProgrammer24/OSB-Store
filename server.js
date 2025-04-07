// LIBRARIES //
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

// UTILS //
const dotenv = require("dotenv");
const connectDB = require("./utils/db.js");

// ROUTES //
const userRoute = require("./Routes/user.route.js");
const productRoute = require("./Routes/product.route.js");
const alertRoute = require("./Routes/alert.route.js");

dotenv.config();

const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};

app.use(cors(corsOptions));

const PORT = process.env.PORT || 3000;

// api's
app.use("/api/v1/user", userRoute);
app.use("/api/v1/product", productRoute);
app.use("/api/v1/user", alertRoute);
// app.use("/api/v1/company", companyRoute);
// app.use("/api/v1/job", jobRoute);
// app.use("/api/v1/application", applicationRoute);
// app.use("api/v1/", recommenddtionRoute);
// app.use("api/vi/user", alertRoute);

app.listen(PORT, () => {
  connectDB();
  console.log(`Server running at port ${PORT}`);
});
