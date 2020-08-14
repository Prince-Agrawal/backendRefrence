const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const QuestionSchema = new Schema({
  type: {
    type: Schema.Types.String,
    required: true
  },
  position: {
    type: Schema.Types.Number,
    required: true
  },
  question: {
    type: Schema.Types.String,
    required: true
  },
  answer_type: {
    type: Schema.Types.String,
    required: true
  },
  answer: {
    type: Schema.Types.String,
    required: true
  }
})

const InterviewStageTemplateSchema = new Schema({
  job_type: {
    type: Schema.Types.String,
    required: true,
  },
  template_title: {
    type: Schema.Types.String,
    required: true,
  },
  stages: {
    type: [Schema.Types.String],
    required: true,
  },
});

const EmailTemplateSchema = new Schema({
  job_type: {
    type: Schema.Types.String,
    required: true,
  },
  template_title: {
    type: Schema.Types.String,
    required: true,
  },
  subject: {
    type: Schema.Types.String,
    required: true,
  },
  body: {
    type: Schema.Types.String,
    required: true,
  },
});

const FeedbackTemplateSchema = new Schema({
  template_name: {
    type: Schema.Types.String,
    required: true,
  },
  title: {
    type: Schema.Types.String,
    required: true,
  },
  description: {
    type: Schema.Types.String,
    required: true,
  },
  question: {
    type: [QuestionSchema],
    required: true,
  },
});

module.exports = {
  InterviewStageTemplate: mongoose.model(
    "interview_stages_template",
    InterviewStageTemplateSchema
  ),
  EmailTemplate: mongoose.model("email_template", EmailTemplateSchema),
  FeedbackTemplate: mongoose.model("feedback_template", FeedbackTemplateSchema),
};
