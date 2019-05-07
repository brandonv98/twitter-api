const express = require('express');
const bodyParser = require('body-parser');

const router = express.Router();
//  Middlewear  //
router.use(bodyParser.urlencoded({extended: false}));

const Twit = require('twit');

// Config api key file location
let config = require('../config.js');
// ---------        --------- //
config = config.config;

// Twiter Api keys
const  T = new Twit(
    config
  );
   // // Get time stampts. // //
const getTime = timeStamp => {
    const mS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
    const dateNow = new Date();
    const dateCreated = new Date(timeStamp);
    if (typeof timeStamp === "string") {
        if (dateNow.getUTCMonth()+1 > dateCreated.getUTCMonth()) {
            if (dateNow.getUTCMonth()+1 === dateCreated.getUTCMonth()+1) {
                if (dateNow.getUTCDate() <= dateCreated.getUTCDate() +1) {
                    return dateNow.getUTCHours() - dateCreated.getUTCHours() + 'h'

                } else {
                    return mS[dateCreated.getUTCMonth()] + ' ' + dateCreated.getUTCDate();

                }
            } else {
            return mS[dateCreated.getUTCMonth()] + ' ' + dateCreated.getUTCDate();
            }
        } 
        else {
            return ' ';
        }
    }
    if (dateNow.getUTCMonth()+1 > dateCreated.getUTCMonth()) {
        if (dateNow.getUTCMonth()+1 === dateCreated.getUTCMonth()+1) {
            if (dateNow.getUTCDate() <= dateCreated.getUTCDate() +1) {
                return dateCreated.getUTCHours() + 'h'

            } else {
                return mS[dateCreated.getUTCMonth()] + ' ' + dateCreated.getUTCDate();

            }
        } else {
        return mS[dateCreated.getUTCMonth()] + ' ' + dateCreated.getUTCDate();

        }
    } 
    else {
        return ' ';
    }
};

  // Twitter \\  
router.use((req, res, next) => {
    let arrOuter;

//   /  Get my time line, display the 5 most recent tweets.   ///   
      T.get('statuses/user_timeline', { count: 5 }, function(err, data, response) {
        req.timeline = data;
        req.userName = data[0].user.name;
        req.sn = data[0].user.screen_name;
        req.userPhoto = data[0].user.profile_image_url;
        req.message = data.timeline;
        req.id = data[0].user.id;
        req.createdAt = [];
        req.tweetInfo = {
            fav: [],
            retweet: []
        };
        req.userBackground = data[0].user.profile_background_image_url_https;

        for (let i = 0; i < data.length; i++) {
            const time = data[i].created_at;
            req.createdAt.push(getTime(time));
            req.tweetInfo.fav.push(data[i].favorite_count);
            req.tweetInfo.retweet.push(data[i].retweet_count)// {}
        }
        next();
    });
  }, (req, res, next) => {
    T.get('followers/list', { screen_name: `${req.sn}` },  function (err, data, response) {
        let username = data.users;
        const friendData = {};
        let names = [];
        let isFollowing = [];
        req.friendSN = [];
        req.friendPhoto = [];

        if (err) {
            console.log(err, 'Something went wrong..');
            res.render('error', {err } );
          } else {
            for (let i = 0; i < username.length; i++) {
                let name = username[i];
                names.push(name.name);
                isFollowing.push(name.following);
                req.friendSN.push(name.screen_name); 
                req.friendPhoto.push(name.profile_image_url_https); 
            }
            req.following = names;
            req.isFollowing = isFollowing;
            next(); 
          }
    });
  }, (req, res, next) => {
      
//  Get Messages //
  T.get('direct_messages/events/list', {  }, function (err, data, response) {
    if (err) {
        console.log(err);
        
    } else {
            const msgs = data.events;
            req.DM = [];
            req.DMTimeCreated = [];
            req.recipient_id_Msg = [];
            req.yourMsg = [];
            req.recipient_message_data = [];
            req.id_to_find = [];
            req.sender = [];
            req.DMrecipient = [];

            if (data.events[0].message_create.target.recipient_id === req.id.toString()) {
                console.log(data.events[0].message_create.sender_id);
                req.id_to_find.push(data.events[0].message_create.sender_id);
                

            } else if (data.events[0].message_create.target.sender_id === req.id.toString()) {
                req.id_to_find = data.events[0].message_create.target.recipient_id;

            }

            for (let i = 0; i < msgs.length; i++) {
                const msg = msgs[i];

                if (req.id_to_find[0] === msg.message_create.sender_id) {

                    req.DM.push(msg.message_create.message_data.text);

                    const time = new Date(parseInt(msg.created_timestamp));
                    req.DMTimeCreated.push(getTime(time));
                    req.recipient_id_Msg.push(msg.message_create.target.recipient_id);

                    (msg.message_create.target.recipient_id === req.id.toString()) ? req.yourMsg.push(true) : req.yourMsg.push(false);
    
                }  else if (req.id_to_find[0] === msg.message_create.target.recipient_id) {
                    
                    req.DM.push(msg.message_create.message_data.text);

                    const time = new Date(parseInt(msg.created_timestamp));
                    req.DMTimeCreated.push(getTime(time));
                    req.recipient_id_Msg.push(msg.message_create.target.recipient_id);

                    (msg.message_create.target.recipient_id === req.id.toString()) ? req.yourMsg.push(true) : req.yourMsg.push(false);
                    
                }
///////////////
            }
        req.profileRecipientImage = [];
           T.get('users/lookup', { user_id: req.id_to_find }, function (err, d, response) {
            //    console.log(d[0]);
            req.profileRecipientImage = d[0].profile_image_url_https;
            req.recipientName = d[0].name;
            next();
        });
    } // End else
     });
  });


    router.get('/', (req, res, next) => {
        //  Render out our passed date to page.
        res.render('index', {
            timelineContent: req.timeline.map(item => {
                return item.text;
            }),
            createdAt: req.createdAt,
            DMTimeCreated: req.DMTimeCreated,
            userName: req.userName, 
            userPhoto: req.userPhoto,
            sn: req.sn,
            friendName: req.following,
            friend: {
                name: req.following, 
                isFollowing: req.isFollowing.map(item => {
                    return item;
                }),
            },
            friendPhoto: req.friendPhoto,
            friendSN: req.friendSN,
            isFollowing: req.isFollowing,
            DM: req.DM,
            profileRecipientImage: req.profileRecipientImage,
            recipientName: req.recipientName,
            tweetInfo: req.tweetInfo,
            recipientId: req.recipientId,
            isYourMsg: req.yourMsg,
            myId: req.id,
            userBackground: req.userBackground
        });
    });

router.post('/post', (req, res) => {
    if (req.body.tweet === undefined) {
        return req.body.tweet = 'Just playing in the tub!'
    }
        T.post('statuses/update', { status: req.body.tweet }, function(err, data, response) {
           if (err) {
                console.error(err);
           } else {
                res.redirect('/');
           }
        });
    });
// ========================================================================
module.exports = router;