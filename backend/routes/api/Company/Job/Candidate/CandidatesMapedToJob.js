const express = require("express");
const router = express.Router();
const Job = require("../../../../../models/CompanyRecruiter/posted_Jobs");
const verifyToken = require("../../../../utill/verifyToken");
const SavedCandidate = require("../../../../../models/FreelanceRecruiter/SavedCandidate");
const Candidate = require("../../../../../models/FreelanceRecruiter/Candidates");
const RecruiterDetail = require("../../../../../models/FreelanceRecruiter/FreelanceRecruiter");
const AssignedJob = require("../../../../../models/CompanyRecruiter/assigned_job");
const getURL = require("../../../../utill/bucketURL");

router.get("/jobCandidates", verifyToken, async (req, res, next) => {
    try {
        const docs = await AssignedJob.find({
            job_id: req.query.job_id,
            recruiter_id: req.query.recruiter_id,
        });
        //for checking job id is present or not
        if (docs.length == 0) {
            console.log("Please enter valid Id");
            res.sendStatus(404);
            return;
        }
        const candidateInfo = [];
        for (const candidate of docs[0].candidate_id) {
            const candidate_info = await Candidate.find({ _id: candidate });
            const docs = await SavedCandidate.find({
                _id: candidate_info[0].candidate_id,
            });
            const tempObj = {
                ...docs[0]._doc,
                ...candidate_info[0]._doc,
            };
            candidateInfo.push(tempObj);
        }
        console.log(candidateInfo);
        res.json(candidateInfo);
    } catch (e) {
        console.log(e);
        res.status(400);
        next(e);
    }
});

module.exports = router;
