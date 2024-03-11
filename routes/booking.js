const express = require('express');
const bookingRouter = express.Router();
const verifyToken = require('../middleware/verifyToken');

const { addBookings, getBookings, checkAvailability } = require('../controllers/bookingController');

bookingRouter.get('/', getBookings);
bookingRouter.post('/add', addBookings);
bookingRouter.get('/check/:dateinit/:dateend', checkAvailability);

module.exports = bookingRouter;