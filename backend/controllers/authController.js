const User = require('../models/User');
const bcrypt = require('bcrypt');

module.exports.createUser = async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });
    const user = await newUser.save();
    if (!user) {
      res.status(404).json({ success: false, msg: 'Something went wrong!' });
    }
    res.status(201).json({ success: true, data: user });
  } catch (err) {
    res.status(500).json({ msg: err });
  }
};

module.exports.login = async (req, res) => {
  try {
    let user = await User.findOne({ username: req.body.username });
    let validate = await bcrypt.compare(req.body.password, user.password);
    let { password, ...userData } = user._doc;
    if (!validate) {
      res.statu(404).json({ success: false, msg: 'Invalid User' });
    }
    res.status(201).json({ success: true, data: userData });
  } catch (err) {
    res.status(500).json({ msg: 'Something went wrong!' });
  }
};
