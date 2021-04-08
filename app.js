var express = require('express');
var session = require('express-session');

const app = express();

var routes = require('./routes');
var auth = require('./routes/auth');
var flowers = require('./routes/flowers');

var bodyParser=require("body-parser");

var mysql = require('mysql');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'USERNAME',
  password : 'PASSWORD',
  database : 'BDD'
});

connection.connect();

global.database = connection;

app.use(express.static(__dirname + '/public'));

app.set('views', 'views/'),
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.urlencoded({ extended: false }))
app.use(session({
  secret: 'dm-pw6',
  resave: false,
  saveUninitialized: false
}))

app.get('/', routes.index);
app.get('/connect', routes.connect);
app.get('/login', auth.login);
app.post('/login', auth.login);
app.get('/logout', auth.logout);
app.get('/profile', auth.profile);
app.get('/premade', flowers.premade);
app.post('/premade', flowers.premade);
app.post('/premade-addtocart', flowers.addpremade);
app.post('/flower-addtocart', flowers.addflower);
app.post('/cart-to-command', flowers.toCommand);
app.get('/custom', flowers.custom);
app.post('/premade-removecart', flowers.removepremade);
app.post('/flower-removecart', flowers.removeflower);
app.post('/statecommand', flowers.commandReady);

app.listen(3000);