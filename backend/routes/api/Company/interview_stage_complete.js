const express = require("express");
const router = express.Router();
const Company = require("../../../models/CompanyRecruiter/Company");
const ClientSetting = require("../../../models/CompanyRecruiter/company_setting");
const currentDate = require("../../utill/currentDate");
const verifyToken = require("../../utill/verifyToken");
const AssignedJob = require("../../../models/CompanyRecruiter/assigned_job");
const Candidate = require("../../../models/FreelanceRecruiter/Candidates");
const SavedCandidate = require("../../../models/FreelanceRecruiter/SavedCandidate");
const Job = require("../../../models/CompanyRecruiter/posted_Jobs");

router.put("/stage_complete", verifyToken, async (req, res, next) => {
  try {
    const candidate_info = await Candidate.find({ _id: req.body.candidate_id });

    const tempArr = [];

    for (const stage_detail of candidate_info[0].stage_details) {
      if (stage_detail.status == req.body.status) {
        const tempObj = {
          interview_date: stage_detail.interview_date,
          status: stage_detail.status,
          is_interview_accept: stage_detail.is_interview_accept,
          is_complete: true,
        };
        tempArr.push(tempObj);
      } else {
        tempArr.push(stage_detail);
      }
    }
    const updatedCandidate = await Candidate.findOneAndUpdate(
      {
        _id: req.body.candidate_id ,
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

module.exports = router;
