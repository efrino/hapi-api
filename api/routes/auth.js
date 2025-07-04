const bcrypt = require('bcrypt');
const supabase = require('../../lib/supabase');

const authRoutes = [
  {
    method: 'POST',
    path: '/api/register',
    handler: async (request, h) => {
      try {
        const { name, email, password } = request.payload;

        if (!name || !email || !password) {
          return h.response({ error: 'Name, email, and password are required' }).code(400);
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const { data, error } = await supabase
          .from('users')
          .insert([{ name, email, password: hashedPassword }])
          .select();

        if (error) {
          return h.response({ error: error.message }).code(400);
        }

        return {
          message: 'User registered successfully',
          userId: data[0]?.id,
          name: data[0]?.name,
          email: data[0]?.email,
        };
      } catch (err) {
        return h.response({ error: 'Internal server error' }).code(500);
      }
    },
  },
  {
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

      return {
        message: 'Login successful',
        user: {
          id: data.id,
          name: data.name,
          email: data.email,
        },
      };
    },
  },
];

module.exports = authRoutes;
