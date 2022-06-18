let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let bookSchema = new Schema({
  title: { type: String, required: true },
  summary: String,
  pages: Number,
  publication: String,
  category: [String],
  cover_image: String,
  author:String,
  email  : String,
  countery:String
});

module.exports = mongoose.model('Book', bookSchema);
