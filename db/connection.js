const mongoose = require("mongoose");
const config = require('../config')
 

let connection=mongoose.connect(config.connectionString, {useNewUrlParser: true,useUnifiedTopology: true });
mongoose.connection.on('connected',() => console.log("connected to mongoDb.."))
mongoose.connection.on('error',(err) => console.log(err))


module.exports= connection;