const express = require("express");
const router = express.Router();
const Job = require("../../../../models/CompanyRecruiter/posted_Jobs");
const currentDate = require("../../../utill/currentDate");
const verifyToken = require("../../../utill/verifyToken");

router.get("/job_description", verifyToken, async (req, res, next) => {
  try {
    const docs = await Job.find({ _id: req.query._id });
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
