const express = require("express");
const mongoose = require("mongoose");
const http = require("http");
const bodyParser = require("body-parser");
const mongoSanitize = require("express-mongo-sanitize");
const helmet = require("helmet");
const multer = require("multer");
const hpp = require("hpp");
const rateLimit = require("express-rate-limit");
const Ddos = require("ddos");
const cors = require("cors");
const SocketService = require("./routes/utill/socketService");
const cookieParser = require("cookie-parser");
// const fileupload = require('express-fileupload');
require("dotenv").config();

const upload = multer();

const ddos = new Ddos({ burst: 10, limit: 15 });

const app = express();

const server = http.createServer(app);

const signUpRouter = require("./routes/api/root/SignUp");
const signInRouter = require("./routes/api/root/SignIn");
const recruiterProfileRoute = require("./routes/api/FreelanceRecruiter/Default (FreeelanceRecruiter)/Details");
const jobRoute = require("./routes/api/Company/Job/Job");
const AcceptedJobRoute = require("./routes/api/Company/Job/accepted_job");
const RejectedjobRoute = require("./routes/api/Company/Job/rejected_job");
const CandidateRoute = require("./routes/api/Company/Job/Candidate/add_new_candidate");
const UserRoute = require("./routes/api/root/user");
const ChangedPasswordRoute = require("./routes/api/root/change_password");
const ForgotPasswordRoute = require("./routes/api/root/forgot_password");
const FAQRoute = require("./routes/api/FreelanceRecruiter/Default (FreeelanceRecruiter)/FAQ");
const Top_clientRoute = require("./routes/api/DropdownList/top_clients");
const InsertDataRoute = require("./routes/api/Temp/data");
const AddExistingCandidateRoute = require("./routes/api/Company/Job/Candidate/add_existing_candidate");
const LiveJobRoute = require("./routes/api/Company/Job/live_job");
const JobDescriptionRoute = require("./routes/api/Company/Job/job_description");
const CandidatesMapedToJobRoute = require("./routes/api/Company/Job/Candidate/CandidatesMapedToJob");
const CandidatesMapedToRecruiterRoute = require("./routes/api/Company/Job/Candidate/CandidatesMapedToRecruiter");
const ProfileInfoRoute = require("./routes/api/FreelanceRecruiter/Default (FreeelanceRecruiter)/profile_info");
const UndoJobRoute = require("./routes/api/Company/Job/undo_job");
const CompanyDetailRoute = require("./routes/api/Company/company");
const CompanyDescriptionRoute = require("./routes/api/Company/company_description");
const JobsRelatedToCompanyRoute = require("./routes/api/Company/jobs_posted_by_company");
const CandidatesBasedOnClient = require("./routes/api/Company/Job/Candidate/candidates_for_client");
const CompanySettingRoute = require("./routes/api/Company/company_setting");
const DepartmentInJobSectionRoute = require("./routes/api/DropdownList/department_of_job_form");
const UpdateCanndidateStatus = require("./routes/api/Company/update_interview_stage");
const InterviewScheduleRoute = require("./routes/api/Company/interview_schedule");
const InterviewCalenderRoute = require("./routes/api/Company/interview_calender");
const InterviewStageCompleteRoute = require("./routes/api/Company/interview_stage_complete");
const NotificationForRecruiterRoute = require("./routes/api/FreelanceRecruiter/Default (FreeelanceRecruiter)/notification");
const NotificationForClientRoute = require("./routes/api/Company/notification");

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});

app.use(bodyParser.json());
app.use(cors());
app.use(cookieParser());
app.use(ddos.express);
app.use(mongoSanitize());
app.use(helmet());
app.use(hpp());
app.use(limiter);
app.set("socketService", new SocketService(server));
// app.use(fileupload());
app.use("/auth", signUpRouter);
app.use("/auth", signInRouter);
app.use("/recruiter", recruiterProfileRoute);
app.use("/job", jobRoute);
app.use("/job", AcceptedJobRoute);
app.use("/job", RejectedjobRoute);
app.use("/job", CandidateRoute);
app.use("/auth", UserRoute);
app.use("/auth", ChangedPasswordRoute);
app.use("/auth", ForgotPasswordRoute);
app.use("/recruiter", FAQRoute);
app.use("/recruiter", Top_clientRoute);
app.use("/", InsertDataRoute);
app.use("/job", AddExistingCandidateRoute);
app.use("/job", LiveJobRoute);
app.use("/job", JobDescriptionRoute);
app.use("/job", CandidatesMapedToJobRoute);
app.use("/job", CandidatesMapedToRecruiterRoute);
app.use("/recruiter", ProfileInfoRoute);
app.use("/job", UndoJobRoute);
app.use("/company", CompanyDetailRoute);
app.use("/company", CompanyDescriptionRoute);
app.use("/company", JobsRelatedToCompanyRoute);
app.use("/job", CandidatesBasedOnClient);
app.use("/company", CompanySettingRoute);
app.use("/job", DepartmentInJobSectionRoute);
app.use("/company", UpdateCanndidateStatus);
app.use("/company", InterviewScheduleRoute);
app.use("/company", InterviewCalenderRoute);
app.use("/company", InterviewStageCompleteRoute);
app.use("/recruiter", NotificationForRecruiterRoute);
app.use("/company", NotificationForClientRoute);

//Connect to Mongo
mongoose.connect(
  "mongodb://127.0.0.1:27017/auth",
  {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  },
  () => {
    console.log("mongoose connected...");
  }
);

const db = "mongodb://127.0.0.1:27017/auth" || process.env.MONGO_URI;

//Connect to Mongo
// mongoose
//     .connect(db, {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//         useFindAndModify: false,
//         useCreateIndex: true,
//     })
//     .then(() => console.log("MongoDB connected.."))
//     .catch((err) => console.log("Error: " + err));

server.listen(3000, () => {
  console.log("server connected");
});
