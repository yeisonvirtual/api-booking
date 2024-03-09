const express = require('express');
const roomRouter = express.Router();
const upload = require('../libs/storage');
const verifyToken = require('../middleware/verifyToken');

const { addRoom, getRooms } = require('../controllers/roomController');

roomRouter.get('/', verifyToken, getRooms);
roomRouter.post('/add', verifyToken, upload.single('image'), addRoom);

// ruta protegidas por el middleware verifyToken
// userRouter.get('/', verifyToken, getUsers);
// userRouter.get('/:id', getUser);
// userRouter.post('/delete/:id', deleteUser);
// userRouter.post('/update/:id', updateUser);

module.exports = roomRouter;