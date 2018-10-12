const express = require('express');
const router = express.Router();
const db = require('../models');

router.get('/', (req, res) => {
  db.Article.remove()
    .then(() => console.log('articles removed'))
    .catch(err => res.json({ error: err }));
  db.Note.remove()
    .then(() => res.send('cleared'))
    .catch(err => res.json({ error: err }));
});

module.exports = router;
