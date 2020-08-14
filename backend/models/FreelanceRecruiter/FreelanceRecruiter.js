const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// import model
// const PaymentDetail = require("../common/PaymentDetail");
// const AccountSettingsSchema = new Schema();

// nested model
const DomainSchema = new Schema({
  domain_name: {
    type: Schema.Types.String,
  },
  experience: {
    type: Schema.Types.String,
  },
  top_client: {
    type: [Schema.Types.String],
  },
});
// nested model ends

const NotificationSchema = {
  type: {
    type: Schema.Types.String,
  },
  message: {
    type: Schema.Types.String,
  },
  is_seen: {
    type: Schema.Types.Boolean,
    default: false,
  },
};

const RecruiterDetailSchema = new Schema({
  register_date: {
    type: Schema.Types.String,
  },
  name: {
    type: Schema.Types.String,
  },
  email: {
    type: Schema.Types.String,
  },
  account_type: {
    type: Schema.Types.String,
  },
  password: {
    type: Schema.Types.String,
  },
  phone_no: {
    type: Schema.Types.String,
  },
  location: {
    type: Schema.Types.String,
  },
  highest_qualification: {
    type: Schema.Types.String,
  },
  gender: {
    type: Schema.Types.String,
  },
  profile_url: {
    type: Schema.Types.String,
  },
  isVerified: {
    type: Schema.Types.Boolean,
    default: false,
  },
  candidates: {
    type: [Schema.Types.String],
  },
  communication_skills: {
    type: [Schema.Types.String],
  },
  //second phase
  domain: {
    type: [DomainSchema],
  },
  functional_department: {
    type: [Schema.Types.String],
  },
  experience_recruitment: {
    type: Schema.Types.String,
  },
  total_experience: {
    type: Schema.Types.String,
  },
  skills: {
    type: [Schema.Types.String],
  },
  interested_domain: {
    type: [Schema.Types.String],
  },
  //third phase
  no_of_position: {
    type: Schema.Types.String,
  },
  level_of_recruiter: {
    type: Schema.Types.String,
  },
  naukari: {
    type: Schema.Types.Boolean,
  },
  linkedin: {
    type: Schema.Types.Boolean,
  },
  IIM_job: {
    type: Schema.Types.Boolean,
  },
  indeed: {
    type: Schema.Types.Boolean,
  },
  angel_list: {
    type: Schema.Types.Boolean,
  },
  other: {
    type: Schema.Types.String,
  },
  client_generation: {
    type: Schema.Types.String,
  },
  hours_per_week: {
    type: Schema.Types.String,
  },
  CTC_rang: {
    type: Schema.Types.String,
  },
  resume_url: {
    type: Schema.Types.String,
  },
  is_profile_update: {
    type: Schema.Types.Boolean,
    default: false,
  },
  is_domain_update: {
    type: Schema.Types.Boolean,
    default: false,
  },
  is_additional_info_update: {
    type: Schema.Types.Boolean,
    default: false,
  },
  certificate_links: {
    type: [Schema.Types.String],
  },
  candidates: {
    type: [Schema.Types.ObjectId],
  },
  notification: {
    type: [NotificationSchema],
  },
});

RecruiterDetail = mongoose.model("recruiter_detail", RecruiterDetailSchema);
// AccountSettings = mongoose.model("account_settings", AccountSettingsSchema);

module.exports = RecruiterDetail;
