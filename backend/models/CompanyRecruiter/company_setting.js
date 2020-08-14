const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const interview_stage = {
  department: String,
  stages: [String],
};

const hiring_team = {};

const ClientSettingSchema = new Schema({
  company_id: {
    type: Schema.Types.String,
  },
  interview_stages: {
    type: [interview_stage],
  },
  hiring_team: {
    type: [hiring_team],
  },
});

ClientSetting = mongoose.model("client_setting", ClientSettingSchema);

module.exports = ClientSetting;
