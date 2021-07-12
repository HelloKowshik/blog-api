const authRouter = require('express').Router();
const { createUser, login } = require('../controllers/authController');

authRouter.post('/register', createUser);
authRouter.post('/login', login);

module.exports = authRouter;
