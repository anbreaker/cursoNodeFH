const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const User = require('../models/user.model');
const { generateJWT } = require('../helpers/generateJWT');

const loginController = async (req = request, res = response) => {
  const { email, password } = req.body;

  try {
    // exist email?
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ mgs: 'Incorrect Username or Password' });

    // Active User?
    if (!user.status)
      return res
        .status(400)
        .json({ msg: 'Incorrect Username or Password - status: false' });

    // Verify password
    const validPassword = bcryptjs.compareSync(password, user.password);
    if (!validPassword)
      return res.status(400).json({ msg: 'Incorrect Username or Password - Password' });

    // Generate JWT
    const token = await generateJWT(user.id);

    res.json({
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: 'Contact with admin.',
    });
  }
};

const googleSignin = (req = request, res = response) => {
  //
};

module.exports = { loginController };
