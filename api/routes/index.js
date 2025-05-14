// api/routes/index.js

const authRoutes = require('./auth');
const profileRoutes = require('./profile');
// Tambahkan file route lain di sini jika ada
const childrenRoutes = require('./children');
const predictionRoutes = require('./prediction');
const recommendationRoutes = require('./recommendation');

module.exports = [
  ...authRoutes,
  ...profileRoutes,
  ...childrenRoutes,
  ...predictionRoutes,
  ...recommendationRoutes,
];