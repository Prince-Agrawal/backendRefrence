const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const RecruiterDetail = require("../../../models/FreelanceRecruiter/FreelanceRecruiter");
const Company = require("../../../models/CompanyRecruiter/Company");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const jwt_decode = require("jwt-decode");

router.put("/changePassword", async (req, res, next) => {
  try {
    const token = req.body.token;
    const decoded = jwt_decode(token);
    if (decoded.user.account_type === "Recruiter") {
      const docs = await RecruiterDetail.find({ email: decoded.user.email });
      const bcrypt = require("bcrypt");
      bcrypt.compare(
        req.body.current_password,
        docs[0].password,
        async function (err, result) {
          if (err) next(err);

          if (result) {
            const bcrypt = require("bcrypt");
            const encstring = bcrypt.hashSync(req.body.new_password, 8);
            await RecruiterDetail.findOneAndUpdate(
              { email: docs[0].email },
              {
                $set: {
                  password: encstring,
                },
              },
              { new: true }
            );
            res.json({ message: "Password_Changed" });
          } else {
            res.status(400).json({
              message: "INVALID_CREDENTIALS",
            });
          }
        }
      );
    } else if (decoded.user.account_type === "Client") {
      const docs = await Company.find({ email: decoded.user.email });
      const bcrypt = require("bcrypt");
      bcrypt.compare(
        req.body.current_password,
        docs[0].password,
        async function (err, result) {
          if (err) next(err);

          if (result) {
            const bcrypt = require("bcrypt");
            const encstring = bcrypt.hashSync(req.body.new_password, 8);
            await Company.findOneAndUpdate(
              { email: docs[0].email },
              {
                $set: {
                  password: encstring,
                },
              },
              { new: true }
            );
            res.json({ message: "Password_Changed" });
          } else {
            res.status(400).json({
              message: "INVALID_CREDENTIALS",
            });
          }
        }
      );
    }
  } catch (e) {
    res.status(400);
    console.log(e.message);
    next(e);
  }
});

module.exports = router;
