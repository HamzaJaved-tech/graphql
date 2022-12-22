require('dotenv').config()

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = process.env.DATABASE_URI;
db.Book = require("./book.model.js")(mongoose);
db.Author = require("./author.model.js")(mongoose);


module.exports = db;
