const socketio = require('socket.io');
const commaSeparatedStringToArray = require('./utils/commaSeparatedStringToArray');
const calculateDistance = require('./utils/calculateDistance');

let io;
const connections = [];

const setupWebsocket = (server) => {
  io = socketio(server);
  io.on('connection', (socket) => {
    const { latitude, longitude, techs } = socket.handshake.query;
    connections.push({
      id: socket.id,
      coordinates: {
        latitude: +latitude,
        longitude: +longitude
      },
      techs: commaSeparatedStringToArray(techs)
    });
  });
};

const maxDistance = 10;
const findConnections = (coordinates, techs) =>
  connections.filter(
    (connection) =>
      calculateDistance(coordinates, connection.coordinates) < maxDistance &&
      connection.techs.some((item) => techs.includes(item))
  );

const sendMessage = (to, message, data) => {
  to.forEach((connection) => {
    io.to(connection.id).emit(message, data);
  });
};

module.exports = {
  setupWebsocket,
  findConnections,
  sendMessage
};
