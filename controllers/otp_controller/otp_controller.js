const otpGenerator = require('otp-generator');
const OTP = require('../../models/user_model/optmode');
const User = require('../../models/user_model/user');
const sendMail = require('../../helpers/send_mail.js');


exports.registerWithOTP = async (req, res) => {
  try {
    const { email} = req.body;

    // Check if the email already exists in the database
    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      return res.status(409).json({ status: false, message: 'User with this email already exists.' });
    }

    // Generate OTP
    let otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    // Ensure the generated OTP is unique in the database
    let result = await OTP.findByEmail( otp);
    while (result) {
      otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
      });
      result = await OTP.create(otp );
    }

    // Save the generated OTP for the user's email in the database
    const otpPayload = { email, otp };
    await OTP.create(otpPayload);

    const welcomeEmailContent = `
<h2>Hi ${req.body.email},</h2>
<b>Welcome to our AR Furniture App!</b>
<p>We are thrilled to have you on board.</p>
<p>Explore our wide range of furniture and enjoy a seamless shopping experience.</p>
<p>Your OTP is ${otp}<h1></h1></p>
<p>Thank you for joining us!</p>
<p>Best regards,</p>
<p>The AR Furniture Team</p>
`;

    // Send OTP to the user's email
    const mailOptions = {
      to: email,
      subject: 'Your OTP for registration',
      html: welcomeEmailContent,
    };
    await sendMail(mailOptions);

    res.status(200).json({
      success: true,
      message: 'OTP sent successfully. Please verify your OTP to complete registration.',
    });
  } catch (error) {
    console.error('Error registering user:', error.message);
    return res.status(500).json({ success: false, error: error.message });
  }
};

exports.verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    // Fetch the stored OTP for the given email
    const storedOTP = await OTP.findByEmail({ email });

    if (!storedOTP || storedOTP.otp !== otp) {
      return res.status(400).json({
        success: false,
        message: 'Invalid OTP',
      });
    }

    // OTP is valid, you can proceed with user registration or any other actions
    // ...

    res.status(200).json({
      success: true,
      message: 'OTP verified successfully. Registration completed.',
      // Optionally, you can include any data or tokens for further actions
    });
  } catch (error) {
    console.error('Error verifying OTP:', error.message);
    return res.status(500).json({ success: false, error: error.message });
  }
};
