const path = require('path');
const express = require('express');
const session = require('express-session');
const eventsRouter = require('./routes/events.js')
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

app.set('view engine', 'ejs')

app.use('/events', eventsRouter)

app.get('/', (req,res) => {
    const events =[{
        title: 'test event',
        eventDate: new Date ('<03-23-2023>'),
        eventTime:  'test 3:45',
        location: 'test location',
        description: 'test description'
    }]
    res.render('main.ejs', {events: events})
})
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(require('./controllers/'));

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});