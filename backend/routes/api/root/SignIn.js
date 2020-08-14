const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const RecruiterDetail = require("../../../models/FreelanceRecruiter/FreelanceRecruiter");
const Company = require("../../../models/CompanyRecruiter/Company");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const jwt_decode = require("jwt-decode");

router.post("/signIn", async (req, res, next) => {
  try {
    const currentUserRecruiter = await RecruiterDetail.findOne({
      email: req.body.email,
    });

    const currentUserClient = await Company.findOne({
      email: req.body.email,
    });

    if (currentUserRecruiter && req.body.account_type === "Recruiter") {
      const bcrypt = require("bcrypt");

      bcrypt.compare(
        req.body.password,
        currentUserRecruiter.password,
        function (err, result) {
          if (err) next(err);

          if (result) {
            const user = {
              email: currentUserRecruiter.email,
              account_type: currentUserRecruiter.account_type,
            };

            const token = jwt.sign({ user: user }, "secretkey");

            if (!currentUserRecruiter.isVerified) {
              return res.status(400).json({ message: "VERIFY_FAIL" });
            }

            res.json({
              Token: token,
              User: currentUserRecruiter,
            });
          } else {
            res.status(400).json({ message: "INVALID_CREDENTIALS" });
          }
        }
      );
    } else if (currentUserClient && req.body.account_type === "Client") {
      const bcrypt = require("bcrypt");

      bcrypt.compare(req.body.password, currentUserClient.password, function (
        err,
        result
      ) {
        if (err) next(err);

        if (result) {
          const user = {
            email: currentUserClient.email,
            account_type: currentUserClient.account_type,
          };

          const token = jwt.sign({ user: user }, "secretkey");

          if (!currentUserClient.isVerified) {
            return res.status(400).json({ message: "VERIFY_FAIL" });
          }

          res.json({
            Token: token,
            User: currentUserClient,
          });
        } else {
          res.status(400).json({ message: "INVALID_CREDENTIALS" });
        }
      });
    } else {
      res.status(400).json({
        message: "INVALID_CREDENTIALS",
      });
    }
  } catch (e) {
    res.status(400);
    console.log(e.message);
    next(e);
  }
});

//log out route
router.get("/logOut", (req, res) => {
  res.clearCookie("token");
  res.send("logout succes");
});

module.exports = router;
