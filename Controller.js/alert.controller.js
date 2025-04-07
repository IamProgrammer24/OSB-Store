const { Alert } = require("../Models/alert.model");
const { sendEmail } = require("../Middlewares/nodemailer");

// CREATING ALERT //
const aler1 = async (req, res) => {
  try {
    const { name, semester, branch, college } = req.body;
    const userId = req.id;

    const newAlert = await Alert.create({
      userId,
      name,
      semester,
      branch,
      college,
    });

    return res.status(201).json({
      message: "Alert created successfully",
      success: true,
      alert: newAlert,
    });
  } catch (err) {
    console.error(err); // Log the error for debugging
    return res.status(400).json({
      message: "Something went wrong",
      error: err.message, // Use `err.message` for a more meaningful error message
    });
  }
};

// SHOWING ALERT //
const getAlert1 = async (req, res) => {
  try {
    const userId = req.id;

    // Searching for the alert using `userId`
    const alert = await Alert.findOne({ userId });

    if (alert) {
      return res.status(200).json({
        response: alert,
        message: "Alert found",
        success: true,
      });
    } else {
      return res.status(404).json({
        message: "No alert found. Please create an alert first.",
        success: false,
      });
    }
  } catch (err) {
    console.error(err); // Log the error for debugging
    return res.status(400).json({
      message: "Something went wrong",
      error: err.message, // Use `err.message` for a more meaningful error message
      success: false,
    });
  }
};

// DELETE ALERT //
const deleteAlert1 = async (req, res) => {
  try {
    const userId = req.id;

    // Deleting alert by `userId`
    const resp = await Alert.findOneAndDelete({ userId });

    if (resp) {
      return res.status(200).json({
        message: "Alert deleted successfully",
        success: true,
      });
    } else {
      return res.status(404).json({
        message: "Alert not found. Nothing to delete.",
        success: false,
      });
    }
  } catch (err) {
    console.error(err); // Log the error for debugging
    return res.status(400).json({
      message: "Something went wrong",
      error: err.message, // Use `err.message` for a more meaningful error message
      success: false,
    });
  }
};

// MATCH JOB WITH ALERTS AND SEND EMAIL NOTIFICATIONS
const matchJobWithAlerts = async (product) => {
  try {
    // Find alerts that match the job criteria
    const alerts = await Alert.find({
      name: { $regex: product.name, $options: "i" },
      semester: product.semester,
      branch: { $regex: product.branch, $options: "i" },
      college: { $regex: product.college, $options: "i" },
    }).populate("userId");

    if (alerts.length > 0) {
      alerts.forEach(async (alert) => {
        console.log(
          `Notifying user ${alert.userId.fullname} about job: ${product.name}`
        );

        const subject = `New Study Material Posting: ${product.name}`;
        const text = `A new study material matching your alert has been posted! 
                      Book Name: ${product.name} 
                      Semester: ${product.semester} 
                      Branch: ${product.branch}
                      College: ${product.college}`;

        // Send email to the user
        const emailSent = await sendEmail(alert.userId.email, subject, text);

        if (emailSent) {
          console.log(`Email sent to user ${alert.userId.fullname}`);
        }
      });
    }
  } catch (err) {
    console.error("Error matching job with alerts:", err.message);
  }
};

module.exports = { aler1, getAlert1, deleteAlert1, matchJobWithAlerts };
