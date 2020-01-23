const cors = require('cors');
const http = require('http');
const express = require('express');
const mongoose = require('mongoose');

const routes = require('./routes');
const { setupWebsocket } = require('./websocket');

mongoose.connect(
  'mongodb+srv://devradar:devradar2020@devradar-zkivd.mongodb.net/devradar?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  }
);

const app = express();
const server = http.Server(app);
setupWebsocket(server);

app.use(cors());
app.use(express.json());
app.use(routes);

server.listen(3333);
