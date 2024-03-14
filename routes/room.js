const express = require('express');
const roomRouter = express.Router();
const upload = require('../libs/storage');
const verifyToken = require('../middleware/verifyToken');

const { addRoom, getRoom, getRooms, deleteRoom } = require('../controllers/roomController');

roomRouter.get('/', verifyToken, getRooms);
roomRouter.get('/:id', verifyToken, getRoom);
roomRouter.post('/add', verifyToken, upload.single('image'), addRoom);
//roomRouter.get('/resize/:filename', resizeImg);
roomRouter.post('/delete/:id', verifyToken, deleteRoom);

module.exports = roomRouter;