const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// nested model
const EducationInfo = {
  education_info: String,
  score: String,
  institute_name: String,
  date: String,
};

const WorkExpInfo = {
  workExp_info: String,
  workExp_sure_info: String,
  workExp_rake_list: String,
};

const Skill = {
  skills_sure_of: [String],
  skills_not_so_sure_of: [String],
};

const detailFromRecruiter = {
  question: String,
  answer: String,
};

// nested model ends

const SavedCandidateSchema = new Schema({
  name: {
    type: Schema.Types.String,
  },
  email: {
    type: Schema.Types.String,
  },
  phone_number: {
    type: Schema.Types.String,
  },
  languages: {
    type: [Schema.Types.String],
  },
  degree: {
    type: Schema.Types.String,
  },
  resume_link: {
    type: Schema.Types.String,
    default: null,
  },
  school: {
    type: Schema.Types.String,
  },
  educational_info: {
    type: [EducationInfo],
  },
  work_exp_info: {
    type: [WorkExpInfo],
  },
  skills: {
    type: [Schema.Types.String],
  },
  achievements: {
    type: [Schema.Types.String],
  },
  detail_from_recruiter: {
    type: [detailFromRecruiter],
  },
});

SavedCandidate = mongoose.model("saved_candidate", SavedCandidateSchema);

module.exports = SavedCandidate;
