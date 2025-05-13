const supabase = require('../../lib/supabase');

const profileRoutes = [
  {
    method: 'GET',
    path: '/api/users/{id}',
    handler: async (request, h) => {
      const { id } = request.params;

      const { data, error } = await supabase
        .from('users')
        .select('id, email') // hindari menampilkan password!
        .eq('id', id)
        .single();

      if (error || !data) {
        return h.response({ error: 'User not found' }).code(404);
      }

      return { user: data };
    },
  },
  {
    method: 'PUT',
    path: '/api/users/{id}',
    handler: async (request, h) => {
      const { id } = request.params;
      const { email, password } = request.payload;

      const updateData = {};
      if (email) updateData.email = email;
      if (password) {
        const bcrypt = require('bcrypt');
        updateData.password = await bcrypt.hash(password, 10);
      }

      const { data, error } = await supabase
        .from('users')
        .update(updateData)
        .eq('id', id)
        .select('id, email');

      if (error) {
        return h.response({ error: error.message }).code(400);
      }

      return {
        message: 'User updated successfully',
        user: data[0],
      };
    },
  },
];

module.exports = profileRoutes;
