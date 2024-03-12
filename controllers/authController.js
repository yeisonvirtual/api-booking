const User = require('../models/User');
const bcrypt = require("bcrypt");
const { sign } = require('jsonwebtoken');
const  cookie = require('cookie');

async function register (req, res) {

  const {
    name,
    email,
    password
  } = req.body;

  if (!name || !email || !password) return res.status(409).json({ message: 'Faltan datos' });
  
  try {

    // comprueba que el usuario exista
    const emailExist = await User.findOne({ email });
    
    // 409 - Conflict Status
    if (emailExist) return res.status(409).json({ message: 'Email ya existe' });

    // Encripta la password
    const passwordHash = await bcrypt.hash(password, 10);

    // Store hash in your password DB.
    const user = User({
      name,
      email,
      password: passwordHash
    });

    console.log(user);
        
    const newUser = await user.save();

    // 201 - Created
    return res.status(201).json(newUser);

  } catch (e) {
    // 500 - Internal Server Error
    return res.status(500).json({ message: e.message });
  }
}

//login email and password
async function login (req, res) {

  const { email, password } = req.body;

  // si no hay email o pass en los campos
  if (!email || !password) return res.status(400).json({ message: 'Faltan datos'});

  try {

    const user = await User.findOne({ email }); // comprueba que el usuario exista
    
	  if (!user) return res.status(400).json({ message:'Usuario no encontrado' });

    if (!user.active) return res.status(400).json({ message:'Usuario inactivo' });

    // compara la password
    const validPassword = await bcrypt.compare(password, user.password);

    // si coinciden
    if (validPassword) {
      // // GENERAR TOKEN

      // datos que almacenara el token
      const id = user._id;
      const name = user.name;
      const type = user.type;
      
      const jwt = sign({ id, name, email, type },'secret_key');

      return res.status(201).json({ user: { id, name, email, type }, token: jwt });

    } else {

      return res.status(400).json({ message:'Password incorrecta' });

    }

  } catch (e) {
    
    return res.status(500).json({ message: e.message });

  }

}

async function logout(req, res) {
  res.cookie('token', '', { 
    expires: new Date(0) // expira en 0 seg
  }); // agregar a la cookie de la respuesta

  return res.status(201).json({ message: 'Logout successfully'});
}

module.exports = {
  register,
  login,
  logout
}