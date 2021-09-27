import nodemailer from 'nodemailer';
import { google } from 'googleapis';

const mailer = async ({ to, subject, text }) => {
  try {
    const OAuth2 = google.auth.OAuth2;

    const oauth2Client = new OAuth2(
      process.env.MAILER_CLIENT_ID,
      process.env.MAILER_SECRET,
      'https://developers.google.com/oauthplayground'
    );

    oauth2Client.setCredentials({
      refresh_token: process.env.MAILER_REFRESH_TOKEN,
    });

    const accessToken = await oauth2Client.getAccessToken();

    const transporter = nodemailer.createTransport({
      service: process.env.MAILER_SERVICE,
      auth: {
        type: 'OAuth2',
        user: process.env.MAILER_USER,
        clientId: process.env.MAILER_CLIENT_ID,
        clientSecret: process.env.MAILER_SECRET,
        refreshToken: process.env.MAILER_REFRESH_TOKEN,
        accessToken: accessToken,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    const mail = await transporter.sendMail({
      from: process.env.MAILER_USER,
      to,
      subject,
      text,
    });

    console.log('mail', mail);
  } catch (error) {
    throw new Error(error);
  }
};

export default mailer;
