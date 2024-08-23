const ImageKit = require("imagekit");

//console.log("PUBLIC_KEY_IMAGEKIT:", process.env.PUBLIC_KEY_IMAGEKIT);
//console.log("PRIVATE_KEY_IMAGEKIT:", process.env.PRIVATE_KEY_IMAGEKIT);
//console.log("URL_ENDPOINT_IMAGEKIT:", process.env.URL_ENDPOINT_IMAGEKIT);

const imageKit = new ImageKit({
    publicKey: process.env.PUBLIC_KEY_IMAGEKIT,
    privateKey: process.env.PRIVATE_KEY_IMAGEKIT,
    urlEndpoint: process.env.URL_ENDPOINT_IMAGEKIT,
});

module.exports = imageKit;