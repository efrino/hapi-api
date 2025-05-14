const supabase = require('../../lib/supabase');
const bcrypt = require('bcrypt');

const profileRoutes = [
  {
    method: 'GET',
    path: '/api/users/{id}',
    handler: async (request, h) => {
      const { id } = request.params;

      const { data, error } = await supabase
        .from('users')
        .select('id, name, email') // tampilkan name juga
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
      const { name, email, password } = request.payload;

      const updateData = {};
      if (name) updateData.name = name;
      if (email) updateData.email = email;
      if (password) {
        updateData.password = await bcrypt.hash(password, 10);
      }

      const { data, error } = await supabase
        .from('users')
        .update(updateData)
        .eq('id', id)
        .select('id, name, email');

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
