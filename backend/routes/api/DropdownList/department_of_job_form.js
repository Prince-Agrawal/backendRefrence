const express = require("express");
const router = express.Router();
const RecruiterCommanDetail = require("../../../models/FreelanceRecruiter/RecruiterCommanDetails");
const ClientSetting = require("../../../models/CompanyRecruiter/company_setting");
const verifyToken = require("../../utill/verifyToken");

router.get("/department", verifyToken, async (req, res, next) => {
  try {
    const docs = await ClientSetting.find({ company_id: req.query.company_id });
    res.json(docs[0].interview_stages);
  } catch (e) {
    console.log(e);
    res.status(400);
    next(e);
  }
});

module.exports = router;
