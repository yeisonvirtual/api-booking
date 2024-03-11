const Room = require('../models/Room');
//const fs = require('fs');

async function addRoom (req, res) {
  
  const {
    name,
    size,
    sleeps,
    price,
    description
  } = req.body;

  if (!name || !size || !sleeps || !price || !req.file ) return res.status(409).json({ message: 'Faltan datos' });

  try {

    const room = Room({
      name,
      size,
      sleeps,
      price,
      description
    });

    if(req.file){
      const { filename } = req.file;
      room.setImgUrl(filename);
    }

    console.log(room);

    const roomStore = await room.save();

    return res.status(201).json({ roomStore });

  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
}

async function getRoom(req, res) {

  const { id } = req.params;
  
  const room = await Room.findOne({ _id: id });

  return res.status(200).json({ room });

}

async function getRooms(req, res) {
  
  const rooms = await Room.find();

  return res.status(200).json({ rooms });

}

module.exports = {
  addRoom,
  getRoom,
  getRooms
}