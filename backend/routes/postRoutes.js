const postRouter = require('express').Router();
const {
  getAllPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
} = require('../controllers/postController');

postRouter.get('/', getAllPosts);
postRouter.get('/:id', getPost);
postRouter.post('/', createPost);
postRouter.put('/:id', updatePost);
postRouter.delete('/:id', deletePost);

module.exports = postRouter;
