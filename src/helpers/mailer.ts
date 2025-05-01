import nodemailer from "nodemailer";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";


interface SendEmailArgs {
  email: string;
  emailType: "VERIFY" | "RESET"; 
  userId: string; 
}

export const sendEmail = async ({ email, emailType, userId }: SendEmailArgs) => {
  try {
   
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);

    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000,
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgetPasswordToken: hashedToken,
        forgetPasswordTokenExpiry: Date.now() + 3600000,
      });
    }

    // Use const instead of var
    const transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.MAILTRAP_USER,
        pass: process.env.MAILTRAP_PASS,
       
      },
    });

    // Email content based on type
    const emailContent =
      emailType === "VERIFY"
        ? {
            subject: "Verify your email",
            html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to verify your email.</p>
               <p>Or copy and paste the link below into your browser: <br>
               ${process.env.DOMAIN}/verifyemail?token=${hashedToken}</p>`,
          }
        : {
            subject: "Reset your password",
            html: `<p>Click <a href="${process.env.DOMAIN}/resetpassword?token=${hashedToken}">here</a> to reset your password.</p>
               <p>Or copy and paste the link below into your browser: <br>
               ${process.env.DOMAIN}/resetpassword?token=${hashedToken}</p>`,
          };

    // Send the email
    const mailOptions = {
      from: process.env.MYEMAIL,
      to: email,
      subject: emailContent.subject,
      html: emailContent.html,
    };

    const mailResponse = await transport.sendMail(mailOptions);
    return mailResponse;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("An unknown error occurred while sending email.");
  }
};