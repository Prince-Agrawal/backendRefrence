const express = require("express");
const router = express.Router();
const Job = require("../../../../../models/CompanyRecruiter/posted_Jobs");
const verifyToken = require("../../../../utill/verifyToken");
const SavedCandidate = require("../../../../../models/FreelanceRecruiter/SavedCandidate");
const Candidate = require("../../../../../models/FreelanceRecruiter/Candidates");
const RecruiterDetail = require("../../../../../models/FreelanceRecruiter/FreelanceRecruiter");
const AssignedJob = require("../../../../../models/CompanyRecruiter/assigned_job");
const Compnay = require("../../../../../models/CompanyRecruiter/Company");

router.get("/CandidatesForClient", verifyToken, async (req, res, next) => {
    try {
        //for checking client id is present or not
        const checkClient = await Compnay.find({
            _id: req.query.company_id,
        });
        if (checkClient.length == 0) {
            console.log("Please enter valid Recruiter Id");
            res.sendStatus(404);
            return;
        }

        const requiredActiveJob = [];
        for (element of checkClient[0].active_job) {
            if (element.job_id === req.query.job_id) {
                requiredActiveJob.push(element);
            }
        }

        const candidates = [];
        for (active_job of requiredActiveJob) {
            for (assigned_job of active_job.assigned_recruiters) {
                const docs = await AssignedJob.find({ _id: assigned_job });
                for (candidate_id of docs[0].candidate_id) {
                    const candidate_info = await Candidate.find({
                        _id: candidate_id,
                    });
                    const candidate_detail = await SavedCandidate.find({
                        _id: candidate_info[0].candidate_id,
                    });
                    candidates.push(candidate_detail[0]);
                }
            }
        }
        res.json(candidates);
    } catch (err) {
        console.log(err.message);
        res.status(400);
        next(err);
    }
});

router.get("/Candidates", verifyToken, async (req, res, next) => {
    try {
        //for checking client id is present or not
        const checkClient = await Compnay.find({
            _id: req.query.company_id,
        });
        if (checkClient.length == 0) {
            console.log("Please enter valid Recruiter Id");
            res.sendStatus(404);
            return;
        }
        const candidates = [];
        for (const active_job of checkClient[0].active_job) {
            const job_id = active_job.job_id;
            for (const assigned_job of active_job.assigned_recruiters) {
                const assigned_job_detail = await AssignedJob.find({
                    _id: assigned_job,
                });
                for (const candidate_id of assigned_job_detail[0]
                    .candidate_id) {
                    const candidate_info = await Candidate.find({
                        _id: candidate_id,
                    });
                    const saved_candidate_info = await SavedCandidate.find({
                        _id: candidate_info[0].candidate_id,
                    });
                    const job_detail = await Job.find({ _id: job_id });
                    const tempObj = {
                        candidate_name: saved_candidate_info[0].name,
                        interview_stage: candidate_info[0].status,
                        job_id: job_detail[0]._id,
                        job_title: job_detail[0].job_title,
                    };
                    candidates.push(tempObj);
                }
            }
        }
        console.log(candidates);
        res.json(candidates);
    } catch (err) {
        console.log(err.message);
        res.status(400);
        next(err);
    }
});

module.exports = router;
