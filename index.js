const express = require("express");
const fileUpload = require('express-fileupload');
const cors = require("cors");
const mongoose = require("mongoose");
const todoRoute = require("./routes/todos");
const currRoute = require("./routes/curriculum.route")
require("dotenv").config();


const app = express();

app.use(cors());
app.use(express.urlencoded({extended:false}));
app.use(express.json());

app.use(fileUpload({
  useTempFiles : true,
  tempFileDir : './uploads'
}));

app.use("/todos", todoRoute);
app.use("/curriculum", currRoute);



const mongoUri = process.env['MONGODB_URI'];

mongoose
  .connect(mongoUri)
  .then(() => {
    console.log("connected to mongo");
  })
  .catch((error) => {
    console.log({ error });
  });

app.listen(process.env.PORT || 3000);
console.log('server up on port', (process.env.PORT || 3000))
