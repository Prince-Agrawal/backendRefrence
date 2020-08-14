const express = require("express");
const formidable = require("formidable");

const router = express.Router();
const RecruiterCommanDetail = require("../../../../models/FreelanceRecruiter/RecruiterCommanDetails");
const currentDate = require("../../../utill/currentDate");
const verifyToken = require("../../../utill/verifyToken");
const uploadFile = require("../../../utill/upload");
const parseMultipartData = require("../../../utill/helper");
const getURL = require("../../../utill/bucketURL");

router.get("/notification", verifyToken, async (req, res, next) => {
  try {
    const checkRecruiter = await RecruiterDetail.find({
      _id: req.query.recruiter_id,
    });
    if (checkRecruiter.length == 0) {
      console.log("Please enter valid Id");
      res.sendStatus(404);
      return;
    }
    const not_seen_notification = [];

    for (const perticular_notification of checkRecruiter[0].notification) {
      if (perticular_notification.is_seen == false) {
        not_seen_notification.push(perticular_notification);
      }
    }
    res.json(not_seen_notification);
  } catch (e) {
    console.log(e);
    res.status(400);
    next(e);
  }
});

router.put("/notification_seen", verifyToken, async (req, res, next) => {
  try {
    const checkRecruiter = await RecruiterDetail.find({
      _id: req.query.recruiter_id,
    });
    if (checkRecruiter.length == 0) {
      console.log("Please enter valid Id");
      res.sendStatus(404);
      return;
    }
    const not_seen_notification = [];

    for (const perticular_notification of checkRecruiter[0].notification) {
      if (perticular_notification._id == req.query.notification_id) {
        const notification_detail = {
          type: perticular_notification.type,
          message: perticular_notification.message,
          is_seen: true,
        };
        not_seen_notification.push(notification_detail);
      } else {
        not_seen_notification.push(perticular_notification);
      }
    }

    const updatedRecruiter = await RecruiterDetail.findOneAndUpdate(
      { _id: req.query.recruiter_id },
      {
        $set: {
          notification: not_seen_notification,
        },
      },
      { new: true }
    );
    res.json({ message: "success" });
  } catch (e) {
    console.log(e);
    res.status(400);
    next(e);
  }
});

module.exports = router;
