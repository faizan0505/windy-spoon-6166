const nodemailer = require("nodemailer");

const sendMail = async (subject, body, userMail) => {
  try {
    console.log("working");
    let testAccount = await nodemailer.createTestAccount();
    let transporter = nodemailer.createTransport({
      host: "smtp-relay.sendinblue.com",
      port: 587,
      auth: {
        user: "md.faizan9t9@gmail.com",
        pass: "DMdACXsfZN8GU3ja",
      },
    });
    let info = await transporter.sendMail({
      from: '"API ACE" <api_ace@mail.com>',
      to: userMail,
      subject: subject,
      text: body,
      html: body,
    });
    console.log("Message sent: %s", info.messageId);
  } catch (error) {
    console.log(error)
  }
};

module.exports = { sendMail };