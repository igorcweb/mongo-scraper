const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const exphbs = require('express-handlebars');
const logger = require('morgan');
const controllers = require('./controllers');
const saved = require('./controllers/saved.js');
const scrape = require('./controllers/api/scrape');
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

const db = process.env.MONGO_URL || 'mongodb://localhost/mongo-scraper';

mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log(err));

app.use(controllers);
app.use('/saved', saved);
app.use('/api/scrape', scrape);

app.listen(PORT, () => console.log('mongo-scraper is listening on PORT', PORT));
