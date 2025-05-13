// api/routes/index.js

const authRoutes = require('./auth');
const profileRoutes = require('./profile');
// Tambahkan file route lain di sini jika ada

module.exports = [
  ...authRoutes,
  ...profileRoutes,
];
