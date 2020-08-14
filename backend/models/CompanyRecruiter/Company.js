const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const job_staged_template = {
  job_title: String,
  stages: [String],
};

const ActiveJob = {
  job_id: String,
  assigned_recruiters: [String],
  mapped_jobs: [String]
};

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

const CompanySchema = new Schema({
  //at the time of signUp and first phase
  register_date: {
    type: Schema.Types.String,
  },
  email: {
    type: Schema.Types.String,
    required: true,
  },
  password: {
    type: Schema.Types.String,
    required: true,
  },
  account_type: {
    type: Schema.Types.String,
  },
  company_type: {
    type: Schema.Types.String,
  },
  company_name: {
    type: Schema.Types.String,
  },
  employee_count: {
    type: Schema.Types.String,
  },
  source_of_reference: {
    type: Schema.Types.String,
  },
  full_name: {
    type: Schema.Types.String,
  },
  designation: {
    type: Schema.Types.String,
  },
  contact_number: {
    type: Schema.Types.Number,
  },
  location: {
    type: Schema.Types.String,
  },
  isVerified: {
    type: Schema.Types.Boolean,
    default: false,
  },
  twitter_id: {
    type: Schema.Types.String,
  },
  facebook_id: {
    type: Schema.Types.String,
  },
  linkedin_id: {
    type: Schema.Types.String,
  },
  gmail_id: {
    type: Schema.Types.String,
  },
  skype_id: {
    type: Schema.Types.String,
  },
  subscription: {
    type: Schema.Types.Boolean,
  },

  //second phase
  company_description: {
    type: Schema.Types.String,
  },
  additional_information: {
    type: Schema.Types.String,
  },
  company_video: {
    type: Schema.Types.String,
  },
  industry: {
    type: Schema.Types.String,
  },
  website: {
    type: Schema.Types.String,
  },
  logo: {
    type: Schema.Types.String,
  },

  //third phase
  contact_person: {
    type: Schema.Types.String,
  },
  billing_name: {
    type: Schema.Types.String,
  },
  address: {
    type: Schema.Types.String,
  },
  account_number: {
    type: Schema.Types.String,
  },
  service_tax_number: {
    type: Schema.Types.String,
  },
  company_identification_number: {
    type: Schema.Types.String,
  },
  GST_number: {
    type: Schema.Types.String,
  },
  //for storing templates
  job_staged_templates: {
    type: [job_staged_template],
  },

  is_companyInfo_updated: {
    type: Schema.Types.Boolean,
    default: false,
  },
  is_aboutCompany_updated: {
    type: Schema.Types.Boolean,
    default: false,
  },
  is_billingInformation_updated: {
    type: Schema.Types.Boolean,
    default: false,
  },
  job_id: {
    type: [Schema.Types.ObjectId],
  },
  active_job : {
    type: [ActiveJob],
  },
  notification : {
    type : [NotificationSchema]
  }
});

Company = mongoose.model("company", CompanySchema);
module.exports = Company;
