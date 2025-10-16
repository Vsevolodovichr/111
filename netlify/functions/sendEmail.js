const nodemailer = require('nodemailer');

exports.handler = async function (event, context) {
  const { title, link } = JSON.parse(event.body);

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const mailOptions = {
    from: `"Dentis CMS" <${process.env.SMTP_USER}>`,
    to: process.env.EMAIL_TO,
    subject: `🆕 Нова новина: ${title}`,
    html: `<h3>Опубліковано новину:</h3><p><a href="${link}">${title}</a></p>`,
  };

  try {
    await transporter.sendMail(mailOptions);
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Email sent successfully' }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
