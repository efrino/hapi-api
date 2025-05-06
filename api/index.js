const Hapi = require('@hapi/hapi');
const bcrypt = require('bcrypt');
const supabase = require('../lib/supabase');

const createServer = async () => {
    const server = Hapi.server({
        port: process.env.PORT || 3000,
        host: '0.0.0.0',
        debug: false,
    });

    server.route({
        method: 'POST',
        path: '/api/register',
        handler: async (request, h) => {
            try {
                const { email, password } = request.payload;
                const hashedPassword = await bcrypt.hash(password, 10);

                const { data, error } = await supabase
                    .from('users')
                    .insert([{ email, password: hashedPassword }])
                    .select(); // penting!

                if (error) {
                    return h.response({ error: error.message }).code(400);
                }

                return {
                    message: 'User registered successfully',
                    userId: data[0]?.id,
                    email: data[0]?.email,
                };
            } catch (err) {
                return h.response({ error: 'Internal server error' }).code(500);
            }
        },
    });

    server.route({
        method: 'POST',
        path: '/api/login',
        handler: async (request, h) => {
            const { email, password } = request.payload;
            const { data, error } = await supabase
                .from('users')
                .select('*')
                .eq('email', email)
                .single();

            if (error || !data) return h.response({ error: 'Invalid credentials' }).code(401);
            const match = await bcrypt.compare(password, data.password);
            if (!match) return h.response({ error: 'Invalid credentials' }).code(401);
            return { message: 'Login successful', user: { id: data.id, email: data.email } };
        },
    });

    await server.initialize();
    return server;
};

// Export handler untuk Vercel (req, res)
module.exports = async (req, res) => {
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
