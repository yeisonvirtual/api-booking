const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const InvoiceSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
    required: true
  },
  room: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Rooms',
    required: true
  },
  dateInit: {
    type: Date,
    require: true
  },
  dateEnd: {
    type: Date,
    require: true
  },
  // bookings: [{
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: 'Bookings'
  // }],
  totalPrice: {
    type: Number,
    require: true
  },
  reference: {
    type: String,
    required: true
  },
  status: {
    type: Number,
    default: 3 // 1 accepted - 2 rejected - 3 pending
  }
}, {
  timestamps: true
});

InvoiceSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Invoices', InvoiceSchema);