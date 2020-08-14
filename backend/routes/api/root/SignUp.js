var express = require("express");
var router = express.Router();
var nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const RecruiterDetail = require("../../../models/FreelanceRecruiter/FreelanceRecruiter");
const Company = require("../../../models/CompanyRecruiter/Company");
// const smtpTransport = require("../../utill/mailConfiguration");
const ses_client = require("../../utill/ses_client");
const dotenv = require("dotenv");
dotenv.config();

var rand, mailOptions, host, link, email;

/*------------------Routing Started ------------------------*/

router.get("/verify", async function (req, res) {
  // console.log(email);
  console.log(req.protocol + ":/" + req.get("host"));
  try {
    if (req.protocol + "://" + req.get("host") == "http://" + host) {
      console.log("Domain is matched. Information is from Authentic email");
      console.log("email is verified");

      const currentUserRecruiter = await RecruiterDetail.findOne({
        email: email,
      });

      const currentUserClient = await Company.findOne({
        email: email,
      });
      if (currentUserRecruiter) {
        // already have this user
        const job = await RecruiterDetail.findOneAndUpdate(
          { email: email },
          { $set: { isVerified: true } },
          { new: true }
        );
        res.send(email + " has been successfully verified");
        // res.json({ status: "success", error: null, data: job });
      } else if (currentUserClient) {
        // already have this user
        const job = await Company.findOneAndUpdate(
          { email: email },
          { $set: { isVerified: true } },
          { new: true }
        );
        res.send(email + " has been successfully verified");
      } else {
        res.json({
          status: "success",
          error: null,
          data: "current user not found",
        });
      }
    } else {
      res.end("<h1>Request is from unknown source");
    }
  } catch (e) {
    console.log(e.message);
  }
});

//if user not varify and send mail again
router.post("/resendVerification", function (req, res) {
  try {
    rand = Math.floor(Math.random() * 100 + 54);
    host = req.get("host");
    link = "http://" + req.get("host") + "/auth" + "/verify?id=" + rand;
    // mailOptions = {
    //   to: req.body.email,
    //   subject: "Please confirm your Email account",
    //   html:
    //     "Hello,<br> Please Click on the link to verify your email.<br><a href=" +
    //     link +
    //     ">Click here to verify</a>",
    // };
    // console.log(mailOptions);
    // smtpTransport.sendMail(mailOptions, function (error, response) {
    const body =
      "Hello,<br> Please Click on the link to verify your email.<br><a href=" +
      link +
      ">Click here to verify</a>";
    ses_client.sendEmail(
      req.body.email,
      "Please confirm your Email account",
      body,
      process.env.SENDER_EMAIL
    );
    email = req.body.email;
    console.log("Message sent success");
    res.end("sent");
  } catch (e) {
    res.status(400);
    console.log(e.message);
    next(e);
  }
});
// });

//signUp for recruiter.
router.post("/recruiterSignUp", async (req, res, next) => {
  try {
    if (req.body.password === req.body.confirm_password) {
      const currentUser = await RecruiterDetail.findOne({
        email: req.body.email,
      });

      if (currentUser) {
        // already have this user
        res.status(400).json({ message: "User already exist." });
      } else {
        // save user to db
        const bcrypt = require("bcrypt");
        const encstring = bcrypt.hashSync(req.body.password, 8);
        const user = await new RecruiterDetail({
          email: req.body.email,
          account_type: req.body.account_type,
          password: encstring,
        }).save();
        res.json({ message: "success" });

        // send mail
        rand = Math.floor(Math.random() * 100 + 54);
        host = req.get("host");
        link = "http://" + req.get("host") + "/auth" + "/verify?id=" + rand;
        mailOptions = {
          to: req.body.email,
          subject: "Please confirm your Email account",
          html:
            "Hello,<br> Please Click on the link to verify your email.<br><a href=" +
            link +
            ">Click here to verify</a>",
        };
        smtpTransport.sendMail(mailOptions);
      }
    } else {
      res.status(400).json({ message: "Password not Match" });
    }
  } catch (e) {
    res.status(400);
    console.log(e.message);
    next(e);
  }
});

//signUp for client
router.post("/clientSignUp", async (req, res, next) => {
  try {
    if (req.body.password === req.body.confirm_password) {
      const currentUser = await Company.findOne({
        email: req.body.email,
      });

      if (currentUser) {
        // already have this user
        res.status(400).json({ message: "User already exist." });
      } else {
        // save user to db
        const bcrypt = require("bcrypt");
        const encstring = bcrypt.hashSync(req.body.password, 8);
        const user = await new Company({
          email: req.body.email,
          account_type: req.body.account_type,
          password: encstring,
          // company_type: req.body.company_type,
          company_name: req.body.company_name,
          // employee_count: req.body.employee_count,
          // source_of_reference: req.body.source_of_reference,
          full_name: req.body.first_name + " " + req.body.last_name,
          // designation: req.body.designation,
          contact_number: req.body.contact_number,
          // location: req.body.location,
        }).save();
        res.json({ message: "success" });

        // send mail
        rand = Math.floor(Math.random() * 100 + 54);
        host = req.get("host");
        link = "http://" + req.get("host") + "/auth" + "/verify?id=" + rand;
        // mailOptions = {
        //   to: req.body.email,
        //   subject: "Please confirm your Email account",
        //   html:
        //     "Hello,<br> Please Click on the link to verify your email.<br><a href=" +
        //     link +
        //     ">Click here to verify</a>",
        // };
        // smtpTransport.sendMail(mailOptions);
        const body =
          "Hello,<br> Please Click on the link to verify your email.<br><a href=" +
          link +
          ">Click here to verify</a>";
        ses_client.sendEmail(
          req.body.email,
          "Please confirm your Email account",
          body,
          process.env.SENDER_EMAIL
        );
        email = req.body.email;
      }
    } else {
      res.status(400).json({ message: "Password not Match" });
    }
  } catch (e) {
    res.status(400);
    console.log(e.message);
    next(e);
  }
});

module.exports = router;
