const express = require('express');
const router = express.Router();
const db = require('../models');

router.post('/:id', (req, res) => {
  const id = req.params.id;
  db.Article.findByIdAndUpdate({ _id: id }, { $set: { saved: true } })
    .then(() => res.send('saved'))
    .catch(err => console.log(err));
});
router.post('/remove/:id', (req, res) => {
  const id = req.params.id;
  db.Article.findByIdAndUpdate({ _id: id }, { $set: { saved: false } })
    .then(() => res.send('removed'))
    .catch(err => console.log(err));
});

router.get('/', (req, res) => {
  db.Article.find({ saved: true })
    .then(articles => {
      console.log(articles);
      res.render('saved', { saved: true, articles });
    })
    .catch(err => res.json({ error: err }));
});

module.exports = router;
