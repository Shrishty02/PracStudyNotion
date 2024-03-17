const nodemailer = require("nodemailer");

const mailSender = async (email, title, body) => {
  try {
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      auth: {
        user: "satabdomajumdar@gmail.com",
        pass: "Satabdo@2000",
      },
    });
    let info = await transporter.sendMail({
      from: "StudyNotion ~Satabdo",
      to: `${email}`,
      subject: `${title}`,
      html: `${body}`,
    });
    console.log(info);
    return info;
  } catch (error) {
    
    console.log(error.message);
  }
};

module.exports = mailSender;
