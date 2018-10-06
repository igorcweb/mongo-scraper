const express = require('express');
const router = express.Router();
const axios = require('axios');
const cheerio = require('cheerio');
const url = 'https://www.nytimes.com';
let counter = 0;
axios
  .get(url)
  .then(response => {
    const $ = cheerio.load(response.data);
    $('article').each(function(index, element) {
      const result = {};
      result.title = $(element)
        .find('h2.esl82me2')
        .text();

      result.link =
        url +
        $(this)
          .find('a')
          .attr('href');
      result.description = $(this)
        .find('p.e1n8kpyg0')
        .text();
      const { title, link, description } = result;
      if (title && link && description) {
        counter++;
        console.log(result);
      }
    });
  })
  .then(() => console.log(counter))
  .catch(err => console.log(err));

router.get('/', (req, res) => res.render('index', { home: true }));

module.exports = router;
