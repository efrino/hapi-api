const Hapi = require('@hapi/hapi');

const init = async () => {
  const server = Hapi.server({
    port: process.env.PORT || 3000,
    host: '0.0.0.0',
  });

  server.route({
    method: 'GET',
    path: '/api/hello',
    handler: (request, h) => {
      return { message: 'Hello from Hapi on Vercel!' };
    },
  });

  await server.initialize(); // gunakan initialize, bukan start
  return server.listener;
};

// export handler untuk Vercel
module.exports = init();
