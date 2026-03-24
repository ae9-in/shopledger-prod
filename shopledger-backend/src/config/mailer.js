import nodemailer from 'nodemailer';

const hasSmtp = Boolean(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS);

export const transporter = hasSmtp
  ? nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })
  : nodemailer.createTransport({ jsonTransport: true });

export async function sendMail({ to, subject, text, html }) {
  const from = process.env.MAIL_FROM || 'no-reply@shopledger.local';
  return transporter.sendMail({ from, to, subject, text, html });
}
