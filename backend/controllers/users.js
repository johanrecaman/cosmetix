import db from '../db.js';

export function get_users(req, res) {
  db.query('SELECT * FROM users', (err, data) => {
    if (err) return res.status(500).json(err);
    res.json(data);
  });
}

export function get_user(req, res) {
  db.query('SELECT * FROM users WHERE user_id = ?', [req.params.id], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0) return res.status(404).json({ error: 'User not found' });
    res.json(data[0]);
  });
}

export function create_user(req, res) {
  const { user_name, user_email, user_password } = req.body;
  console.log('Creating user:', { user_name, user_email, user_password });
  const q = 'INSERT INTO users (user_name, user_email, user_password) VALUES (?, ?, ?)';
  db.query(q, [user_name, user_email, user_password], (err, result) => {
    if (err) return res.status(500).json(err);
    res.status(201).json({ user_id: result.insertId });
  });
}

export function update_user(req, res) {
  const { user_name, user_email, user_password } = req.body;
  const q = 'UPDATE users SET user_name=?, user_email=?, user_password=? WHERE user_id=?';
  db.query(q, [user_name, user_email, user_password, req.params.id], (err) => {
    if (err) return res.status(500).json(err);
    res.sendStatus(204);
  });
}

export function delete_user(req, res) {
  db.query('DELETE FROM users WHERE user_id = ?', [req.params.id], (err) => {
    if (err) return res.status(500).json(err);
    res.sendStatus(204);
  });
}

