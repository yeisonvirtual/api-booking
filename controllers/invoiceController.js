const Invoice = require('../models/Invoice');

async function createInvoice (req, res) {
  
  const {
    roomID,
    userID,
    dateInit,
    dateEnd,
    dates,
    totalPrice,
    reference
  } = req.body;

  console.log(req.body);

  if (
    !roomID ||
    !userID ||
    !dateInit ||
    !dateEnd ||
    !dates ||
    !totalPrice ||
    !reference
    ) return res.status(409).json({ message: 'Faltan datos' });

    try {

      const invoice = Invoice({
        room: roomID,
        user: req.user.id,
        dateInit,
        dateEnd,
        totalPrice,
        reference
      });

      const newInvoice = await invoice.save();

      console.log(newInvoice);

      const response = await fetch(`${process.env.API_URL}/api/bookings/add`,{
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        room: roomID,
        user: req.user.id,
        dates,
        invoiceID: newInvoice._id
      })
    });

    console.log(response)

    const data = await response.json();

    console.log(data)

    return res.status(201).json({ id: newInvoice._id });
      
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }

}

async function getInvoices (req, res) {

  const { limit, page, status } = req.query;

  const options = {
    limit: limit || 10,
    page: page || 1,
    populate: ["user", "room"]
  };

  if (status && status!=='') {
    const invoices = await Invoice.paginate({ status }, options);
    return res.status(200).json({ invoices });
  }

  const invoices = await Invoice.paginate({}, options);
  return res.status(200).json({ invoices });

}

async function changeStatus (req, res) {

  const { id, status } = req.params;

  console.log(id)
  console.log(status)

  const e = Number(status)

  const invoiceUpdated = await Invoice.findOneAndUpdate({ _id: id },{ status },{
    new: true
  });

  console.log(invoiceUpdated);

  if(!invoiceUpdated) return res.status(400).json({ message: 'Invoice not found' });

  return res.status(200).json(invoiceUpdated);

}

module.exports = {
  createInvoice,
  getInvoices,
  changeStatus
}