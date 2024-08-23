const dotenv = require("dotenv");

// Inisialisasi dotenv untuk memuat variabel lingkungan dari file .env
dotenv.config();

// Cek apakah variabel lingkungan sudah di-load
//console.log("PUBLIC_KEY_IMAGEKIT:", process.env.PUBLIC_KEY_IMAGEKIT);
//console.log("PRIVATE_KEY_IMAGEKIT:", process.env.PRIVATE_KEY_IMAGEKIT);
//console.log("URL_ENDPOINT_IMAGEKIT:", process.env.URL_ENDPOINT_IMAGEKIT);

const express = require("express");
const INDEX_ROUTES = require("./routes/index");

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(INDEX_ROUTES);



module.exports = app;
