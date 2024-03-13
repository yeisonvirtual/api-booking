const express = require('express');
const bookingRouter = express.Router();
const verifyToken = require('../middleware/verifyToken');

const { addBookings, getBookings, checkAvailability } = require('../controllers/bookingController');

bookingRouter.get('/', verifyToken, getBookings);
bookingRouter.post('/add', verifyToken, addBookings);
bookingRouter.get('/check/:room/:dateinit/:dateend', verifyToken, checkAvailability);

module.exports = bookingRouter;