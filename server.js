const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3001;

const { Notebook } = require('./models');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/notebookdb', {
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.set('useCreateIndex', true);
mongoose.set('debug', true);

// Create a new notebook
app.post('/api/notebooks', ({ body }, res) => {
  Notebook.create(body)
    .then(dbNotebookData => {
      res.json(dbNotebookData);
    })
    .catch(err => {
      res.json(err);
    });
});

// Retrieve all notebooks
app.get('/api/notebooks', (req, res) => {
  Notebook.find()
    .then(dbNotebookData => {
      res.json(dbNotebookData);
    })
    .catch(err => {
      res.json(err);
    });
});

// Create a new note for a notebook
app.post('/api/notebooks/:notebookId/notes', ({ params, body }, res) => {
  Notebook.findOneAndUpdate(
    { _id: params.notebookId },
    { $push: { notes: body } },
    { new: true }
  )
    .then((dbNotebookData) => {
      if (!dbNotebookData) {
        res.status(404).json({ message: 'No notebook found with this id.' });
        return;
      }
      res.json(dbNotebookData);
    })
    .catch((err) => res.json(err));
}
);

// Delete a note from a notebook
app.delete('/api/notebooks/:notebookId/notes/:noteId', ({ params }, res) => {
  Notebook.findOneAndUpdate(
    { _id: params.notebookId },
    { $pull: { notes: { noteId: params.noteId } } },
    { new: true }
  )
    .then((dbNotebookData) => {
      res.json(dbNotebookData)
    })
    .catch((err) => res.json(err))
});

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});


