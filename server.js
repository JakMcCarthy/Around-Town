const path = require('path');
const express = require('express');
const session = require('express-session');
const ejs =  require('ejs');

const app = express();
const PORT = process.env.PORT || 3005;

const sequelize = require("./config/connection");
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sess = {
  secret: 'Super secret secret',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.set('view engine', 'ejs');

app.use(session(sess));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'CSS')));

app.use(require('./controllers/'));

sequelize.sync({ force: true }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});