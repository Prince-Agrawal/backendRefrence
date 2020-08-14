const express = require("express");
const router = express.Router();
const Job = require("../../../../../models/CompanyRecruiter/posted_Jobs");
const verifyToken = require("../../../../utill/verifyToken");
const SavedCandidate = require("../../../../../models/FreelanceRecruiter/SavedCandidate");
const Candidate = require("../../../../../models/FreelanceRecruiter/Candidates");
const RecruiterDetail = require("../../../../../models/FreelanceRecruiter/FreelanceRecruiter");
const AssignedJob = require("../../../../../models/CompanyRecruiter/assigned_job");
const getURL = require("../../../../utill/bucketURL");

router.get("/recruiterCandidates", verifyToken, async (req, res, next) => {
  try {
    const docs = await RecruiterDetail.find({
      _id: req.query.recruiter_id,
    });
    const candidateInfo = [];
    const technical = [
      "Backend Developer",
      "Frontend Developer",
      "Data Analysis & Statistics",
      "Technology Standards & Procedures",
      "Technical Writing",
      "Discrete Mathematics",
    ];
    const skill = [
      "Active listening",
      "Communication",
      "Customer service",
      "Leadership",
      "Transferable",
      "Interpersonal",
      "Problem-solving",
      "Time management",
    ];
    for (const saved_candidate of docs[0].candidates) {
      const candidate_schema = await Candidate.find({
        candidate_id: saved_candidate,
      });
      // console.log(candidate_schema_info);
      const job_id_store = [],
        job_name_store = [];
      for (const candidate of candidate_schema) {
        const jobs = await AssignedJob.find({
          candidate_id: candidate._id,
          recruiter_id: req.query.recruiter_id,
        });
        for (const tempJob of jobs) {
          job_id_store.push(tempJob.job_id);
          const job_detail = await Job.find({ _id: tempJob.job_id });
          job_name_store.push(job_detail[0].job_title);
        }
      }

      // console.log(assigned_jobs);

      // const candidate_info = await Candidate.find({ _id: candidate });
      const docs = await SavedCandidate.find({
        _id: saved_candidate,
      });
      const exper = parseInt(Math.random() * 10);
      const salary = Math.random() * 6;
      const obj = {
        ...docs[0]._doc,
        domain_experience: exper,
        total_experience: exper + 5,
        current_salary: salary.toFixed(1),
        expected_salary: (salary + 2).toFixed(1),
        skills: docs[0].skills,
        technical_competencies: technical[parseInt(Math.random() * 6)],
        job_id: job_id_store,
        job_name: job_name_store,
      };

      candidateInfo.push(obj);
    }
    // console.log(parseInt(Math.random()*10));
    res.json(candidateInfo);
  } catch (e) {
    console.log(e);
    res.status(400);
    next(e);
  }
});

module.exports = router;
