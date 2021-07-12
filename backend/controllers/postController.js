const Post = require('../models/Post');
const User = require('../models/User');

module.exports.getAllPosts = async (req, res) => {
  let postsByUser = req.query.user;
  let postsByCat = req.query.cat;
  try {
    let posts;
    if (postsByUser) {
      posts = await Post.find({ username: postsByUser });
    } else if (postsByCat) {
      posts = await Post.find({ categories: { $in: [postsByCat] } });
    } else {
      posts = await Post.find({});
    }
    if (posts.length <= 0) {
      res.status(404).json({ msg: 'No Posts Found!' });
    }
    res.status(201).json({ success: true, data: posts });
  } catch (err) {
    res.status(500).json({ msg: 'Something went wrong' });
  }
};

module.exports.getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      res.status(404).json({ success: false, msg: 'Post not found!' });
    }
    res.status(201).json({ success: true, data: post });
  } catch (err) {
    res.status(500).json({ msg: 'Something went wrong' });
  }
};

module.exports.createPost = async (req, res) => {
  let postData = new Post(req.body);
  if (postData.username) {
    try {
      let getUser = await User.findOne({ username: postData.username });
      if (getUser) {
        try {
          let post = await postData.save();
          if (!post) {
            res
              .status(404)
              .json({ success: false, msg: 'post creation failed!' });
          }
          res.status(201).json({ success: true, data: postData });
        } catch (err) {
          res.status(500).json({ msg: 'Something Went wrong' });
        }
      } else {
        res.status(404).json({ success: false, msg: 'User not found' });
      }
    } catch (err) {
      res.status(500).json({ msg: 'Something went wrong' });
    }
  } else {
    res.status(404).json({ success: false, msg: 'username is not valid' });
  }
};

module.exports.updatePost = async (req, res) => {
  try {
    let post = await Post.findById(req.params.id);
    if (post.username === req.body.username) {
      try {
        let updatePost = await Post.findByIdAndUpdate(
          req.params.id,
          {
            $set: {
              title: req.body.title,
              desc: req.body.desc,
              category: req.body.category || post.category,
            },
          },
          { new: true }
        );
        let { username, ...details } = updatePost._doc;
        if (!updatePost) {
          res.status(404).json({ success: false, msg: 'Update failed' });
        }
        res.status(201).json({ success: true, data: details });
      } catch (err) {
        res.status(500).json({ msg: 'Something went wrong' });
      }
    }
  } catch (err) {
    res.status(500).json({ msg: 'Something went wrong' });
  }
};

module.exports.deletePost = async (req, res) => {
  try {
    let post = await Post.findById(req.params.id);
    if (post) {
      try {
        await post.delete();
        res.status(201).json({ success: true, msg: 'Post deleted!' });
      } catch (err) {
        res.status(500).json({ msg: 'something went wrong' });
      }
    }
  } catch (err) {
    res.status(500).json({ msg: 'something went wrong' });
  }
};
