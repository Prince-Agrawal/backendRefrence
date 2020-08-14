const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const RecruiterDetail = require("../../../models/FreelanceRecruiter/FreelanceRecruiter");
const Company = require("../../../models/CompanyRecruiter/Company");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const jwt_decode = require("jwt-decode");
// const smtpTransport = require("../../utill/mailConfiguration");
const ses_client = require("../../utill/ses_client");
const dotenv = require("dotenv");
dotenv.config();

router.put("/forgotPassword", async (req, res, next) => {
  try {
    const currentUserRecruiter = await RecruiterDetail.findOne({
      email: req.body.email,
    });

    const currentUserClient = await Company.findOne({
      email: req.body.email,
    });

    if (currentUserRecruiter) {
      const newPassword = crypto.randomBytes(4).toString("hex");
      const bcrypt = require("bcrypt");
      const encstring = bcrypt.hashSync(newPassword, 8);
      const job = await RecruiterDetail.findOneAndUpdate(
        { email: currentUserRecruiter.email },
        {
          $set: {
            password: encstring,
          },
        },
        { new: true }
      );

      // mailOptions = {
      //   to: req.body.email,
      //   subject: "Forgot Mail",
      //   html: "Hello,<br> Your new Password :<br>" + newPassword,
      // };
      // // console.log(mailOptions);
      // smtpTransport.sendMail(mailOptions);
      const body = "Hello,<br> Your new Password :<br>" + newPassword;
      ses_client.sendEmail(
        req.body.email,
        "Forgot Mail",
        body,
        process.env.SENDER_EMAIL
      );
      res.json({ message: "Password changed" });
    } else if (currentUserClient) {
      const newPassword = crypto.randomBytes(4).toString("hex");
      const bcrypt = require("bcrypt");
      const encstring = bcrypt.hashSync(newPassword, 8);
      const job = await Company.findOneAndUpdate(
        { email: currentUserClient.email },
        {
          $set: {
            password: encstring,
          },
        },
        { new: true }
      );

      // mailOptions = {
      //   to: req.body.email,
      //   subject: "Forgot Mail",
      //   html: "Hello,<br> Your new Password :<br>" + newPassword,
      // };
      // // console.log(mailOptions);
      // smtpTransport.sendMail(mailOptions);
      const body = "Hello,<br> Your new Password :<br>" + newPassword;
      ses_client.sendEmail(
        req.body.email,
        "Forgot Mail",
        body,
        process.env.SENDER_EMAIL
      );
      res.json({ message: "Password changed" });
    } else {
      res.status(400).json({ message: "User does not exist" });
    }
  } catch (e) {
    res.status(400);
    console.log(e.message);
    next(e);
  }
});

module.exports = router;
