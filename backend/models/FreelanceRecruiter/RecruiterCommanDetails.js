const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RecruiterCommanDetailSchema = new Schema({
  FAQ_url: {
    type: Schema.Types.String,
  },

  company_name: {
    type: [Schema.Types.String],
  },
});

RecruiterCommanDetail = mongoose.model(
  "recruiter_comman_detail",
  RecruiterCommanDetailSchema
);

module.exports = RecruiterCommanDetail;
