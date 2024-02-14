const { pool } = require('../config/dbConfig');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required.' });
  }

  try {
    // Fetch user from the database
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Email is not registered.' });
    }

    const user = result.rows[0];

    // Compare hashed password
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid Password.' });
    }

    // Create and send JWT token
    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET_KEY, {
      expiresIn: '1h', // Token expiration time
    });

    res.json({ token });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

const logout = async (req, res) => {
  currentToken = currentToken.filter(token => token !== req.body.token);
  res.status(204);
}

module.exports = {
  login,
  logout
};
