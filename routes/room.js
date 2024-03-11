const express = require('express');
const roomRouter = express.Router();
const upload = require('../libs/storage');
const verifyToken = require('../middleware/verifyToken');

const { addRoom, getRoom, getRooms } = require('../controllers/roomController');

roomRouter.get('/', verifyToken, getRooms);
roomRouter.get('/:id', verifyToken, getRoom);
roomRouter.post('/add', verifyToken, upload.single('image'), addRoom);

module.exports = roomRouter;