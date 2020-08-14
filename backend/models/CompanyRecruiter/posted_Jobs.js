const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const question_detail = {
    question: String,
    option_type: String,
    choices: [String],
};

const PostedJobSchema = new Schema({
  // first phase
  job_title: {
    type: Schema.Types.String,
  },
  department: {
    type: Schema.Types.String,
  },
  grade: {
    type: Schema.Types.String,
  },
  job_type: {
    type: Schema.Types.String,
  },
  location: {
    type: Schema.Types.String,
  },
  no_of_positions: {
    type: Schema.Types.Number,
  },
  job_description: {
    type: Schema.Types.String,
  },
  additional_information: {
    type: Schema.Types.String,
  },
  experience_level: {
    type: Schema.Types.String,
  },
  management_experience: {
    type: Schema.Types.String,
  },
  mandatory_skills: {
    type: [Schema.Types.String],
  },
  additional_skills: {
    type: [Schema.Types.String],
  },
  required_qualifications: {
    type: Schema.Types.String,
  },
  annual_CTC: {
    type: Schema.Types.Number,
  },
  negotiable: {
    type: Schema.Types.Boolean,
  },
  job_description_assistant: {
    type: Schema.Types.String,
  },
  urgency_to_hire: {
    type: Schema.Types.Boolean,
  },
  recruitment_fees: {
    type: Schema.Types.Number,
  },
  percentage_of_CTC: {
    type: Schema.Types.Number,
  },
  guarantee_period: {
    type: Schema.Types.Number,
  },
  joining_date: {
    type: Schema.Types.String,
  },
  additional_questions: {
    type: [question_detail],
  },
  urgent_job_options: {
    type: Schema.Types.Boolean,
  },
  job_ref: {
    type: Schema.Types.String,
  },

    //second phase
    stages: {
      type: [Schema.Types.String],
    },
    is_interview_stages_updated: {
        type: Schema.Types.Boolean,
        default: false,
    },

    //third phase
    creator: {
        type: Schema.Types.String,
    },
    recruiter: {
        type: Schema.Types.String,
    },
    collaborators: {
        type: [Schema.Types.String],
    },
    interviewers: {
        type: [Schema.Types.String],
    },
    hiring_managers: {
        type: [Schema.Types.String],
    },
    is_hiring_updated: {
        type: Schema.Types.Boolean,
        default: false,
    },
});

Job = mongoose.model("posted_job", PostedJobSchema);

module.exports = Job;
