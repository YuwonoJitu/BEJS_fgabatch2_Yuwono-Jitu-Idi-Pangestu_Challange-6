//const ImageKit = require("imagekit");

//const imageKit = new ImageKit({
  //  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    //privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    //urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
//});

//module.exports = imageKit;

const ImageKit = require("imagekit");

const imageKit = new ImageKit({
    publicKey: 'public_04lUdap+gzQsbexy/09OgM7Mp1c=',
    privateKey: 'private_a/wJtdOGXSZvYDQf357smyqTb8c=',
    urlEndpoint: 'https://ik.imagekit.io/yuwonojitu/',
});

console.log("ImageKit initialized successfully");

module.exports = imageKit;