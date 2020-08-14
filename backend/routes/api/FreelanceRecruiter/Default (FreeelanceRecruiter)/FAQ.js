const express = require("express");
const formidable = require("formidable");

const router = express.Router();
const RecruiterCommanDetail = require("../../../../models/FreelanceRecruiter/RecruiterCommanDetails");
const currentDate = require("../../../utill/currentDate");
const verifyToken = require("../../../utill/verifyToken");
const uploadFile = require("../../../utill/upload");
const parseMultipartData = require("../../../utill/helper");
const getURL = require("../../../utill/bucketURL");

router.get("/FAQ", verifyToken, async (req, res, next) => {
    try {
        const docs = await RecruiterCommanDetail.find();
        res.json({ link: docs[0].FAQ_url });
    } catch (e) {
        console.log(e);
        res.status(400);
        next(e);
    }
});

module.exports = router;
