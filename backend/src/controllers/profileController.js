const supabase = require('../services/supabaseClient');

const getProfile = async (req, res, next) => {
  try {
    const user_id = req.user.id;

    const { data, error } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('id', user_id)
      .single();

    if (error && error.code !== 'PGRST116') throw new Error(error.message);

    res.json({ success: true, data: data || null });
  } catch (error) {
    next(error);
  }
};

const saveProfile = async (req, res, next) => {
  try {
    const user_id = req.user.id;
    const { job_title, description, skills } = req.body;

    const { data, error } = await supabase
      .from('user_profiles')
      .upsert({
        id: user_id,
        job_title,
        description,
        skills,
        updated_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) throw new Error(error.message);

    res.json({ success: true, data });
  } catch (error) {
    next(error);
  }
};

module.exports = { getProfile, saveProfile };