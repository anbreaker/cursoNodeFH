const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const User = require('../models/user.model');
const { generateJWT } = require('../helpers/generateJWT');
const { googleVerify } = require('../helpers/googleVerify');

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

const googleSignin = async (req = request, res = response) => {
  const { id_token } = req.body;

  try {
    const googleUser = await googleVerify(id_token);

    res.status(200).json({
      msg: "It's ok.",
      googleUser,
    });
  } catch (error) {
    console.log(error);

    res.status(400).json({
      msg: "Google's Token is not valid.",
    });
  }
};

module.exports = { loginController, googleSignin };
