const supabase = require('../../lib/supabase');

const recommendationRoutes = [
    {
        method: 'GET',
        path: '/api/recommendations/{risk_level}',
        handler: async (request, h) => {
            const { risk_level } = request.params;

            const { data, error } = await supabase
                .from('recommendations')
                .select('*')
                .eq('risk_level', risk_level);

            if (error) return h.response({ error: error.message }).code(400);

            return { recommendations: data };
        },
    },
];

module.exports = recommendationRoutes;
