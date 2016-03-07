/**
 * Shema for screens
 * @type {Mongoose.Schema}
 */

var mongoose = require('mongoose');

// SHEMA Screens
var screensShema = new mongoose.Schema({
    "title": String,
    "filter": String
});
exports.screensShema = screensShema;