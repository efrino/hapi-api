const fs = require('fs');
const path = require('path');

const routesDir = __dirname;

// Baca semua file .js kecuali index.js
const routeFiles = fs.readdirSync(routesDir)
  .filter(file => file !== 'index.js' && file.endsWith('.js'));

// Gabungkan semua route dari tiap file
const allRoutes = routeFiles.flatMap(file => {
  const route = require(path.join(routesDir, file));
  return Array.isArray(route) ? route : [route]; // handle single/multiple routes
});

module.exports = allRoutes;
