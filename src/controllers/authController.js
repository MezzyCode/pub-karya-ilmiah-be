const { pool } = require('../config/dbConfig');
const bcrypt = require('bcrypt');
const authMiddleware = require('../middleware/auth');

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required.' });
  }

  try {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Email is not registered.' });
    }

    const user = result.rows[0];
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid Password.' });
    }

    authMiddleware.createToken(res, user);

  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

const logout = async (req, res) => {
  res.clearCookie('access_token');
  res.status(204).end();
}

module.exports = {
  login,
  logout
};
