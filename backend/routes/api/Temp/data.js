const express = require("express");
const router = express.Router();
const SavedCandidate = require("../../../models/FreelanceRecruiter/SavedCandidate");
const resumes = require("./resume");
var Job = require("../../../models/CompanyRecruiter/posted_Jobs");
const RecruiterDetail = require("../../../models/FreelanceRecruiter/FreelanceRecruiter");

const na = [
    "Liam",
    "Noah",
    "William",
    "James",
    "Logan",
    "Benjamin",
    "Mason",
    "Elijah",
];

const achie = [
    "Re-organized something to make it work better",
    "Identified a problem and solved it",
    "Come up with a new idea that improved things",
    "Developed or implemented new procedures or systems",
    "Worked on special projects",
    "Received awards",
    "Been complimented by your supervisor or co-workers",
    "Increased revenue or sales for the company",
    "Saved money for the company",
    "Saved time for the company",
    "Contributed to good customer service",
];

const lang = [
    "SPANISH",
    "ENGLISH",
    "HINDI",
    "ARABIC",
    "PORTUGUESE",
    "BENGALI",
    "RUSSIAN",
];

router.get("/insertData", async (req, res, next) => {
    try {
        const obj = resumes[parseInt(Math.random() * 34)];
        const skills = obj.skills.split(",");
        const languages = obj.languages.split(",");
        // console.log(obj.education_info);
        const edukeys = [],
            education_info = [];
        for (const k in obj.education_info) edukeys.push(k);
        edukeys.forEach((key) => {
            const item = obj.education_info[key];
            const insideKey = [];
            for (const k in obj.education_info[key]) {
                insideKey.push(k);
            }
            item.education_info = item.degree;
            delete item.degree;
            item.institute_name = item.context;
            delete item.context;
            education_info.push(item);
        });

        // console.log(education_info);

        const workkeys = [],
            workExp_info = [];
        for (const k in obj.workExp_info) workkeys.push(k);
        workkeys.forEach((key) => {
            const item = obj.workExp_info[key];
            const insideKey = [];
            for (const k in obj.workExp_info[key]) {
                insideKey.push(k);
            }
            item.workExp_info = item.info;
            delete item.info;
            item.workExp_sure_info = item.duration;
            delete item.duration;
            item.workExp_rake_list = item.keywords;
            delete item.keywords;
            workExp_info.push(item);
        });

        // console.log(workExp_info);

        const achievements = [];
        // if (obj.achievements != "") {
        //   console.log("sdgajhfdgsj");
        //   const achievements = obj.achievements.split(",");
        // } else {
        achievements.push(achie[parseInt(Math.random() * 10)]);
        achievements.push(achie[parseInt(Math.random() * 10)]);
        achievements.push(achie[parseInt(Math.random() * 10)]);
        // }

        // console.log(achievements);
        const candidate = await new SavedCandidate({
            name: obj.names,
            email: obj.emails,
            phone_number: obj.numbers,
            languages: languages,
            degree: obj.degrees,
            school: obj.schools,
            educational_info: education_info,
            work_exp_info: workExp_info,
            skills: skills,
            achievements: achievements,
        }).save();
        //for updating job schema
        const updatedJob = await Job.findOneAndUpdate(
            {
                _id: req.query.job_id,
            },
            {
                $push: {
                    candidates: candidate._id,
                },
            },
            { new: true }
        );

        //for updating recruiter schema
        const updatedRecruiter = await RecruiterDetail.findOneAndUpdate(
            {
                _id: req.query.recruiter_id,
            },
            {
                $push: {
                    candidates: candidate._id,
                },
            },
            { new: true }
        );

        res.json({ message: "success" });
    } catch (e) {
        res.status(400);
        console.log(e.message);
        next(e);
    }
});

module.exports = router;
