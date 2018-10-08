const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const exphbs = require('express-handlebars');
const logger = require('morgan');
const controllers = require('./controllers');
const saved = require('./controllers/saved.js');
const scrape = require('./controllers/scrape');
const clear = require('./controllers/clear');
const mongoose = require('mongoose');

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

mongoose.Promise = Promise;

const MONGODB_URI =
  process.env.MONGODB_URI || 'mongodb://localhost/mongo-scraper';

mongoose
  .connect(
    MONGODB_URI,
    { useNewUrlParser: true }
  )
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log(err));

app.use(controllers);
app.use('/saved', saved);
app.use('/scrape', scrape);
app.use('/clear', clear);

app.listen(PORT, () => console.log('mongo-scraper is listening on PORT', PORT));
