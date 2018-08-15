// const axios = require('axios');
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

// Use imported routes // 
app.use(mainRoutes);
app.use('/', twitterRoutes);

// Handle ERRORs
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// ERROR - HACK: // Handle our error routes.
app.use((err, req, res, next) => {
  res.locals.error = err;
  res.status(err.status);
  res.render('error', err);
});

// Initiate server .... 
app.listen(3000, () => {
  console.log('The application is running on localhost:3000!')
});


module.exports = app;
