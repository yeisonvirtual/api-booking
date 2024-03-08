const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const userRouter = require('./routes/user');
const authRouter = require('./routes/auth');

const PORT = process.env.PORT || 8080;

// connect db
require('./db/mongodb');

// para permitir solicitudes desde otro dominio
app.use(cors({
  origin: 'http://localhost:3000', // dominio app frontend
  credentials: true // permite enviar cookies
}));

// para acceder al body de la consulta
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

app.get("/api/home",(req,res)=>{
  res.json({ message: "Hello World!", people: ["Yeison","Yeferson","Rostyn"] });
});

app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);

app.listen(PORT,()=>{
  console.log(`Server started on port ${PORT}`);
});