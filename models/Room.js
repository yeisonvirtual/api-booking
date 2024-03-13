const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const RoomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  size: {
    type: Number,
    required: true,
    trim: true
  },
  sleeps: {
    type: Number,
    trim: true
  },
  price: {
    type: Number,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  image: {
    type: String,
    required: true,
    trim: true
  }
}, {
  timestamps: true
});

RoomSchema.methods.setImgUrl = function setImgUrl(filename){
  console.log(`Store img: ${process.env.API_URL}/public/${filename}`);
  this.image = `${process.env.API_URL}/public/${filename}`;
}

RoomSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Rooms', RoomSchema);