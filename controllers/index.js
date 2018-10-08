const express = require('express');
const router = express.Router();
const axios = require('axios');
const cheerio = require('cheerio');
const url = 'https://www.nytimes.com';

router.get('/', (req, res) => {
  res.render('index', { home: true });
});

const db = require('../models');

module.exports = router;
