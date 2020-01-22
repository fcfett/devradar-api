const { Router } = require('express');
const DevController = require('./controllers/DevController');

const routes = Router();

routes.get('/', (req, res) => res.json({ message: 'Olá, Marilene! 👨‍🦰' }));

routes.get('/devs', DevController.index);
routes.post('/devs', DevController.store);

module.exports = routes;
