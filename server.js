const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const authRouter = require('./routes/auth');
const userRouter = require('./routes/user');
const roomRouter = require('./routes/room');

const PORT = process.env.PORT || 8080;

// connect db
require('./db/mongodb');

// para permitir solicitudes desde otro dominio
app.use(cors({
  origin: 'http://localhost:3000', // dominio app frontend
  credentials: true // permite enviar cookies
}));

// for parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// for parsing application/json
app.use(bodyParser.json());
// for parsing multipart/form-data
//app.use(upload.array());
// for parsing cookies
app.use(cookieParser());
// para acceder a las imagenes
app.use('/public', express.static(`${__dirname}/uploads`));


app.get("/api/home",(req,res)=>{
  res.json({ message: "Hello World!", people: ["Yeison","Yeferson","Rostyn"] });
});

app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/rooms", roomRouter);

app.listen(PORT,()=>{
  console.log(`Server started on port ${PORT}`);
});