var express = require("express");
var router = express.Router();
var Job = require("../../../../models/CompanyRecruiter/posted_Jobs");
var verifyToken = require("../../../utill/verifyToken");
const RecruiterDetail = require("../../../../models/FreelanceRecruiter/FreelanceRecruiter");
const AssignedJob = require("../../../../models/CompanyRecruiter/assigned_job");

router.put("/accept", verifyToken, async (req, res, next) => {
    try {
        //for checking id is present or not.
        const checkAssignedJob = await AssignedJob.find({
            job_id: req.body.job_id,
            recruiter_id: req.body.recruiter_id,
        });
        if (checkAssignedJob.length == 0) {
            console.log("Please enter valid Id");
            res.sendStatus(404);
            return;
        }

        const updatedData = await AssignedJob.findOneAndUpdate(
            { _id: checkAssignedJob[0]._id },
            {
                $set: {
                    isAccepted: true,
                },
            },
            { new: true }
        );
        res.json({ message: "success" });
    } catch (err) {
        console.log(err.message);
        res.status(400);
        next(err);
    }
});

router.get("/acceptedJobs", verifyToken, async (req, res, next) => {
    try {
        const obj = [];
        const job_type = ["Part-Time", "Full-Time", "Internship"];
        const docs = await AssignedJob.find({
            recruiter_id: req.query.recruiter_id,
            isAccepted: true,
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
