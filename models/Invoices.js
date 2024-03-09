const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const bookingSchema = new Schema(
  { bookingID: mongoose.Schema.Types.ObjectId },
  { _id: false } // <-- disable `_id`
);

const InvoiceSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
    required: true
  },
  //docArray: [bookingSchema],
  bookingsID: [
    {
      bookings: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Bookings',
        required: true
      }
    }
  ],
  date: {
    type: Date,
    require: true
  },
  status: {
    type: Number,
    default: 1
  }
}, {
  timestamps: true
});

InvoiceSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Invoices', InvoiceSchema);