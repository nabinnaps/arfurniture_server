const nodemailer = require('nodemailer');
const { SMTP_MAIL, SMTP_PASSWORD } = process.env;

const sendMail = async (email, mailSubject, content) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: SMTP_MAIL,
        pass: SMTP_PASSWORD,
      },
    });

    const mailOptions = {
      from: SMTP_MAIL,
      to: email,
      subject: mailSubject,
      html: content,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully!', info.response);
    
    return true;
  } catch (error) {
    // console.log('Error:', error.message);
    return false;
  }
};

module.exports = sendMail;
