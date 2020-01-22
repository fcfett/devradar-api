const axios = require('axios');
const Dev = require('../models/Dev');
const commaSeparatedStringToArray = require('../utils/commaSeparatedStringToArray');
// index, show, store, update, destroy

const _getFilters = ({ latitude, longitude, techs }) => {
  const filters = {};
  if (techs) {
    filters.techs = { $in: commaSeparatedStringToArray(techs) };
  }

  if (latitude && longitude) {
    filters.location = {
      $near: {
        $geometry: {
          type: 'Point',
          coordinates: [+longitude, +latitude]
        },
        $maxDistance: 10000
      }
    };
  }

  return filters;
};

const index = async (req, res) => {
  const filters = _getFilters(req.query);
  const devs = await Dev.find(filters);
  return res.json(devs);
};

const store = async (req, res) => {
  const { github_username, techs, latitude, longitude } = req.body;

  let dev = await Dev.findOne({ github_username });

  if (!dev) {
    try {
      const { data } = await axios.get(`https://api.github.com/users/${github_username}`);
      const { name = login, avatar_url, bio } = data;
      const techsArray = commaSeparatedStringToArray(techs);
      const location = {
        type: 'Point',
        coordinates: [longitude, latitude]
      };

      dev = await Dev.create({
        github_username,
        name,
        avatar_url,
        bio,
        techs: techsArray,
        location
      });
    } catch (error) {
      console.error(error.message);
    }
  }

  return res.json(dev);
};

module.exports = {
  index,
  store
};
