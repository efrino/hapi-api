// api/routes/index.js

const authRoutes = require('./auth');
const profileRoutes = require('./profile');
const childrenRoutes = require('./children');
const predictionRoutes = require('./prediction');
const recommendationRoutes = require('./recommendation');
const trainingModelRoutes = require('./trainingModel');

module.exports = [
  ...authRoutes,
  ...profileRoutes,
  ...childrenRoutes,
  ...predictionRoutes,
  ...recommendationRoutes,
  ...trainingModelRoutes,
];