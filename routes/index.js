const express = require('express');
const router = express.Router();
// Install Twit // 
const Twit = require('twit');
// Twiter Api keys
let config = require('../config.js');
config = config.config;
const  T = new Twit(
    config
  );

// GET pages content
router.get('/c', (req, res) => {
  let arrOuter;
   //   //  get the list of user id's that follow @brandonvancamp
T.get('followers/list', { screen_name: 'brandonvancamp' },  function (err, data, response) {
  let userList = data.users;
  const arr = [];
  for (let i = 0; i < userList.length; i++) {
      let name = userList[i].name;
      arr.push(name);
  }
  arrOuter = arr;
  console.log(arrOuter);
  res.render('following', { friendName: arrOuter});// // NOTE: read cookie set from post.
});
     
  // }
});

  
module.exports = router;