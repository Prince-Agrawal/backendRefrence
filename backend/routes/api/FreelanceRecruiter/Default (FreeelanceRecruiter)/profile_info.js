const express = require("express");
const formidable = require("formidable");

const router = express.Router();
const RecruiterDetail = require("../../../../models/FreelanceRecruiter/FreelanceRecruiter");
const currentDate = require("../../../utill/currentDate");
const verifyToken = require("../../../utill/verifyToken");
const uploadFile = require("../../../utill/upload");
const parseMultipartData = require("../../../utill/helper");
const getURL = require("../../../utill/bucketURL");

router.get("/profile_info", verifyToken, async function (req, res, next) {
  try {
    const docs = await RecruiterDetail.find({ _id: req.query._id });
    if (docs.length == 0) {
      console.log("Please enter valid Id");
      res.sendStatus(404);
      return;
    }
    res.json(docs);
  } catch (e) {
    console.log(e);
    res.status(400);
    next(e);
  }
});

module.exports = router;
