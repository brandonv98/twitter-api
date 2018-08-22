// TODO:  1. Add posting functionality, Create readme.md file, commit changes.
//-----  NOTE: -----// 
//     Install / Load node modules.... // 
const express = require('express');

// ---------        --------- //
const app = express();


// Install temlating // 
app.set('view engine', 'pug');
// Install styles  // 
app.use(express.static(
  'public'
));

// Import routes \\
const mainRoutes = require('./routes');
const twitterRoutes = require('./routes/twitter');
const sandbox = require('./routes/sandbox');

// Use imported routes // 
// app.use(mainRoutes);
app.use('/', twitterRoutes);
// app.use('/sandbox', sandbox);



// Handle ERRORs
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.code = 404;
  next(err);
});

// ERROR - HACK: // Handle our error routes.
app.use((err, req, res, next) => {
  res.locals.error = err;
  res.status(err.code);
  console.log(err, 'Break',  err.code);
  res.render('error', {err});
});

// Initiate server .... 
app.listen(3000, () => {
  console.log('The application is running on localhost:3000!')
});


module.exports = app;
