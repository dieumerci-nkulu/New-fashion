// utils/notification.js

const nodemailer = require('nodemailer');
// const twilio = require('twilio'); // si tu veux envoyer des SMS

// 💌 Envoi d'un email de confirmation
const sendConfirmationEmail = async (user, order) => {
  try {
    // Simuler un transporteur SMTP (à personnaliser)
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.SMTP_USER, // met ça dans ton .env
        pass: process.env.SMTP_PASS
      }
    });

    const mailOptions = {
      from: '"New Fashion" <no-reply@newfashion.com>',
      to: user.email,
      subject: 'Confirmation de commande',
      text: `Bonjour ${user.name},\n\nVotre commande de $${order.total} a bien été enregistrée.\n\nMerci pour votre confiance !`,
    };

    await transporter.sendMail(mailOptions);
    console.log('✅ Email de confirmation envoyé');
  } catch (err) {
    console.error('❌ Erreur lors de l’envoi de l’email :', err);
  }
};

module.exports = {
  sendConfirmationEmail,
};
