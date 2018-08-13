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
  

  
module.exports = router;