const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const exphbs = require('express-handlebars');
const logger = require('morgan');
const controllers = require('./controllers');
const saved = require('./controllers/saved.js');

app.use(express.static('public'));

app.use(logger('dev'));

//Express native body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.engine(
  'handlebars',
  exphbs({
    defaultLayout: 'main'
  })
);

app.set('view engine', 'handlebars');

app.use(controllers);
app.use('/saved', saved);

app.listen(PORT, () => console.log('mongo-scraper is listening on PORT', PORT));
