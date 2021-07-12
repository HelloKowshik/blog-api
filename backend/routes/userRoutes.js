const userRouter = require('express').Router();
const {
  updateUser,
  deleteUser,
  getSingleUser,
} = require('../controllers/userController');

userRouter.get('/:id', getSingleUser);
userRouter.put('/:id', updateUser);
userRouter.delete('/:id', deleteUser);

module.exports = userRouter;
