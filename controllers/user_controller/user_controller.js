const User = require('../../models/user_model/user.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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

    // Create a new User instance
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


    // // Compare the provided password with the hashed password in the database
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      res.status(401).json({ status: false, message: 'Invalid email or password.' });
      return;
    }


    function generateAccessToken(userData) {
      // The user data is encoded into the token
      // Replace 'YOUR_SECRET_KEY' with your actual secret key used to sign the token
      const token = jwt.sign(userData, 'sdasdxcdsdcd', { expiresIn: '1d' });
      return token;
    }
    // // Generate an access token
    const accessToken = generateAccessToken({
      id: user.id,
      email: user.email,
      // Include other fields as needed
    });
    function generateRefreshToken(userId) {
      // Generate a refresh token using userId
      // Replace 'YOUR_REFRESH_SECRET_KEY' with your actual refresh token secret key
      const refreshToken = jwt.sign({ userId }, 'nasdbsdnhhsadsadsad');
      return refreshToken;
    }

    // Generate a refresh token (can be a random string or JWT with longer expiry)
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
// Other controller methods (getLoggedInUser, getAllUsers, getUserById, updateUser, forgetpassword, resetPassword) can be similarly updated to use the Prisma-based User model.





