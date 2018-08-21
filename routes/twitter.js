const express = require('express');
const router = express.Router();

const Twit = require('twit');

let config = require('../config.js');
// ---------        --------- //
config = config.config;

// Twiter Api keys
const  T = new Twit(
    config
  );

  // Twitter \\  
router.use((req, res, next) => {
    let arrOuter;
    // Store reusable data.
    // const data = {

    // };  
   



//   /  Get user's time line, display the 2 most recent tweets.   ///   
      T.get('statuses/user_timeline', { count: 2 }, function(err, data, response) {
        req.timeline = data;
        req.userName = data[0].user.name;
        req.sn = data[0].user.screen_name;
        req.userPhoto = data[0].user.profile_image_url;
        req.message = data.timeline;
        // req.data = data;

        // console.log(data.timeline);
        // console.log(data.friendName);
        // if (!arrOuter) {
        //     console.log(arrOuter);
        // }  else {
        //     setTimeout(1000, e => {
        //         console.log(arrOuter);
        //     });
        // }
        
      

        // res.render('sandbox', { name: ['Jack', 'Bill']});

        // res.render('index', {
            // friendName: 'arr[1]'
        // });
        next();
    });
  }, (req, res, next) => {
    T.get('followers/list', { screen_name: 'brandondvancamp' },  function (err, data, response) {
        let username = data.users;
        const friendData = {};
        let names = [];
        let isFollowing = [];
        req.friendSN = [];
        req.friendPhoto = [];

        console.log(data);
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
    });
  });

    router.get('/', (req, res, next) => {
        //  Render out our passed date to page.
        console.log(req.friendPhoto, 'message recived...');
        
        res.render('index', {
            timelineContent: req.timeline.map(item => {
                return item.text;
            }),
            userTimelineNext: req.timeline[1].text, 
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
            // .map(item => {
                // console.log(item);
                // return item.toString();
            // }),
            // isFollowing: req.isFollowing,
            
            
            
        });
    });








// ========================================================================


  //
//  tweet 'hello world!'
//
// T.post('statuses/update', { status: 'ApI\'s are awsome!!' }, function(err, data, response) {
    // console.log(data)
  // });
  
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
//   // get `funny` twitter users
//   //
//   T.get('users/suggestions/:slug', { slug: 'funny' }, function (err, data, response) {
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