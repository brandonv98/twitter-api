const axios = require('axios');
const config = require('../config.js');
const express = require('express');

// Make a request for a user with a given ID
axios.get(`https://api.twitter.com/oauth/${config.access_token}`)
  .then(function (response) {
    // handle success
    console.log(response);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .then(function () {
    // always executed
  });
