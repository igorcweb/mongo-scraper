const express = require('express');
const router = express.Router();
const db = require('../models');

router.post('/:id', (req, res) => {
  const _id = req.params.id;
  db.Article.findByIdAndUpdate({ _id }, { $set: { saved: true } })
    .then(() => res.send('saved'))
    .catch(err => console.log(err));
});
router.post('/remove/:id', (req, res) => {
  const _id = req.params.id;
  db.Article.findByIdAndUpdate({ _id }, { $set: { saved: false } })
    .then(() => res.send('removed'))
    .catch(err => console.log(err));
});

router.get('/', (req, res) => {
  db.Article.find({ saved: true })
    .populate('notes')
    .exec((err, articles) => {
      articles.forEach(article => {
        console.log(article);
      });
      res.render('saved', { saved: true, articles });
    });
});

router.post('/note/:id', (req, res) => {
  const note = {};
  note.body = req.body.note;
  const _id = req.params.id;
  db.Note.create(note)
    .then(dbNote => {
      db.Article.findOneAndUpdate({ _id }, { $push: { notes: dbNote._id } })
        .populate('notes')
        .then(article => {
          console.log('article:', article);
          console.log('note:', dbNote);
          res.send('note saved');
        })
        .catch(err => console.log(err));
    })

    .catch(err => res.json({ createError: err }));
});

const id = '5bbd884a50415878146d76cc';

db.Article.findById(id).then(result => {
  console.log(result);
});

module.exports = router;
