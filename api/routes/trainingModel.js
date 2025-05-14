const supabase = require('../../lib/supabase');

const trainingModelRoutes = [
  {
    method: 'POST',
    path: '/api/training-model',
    handler: async (request, h) => {
      const { model_version, accuracy, description } = request.payload;

      const { data, error } = await supabase
        .from('training_models')
        .insert([{ model_version, accuracy, description }])
        .select();

      if (error) return h.response({ error: error.message }).code(400);

      return {
        message: 'Training model inserted',
        model: data[0],
      };
    },
  },
  {
    method: 'PUT',
    path: '/api/training-model/{model_version}',
    handler: async (request, h) => {
      const { model_version } = request.params;
      const { accuracy, description } = request.payload;

      const { data, error } = await supabase
        .from('training_models')
        .update({ accuracy, description, updated_at: new Date().toISOString() })
        .eq('model_version', model_version)
        .select();

      if (error) return h.response({ error: error.message }).code(400);

      return {
        message: 'Training model updated',
        model: data[0],
      };
    },
  },
  {
    method: 'GET',
    path: '/api/training-models',
    handler: async (request, h) => {
      const { data, error } = await supabase
        .from('training_models')
        .select('*')
        .order('updated_at', { ascending: false });

      if (error) return h.response({ error: error.message }).code(400);

      return { models: data };
    },
  },
];

module.exports = trainingModelRoutes;
