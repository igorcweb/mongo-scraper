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

router.post('/note/:id', (req, res) => {
  const note = {};
  note.body = req.body.note;
  note.title = req.body.title;
  const id = req.params.id;
  db.Note.create(note)
    .then(dbNote => {
      db.Article.findOneAndUpdate({ _id: id }, { $push: { notes: dbNote._id } })
        .then(() => {
          res.send('note created');
        })
        .catch(err => console.log(err));
    })

    .catch(err => res.json({ createError: err }));
});

const id = '5bbb9cc73b7fde53ba75de6e';

// db.Article.findOneAndUpdate(
//   { _id: '5bbb9cc73b7fde53ba75de6d' },
//   { $push: { notes: id } }
// )
//   .then(result => console.log(result))
//   .catch(err => console.log(err));

module.exports = router;
