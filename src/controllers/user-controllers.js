const database = require('../config/db-config.js');

const registerUser = async (req, res) => {
    try {
      const { id, username, password } = req.body;
  
      const userCheckById = await database.query(
        'SELECT * FROM users WHERE id = $1',
        [id]
      );
  
      const userCheckByUsername = await database.query(
        'SELECT * FROM users WHERE username = $1',
        [username]
      );
  
      if (userCheckById.rows.length > 0) {
        return res.status(400).json({ error: 'User with this ID already exists' });
      }
  
      if (userCheckByUsername.rows.length > 0) {
        return res.status(400).json({ error: 'User with this username already exists' });
      }
  
      
  
      await database.query(
        'INSERT INTO users (id, username, password) VALUES ($1, $2, $3)',
        [id, username, password]
      );
  
      res.status(200).json({ message: 'User registered successfully' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    const result = await database.query('SELECT * FROM users WHERE username = $1', [username]);
    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    const user = result.rows[0];
    const isValid = password === user.password;
    if (!isValid) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }
    res.json({ message: 'Logged in Successfully!' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
};
