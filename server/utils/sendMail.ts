import { Transporter } from './../node_modules/@types/nodemailer/index.d';
import nodemailer from 'nodemailer';
import ejs from 'ejs';
import path from 'path';
require('dotenv').config();
interface EmailOption {
  email: string;
  subject: string;
  template: string;
  data: { [key: string]: any };
}

export const sendMail = async (option: EmailOption): Promise<void> => {
  const transporter: Transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    service: process.env.SMTP_SERVICE,
    auth: {
      user: process.env.SMTP_MAIL,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  const { email, subject, template, data } = option;

  //get the path data to the mail tempaltefile
  const templatePath = path.join(__dirname, '../mail', template);
  const html = await ejs.renderFile(templatePath, data);

  const mailOptions = {
    from: process.env.SMTP_MAIL,
    to: email,
    subject,
    html,
  };

  await transporter.sendMail(mailOptions);
};
