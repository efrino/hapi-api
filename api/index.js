const Hapi = require('@hapi/hapi');
const allRoutes = require('./routes');

const createServer = async () => {
  const server = Hapi.server({
    port: process.env.PORT || 3000,
    host: '0.0.0.0',
  });

  server.route(allRoutes);
  await server.initialize();
  return server;
};

module.exports = async (req, res) => {
  // Langsung render HTML info jika diakses lewat /api atau /api/
  if (req.url === '/' || req.url === '/api' || req.url === '/api/') {
    const server = await createServer();
    const routes = server.table();

    const routeList = routes
      .filter((r) => r.path !== '/') // optional, skip root
      .map((r) => `<li><code>${r.method.toUpperCase()}</code> <code>${r.path}</code></li>`)
      .join('');

    const html = `
      <html>
        <head>
          <title>API Routes</title>
          <style>
            body { font-family: sans-serif; padding: 20px; background: #f9f9f9; }
            h1 { color: #333; }
            code { background: #eee; padding: 2px 4px; }
            pre { background: #eee; padding: 10px; overflow: auto; }
            ul { line-height: 1.6; }
          </style>
        </head>
        <body>
          <h1>API Endpoint</h1>
          <p>Daftar endpoint yang tersedia:</p>
          <ul>${routeList}</ul>
          <p>Update otomatis dari semua file di <code>/routes</code>.</p>
        </body>
      </html>
    `;

    res.setHeader('Content-Type', 'text/html');
    res.end(html);
    return;
  }

  // Proses route API lainnya via Hapi
  const server = await createServer();
  const { method, url, headers } = req;

  let payload = '';
  req.on('data', (chunk) => {
    payload += chunk;
  });

  req.on('end', async () => {
    const response = await server.inject({
      method,
      url,
      headers,
      payload,
    });

    res.statusCode = response.statusCode;
    for (const [key, value] of Object.entries(response.headers)) {
      res.setHeader(key, value);
    }
    res.end(response.payload);
  });
};
