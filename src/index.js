const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');

mongoose.connect(
  'mongodb+srv://devradar:devradar2020@devradar-zkivd.mongodb.net/devradar?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  }
);

const app = express();
app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(3333);
