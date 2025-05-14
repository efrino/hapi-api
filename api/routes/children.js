const supabase = require('../../lib/supabase');

const childrenRoutes = [
    {
        method: 'POST',
        path: '/api/children',
        handler: async (request, h) => {
            const { user_id, name, birth_date, gender } = request.payload;

            const { data, error } = await supabase
                .from('children')
                .insert([{ user_id, name, birth_date, gender }])
                .select();

            if (error) return h.response({ error: error.message }).code(400);

            return { message: 'Child added successfully', child: data[0] };
        },
    },
    {
        method: 'GET',
        path: '/api/children/{user_id}',
        handler: async (request, h) => {
            const { user_id } = request.params;

            const { data, error } = await supabase
                .from('children')
                .select('*')
                .eq('user_id', user_id);

            if (error) return h.response({ error: error.message }).code(400);

            return { children: data };
        },
    },
];

module.exports = childrenRoutes;
