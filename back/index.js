const express = require('express');
const config = require('./helpers/config');
const jwt = require('express-jwt');
const app = express();
let passport = require('passport');
let userQueries = require('./helpers/queries').user;

app.use('/views', express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(jwt({
  secret: config.secret
}).unless({
    path: ['/user/registrar', '/user/iniciar','/']
}));;
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(function (user, done) {
    done(null, user);
});
passport.deserializeUser(function (user, done) {
    done(null, user);
});
app.use('/', require('./controllers'));

app.get('/', function (req, res) {
  res.redirect('views/index.html');
});
app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401).send({
      message: 'invalid token...',
      status:401
    });
  }
});
app.listen(config.port, function () {
  console.log('Example app listening on port 3000!');
});

