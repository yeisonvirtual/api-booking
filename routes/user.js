const express = require('express');
const userRouter = express.Router();
const verifyToken = require('../middleware/verifyToken');

const { getUsers, getUser, deleteUser, updateUser } = require('../controllers/userController');

// ruta protegidas por el middleware verifyToken
userRouter.get('/', verifyToken, getUsers);
userRouter.get('/:id', getUser);
userRouter.post('/delete/:id', deleteUser);
userRouter.post('/update/:id', updateUser);

module.exports = userRouter;