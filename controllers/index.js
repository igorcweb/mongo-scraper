const express = require('express');
const router = express.Router();
const db = require('../models');

router.get('/', (req, res) => {
  db.Article.find({ saved: false })
    .then(articles => {
      res.render('index', { home: true, articles });
    })
    .catch(err => res.json({ error: err }));
});

module.exports = router;
