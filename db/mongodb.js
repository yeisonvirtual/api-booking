const mongoose = require('mongoose');

async function connectDB() {

  try {
    await mongoose.connect(`${process.env.DB_URI}/${process.env.DB_NAME}`);
    // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
    console.log('db connected');
  } catch (error) {
    console.log(error);
  }
}

connectDB();