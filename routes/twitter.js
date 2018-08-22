const express = require('express');
const bodyParser = require('body-parser');

const router = express.Router();
//  Middlewear  //
router.use(bodyParser.urlencoded({extended: false}));

const Twit = require('twit');

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
    // console.log(timeStamp, dateCreated);
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

        for (let i = 0; i < data.length; i++) {
            const time = data[i].created_at;
            req.createdAt.push(getTime(time));
        }
        // res.render('sandbox', { name: ['Jack', 'Bill']});

        // res.render('index', {
            // friendName: 'arr[1]'
        // });
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

        // console.log(data);
        if (err) {
            console.log(err, 'Something went wrong..');
            res.render('error', {err } );
          } else {
            for (let i = 0; i < username.length; i++) {
                let name = username[i];
                names.push(name.name);
                isFollowing.push(name.following);
                // req.isFollowing = username.following;
                req.friendSN.push(name.screen_name); 
                req.friendPhoto.push(name.profile_image_url_https); 
            }
            req.following = names;
            // req.followers = data;
            req.isFollowing = isFollowing;
            next(); 
          }
    });
  }, (req, res, next) => {
      
//  Get Messages //
  T.get('direct_messages/events/list', {  }, function (err, data, response) {
    // console.log(data, 'outer', data.events[0].message_create);
    if (err) {
        console.log(err);
        
    } else {
        if (data.events.length >= 0) {
            const msgs = data.events;
            req.DM = [];
            req.DMTimeCreated = [];
            for (let i = 0; i < msgs.length; i++) {
                const msg = msgs[i];
                req.DM.push(msg.message_create.message_data.text);
                // console.log(msg);
                const time = new Date(parseInt(msg.created_timestamp));
                req.DMTimeCreated.push(getTime(time));
                    // parseInt(msg.created_timestamp)));
                // req.
                // console.log(msg.created_timestamp);
            }
            
        } 
        // else {
            // req.DM = data.events[0].message_create.message_data.text;
        // }
        req.recipientId = data.events[0].message_create.target.recipient_id;
        // req.DM = data.events[0].message_create.message_data.text;
        T.get('users/lookup', { user_id: req.recipientId }, function (err, d, response) {
            // console.log(d[0], 'inner');
            req.profileRecipientImage = d[0].profile_image_url_https;
            req.recipientName = d[0].name;
            next();
        });
    } // End else
     });
  });


    router.get('/', (req, res, next) => {
        //  Render out our passed date to page.
        // console.log(req.friendPhoto, 'message recived...');
        isYourMsg = (req.recipientId !== req.id) ? true : false;
        
        res.render('index', {
            timelineContent: req.timeline.map(item => {
                return item.text;
            }),
            createdAt: req.createdAt,
            DMTimeCreated: req.DMTimeCreated,
            // req.createdAt.map(item => {
                // return item.
            // }), 
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
            // DMTimeCreated: req.DMTimeCreated,
            recipientId: req.recipientId,
            isYourMsg,
            myId: req.id
        });
    });


router.post('/post', (req, res) => {
        // console.dir(req.body);
        T.post('statuses/update', { status: req.body.tweet }, function(err, data, response) {
           if (err) {
                console.error(err);
           } else {
            // const didPost = true;
                res.redirect('/');
           }
        });
    });





// ========================================================================



  
//   //
//   //  search twitter for all tweets containing the word 'banana' since July 11, 2011
// //   //
//   T.get('statuses/user_timeline', { count: 2 }, function(err, data, response) {
//     console.log(data)
//   });

// //   T.get('statuses/home_timeline', { count: 2 }, function(err, data, response) {
    // console.log(data)
//   });
  
//   //
//   //  get the list of user id's that follow @tolga_tezel
//   //
//   T.get('followers/ids', { screen_name: 'tolga_tezel' },  function (err, data, response) {
//     console.log(data)
//   })
  
//   //
//   // Twit has promise support; you can use the callback API,
//   // promise API, or both at the same time.
//   //
//   T.get('account/verify_credentials', { skip_status: true })
//     .catch(function (err) {
//       console.log('caught error', err.stack)
//     })
//     .then(function (result) {
//       // `result` is an Object with keys "data" and "resp".
//       // `data` and `resp` are the same objects as the ones passed
//       // to the callback.
//       // See https://github.com/ttezel/twit#tgetpath-params-callback
//       // for details.
  
//       console.log('data', result.data);
//     })
  
//   //
//   //  retweet a tweet with id '343360866131001345'
//   //
//   T.post('statuses/retweet/:id', { id: '343360866131001345' }, function (err, data, response) {
//     console.log(data)
//   })
  
//   //
//   //  destroy a tweet with id '343360866131001345'
//   //
//   T.post('statuses/destroy/:id', { id: '343360866131001345' }, function (err, data, response) {
//     console.log(data)
//   })
  
//   //
//   // get DM's
//   //
//   T.get('direct_messages', {  }, function (err, data, response) {
//     console.log(data)
//   })
  
//   //
//   // post a tweet with media
//   //
//   var b64content = fs.readFileSync('/path/to/img', { encoding: 'base64' })
  
//   // first we must post the media to Twitter
//   T.post('media/upload', { media_data: b64content }, function (err, data, response) {
//     // now we can assign alt text to the media, for use by screen readers and
//     // other text-based presentations and interpreters
//     var mediaIdStr = data.media_id_string
//     var altText = "Small flowers in a planter on a sunny balcony, blossoming."
//     var meta_params = { media_id: mediaIdStr, alt_text: { text: altText } }
  
//     T.post('media/metadata/create', meta_params, function (err, data, response) {
//       if (!err) {
//         // now we can reference the media and post a tweet (media will attach to the tweet)
//         var params = { status: 'loving life #nofilter', media_ids: [mediaIdStr] }
  
//         T.post('statuses/update', params, function (err, data, response) {
//           console.log(data)
//         })
//       }
//     })
//   })
  
//   //
//   // post media via the chunked media upload API.
//   // You can then use POST statuses/update to post a tweet with the media attached as in the example above using `media_id_string`.
//   // Note: You can also do this yourself manually using T.post() calls if you want more fine-grained
//   // control over the streaming. Example: https://github.com/ttezel/twit/blob/master/tests/rest_chunked_upload.js#L20
//   //
//   var filePath = '/absolute/path/to/file.mp4'
//   T.postMediaChunked({ file_path: filePath }, function (err, data, response) {
//     console.log(data)
//   })
  
//   //
//   //  stream a sample of public statuses
//   //
//   var stream = T.stream('statuses/sample')
  
//   stream.on('tweet', function (tweet) {
//     console.log(tweet)
//   })
  
//   //
//   //  filter the twitter public stream by the word 'mango'.
//   //
//   var stream = T.stream('statuses/filter', { track: 'mango' })
  
//   stream.on('tweet', function (tweet) {
//     console.log(tweet)
//   })
  
//   //
//   // filter the public stream by the latitude/longitude bounded box of San Francisco
//   //
//   var sanFrancisco = [ '-122.75', '36.8', '-121.75', '37.8' ]
  
//   var stream = T.stream('statuses/filter', { locations: sanFrancisco })
  
//   stream.on('tweet', function (tweet) {
//     console.log(tweet)
//   })
  
//   //
//   // filter the public stream by english tweets containing `#apple`
//   //
//   var stream = T.stream('statuses/filter', { track: '#apple', language: 'en' })
  
//   stream.on('tweet', function (tweet) {
//     console.log(tweet)
//   })



module.exports = router;