const mongoose = require('mongoose');

const dbUsername = 'alvenmaretinus';
const dbPassword = '123456';
const dbAddress = 'localhost:27017';
const dbName = 'note-me';

const url = `mongodb://${dbUsername}:${dbPassword}@${dbAddress}/${dbName}`;

const connection = () => mongoose.connect(url, {
  useNewUrlParser: true
}, () => {
  console.log("MongoDB connected!");
});

module.exports = connection;
