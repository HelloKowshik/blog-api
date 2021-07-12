const User = require('../models/User');
const Post = require('../models/Post');
const bcrypt = require('bcrypt');

module.exports.updateUser = async (req, res) => {
  if (req.body.userId === req.params.id) {
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      if (!updatedUser) {
        res.status(404).json({ success: false, msg: 'Update Failed!' });
      }
      res.status(201).json({ success: true, data: updatedUser });
    } catch (err) {
      res.status(500).json({ msg: 'Something Went Wrong!' });
    }
  } else {
    res.status(404).json({ success: false, msg: 'Invalid Data Provided' });
  }
};

module.exports.deleteUser = async (req, res) => {
  if (req.body.userId === req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      try {
        let deletedPostsOfThisUser = await Post.deleteMany({
          username: user.username,
        });
        let deletedUser = await User.findByIdAndDelete(user);
        if (!deletedUser) {
          res.status(404).json({ success: false, msg: 'Delete Failed!' });
        }
        res
          .status(201)
          .json({ success: true, data: `User Deleted Succesfully!` });
      } catch (err) {
        res.status(500).json({ msg: 'Something Went Wrong!' });
      }
    } catch (err) {
      res.status(500).json({ msg: 'Something went Wrong!' });
    }
  } else {
    res.status(404).json({ success: false, msg: 'Invalid Data provided' });
  }
};

module.exports.getSingleUser = async (req, res) => {
  try {
    let user = await User.findById(req.params.id);
    let { password, ...userData } = user._doc;
    if (!user) {
      res.status(404).json({ success: false, msg: 'User not found!' });
    }
    res.status(201).json({ success: true, data: userData });
  } catch (err) {
    res.status(500).json({ msg: 'Something went Wrong' });
  }
};
