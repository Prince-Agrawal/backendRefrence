const express = require("express");
const router = express.Router();
const Job = require("../../../models/CompanyRecruiter/posted_Jobs");
const verifyToken = require("../../utill/verifyToken");
const SavedCandidate = require("../../../models/FreelanceRecruiter/SavedCandidate");
const RecruiterDetail = require("../../../models/FreelanceRecruiter/FreelanceRecruiter");
const AssignedJob = require("../../../models/CompanyRecruiter/assigned_job");
const getURL = require("../../utill/bucketURL");
const Candidate = require("../../../models/FreelanceRecruiter/Candidates");
const currentDate = require("../../utill/currentDate");
// const smtpTransport = require("../../utill/mailConfiguration");
const ses_client = require("../../utill/ses_client");
const dotenv = require("dotenv");
dotenv.config();

var currentStage,
  mailOptions,
  host,
  rejectLink,
  acceptLink,
  candidate_schema_id;

router.get("/rejectInterview", async function (req, res) {
  try {
    const candidate_info = await Candidate.find({
      _id: candidate_schema_id,
    });

    const tempArr = [];

    for (const stage_detail of candidate_info[0].stage_details) {
      if (stage_detail.status == candidate_info[0].status) {
        const tempObj = {
          interview_date: stage_detail.interview_date,
          status: stage_detail.status,
          is_interview_accept: false,
          is_complete: false,
        };
        tempArr.push(tempObj);
      } else {
        tempArr.push(stage_detail);
      }
    }
    const updatedCandidate = await Candidate.findOneAndUpdate(
      {
        _id: candidate_schema_id,
      },
      {
        $set: {
          stage_details: tempArr,
        },
      },
      { new: true }
    );
    res.json({ message: "Success" });
  } catch (e) {
    console.log(e.message);
  }
});

router.get("/acceptInterview", async function (req, res) {
  try {
    const candidate_info = await Candidate.find({
      _id: candidate_schema_id,
    });

    const tempArr = [];

    for (const stage_detail of candidate_info[0].stage_details) {
      if (stage_detail.status == candidate_info[0].status) {
        const tempObj = {
          interview_date: stage_detail.interview_date,
          status: stage_detail.status,
          is_interview_accept: true,
          is_complete: false,
        };
        tempArr.push(tempObj);
      } else {
        tempArr.push(stage_detail);
      }
    }
    const updatedCandidate = await Candidate.findOneAndUpdate(
      {
        _id: candidate_schema_id,
      },
      {
        $set: {
          stage_details: tempArr,
        },
      },
      { new: true }
    );
    res.json({ message: "Success" });
  } catch (e) {
    console.log(e.message);
  }
});

router.post("/updateInterviewStage", verifyToken, async (req, res, next) => {
  try {
    // console.log(req.body);
    const checkCandidate = await Candidate.find({
      _id: req.body.candidate_id,
    });
    if (checkCandidate.length == 0) {
      console.log("Please enter valid Recruiter Id");
      res.sendStatus(404);
      return;
    }
    const assigned_job_detail = await AssignedJob.find({
      candidate_id: req.body.candidate_id,
    });
    const job_detail = await Job.find({
      _id: assigned_job_detail[0].job_id,
    });
    const recruiterDetails = await RecruiterDetail.find();

    candidate_schema_id = req.body.candidate_id;
    currentStage = checkCandidate[0].status;
    // console.log(currentStage);
    const saved_candidate = await SavedCandidate.find({
      _id: checkCandidate[0].candidate_id,
    });
    //for adding notification field to recruiter schema
    for (const element of recruiterDetails) {
      //for adding notification field
      const notification_detail = {
        type: "status",
        message:
          saved_candidate[0].name +
          " status has been updated to " +
          req.body.status +
          " in " +
          job_detail[0].job_title +
          `$${assigned_job_detail[0].job_id}`,
      };
      const recruiter_data = await RecruiterDetail.findOneAndUpdate(
        { _id: element._id },
        {
          $push: {
            notification: notification_detail,
          },
        },
        { new: true }
      );

      //end of recruiter part for notification
    }
    host = req.get("host");
    rejectLink = "http://" + req.get("host") + "/company" + "/rejectInterview";
    acceptLink = "http://" + req.get("host") + "/company" + "/acceptInterview";
    // mailOptions = {
    //     to: saved_candidate[0].email,
    //     subject: "Please confirm your Interview Details",
    //     html:
    //         "Hello,<br> Please Confirm Your Job.<br><a href=" +
    //         acceptLink +
    //         ">Click here to Accept the Job</a> <br> <a href=" +
    //         rejectLink +
    //         ">Click here to Reject the Job</a>",
    // };
    // // console.log(link);
    // smtpTransport.sendMail(mailOptions);
    const body =
      "Hello,<br> Please Confirm Your Job.<br><a href=" +
      acceptLink +
      ">Click here to Accept the Job</a> <br> <a href=" +
      rejectLink +
      ">Click here to Reject the Job</a>";
    ses_client.sendEmail(
      saved_candidate[0].email,
      "Please confirm your Interview Details",
      body,
      process.env.SENDER_EMAIL
    );

    const candidate_info = await Candidate.find({
      _id: req.body.candidate_id,
    });

    const tempArr = [];

    for (const stage_detail of candidate_info[0].stage_details) {
      if (stage_detail.status == req.body.status) {
        const tempObj = {
          interview_date: req.body.interview_date,
          status: req.body.status,
          is_interview_accept: false,
          is_complete: false,
        };
        tempArr.push(tempObj);
      } else {
        tempArr.push(stage_detail);
      }
    }
    // console.log(tempArr);
    const updatedCandidate = await Candidate.findOneAndUpdate(
      {
        _id: req.body.candidate_id,
      },
      {
        $set: {
          status: req.body.status,
          stage_details: tempArr,
        },
      },
      { new: true }
    );

    req.app.get("socketService").emiter("recruiter", { msg: "hello" });
    res.json({ message: "success" });
  } catch (err) {
    console.log(err.message);
    res.status(400);
    next(err);
  }
});

module.exports = router;
