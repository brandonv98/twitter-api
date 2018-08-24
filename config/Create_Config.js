var fs = require('fs');

var fileContent = '/////////    TWITTER API KET CONFIG FILE     ///////////'
    + '\n exports.config = {'
    + '\n consumer_key: "xxxx", '
    + '\n consumer_secret: "xxxxxxxx", '
    + '\n access_token: "xxxx-xxxxxx", '
    + '\n access_token_secret: "xxxxxxxxx", '
    + '\n timeout_ms:           60*1000, '
    + '\n strictSSL:            true, }';

try{
    fs.writeFileSync('config.js', fileContent);
    console.log('File created successfully. Please open the config.js file by typing "$ YOUR-EDITOR config.js" or open the file manually');
}catch (e){
    console.log("Cannot write file ", e);
}