const Room = require('../models/Room');
const fs = require('fs');

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

async function getRooms(req, res) {

  // request: http://localhost:8080/api/rooms?limit=5&page=1&field=id&value=1
  const { limit, page } = req.query;

  //const { field, value } = req.query;

  const options = {
    limit: limit || 10,
    page: page || 1
  };
  
  const rooms = await Room.paginate({}, options);

  return res.status(200).json({ rooms });

}

module.exports = {
  addRoom,
  getRooms
}