const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender");
const emailTemplate = require("../mail/emailVerificationTemplate");

const OTPSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

// Function for sending email to the newly signed up user
async function sendVerificationEmail(email, otp) {
  try {
    const mailResponse = await mailSender(
      email,
      "StudyNotion Verification Email",
      emailTemplate(otp)
    );
    console.log("Email Sent Successfully", mailResponse);
  } catch (error) {
    console.log("Error while Sending Email", error);
    throw error;
  }
}

// Pre-save middleware to send the email before saving the OTP inside the database
OTPSchema.pre("save", async function (next) {
  if (this.isNew) {
    await sendVerificationEmail(this.email, this.otp);
  }
  next();
});

const OTP = mongoose.model("OTP", OTPSchema);
module.exports = OTP;
