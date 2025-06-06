import db from '../db.js';

export function get_traits(req, res) {
  db.query('SELECT * FROM traits', (err, data) => {
    if (err) return res.status(500).json(err);
    res.json(data);
  });
}

export function get_trait(req, res) {
  db.query('SELECT * FROM traits WHERE traits_id = ?', [req.params.id], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0) return res.status(404).json({ error: 'Traits not found' });
    res.json(data[0]);
  });
}

export function create_trait(req, res) {
  const {
    traits_user_id,
    traits_gender,
    traits_skin_color,
    traits_skin_type,
    traits_sensible,
    traits_age,
    traits_acneic,
    traits_hair_color,
    traits_hair_type,
    traits_hair_quality
  } = req.body;

  const q = `
    INSERT INTO traits (
      traits_user_id, traits_gender, traits_skin_color, traits_skin_type,
      traits_sensible, traits_age, traits_acneic, traits_hair_color,
      traits_hair_type, traits_hair_quality
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  db.query(q, [
    traits_user_id, traits_gender, traits_skin_color, traits_skin_type,
    traits_sensible, traits_age, traits_acneic, traits_hair_color,
    traits_hair_type, traits_hair_quality
  ], (err, result) => {
    if (err) return res.status(500).json(err);
    res.status(201).json({ traits_id: result.insertId });
  });
}

export function update_trait(req, res) {
  const {
    traits_gender,
    traits_skin_color,
    traits_skin_type,
    traits_sensible,
    traits_age,
    traits_acneic,
    traits_hair_color,
    traits_hair_type,
    traits_hair_quality
  } = req.body;

  const q = `
    UPDATE traits SET
      traits_gender=?, traits_skin_color=?, traits_skin_type=?, traits_sensible=?,
      traits_age=?, traits_acneic=?, traits_hair_color=?, traits_hair_type=?, traits_hair_quality=?
    WHERE traits_id=?`;

  db.query(q, [
    traits_gender, traits_skin_color, traits_skin_type, traits_sensible,
    traits_age, traits_acneic, traits_hair_color, traits_hair_type,
    traits_hair_quality, req.params.id
  ], (err) => {
    if (err) return res.status(500).json(err);
    res.sendStatus(204);
  });
}

export function delete_trait(req, res) {
  db.query('DELETE FROM traits WHERE traits_id = ?', [req.params.id], (err) => {
    if (err) return res.status(500).json(err);
    res.sendStatus(204);
  });
}
