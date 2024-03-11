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

async function getRoom(req, res) {

  const { id } = req.params;
  
  const room = await Room.findOne({ _id: id });

  return res.status(200).json({ room });

}

async function getRooms(req, res) {
  
  const rooms = await Room.find();

  return res.status(200).json({ rooms });

}

async function deleteRoom (req, res) {

  const { id } = req.params;

  try {

    // elimina de la BDD
    const deletedRoom = await Room.findOneAndDelete({ _id: id });

    if(!deleteRoom) return res.status(400).json({ message:'Room not found' });
    
    // eliminar la imagen del server
    // subcadena = filename
    const subcadena = deletedRoom.image.split('/');

    // path image
    console.log(`./uploads/${subcadena[4]}`);

    fs.unlink(`./uploads/${subcadena[4]}`, (err)=>{
      if (err) return console.log('Image not found');
      console.log(`${subcadena[4]} deleted`);
    });

    return res.status(200).json({ deletedRoom });
    
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
}

module.exports = {
  addRoom,
  getRoom,
  getRooms,
  deleteRoom
}