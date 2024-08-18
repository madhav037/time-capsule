import nodemailer from 'nodemailer'
import { client } from '../index.js';
export const sendLetter = async () => {
    const data = client.get('letters')
    data = JSON.parse(data)
    console.log(data)
    // const mailOptions = {
    //     from: 'narutotestmail@gmail.com',
    //     to: email,
    //     subject: 'Ready to go!',
    //     text: `Welcome to Netflix!\n\nDear [USER NAME],\n\nCongratulations and welcome to Netflix! We're excited to have you as a new member of our streaming family. Your account has been successfully set up, and now you have access to a world of captivating entertainment.\n\nWith Netflix, you can enjoy an incredible range of movies, TV shows, and documentaries right at your fingertips. Whether you're in the mood for a thrilling suspense series, a romantic comedy, or an eye-opening documentary, we've got you covered.\n\nWe encourage you to explore our vast library of content and discover new favorites. Our recommendation system will also tailor suggestions based on your viewing history, so the more you watch, the better we can personalize your experience.\n\nIf you have any questions or need assistance, our Help Center is available to provide guidance and support. We want your Netflix journey to be enjoyable and hassle-free.\n\nOnce again, welcome to Netflix! Get ready to immerse yourself in a world of entertainment like never before.\n\nHappy streaming!\n\nBest regards,\n\nThe Netflix-clone Team`
    //   };
    //   await sendEmail(mailOptions);
}



const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'narutotestmail@gmail.com',
    pass: 'podbmipgqzuehpux'
  }
});

const sendEmail = (mailOptions) => {
  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.error('Error sending email:', err);
        reject(err);
      } else {
        console.log('Email sent:', info.response);
        resolve(info);
      }
    });
  });
};
