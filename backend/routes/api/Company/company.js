const express = require("express");
const router = express.Router();
const Company = require("../../../models/CompanyRecruiter/Company");
const currentDate = require("../../utill/currentDate");
const verifyToken = require("../../utill/verifyToken");
const getURL = require("../../utill/bucketURL");

router.put("/companyInfo", verifyToken, async (req, res, next) => {
    try {
        //for checking id is present or not.
        console.log(req.body);
        const checkComapny = await Company.find({ _id: req.body._id });
        if (checkComapny.length == 0) {
            console.log("Please enter valid Id");
            res.sendStatus(404);
            return;
        }
        const updatedData = await Company.findOneAndUpdate(
            { _id: req.body._id },
            {
                $set: {
                    email: req.body.email,
                    designation: req.body.designation,
                    contact_number: req.body.contact_number,
                    twitter_id: req.body.twitter_id,
                    facebook_id: req.body.facebook_id,
                    linkedin_id: req.body.linkedin_id,
                    gmail_id: req.body.gmail_id,
                    skype_id: req.body.skype_id,
                    subscription: req.body.subscription,
                    is_companyInfo_updated: true,
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

router.put("/aboutCompany", verifyToken, async (req, res, next) => {
    try {
        //for checking id is present or not.
        const logourl = await getURL(req, res, "logo");
        console.log(logourl);
        const checkComapny = await Company.find({ _id: req.body._id });
        if (checkComapny.length == 0) {
            console.log("Please enter valid Id");
            res.sendStatus(404);
            return;
        }
        const updatedData = await Company.findOneAndUpdate(
            { _id: req.body._id },
            {
                $set: {
                    company_name: req.body.company_name,
                    company_description: req.body.company_description,
                    additional_information: req.body.additional_information,
                    company_video: req.body.company_video,
                    industry: req.body.industry,
                    website: req.body.website,
                    logo: logourl,
                    is_aboutCompany_updated: true,
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

router.put("/billingInformation", verifyToken, async (req, res, next) => {
    // console.log(req.body)
    try {
        //for checking id is present or not.
        const checkComapny = await Company.find({ _id: req.body._id });
        if (checkComapny.length == 0) {
            console.log("Please enter valid Id");
            res.sendStatus(404);
            return;
        }
        const updatedData = await Company.findOneAndUpdate(
            { _id: req.body._id },
            {
                $set: {
                    contact_person: req.body.contact_person,
                    billing_name: req.body.billing_name,
                    address: req.body.address,
                    account_number: req.body.account_number,
                    service_tax_number: req.body.service_tax_number,
                    company_identification_number:
                        req.body.company_identification_number,
                    GST_number: req.body.GST_number,
                    is_billingInformation_updated: true,
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

router.put("/updateCompanyInfo", verifyToken, async function (req, res, next) {
    //for checking id is present or not.
    const checkComapny = await Company.find({ _id: req.body._id });
    if (checkComapny.length == 0) {
        console.log("Please enter valid Id");
        res.sendStatus(404);
        return;
    }
    const updateData = JSON.parse(JSON.stringify(req.body));
    delete updateData._id;
    try {
        Company.findByIdAndUpdate(
            { _id: req.body._id },
            {
                $set: { ...updateData },
            },
            { upsert: true },
            function (err, result) {
                if (err) {
                    console.log(err.message);
                    res.status(400);
                    next(err);
                } else {
                    res.json({ message: "success" });
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
