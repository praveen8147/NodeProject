var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var schData = new Schema({
  Name: {
    type: String,
    unique: true
  },
  Category: String,
  Price: String,
  Status: String
}, {
  collection: 'Product'
});


module.exports.schData = schData;
