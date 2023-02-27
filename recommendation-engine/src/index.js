const express = require('express');
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const dotenv = require('dotenv');
dotenv.config();

const defaultRoute = require('./routes')();

mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
var db = mongoose.connection;
db.once('open', function () {
  console.log('[]===connected to mongoDB===');
});
db.on('error', console.error.bind(console, '[]===MongoDB connection error==='));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api', defaultRoute);
// app.use('/api', (req, res) =>
//   res.status(200).json({ success: true, message: 'yo yo yo' })
// );
app.use('/', (req, res) => {
  res.status(404).json({status: false, message: 'provided path not found'});
  // res.status(301).redirect('https://youtu.be/dQw4w9WgXcQ')
});

const port = process.env.APP_PORT || 3010;
app.listen(port, () => console.log(`[]===listening on port ${port}!===`));
