const express = require("express");
const router = express.Router();
const Company = require("../../../models/CompanyRecruiter/Company");
const ClientSetting = require("../../../models/CompanyRecruiter/company_setting");
const currentDate = require("../../utill/currentDate");
const verifyToken = require("../../utill/verifyToken");
const AssignedJob = require("../../../models/CompanyRecruiter/assigned_job");
const Candidate = require("../../../models/FreelanceRecruiter/Candidates");
const SavedCandidate = require("../../../models/FreelanceRecruiter/SavedCandidate");

router.get("/interview_schedule", verifyToken, async (req, res, next) => {
  try {
    const docs = await Company.find({ _id: req.query.company_id });
    if (docs.length == 0) {
      console.log("Please enter valid Id");
      res.sendStatus(404);
      return;
    }
    const interview_schedule = [];
    for (const job_id of docs[0].job_id) {
      const assigned_job_doc = await AssignedJob.find({ job_id: job_id });
      for (const assigned_job of assigned_job_doc) {
        for (const candidate_id of assigned_job.candidate_id) {
          const candidate_info = await Candidate.find({ _id: candidate_id });
          const saved_candidate_info = await SavedCandidate.find({
            _id: candidate_info[0].candidate_id,
          });
          //   console.log(saved_candidate_info);
          if (candidate_info[0].status != "Unaction") {
            const tempObj = {
              interview_date: candidate_info[0].interview_date,
              candidate_name: saved_candidate_info[0].name,
              status: candidate_info[0].status,
            };
            interview_schedule.push(tempObj);
          }
        }
      }
    }
    res.send(interview_schedule);
  } catch (e) {
    console.log(e);
    res.status(400);
    next(e);
  }
});

module.exports = router;
