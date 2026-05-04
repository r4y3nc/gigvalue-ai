const supabase = require('../services/supabaseClient');

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      success: false,
      message: 'Unauthorized. Token is missing.',
    });
  }

  const token = authHeader.split(' ')[1];

  const { data, error } = await supabase.auth.getUser(token);

  if (error || !data.user) {
    return res.status(401).json({
      success: false,
      message: 'Unauthorized. Invalid or expired token.',
    });
  }

  req.user = data.user;
  next();
};

module.exports = authMiddleware;