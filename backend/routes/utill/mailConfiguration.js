var nodemailer = require("nodemailer");

/*
	Here we are configuring our SMTP Server details.
	STMP is mail server which is responsible for sending and recieving email.
*/

const smtpTransport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "227e4eb5ef4280",
    pass: "1263435d68f834",
  },
});

/*------------------SMTP Over-----------------------------*/

module.exports = smtpTransport;
