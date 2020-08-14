const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const RecruiterDetail = require("../../../models/FreelanceRecruiter/FreelanceRecruiter");
const Company = require('../../../models/CompanyRecruiter/Company');
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const jwt_decode = require("jwt-decode");

router.get("/userData", async (req, res, next) => {
  try {
    const token = req.query.token;
    const decoded = jwt_decode(token);
    // console.log(decoded);
    if (decoded.user.account_type === "Client") {
      const docs = await Company.find({ email: decoded.user.email });
      res.json(docs);
    } else if (decoded.user.account_type === "Recruiter") {
      const docs = await RecruiterDetail.find({ email: decoded.user.email });
      res.json(docs);
    }
  } catch (e) {
    console.log(e);
    res.status(400);
    next(e);
  }
});

module.exports = router;
