const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AssignedJobSchema = new Schema({
  job_id: {
    type: Schema.Types.ObjectId,
  },
  recruiter_id: {
    type: Schema.Types.ObjectId,
  },
  account_manager_id: {
    type: Schema.Types.ObjectId,
  },
  assigned_date: {
    type: Schema.Types.String,
  },
  start_date: {
    type: Schema.Types.String,
  },
  closed_date: {
    type: Schema.Types.String,
  },
  isAccepted: {
    type: Schema.Types.Boolean,
    default: false,
  },
  isRejected: {
    type: Schema.Types.Boolean,
    default: false,
  },
  candidate_id: {
    type: [Schema.Types.ObjectId],
  },
  feedback: {
    type: Schema.Types.String,
  },
});

AssignedJob = mongoose.model("assigned_job", AssignedJobSchema);
module.exports = AssignedJob;
