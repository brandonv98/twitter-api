// const axios = require('axios');
//-----  NOTE: -----// 
//     Install / Load node modules.... // 
const express = require('express');
const Twit = require('twit');

let config = require('./config.js');
// ---------        --------- //
config = config.config;
const app = express();
// Twiter Api keys
const  T = new Twit(
    config
  );

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
// app.use(mainRoutes);
// app.use('/twitter', twitterRoutes);


// // Handle ERRORs
// app.use((req, res, next) => {
//   const err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });

// // ERROR - HACK: // Handle our error routes.
// app.use((err, req, res, next) => {
//   res.locals.error = err;
//   res.status(err.status);
//   res.render('error', err);
// });

 // Twitter \\
app.get('/', (req, res) => {
    // Store reusable data.
    const data = {
    };
  
  ///  Get user's time line, display the 2 most recent tweets.   /// 
      T.get('statuses/user_timeline', { count: 2 }, function(err, data, response) {
        data.timeline = data;
        data.userName = data[0].user.name;
        data.sn = data[0].user.screen_name;
        data.userPhoto = data[0].user.profile_image_url;
       console.log(data.timeline);
       // Render out our passed date to page.
       return res.render('index', {
         userTimeline: data.timeline[0].text, 
         userTimelineNext: data.timeline[1].text, 
         userName: data.userName, 
         userPhoto: data.userPhoto,
         sn: data.sn
        });
    });
  });
  




// Initiate server .... 
app.listen(3000, () => {
console.log('The application is running on localhost:3000!')
});





module.exports = app;
