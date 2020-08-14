const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// import model
const PaymentDetailShema = require("../common/PaymentDetail");
const NotificationShema = require("../CompanyRecruiter/Company");

const SccountSettingSchema = new Schema({});

// nested model
const AccountSettingsSchema = new Schema({
  notify_schedule_interview : {
    type: NotificationSchema,
    required: true,
  },
  notify_rejected_candidate : {
    type: NotificationSchema,
    required: true,
  },
  notify_offered_candidate : {
    type: NotificationSchema,
    required: true,
  },
  notify_onHand_candidate : {
    type: NotificationSchema,
    required: true,
  },
  send_feedback : {
    type: NotificationSchema,
    required: true,
  },
});

const ActiveJobSchema = new Schema({
  job_id: {
    type: Schema.Types.ObjectId,
    ref: "jobs",
    required: true,
  },
  assigned_Job: {
    type: [Schema.Types.ObjectId],
    required: "assigned_jobs",
    default: [],
  },
  mapped_recruiter: {
    type: [Schema.Types.ObjectId],
    ref: "freelance_recruiters",
    default: [],
  },
});
// nested model ends

const AccountManagerSchema = new Schema({
  employee_id: {
    type: Schema.Types.String,
    required: true,
  },
  register_date: {
    type: Schema.Types.Date,
    required: true,
  },
  name: {
    type: Schema.Types.String,
    required: true,
  },
  email: {
    type: Schema.Types.String,
    required: true,
  },
  location: {
    type: Schema.Types.String,
  },
  acc_settings: {
    type: AccountSettingsSchema,
    default: {},
  },
  register_company: {
    type: [Schema.Types.String],
    ref: "companies",
    default: [],
  },
  jobs: {
    type: [Schema.Types.ObjectId],
    ref: "jobs",
    default: [],
  },
  freelancer_recruiter: {
    type: [Schema.Types.ObjectId],
    ref: "freelance_recruiter",
    default: [],
  },
  payment_details: {
    type: PaymentDetailShema,
    default: {},
  },
  active_jobs: {
    type: [ActiveJobSchema],
    default: [],
  },
});

module.exports = {
  AccountManager: mongoose.model("account_manager", AccountManagerSchema),
  ActiveJob: mongoose.model("active_jobs", ActiveJobSchema),
};
