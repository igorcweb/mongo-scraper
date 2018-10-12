const express = require('express');
const router = express.Router();
const db = require('../models');

//Saved Articles
router.post('/:id', (req, res) => {
  const _id = req.params.id;
  db.Article.findByIdAndUpdate({ _id }, { $set: { saved: true } })
    .then(() => res.send('saved'))
    .catch(err => console.log(err));
});

//Removing from saved
router.post('/remove/:id', (req, res) => {
  const _id = req.params.id;
  db.Article.findByIdAndUpdate({ _id }, { $set: { saved: false } })
    .then(() => res.send('removed'))
    .catch(err => console.log(err));
});

//Displaying saved articles, populating notes
router.get('/', (req, res) => {
  db.Article.find({ saved: true })
    .populate('notes')
    .exec((err, articles) => {
      if (err) {
        throw err;
      }
      res.render('saved', { saved: true, articles });
    });
});

//Displaying notes for each article
router.get('/notes/:id', (req, res) => {
  const _id = req.params.id;
  db.Article.findOne({ _id })
    .populate('notes')
    .then(article => res.json(article))
    .catch(err => res.json(err));
});

//Adding notes to saved articles
router.post('/note/:id', (req, res) => {
  const note = {};
  note.body = req.body.note;
  const _id = req.params.id;
  db.Note.create(note)
    .then(dbNote => {
      db.Article.findOneAndUpdate({ _id }, { $push: { notes: dbNote._id } })
        .populate('notes')
        .then(article => {
          res.send('saved');
        })
        .catch(err => console.log(err));
    })

    .catch(err => res.json({ createError: err }));
});

//Removing notes
router.get('/note/remove/:id', (req, res) => {
  const id = req.params.id;
  db.Note.findOneAndDelete({ _id: id }).then(() => res.send('removed'));
});

module.exports = router;
