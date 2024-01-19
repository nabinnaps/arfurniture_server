const User = require('../../models/user_model/user.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sendMail = require('../../helpers/send_mail.js');
const OTP=require('../otp_controller/otp_controller.js')
let refreshTokens = [];

exports.register = async (req, res) => {
  
  try {
    if (!req.body) {
      res.status(400).send({ message: 'Content can not be empty!' });
      return;
    }

    const { username, email, password } = req.body;

    // Check if the email already exists in the database
    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      res.status(409).json({ status: false, message: 'User with this email already exists.' });
      return;
    }
  
    const newUser = new User({
      username: username,
      email: email,
      password: password,
    });

    // Save the user in the database
    const createdUser = await User.create(newUser);
    res.json({
      status: true,
      message: 'Registration successful!',
    });
  } catch (err) {
    res.status(500).json({ status: false, message: 'Some error occurred while registering the user.' });
  }
};

exports.login = async (req, res) => {
  try {
    if (!req.body) {
      res.status(400).json({ message: 'Content can not be empty!' });
      return;
    }
    const { email, password } = req.body;

    // Find the user with the provided email in the database
    const user = await User.findByEmail(email);
    if (!user) {
      res.status(404).json({ status: false, message: 'User not found with the provided email.' });
      return;
    }

    // Compare the provided password with the hashed password in the database
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      res.status(401).json({ status: false, message: 'Invalid email or password.' });
      return;
    }

    function generateAccessToken(userData) {
      const token = jwt.sign(userData, 'sdasdxcdsdcd', { expiresIn: '30s' });
      return token;
    }

    function generateRefreshToken(userId) {
      const refreshToken = jwt.sign({ userId }, 'nasdbsdnhhsadsadsad', { expiresIn: '1d' });
      refreshTokens.push(refreshToken);
      return refreshToken;
    }

    const accessToken = generateAccessToken({
      id: user.id,
      email: user.email,
      // Include other fields as needed
    });

    const refreshToken = generateRefreshToken(user.id);

    res.json({
      status: true,
      message: 'Login successful!',
      accessToken: accessToken,
      refreshToken: refreshToken,
      expiresIn: '1d', // Expiry for access token
    });
  } catch (err) {
    res.status(500).json({ status: false, message: 'Some error occurred while logging in.' });
  }
};

exports.renewtoken = async (req, res) => {
  const refreshToken = req.body.token;

  if (!refreshToken || !refreshTokens.includes(refreshToken)) {
    return res.status(403).json({ message: 'User not authenticated' });
  }

  jwt.verify(refreshToken, 'nasdbsdnhhsadsadsad', (err, user) => {
    if (!err) {
      const accessToken = jwt.sign({username:user.username}, 'sdasdxcdsdcd', { expiresIn: '30s' });
      return res.status(201).json({ accessToken });
    } else {
      return res.status(403).json({ message: 'User not authenticated' });
    }
  });
};


exports.otp = async (req, res) => {


};
