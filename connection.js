const mongoose = require('mongoose');

const dbUsername = 'note-me';
const dbPassword = 'note-me123';
const dbAddress = 'ds213715.mlab.com:13715';
const dbName = 'note-me';

const url = `mongodb://${dbUsername}:${dbPassword}@${dbAddress}/${dbName}`;

const connection = () => mongoose.connect(url, {
  useNewUrlParser: true
}, () => {
  console.log("MongoDB connected!");
});

module.exports = connection;
