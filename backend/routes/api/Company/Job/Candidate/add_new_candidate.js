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

router.post("/addCandidate", verifyToken, async (req, res, next) => {
  try {
    const resumeUrl = await getURL(req, res, "resume");
    // console.log(req.body);

    //for checking recruiter id is present or not
    const checkRecruiter = await RecruiterDetail.find({
      _id: req.body.recruiter_id,
    });
    if (checkRecruiter.length == 0) {
      console.log("Please enter valid Recruiter Id");
      res.sendStatus(404);
      return;
    }
    const candidate_info = await new SavedCandidate({
      name: req.body.name,
      email: req.body.email,
      phone_number: req.body.phone_number,
      languages: req.body.languages,
      degree: req.body.degree,
      resume_link: resumeUrl,
      school: req.body.school,
      educational_info: JSON.parse(req.body.educational_info),
      work_exp_info: JSON.parse(req.body.work_exp_info),
      skills: req.body.skills,
      achievements: req.body.achievements,
      detail_from_recruiter: JSON.parse(req.body.detail_from_recruiter),
    }).save();

    // console.log(candidate_info._id);

    const assigned_job_detail = await AssignedJob.find({
      job_id: req.body.job_id,
      recruiter_id: req.body.recruiter_id,
    });

    const job_detail = await Job.find({ _id: req.body.job_id });
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
      candidate_id: candidate_info._id,
      assigned_job_id: assigned_job_detail[0]._id,
      submit_date: currentDate(),
      status: "Unaction",
      stage_details: tempArr,
    }).save();

    //for updating recruiter schema
    const updatedRecruiter = await RecruiterDetail.findOneAndUpdate(
      {
        _id: req.body.recruiter_id,
      },
      {
        $push: {
          candidates: candidate_info._id,
        },
      },
      { new: true }
    );
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

    //for adding notification field to client schema
    const client_detail = await Company.find({ job_id: req.body.job_id });
    const job_detail_schema = await Job.find({ _id: req.body.job_id });
    //for adding notification field
    const notification_detail = {
      type: "candidate",
      message:
        "A new candidate " +
        candidate_info.name +
        " is added to the job " +
        job_detail_schema[0].job_title +
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

    req.app.get("socketService").emiter("client", { msg: "hello" });
    res.json({ message: "success" });
  } catch (err) {
    console.log(err.message);
    res.status(400);
    next(err);
  }
});

module.exports = router;
