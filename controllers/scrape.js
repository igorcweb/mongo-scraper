const express = require('express');
const router = express.Router();
const axios = require('axios');
const cheerio = require('cheerio');
const url = 'https://www.nytimes.com';
const db = require('../models');

router.post('/', (req, res) => {
  axios
    .get(url)
    .then(response => {
      const $ = cheerio.load(response.data);
      $('article').each(function(index, element) {
        const article = {};
        article.title = $(element)
          .find('h2.esl82me2')
          .text();
        article.link =
          url +
          $(this)
            .find('a')
            .attr('href');
        article.description = $(element)
          .find('p.e1n8kpyg0')
          .text();
        const { title, link, description } = article;
        if (title && link && description) {
          //Check if article is already scraped
          db.Article.findOne({ title }).then(data => {
            if (!data) {
              db.Article.create(article)
                .then(dbArticle => {
                  console.log(dbArticle);
                })
                .catch(err => res.json({ createError: err }));
            }
          });
        }
      });
      res.send('scraped');
    })
    .catch(err => console.log({ axiosErr: err }));
});

module.exports = router;
