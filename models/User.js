const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true // elimina los espacios
  },
  email: {
    type: String,
    trim: true,
    required: true,
    unique: true, // unico
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    trim: true
  },
  type: {
    type: String,
    default: 'guest'
  },
  active: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

UserSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Users', UserSchema);