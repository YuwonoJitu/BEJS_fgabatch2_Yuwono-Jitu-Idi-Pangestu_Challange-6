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

app.use(express.json());
app.use(INDEX_ROUTES);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
}).on('error', (err) => {
    console.error('Failed to start server:', err);
});

module.exports = app;