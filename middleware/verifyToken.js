const { verify } = require('jsonwebtoken');

// middleware to validate token (rutas protegidas)
const verifyToken = async (req, res, next) => {

  // con cookies
  const { token } = await req.cookies;

  if (!token) return res.status(401).json({ error: "Acceso denegado: no hay token" });
  
  try {

    // genera clave secreta
    // const encoder = new TextEncoder();
    // const secret = encoder.encode('secret_key');
    
    // // verifica el token
    // const { payload } = await jwtVerify(token, secret);

    const user = verify(token, process.env.SECRET);
    console.log(user);
    
    // se actualiza la fecha de expiracion
    //payload.exp = Date.now() + 300000; // 5 minutos => 5 (min) * 60 (seg) * 1.000 (mili) = 300000

    // almacena la informacion del token en req.user
    req.user = user;

    next(); // permite el acceso a la ruta protegida

  } catch (error) {

    res.status(500).send({ error: "Token no es válido" });
    
  }
  
};

module.exports = verifyToken;