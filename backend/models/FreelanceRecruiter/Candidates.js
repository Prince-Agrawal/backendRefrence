const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// nested model ends

const stages_detail = {
  interview_date: {
    type: Schema.Types.String,
  },
  status: {
    type: Schema.Types.String,
  },
  is_interview_accept: {
    type: Schema.Types.Boolean,
  },
  is_complete: {
    type: Schema.Types.Boolean,
  },
};

const CandidateSchema = new Schema({
  assigned_job_id: {
    type: Schema.Types.ObjectId,
  },
  candidate_id: {
    type: Schema.Types.ObjectId,
  },
  submit_date: {
    type: Schema.Types.String,
  },
  duplicate: {
    type: Schema.Types.Boolean,
  },
  status: {
    type: Schema.Types.String,
    default: "Unaction",
  },
  feedback: {
    type: [Schema.Types.String],
  },
  offered_date: {
    type: Schema.Types.String,
  },
  stage_details: {
    type: [stages_detail],
  },
});

Candidate = mongoose.model("candidate", CandidateSchema);

module.exports = Candidate;
