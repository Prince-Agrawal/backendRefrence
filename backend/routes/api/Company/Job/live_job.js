const express = require("express");
const router = express.Router();
const Job = require("../../../../models/CompanyRecruiter/posted_Jobs");
const currentDate = require("../../../utill/currentDate");
const verifyToken = require("../../../utill/verifyToken");
const AssignedJob = require("../../../../models/CompanyRecruiter/assigned_job");

router.get("/livejobs", verifyToken, async (req, res, next) => {
    try {
        const obj = [];
        const job_type = ["Part-Time", "Full-Time", "Internship"];
        const docs = await AssignedJob.find({
            recruiter_id: req.query.recruiter_id,
            isAccepted: false,
            isRejected: false,
        });
        for (const element of docs) {
            const job_detail = await Job.find({ _id: element.job_id });
            const CTC = parseInt(Math.random() * 10) + 5;
            const job = job_detail[0];
            const tempObj = {
                ...job._doc,
                CTC: CTC.toFixed(1),
                job_type: job_type[parseInt(Math.random() * 3)],
            };
            // console.log(job_detail[0]);
            obj.push(tempObj);
        }

        res.json(obj);
    } catch (e) {
        console.log(e);
        res.status(400);
        next(e);
    }
});

module.exports = router;
