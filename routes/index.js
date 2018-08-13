const express = require('express');
const router = express.Router();
// Install Twit // 
// const Twit = require('twit');
// Twiter Api keys
// const  T = new Twit(
    // config
//   );

// GET pages content
router.get('/name', (req, res) => {
    const name = 'Brandon';
    // if (!name) {
    //   res.redirect('/hello' );
    // } else {
      res.render('index', { name });// // NOTE: read cookie set from post.
    // }
  });
  

  // Twitter \\
// app.get('/', (req, res) => {
//     // Store reusable data.
//     const data = {
//     };
  
//   ///  Get user's time line, display the 2 most recent tweets.   /// 
//       T.get('statuses/user_timeline', { count: 2 }, function(err, data, response) {
//         data.timeline = data;
//         data.userName = data[0].user.name;
//         data.sn = data[0].user.screen_name;
//         data.userPhoto = data[0].user.profile_image_url;
//        console.log(data.timeline);
//        // Render out our passed date to page.
//        return res.render('index', {
//          userTimeline: data.timeline[0].text, 
//          userTimelineNext: data.timeline[1].text, 
//          userName: data.userName, 
//          userPhoto: data.userPhoto,
//          sn: data.sn
//         });
//     });
//   });
  
module.exports = router;