const categoryRouter = require('express').Router();
const {
  createCategory,
  getAllCategories,
} = require('../controllers/categoryController');

categoryRouter.get('/', getAllCategories);
categoryRouter.post('/', createCategory);

module.exports = categoryRouter;
