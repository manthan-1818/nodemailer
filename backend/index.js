const express = require("express");
const app = express();
const nodemailer = require("nodemailer");
const dotenv = require("dotenv").config();
const email = process.env.EMAIL;
const password = process.env.PASSWORD;
const origin = process.env.ORIGIN;
const cors = require("cors");
app.use(cors({ origin: origin }));
const transporter = nodemailer.createTransport({
  service: "gmail",
  host:"smtp.gmail.com",
  auth: {
    user: email,
    pass: password,
  },
});

app.use(express.json()); // Middleware to parse JSON request bodies

app.post("/send-email", (req, res) => {
  const { to, subject, text } = req.body;

  const mailOptions = {
    from: email,
    to: to,
    subject: subject,
    text: text,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error occurred:", error);
      res.status(500).send("Failed to send email");
    } else {
      console.log("Email sent:", info.response);
      res.status(200).send("Email sent successfully");
    }
  });
});

app.listen(4000, () => {
  console.log("Server is running on port 4000");
});