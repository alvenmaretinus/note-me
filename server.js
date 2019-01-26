const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const initConnection = require('./connection');
const Note = require('./models/note');

const app = express();
initConnection();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.listen(3001, () => {
  console.log('Server running in 3001');
});

app.get('/notes', (req, res) => {
  Note.find((err, notes) => {
    if (err) {
      res.send(err);
    }
    res.send(notes);
  });
});

app.get('/notes/:id', (req, res) => {
  Note.findById(req.params.id, (err, note) => {
    if (err) {
      res.send(err);
    }
    res.send(note);
  });
});

app.post('/notes', (req, res) => {
  const { message, status } = req.body;

  new Note({ message, status }).save((err, note) => {
    if (err) {
      res.send(err);
    }
    res.send(note);
  });
});

app.patch('/notes/:id', (req, res) => {
  const { message, status } = req.body;
  const { id } = req.params;
  const attr = {};
  
  if (message !== undefined) {
    attr.message = message;
  }
  if (status !== undefined) {
    attr.status = status;
  }

  Note.findByIdAndUpdate(
    id,
    { $set: attr },
    { new: true },
    (err, note) => {
      if (err) {
        res.send(err);
      }
      res.send(note);
    });
});

app.delete('/notes/:id', (req, res) => {
  const { id } = req.params;

  Note.findByIdAndRemove(id, (err, note) => {
    if (err) {
      res.send(err);
    }
    res.send(note);
  });
});
