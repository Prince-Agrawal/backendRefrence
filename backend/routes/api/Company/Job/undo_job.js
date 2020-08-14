var express = require("express");
var router = express.Router();
var Job = require("../../../../models/CompanyRecruiter/posted_Jobs");
const AssignedJob = require("../../../../models/CompanyRecruiter/assigned_job");
var verifyToken = require("../../../utill/verifyToken");

router.put("/undo", verifyToken, async (req, res, next) => {
  try {
    //for checking id is present or not.
    const checkAssignedJob = await AssignedJob.find({
      job_id: req.body.job_id,
      recruiter_id: req.body.recruiter_id,
    });
    if (checkAssignedJob.length == 0) {
      console.log("Please enter valid Id");
      res.sendStatus(404);
      return;
    }

    const updatedData = await AssignedJob.findOneAndUpdate(
      { _id: checkAssignedJob[0]._id },
      {
        $set: {
          isAccepted: false,
          isRejected: false,
        },
      },
      { new: true }
    );
    res.json({ message: "success" });
  } catch (err) {
    console.log(err.message);
    res.status(400);
    next(err);
  }
});

module.exports = router;
