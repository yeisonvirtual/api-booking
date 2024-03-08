const User = require('../models/User');

async function getUsers(req, res) {

  // request: http://localhost:8080/api/users?limit=5&page=1&field=id&value=1

  const { limit, page } = req.query;

  //const { field, value } = req.query;

  const options = {
    limit: limit || 10,
    page: page || 1
  };
  
  const users = await User.paginate({}, options);

  return res.status(200).json({ users });

}

async function getUser(req, res) {

  const { id } = req.params;

  try {

    const user = await User.findOne({ _id: id });
    
    if (!user) return res.status(400).json({ message:'No se encontró el usuario' });

    return res.status(200).send({ user });
    
  } catch (e) {
    // 500 - Internal Server Error
    return res.status(500).send({ message: e.message });
  }

}

async function deleteUser (req, res) {

  const { id } = req.params;

  try {

    const user = await User.findOneAndDelete({ _id: id });
    
    if (!user) return res.status(400).json({ message:'No se encontró el usuario' });

    return res.status(200).send({ user });
    
  } catch (e) {
    // 500 - Internal Server Error
    return res.status(500).send({ message: e.message });
  }
}

async function updateUser (req, res) {
  try {

    const { id } = req.params;
    
    const {
      name,
      email,
      type,
      active
    } = req.body;

    // convertir string a booleano
    // let activeBool = false;
    // if (active==='true') activeBool = true;
    activeBool = true;

    const user = await User.findOne({ _id: id });
    
    if (!user) return res.status(400).json({ message:'No se encontró el usuario' });

    // si se modifico el email
    if (user.email!==email) {
      
      const emailExist = await User.findOne({ email });
      
      if (emailExist) return res.status(400).json({ message:'El email ya existe' });

      const userUpdated = await User.findOneAndUpdate({ _id: user._id },{
        name,
        email,
        type,
        active
      },
      {
        new: true
      });

      return res.status(200).json({ userUpdated });

    }

    const userUpdated = await User.findOneAndUpdate({ _id: id },{
      name,
      type,
      active
    },
    {
      new: true
    });

    return res.status(200).json({ userUpdated });

  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
}

module.exports = {
  getUsers,
  getUser,
  deleteUser,
  updateUser
}