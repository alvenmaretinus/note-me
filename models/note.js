const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const NoteSchema = new Schema({
  message: String,
  status: String
});

const Note = mongoose.model('notes', NoteSchema);

module.exports = Note;
