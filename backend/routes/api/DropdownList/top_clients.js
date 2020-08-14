const express = require("express");
const router = express.Router();
const RecruiterCommanDetail = require("../../../models/FreelanceRecruiter/RecruiterCommanDetails");
const verifyToken = require("../../utill/verifyToken");

router.get("/topClient", verifyToken, async (req, res, next) => {
  try {
    const docs = await RecruiterCommanDetail.find({});
    res.json({ company_name: docs[0].company_name });
  } catch (e) {
    console.log(e);
    res.status(400);
    next(e);
  }
});

module.exports = router;
