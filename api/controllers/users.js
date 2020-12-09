const jwtDecode = require('jwt-decode');

const User = require("../models/user");

const {
    createToken,
    hashPassword,
    verifyPassword
  } = require('./../util/util');

exports.login = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      const user = await User.findOne({
        email
      }).lean();
  
      if (!user) {
        return res.status(403).json({
          message: 'Wrong email or password.'
        });
      }
  
      const passwordValid = await verifyPassword(
        password,
        user.password
      );
  
      if (passwordValid) {
        const { password, bio, ...rest } = user;
        const userInfo = Object.assign({}, { ...rest });
  
        const token = createToken(userInfo);
  
        const decodedToken = jwtDecode(token);
        const expiresAt = decodedToken.exp;
  
        res.json({
          message: 'Authentication successful!',
          token,
          userInfo,
          expiresAt
        });
      } else {
        res.status(403).json({
          message: 'Wrong email or password.'
        });
      }
    } catch (err) {
      console.log(err);
      return res
        .status(400)
        .json({ message: 'Something went wrong.' });
    }
};
  
exports.register = async (req, res) => {
    try {
      const { email, firstName, lastName, phone, role } = req.body;
  
      const hashedPassword = await hashPassword(
        req.body.password
      );
  
      const userData = {
        email: email.toLowerCase(),
        firstName,
        lastName,
        phone,
        password: hashedPassword,
        role
      };
  
      const existingEmail = await User.findOne({
        email: userData.email
      }).lean();
  
      if (existingEmail) {
        return res
          .status(400)
          .json({ message: 'Email already exists' });
      }
  
      const newUser = new User(userData);
      const savedUser = await newUser.save();
  
      if (savedUser) {
        const token = createToken(savedUser);
        const decodedToken = jwtDecode(token);
        const expiresAt = decodedToken.exp;
  
        const {
          firstName,
          lastName,
          email,
          phone,
          role
        } = savedUser;
  
        const userInfo = {
          firstName,
          lastName,
          email,
          phone,
          role
        };
  
        return res.json({
          message: 'User created!',
          token,
          userInfo,
          expiresAt
        });
      } else {
        return res.status(400).json({
          message: 'There was a problem creating your account first'
        });
      }
    } catch (err) {
      return res.status(400).json({
        message: 'There was a problem creating your account second'
      });
    }
}

exports.users = async (req, res) => {
    try {
      const users = await User.find()
        .lean()
        .select('_id firstName lastName email phone role');
  
      res.json({
        users
      });
    } catch (err) {
      return res.status(400).json({
        message: 'There was a problem getting the users'
      });
    }
}

