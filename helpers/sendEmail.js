import nodemailer from "nodemailer";
import "dotenv/config";

const { UKRNET_USER, UKRNET_PASS } = process.env;

const config = {
  host: "smtp.ukr.net",
  port: 465,
  secure: true,
  auth: {
    user: UKRNET_USER,
    pass: UKRNET_PASS,
  },
};

const transporter = nodemailer.createTransport(config);

const sendEmail = (data) => {
  const emailOptions = { ...data, from: `Test User <${UKRNET_USER}>` };
  return transporter.sendMail(emailOptions);
};

export default sendEmail;
