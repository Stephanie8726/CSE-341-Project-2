const express = require('express');
const bodyParser = require('body-parser')
const mongodb = require('./data/database');
const app = express();
const createError = require('http-errors'); // handling errors
const passport = require('passport');
const session = require('express-session');
const GitHubStrategy = require('passport-github2').Strategy
const cors = require('cors');

const port = process.env.PORT || 3000

app
  .use(bodyParser.json())
  .use(session({
    secret: "Secret",
    resave: false,
    saveUninitialized: true,
  }))

  // This is the basic express-session initialization
  .use(passport.initialize()) // Init passport on every route call
  .use(passport.session())    // Allow passport to use "express-session"
  .use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Z-Key, Authorization'
    );
    res.setHeader(
      'Access-Control-Allow-Methods', 
      'POST, GET, PUT, PATCH, OPTIONS, DELETE'
    );
    next();
  })
  .use(cors({methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH']}))
  .use(cors({ origin: '*' })) 
  // .use("/", require("./routes/index.js"));

  passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL
  },

  function(accessToken, refreshToken, profile, done) {
    // User.findOrCreate({ githubId: profile.id }, function (err, user) {
    //   return done(err, user);
    // });

    // For now, just return the GitHub profile
    return done(null, profile);
  }
));

passport.serializeUser((user, done) => {
    done(null, user);
});
passport.deserializeUser((user, done) => {
    done(null, user);
});


app.get('/', (req, res) => { res.send(req.session.user !== undefined ? `Logged in as ${req.session.user.displayName}` : "Logged Out")});

// app.get('/github/callback', passport.authenticate('github', {
//     failureRedirect: '/api-docs', session:false}),
//     (req, res) => {
//         req.session.user = req.user;
//         res.redirect('/');
//     })  

//routes.
// app.use('/', require('./routes'));
  app.use("/", require("./routes/index.js"));


// 500 handler - must come after all routes
app.use((req, res, next) => {
    next(createError(404, 'Not found'));
});

// general error handler
app.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        error: {
            status: err.status || 500,
            message: err.message || 'Internal Server Error'
        }
    });
});


mongodb.initDb((err) => {
    if(err) {
        console.log(err);
    }
    else{
        app.listen(port, () => {console.log(`Database is listening and node running on port ${port}`)});
    }
});