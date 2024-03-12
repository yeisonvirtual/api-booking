const express = require('express');
const invoiceRouter = express.Router();
const verifyToken = require('../middleware/verifyToken');

const { createInvoice, getInvoices, changeStatus } = require('../controllers/invoiceController');

invoiceRouter.get('/', verifyToken, getInvoices);
invoiceRouter.post('/create', verifyToken, createInvoice);
invoiceRouter.post('/status/:id/:status', verifyToken, changeStatus);

module.exports = invoiceRouter;