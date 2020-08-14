const express = require("express");
const router = express.Router();
const Company = require("../../../models/CompanyRecruiter/Company");
const ClientSetting = require("../../../models/CompanyRecruiter/company_setting");
const currentDate = require("../../utill/currentDate");
const verifyToken = require("../../utill/verifyToken");
const AssignedJob = require("../../../models/CompanyRecruiter/assigned_job");

router.post("/setting", verifyToken, async (req, res, next) => {
  try {
    const docs = await Company.find({ _id: req.body.company_id });
    if (docs.length == 0) {
      console.log("Please enter valid Id");
      res.sendStatus(404);
      return;
    }

    //for adding interview stages to client setting schema.
    const client_setting = await ClientSetting.find({
      company_id: req.body.company_id,
    });

    if (client_setting.length == 0) {
      await new ClientSetting({
        company_id: req.body.company_id,
        interview_stages: req.body.interview_stage,
      }).save();
    } else {
      const data = await ClientSetting.findOneAndUpdate(
        { company_id: req.body.company_id },
        {
          $set: {
            interview_stages: req.body.interview_stage,
          },
        },
        { new: true }
      );
    }

    //adding interview stages ti assigned job schema.
    const assigned_job = await AssignedJob.find({
      company_id: req.body.company_id,
    });
    // console.log(assigned_job);

    for (assigned of assigned_job) {
      const assigned_job_data = await AssignedJob.findOneAndUpdate(
        {
          company_id: assigned.company_id,
          recruiter_id: assigned.recruiter_id
        },
        {
          $set: {
            interview_stages: req.body.interview_stage,
          },
        },
        { new: true }
      );
    }

    res.send({ message: "success" });
  } catch (e) {
    console.log(e);
    res.status(400);
    next(e);
  }
});

module.exports = router;
