const express = require("express");
const router = express.Router();
const Company = require("../../../models/CompanyRecruiter/Company");
const currentDate = require("../../utill/currentDate");
const verifyToken = require("../../utill/verifyToken");
const Job = require("../../../models/CompanyRecruiter/posted_Jobs");
const SavedCandidate = require("../../../models/FreelanceRecruiter/SavedCandidate");
const Candidate = require("../../../models/FreelanceRecruiter/Candidates");
const RecruiterDetail = require("../../../models/FreelanceRecruiter/FreelanceRecruiter");

router.get("/job_related_company", verifyToken, async (req, res, next) => {
    try {
        const docs = await Company.find({ _id: req.query.company_id });
        if (docs.length == 0) {
            console.log("Please enter valid Id");
            res.sendStatus(404);
            return;
        }
        const jobs = [];

        for (const active_job of docs[0].active_job) {
            const job_id = active_job.job_id;
            const job_detail = await Job.find({ _id: job_id });
            let stages = {};
            job_detail[0]._doc.stages.forEach((stage) => {
                stages[stage] = [];
            });
            for (const assigned_job_id of active_job.assigned_recruiters) {
                const assigned_job_detail = await AssignedJob.find({
                    _id: assigned_job_id,
                });

                for (candidate_id of assigned_job_detail[0].candidate_id) {
                    const candidate_detail = await Candidate.find({
                        _id: candidate_id,
                    });
                    const saved_candiadte_info = await SavedCandidate.find({
                        _id: candidate_detail[0].candidate_id,
                    });
                    if (stages.hasOwnProperty(candidate_detail[0].status)) {
                        stages[candidate_detail[0].status].push({
                            ...saved_candiadte_info[0]._doc,
                            candidate_id,
                        });
                    } else {
                        stages[candidate_detail[0].status] = [
                            saved_candiadte_info[0],
                        ];
                    }
                }
            }
            const tempObj = {
                job: {
                    ...job_detail[0]._doc,
                },
                stages,
            };
            jobs.push(tempObj);
        }
        res.json(jobs);
    } catch (e) {
        console.log(e);
        res.status(400);
        next(e);
    }
});

router.get("/particularJob", verifyToken, async (req, res, next) => {
    try {
        const docs = await Company.find({ _id: req.query.company_id });
        if (docs.length == 0) {
            console.log("Please enter valid Id");
            res.sendStatus(404);
            return;
        }
        const jobs = [];

        for (const active_job of docs[0].active_job) {
            if (active_job.job_id == req.query.job_id) {
                const inProcess = [];
                const offered = [];
                const joined = [];
                const rejected = [];
                const job_id = active_job.job_id;
                const job_detail = await Job.find({ _id: job_id });
                let stages = {};
                job_detail[0]._doc.stages.forEach((stage) => {
                    stages[stage] = [];
                });
                for (const assigned_job_id of active_job.assigned_recruiters) {
                    const assigned_job_detail = await AssignedJob.find({
                        _id: assigned_job_id,
                    });

                    for (const candidate_id of assigned_job_detail[0]
                        .candidate_id) {
                        const candidate_detail = await Candidate.find({
                            _id: candidate_id,
                        });
                        const saved_candiadte_info = await SavedCandidate.find({
                            _id: candidate_detail[0].candidate_id,
                        });

                        //for checking in process , offered , reject , joined candidate

                        if (candidate_detail[0].status == "offered") {
                            offered.push(saved_candiadte_info[0]);
                        } else if (candidate_detail[0].status == "rejected") {
                            rejected.push(saved_candiadte_info[0]);
                        } else if (candidate_detail[0].status == "joined") {
                            joined.push(saved_candiadte_info[0]);
                        } else {
                            inProcess.push(saved_candiadte_info[0]);
                        }

                        let is_interview_status;
                        for (const stage of candidate_detail[0].stage_details) {
                            if (stage.status == candidate_detail[0].status) {
                                is_interview_status = stage.is_interview_accept;
                            }
                        }
                        // console.log(is_interview_status);
                        if (stages.hasOwnProperty(candidate_detail[0].status)) {
                            stages[candidate_detail[0].status].push({
                                ...saved_candiadte_info[0]._doc,
                                candidate_id,
                                is_interview_accept: is_interview_status,
                            });
                        } else {
                            stages[candidate_detail[0].status] = [
                                {
                                    ...saved_candiadte_info[0]._doc,
                                    candidate_id,
                                    is_interview_accept: is_interview_status,
                                },
                            ];
                        }
                    }
                }
                const tempObj = {
                    job: {
                        ...job_detail[0]._doc,
                    },
                    stages,
                    offered_candidate: offered,
                    inProcess_candidate: inProcess,
                    rejected_candidate: rejected,
                    joined_candidate: joined,
                };
                jobs.push(tempObj);
            }
        }
        console.log(jobs[0].stages);

        res.json(jobs[0]);
    } catch (e) {
        console.log(e);
        res.status(400);
        next(e);
    }
});

module.exports = router;
