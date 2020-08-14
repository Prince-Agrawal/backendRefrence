const express = require("express");
const router = express.Router();
const Job = require("../../../../models/CompanyRecruiter/posted_Jobs");
const currentDate = require("../../../utill/currentDate");
const verifyToken = require("../../../utill/verifyToken");
const Company = require("../../../../models/CompanyRecruiter/Company");
const AssignedJob = require("../../../../models/CompanyRecruiter/assigned_job");
const RecruiterDetail = require("../../../../models/FreelanceRecruiter/FreelanceRecruiter");
const CompanySetting = require("../../../../models/CompanyRecruiter/company_setting");

router.post("/job_detail", verifyToken, async (req, res, next) => {
  //   console.log(req.body);
  try {
    const job = await new Job({
      job_title: req.body.job_title,
      grade: req.body.grade,
      job_type: req.body.job_type,
      location: req.body.location,
      no_of_positions: req.body.no_of_positions,
      job_description: req.body.job_description,
      additional_information: req.body.additional_information,
      experience_level: req.body.experience_level,
      management_experience: req.body.management_experience,
      mandatory_skills: req.body.mandatory_skills,
      additional_skills: req.body.additional_skills,
      required_qualifications: req.body.required_qualifications,
      annual_CTC: req.body.annual_CTC,
      negotiable: req.body.negotiable,
      job_description_assistant: req.body.job_description_assistant,
      urgency_to_hire: req.body.urgency_to_hire,
      recruitment_fees: req.body.recruitment_fees,
      percentage_of_CTC: req.body.percentage_of_CTC,
      guarantee_period: req.body.guarantee_period,
      joining_date: req.body.joining_date,
      additional_questions: req.body.additional_questions,
      urgent_job_options: req.body.urgent_job_options,
      department: req.body.department,
    }).save();

    //for finding recruiter details
    const assigned = [];
    const recruiterDetails = await RecruiterDetail.find();

    for (const element of recruiterDetails) {
      const assigned_job = await new AssignedJob({
        job_id: job._id,
        recruiter_id: element._id,
        assigned_date: currentDate(),
      }).save();
      // console.log(assigned_job._id);
      assigned.push(assigned_job._id);
    }

    //for storing job id in company schema
    const checkClient = await Company.find({ _id: req.body.company_id });
    if (checkClient.length == 0) {
      console.log("Please enter valid Id");
      res.sendStatus(404);
      return;
    }

    const active_job = {
      job_id: job._id,
      assigned_recruiters: assigned,
    };

    const updatedData = await Company.findOneAndUpdate(
      { _id: req.body.company_id },
      {
        $push: {
          job_id: job._id,
          active_job: active_job,
        },
      },
      { new: true }
    );

    //for adding notification field to recruiter schema
    for (const element of recruiterDetails) {
      //for adding notification field
      const notification_detail = {
        type: "NewJob",
        message:
          checkClient[0].full_name +
          "from" +
          checkClient[0].company_name +
          "has posted" +
          job.job_title +
          "job",
      };
      const recruiter_data = await RecruiterDetail.findOneAndUpdate(
        { _id: element._id },
        {
          $push: {
            notification: notification_detail,
          },
        },
        { new: true }
      );

      //end of recruiter part for notification
    }
    // console.log(req.body.department_id)

    const company_setting = await CompanySetting.find({
      company_id: req.body.company_id,
    });
    for (const interview_stage of company_setting[0].interview_stages) {
      if (interview_stage._id == req.body.department_id) {
        const updatedJobData = await Job.findOneAndUpdate(
          { _id: job._id },
          {
            $set: {
              // department: interview_stage.department,
              stages: interview_stage.stages,
            },
          },
          { new: true }
        );
      }
    }

    // res.json(recruiterDetails);
    res.json({ message: "success" });
    req.app.get("socketService").emiter("recruiter", { msg: "hello" });
  } catch (e) {
    console.log(e.message);
    res.status(400);
    next(e);
  }
});

router.put("/interview_stage", verifyToken, async (req, res, next) => {
  try {
    //for checking id is present or not.
    const checkJob = await Job.find({ _id: req.body.job_id });
    if (checkJob.length == 0) {
      console.log("Please enter valid Id");
      res.sendStatus(404);
      return;
    }
    const updatedData = await Job.findOneAndUpdate(
      { _id: req.body.job_id },
      {
        $set: {
          interview_stages: req.body.interview_stages,
          is_interview_stages_updated: true,
        },
      },
      { new: true }
    );

    //for checking company id is present or not
    const checkClient = await Company.find({ _id: req.body.company_id });
    if (checkClient.length == 0) {
      console.log("Please enter valid Id");
      res.sendStatus(404);
      return;
    }

    const job_staged_template = {
      job_title: updatedData.job_title,
      stages: req.body.interview_stages,
    };

    if (req.body.toStore == "true") {
      await Company.findOneAndUpdate(
        { _id: req.body.company_id },
        {
          $push: {
            job_staged_templates: [job_staged_template],
          },
        },
        { new: true }
      );
    }
    res.json({ message: "success" });
  } catch (err) {
    console.log(err.message);
    res.status(400);
    next(err);
  }
});

router.put("/hiring_team", verifyToken, async (req, res, next) => {
  // console.log(req.body)
  try {
    //for checking id is present or not.
    const checkJob = await Job.find({ _id: req.body._id });
    if (checkJob.length == 0) {
      console.log("Please enter valid Id");
      res.sendStatus(404);
      return;
    }
    const updatedData = await Job.findOneAndUpdate(
      { _id: req.body._id },
      {
        $set: {
          creator: req.body.creator,
          recruiter: req.body.recruiter,
          collaborators: req.body.collaborators,
          interviewers: req.body.interviewers,
          hiring_managers: req.body.hiring_managers,
          is_hiring_updated: true,
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

router.put("/update_job", verifyToken, async function (req, res, next) {
  //for checking id is present or not.
  const checkJob = await Job.find({ _id: req.body._id });
  if (checkJob.length == 0) {
    console.log("Please enter valid Id");
    res.sendStatus(404);
    return;
  }
  const updateData = JSON.parse(JSON.stringify(req.body));
  delete updateData._id;
  try {
    Job.findByIdAndUpdate(
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
