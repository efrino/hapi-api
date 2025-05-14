const supabase = require('../../lib/supabase');

const predictionRoutes = [
    {
        method: 'POST',
        path: '/api/predict',
        handler: async (request, h) => {
            const { child_id, age_months, weight_kg, height_cm, predicted_risk, model_version } = request.payload;

            const { data, error } = await supabase
                .from('predictions')
                .insert([{ child_id, age_months, weight_kg, height_cm, predicted_risk, model_version }])
                .select();

            if (error) return h.response({ error: error.message }).code(400);

            return { message: 'Prediction saved', prediction: data[0] };
        },
    },
    {
        method: 'GET',
        path: '/api/predictions/{child_id}',
        handler: async (request, h) => {
            const { child_id } = request.params;

            const { data, error } = await supabase
                .from('predictions')
                .select('*')
                .eq('child_id', child_id)
                .order('created_at', { ascending: false });

            if (error) return h.response({ error: error.message }).code(400);

            return { predictions: data };
        },
    },
];

module.exports = predictionRoutes;
