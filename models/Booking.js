const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const BookingSchema = new mongoose.Schema({
  room: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Rooms',
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
    required: true
  },
  date: {
    type: Date,
    require: true
  },
  invoice: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Invoices',
    required: true
  },
  status: {
    type: Number,
    default: 1
  }
}, {
  timestamps: true
});

BookingSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Bookings', BookingSchema);