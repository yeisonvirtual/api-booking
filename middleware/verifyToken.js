const { verify } = require('jsonwebtoken');

// middleware to validate token (rutas protegidas)
const verifyToken = async (req, res, next) => {

  // con cookies
  //const { token } = await req.cookies;

  const { token } = req.headers;

  console.log("Token headers: ",token);

  if (!token) return res.status(401).json({ error: "Acceso denegado: no hay token" });
  
  try {
    
    const user = verify(token, process.env.SECRET);
    console.log("user verify: ",user);

    // almacena la informacion del user y el token en la req
    req.user = user;
    req.token = token;

    next(); // permite el acceso a la ruta protegida

  } catch (error) {

    res.status(500).send({ error: "Token no es válido" });
    
  }
  
};

module.exports = verifyToken;