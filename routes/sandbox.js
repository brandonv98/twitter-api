const express = require('express');
const router = express.Router();
// Install Twit // 
// const Twit = require('twit');
// Twiter Api keys
// const  T = new Twit(
    // config
//   );

// GET pages content
router.get('/', (req, res) => {
    const name = {
        f: ['Brandon', 'VanCamp', 'Who is : '],
        num: 0
    };
    
    const loopMe = name.f.map( (item, i, all) => {
        const outerLoop = all.map(innerItem => {
            console.log(innerItem);
        });
        // console.log(i);
        name.item = item;
    //    return  item
        return item;

    });
    // if (!name) {
    //   res.redirect('/hello' );
    // } else {
        res.render('sandbox', { name: loopMe, numberInLoop: name.item });// // NOTE: read cookie set from post.
    // }
  });
  

  
module.exports = router;