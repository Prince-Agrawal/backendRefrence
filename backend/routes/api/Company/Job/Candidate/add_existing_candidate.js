const express = require("express");
const router = express.Router();
const Job = require("../../../../../models/CompanyRecruiter/posted_Jobs");
const verifyToken = require("../../../../utill/verifyToken");
const SavedCandidate = require("../../../../../models/FreelanceRecruiter/SavedCandidate");
const RecruiterDetail = require("../../../../../models/FreelanceRecruiter/FreelanceRecruiter");
const AssignedJob = require("../../../../../models/CompanyRecruiter/assigned_job");
const getURL = require("../../../../utill/bucketURL");
const Candidate = require("../../../../../models/FreelanceRecruiter/Candidates");
const currentDate = require("../../../../utill/currentDate");
const Company = require("../../../../../models/CompanyRecruiter/Company");

router.put("/addExistingCandidate", verifyToken, async (req, res, next) => {
  try {
    // const candidatesArr = req.body.candidate_id;
    // for (const element of candidatesArr) {
    //for updating candidates in assigned job schema
    const assigned_job_detail = await AssignedJob.find({
      job_id: req.body.job_id,
      recruiter_id: req.body.recruiter_id,
    });

    const job_detail = await Job.find({ _id: req.body.job_id });
    const client_detail = await Company.find({ job_id: req.body.job_id });
    // const job_detail_schema = await Job.find({ _id: req.body.job_id });
    for (const saved_candidate_id of req.body.saved_candidate_id) {
      //for adding notification field to client schema
      const saved_candidate_info = await SavedCandidate.find({
        _id: saved_candidate_id,
      });
      //for adding notification field
      const notification_detail = {
        type: "candidate",
        message:
          "A new candidate " +
          saved_candidate_info[0].name +
          " is added to the job " +
          job_detail[0].job_title +
          `$${req.body.job_id}`,
      };
      const client_data = await Company.findOneAndUpdate(
        { _id: client_detail[0]._id },
        {
          $push: {
            notification: notification_detail,
          },
        },
        { new: true }
      );
      //end of recruiter part for notification
      //for storing saved candidate id in candidate schema
      const tempArr = [];
      for (const stage of job_detail[0].stages) {
        const tempObj = {
          interview_date: "",
          status: stage,
          is_interview_accept: false,
          is_complete: false,
        };
        tempArr.push(tempObj);
      }
      const candidate = await new Candidate({
        candidate_id: saved_candidate_id,
        assigned_job_id: assigned_job_detail[0]._id,
        submit_date: currentDate(),
        status: "Unaction",
        stage_details: tempArr,
      }).save();

      //for updating candidates in assigned job schema
      const updatedAssignedJob = await AssignedJob.findOneAndUpdate(
        {
          job_id: req.body.job_id,
          recruiter_id: req.body.recruiter_id,
        },
        {
          $push: {
            candidate_id: candidate._id,
          },
        },
        { new: true }
      );
    }

    req.app.get("socketService").emiter("client", { msg: "hello" });
    res.json({ message: "success" });
  } catch (err) {
    console.log(err.message);
    res.status(400);
    next(err);
  }
});

module.exports = router;
