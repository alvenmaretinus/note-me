const mongoose = require('mongoose');

const url = 'mongodb://alvenmaretinus:123456@localhost:27017/note-me';

const connection = () => mongoose.connect(url, {
  useNewUrlParser: true
}, () => {
  console.log("MongoDB connected!");
});

module.exports = connection;
