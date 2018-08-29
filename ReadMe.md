# Twitter API
Using Twitter's API to store and manage information.

## Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.  


## Prerequisites
What dependencies you need to install the software and how to install them as followed

1. **NodeJS** - As an asynchronous event driven JavaScript runtime, Node is designed to build scalable network applications.
   - Learn more : https://nodejs.org/en/about/
2. **Npm** - npm makes it easy for JavaScript developers to share and reuse code, and makes it easy to update the code that you’re sharing, so you can build amazing things.
   - Learn more : https://www.npmjs.com/get-npm
3. **Express** - Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications
    - Learn more : https://expressjs.com/
4. **Twitter API** - Publish and analyze Tweets, optimize ads, and create unique customer experiences.
    - Learn more : https://developer.twitter.com/en.html
5. **Twit API** - Twitter API Client for node (REST & Streaming API).
    - Learn more : https://github.com/ttezel/twit
6. **pugJS** - high-performance template engine heavily influenced by Haml and implemented with JavaScript for Node.js and browsers
    - Learn more : https://pugjs.org/api/getting-started.html


7. **Homebrew** - Homebrew installs packages to their own directory and then symlinks their files into /usr/local.
   - Learn more - https://brew.sh

* Recommended install with **brew**.
   - past the following into your Terminal  
```
$ /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

**Install nodeJS & npm with brew** : past the following into your terminal
```
$ brew install node
```
* After install is complete check install using the following in your terminal.  
For **node** - ```node -v``` this will print out a version number like this ```v10.6.0```.  
Now do the same for **npm** as followed ```npm -v``` output will look something like this ```6.2.0```.

> To learn more please visit - [node & npm install.](http://blog.teamtreehouse.com/install-node-js-npm-mac)

___

## Installing
A step by step series of examples that tell you how to get a development env running  
### 1. Step One  
  In your project root dir ***('./')*** use the following command in your terminal.
```
$ git clone https://github.com/brandonv98/twitter-api.git
```
### 2. Step Two
  Once you have cloned the repo ```$ cd/twitter-api ``` from here type ```$ npm install ``` to install all of the project dependencies.
### 3. Step Three
  Once completed run the following command to create our config file where we will put our Twitter API keys. 
  > Unsure how to obtain Twitter API keys? Sign up here - [Sign up Twitter API keys](https://apps.twitter.com/)
  ```
  $ npm run api-build
  ```
  In your root dir open your **config.js** file and past your Twitter API Keys in.
### 4. Step Four 
  Back in our Terminal run ```npm start``` to start our server on localhost:3000.
___

#### Example && Demo of usage.

1. Example if config.js file.
``` js
exports.config = {
        consumer_key: "xxxx",
        consumer_secret: "xxxxxxxx",
        access_token: "xxxx-xxxxxx",
        access_token_secret: "xxxxxxxxx",
        timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
        strictSSL:            true,     // optional - requires SSL certificates to be valid.
}
```
___

### Deployment
 N/A at this time..

___

## Built With
**[NodeJS](https://nodejs.org/dist/latest-v10.x/docs/api/)** - An asynchronous event driven JavaScript runtime, Node is designed to build scalable network applications.

**[Express](https://expressjs.com/)** - minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.

___

## Authors
* **Brandon VanCamp** - [WebSite](https://csdevs.io/)

___

## License
![MIT](https://camo.githubusercontent.com/890acbdcb87868b382af9a4b1fac507b9659d9bf/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f6c6963656e73652d4d49542d626c75652e737667)  

This project is licensed under the MIT License - see the [LICENSE.md](./LICENSE.md) file for details.  
Yay Free software!

