const Category = require('../models/Category');

module.exports.createCategory = async (req, res) => {
  let cat = new Category(req.body);
  try {
    let category = await cat.save();
    res.status(201).json({ success: true, data: category });
  } catch (err) {
    res.status(500).json({ msg: 'something went wrong' });
  }
};

module.exports.getAllCategories = async (req, res) => {
  try {
    let cats = await Category.find({});
    res.status(200).json({ success: true, data: cats });
  } catch (err) {
    res.status(500).json({ msg: 'something went wrong!' });
  }
};
