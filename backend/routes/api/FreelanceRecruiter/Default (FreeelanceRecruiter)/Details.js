const express = require("express");
const formidable = require("formidable");

const router = express.Router();
const RecruiterDetail = require("../../../../models/FreelanceRecruiter/FreelanceRecruiter");
const currentDate = require("../../../utill/currentDate");
const verifyToken = require("../../../utill/verifyToken");
const uploadFile = require("../../../utill/upload");
const parseMultipartData = require("../../../utill/helper");
const getURL = require("../../../utill/bucketURL");

router.put("/profile_information", verifyToken, async (req, res, next) => {
    try {
        const imageUrl = await getURL(req, res, "image");
        const checkRecruiter = await RecruiterDetail.find({
            _id: req.body._id,
        });
        if (checkRecruiter.length == 0) {
            console.log("Please enter valid Id");
            res.sendStatus(404);
            return;
        }
        const job = await RecruiterDetail.findOneAndUpdate(
            { _id: req.body._id },
            {
                $set: {
                    is_profile_update: true,
                    register_date: currentDate(),
                    name: req.body.name,
                    phone_no: req.body.phone_no,
                    location: req.body.location,
                    highest_qualification: req.body.highest_qualification,
                    gender: req.body.gender,
                    profile_url: imageUrl,
                    communication_skills: JSON.parse(
                        req.body.communication_skills
                    ),
                },
            },
            { new: true }
        );
        console.log("[done db update]");
        res.json({ message: "profile information success" });
        // }
    } catch (e) {
        res.status(400);
        console.log(e.message);
        res.json({ message: "PROFILE_INFO_FAIL" });
    }
});

router.put("/domain_detail", verifyToken, async (req, res) => {
    try {
        // console.log("[domain details]", req.body);
        const checkRecruiter = await RecruiterDetail.find({
            _id: req.body._id,
        });
        if (checkRecruiter.length == 0) {
            console.log("Please enter valid Id");
            res.sendStatus(404);
            return;
        }
        const updatedJob = await RecruiterDetail.findOneAndUpdate(
            { _id: req.body._id },
            {
                $set: {
                    is_domain_update: true,
                    domain: req.body.domains,
                    functional_department: req.body.functional_department,
                    experience_recruitment: req.body.experience_recruitment,
                    total_experience: req.body.total_experience,
                    skills: req.body.skills,
                    interested_domain: req.body.interested_domain,
                },
            },
            { new: true }
        );
        res.json({ message: "Domain details success" });
    } catch (e) {
        res.status(400);
        console.log(e);
        next(e);
    }
});

router.put("/additional_info", verifyToken, async (req, res, next) => {
    try {
        const resumeUrl = await getURL(req, res, "resume");
        // const urls = await getURL(req, res, ["resume","certificate"]);
        console.log(resumeUrl);
        const certificate_link = [];
        // JSON.parse(req.body.default_certi_link).forEach((element) => {
        //     certificate_link.push(element);
        // });

        const checkRecruiter = await RecruiterDetail.find({
            _id: req.body._id,
        });
        if (checkRecruiter.length == 0) {
            console.log("Please enter valid Id");
            res.sendStatus(404);
            return;
        }
        const updatedJob = await RecruiterDetail.findOneAndUpdate(
            { _id: req.body._id },
            {
                $set: {
                    is_additional_info_update: true,
                    no_of_position: req.body.no_of_position,
                    level_of_recruiter: req.body.level_of_recruiter,
                    naukari: req.body.naukri,
                    linkedin: req.body.linkedin,
                    IIM_job: req.body.IIM_job,
                    indeed: req.body.indeed,
                    angel_list: req.body.angel_list,
                    other: req.body.other,
                    client_generation: req.body.client_generation,
                    hours_per_week: req.body.hours_per_week,
                    CTC_rang: req.body.CTC_range,
                    resume_url: resumeUrl,
                    certificate_links: certificate_link,
                },
            },
            { new: true }
        );
        res.json({ message: "additional information success" });
    } catch (e) {
        res.status(400);
        console.log(e);
        next(e);
    }
});

router.put("/updateRecruter", verifyToken, async function (req, res, next) {
    const checkRecruiter = await RecruiterDetail.find({ _id: req.body._id });
    if (checkRecruiter.length == 0) {
        console.log("Please enter valid Id");
        res.sendStatus(404);
        return;
    }
    var updateData = JSON.parse(JSON.stringify(req.body));
    delete updateData._id;
    try {
        RecruiterDetail.findByIdAndUpdate(
            { _id: req.body._id },
            {
                $set: { ...updateData },
            },
            { upsert: true },
            function (err, result) {
                if (err) {
                    res.status(400);
                    res.send(err);
                } else {
                    res.json({ message: "profile updated success" });
                }
            }
        );
    } catch (e) {
        console.log(e.message);
        res.status(400);
        next(e);
    }
});
module.exports = router;
