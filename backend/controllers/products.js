import db from '../db.js';

export function get_products(req, res) {
  db.query('SELECT * FROM products', (err, data) => {
    if (err) return res.status(500).json(err);
    res.json(data);
  });
}

export function get_product(req, res) {
  db.query('SELECT * FROM products WHERE product_id = ?', [req.params.id], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0) return res.status(404).json({ error: 'Product not found' });
    res.json(data[0]);
  });
}

export function create_product(req, res) {
  const { product_name, product_ingredients } = req.body;
  const q = 'INSERT INTO products (product_name, product_ingredients) VALUES (?, ?)';
  db.query(q, [product_name, product_ingredients], (err, result) => {
    if (err) return res.status(500).json(err);
    res.status(201).json({ product_id: result.insertId });
  });
}

export function update_product(req, res) {
  const { product_name, product_ingredients } = req.body;
  const q = 'UPDATE products SET product_name=?, product_ingredients=? WHERE product_id=?';
  db.query(q, [product_name, product_ingredients, req.params.id], (err) => {
    if (err) return res.status(500).json(err);
    res.sendStatus(204);
  });
}

export function delete_product(req, res) {
  db.query('DELETE FROM products WHERE product_id = ?', [req.params.id], (err) => {
    if (err) return res.status(500).json(err);
    res.sendStatus(204);
  });
}
