const express = require('express');
const router = express.Router();

router.get('/', (req, res) => res.render('saved', { saved: true }));

module.exports = router;
