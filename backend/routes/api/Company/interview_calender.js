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

router.get("/candidate_for_date", verifyToken, async (req, res, next) => {
    try {
        //   console.log(req.query.date)
        const candidates = [];
        const candidate_in = await Candidate.find();
        const candidate_info = [];
        for (const perticular_candidate_info of candidate_in) {
            for (const stage_detail of perticular_candidate_info.stage_details) {
                if (stage_detail.interview_date == req.query.date) {
                    candidate_info.push(perticular_candidate_info);
                    break;
                }
            }
        }
        for (const candidate of candidate_info) {
            const saved_candidate = await SavedCandidate.find({
                _id: candidate.candidate_id,
            });
            //   console.log(...candidate)
            const assigned_job = await AssignedJob.find({
                candidate_id: candidate._id,
            });
            const job = await Job.find({ _id: assigned_job[0].job_id });
            const tempObj = {
                candidate_id: candidate.candidate_id,
                status: candidate.status,
                interview_date: candidate.interview_date,
                name: saved_candidate[0].name,
                email: saved_candidate[0].email,
                phone: saved_candidate[0].phone_number,
                job_title: job[0].job_title,
                job_id: job[0]._id,
            };
            candidates.push(tempObj);
        }
        // console.log(candidate_info);
        res.send(candidates);
    } catch (e) {
        console.log(e);
        res.status(400);
        next(e);
    }
});

router.get("/candidate_for_month", verifyToken, async (req, res, next) => {
    try {
        // const string = `${req.query.date}` + "/";
        // const month = string.split("/")[1];
        // const year = string.split("/")[2];

        const candidates = {};

        const candidate_info = await Candidate.find();
        for (const perticular_candidate of candidate_info) {
            // const tempDate = `${perticular_candidate.interview_date}` + "/";
            // const mon = tempDate.split("/")[1];
            // const ye = tempDate.split("/")[2];
            // if (mon === month && ye === year) {
            const saved_candidate = await SavedCandidate.find({
                _id: perticular_candidate.candidate_id,
            });
            const assigned_job = await AssignedJob.find({
                candidate_id: perticular_candidate._id,
            });
            const job = await Job.find({ _id: assigned_job[0].job_id });
            for (const stage of perticular_candidate.stage_details) {
                if (
                    !candidates.hasOwnProperty(stage.interview_date) &&
                    stage.interview_date.length
                ) {
                    candidates[stage.interview_date] = [
                        {
                            name: saved_candidate[0].name,
                            status: perticular_candidate.status,
                            job_title: job[0].job_title,
                            job_id: job[0]._id,
                            candidate_id: perticular_candidate._id,
                            stages: job[0].stages,
                            is_complete: stage.is_complete,
                        },
                    ];
                } else if (stage.interview_date.length) {
                    candidates[stage.interview_date].push({
                        name: saved_candidate[0].name,
                        status: perticular_candidate.status,
                        job_title: job[0].job_title,
                        job_id: job[0]._id,
                        candidate_id: perticular_candidate._id,
                        stages: job[0].stages,
                        is_complete: stage.is_complete,
                    });
                }
            }

            // }
        }
        res.send(candidates);
    } catch (e) {
        console.log(e);
        res.status(400);
        next(e);
    }
});

module.exports = router;
