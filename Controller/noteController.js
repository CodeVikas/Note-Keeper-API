const Note = require('../models/Note');

exports.createNote = async (req, res) => {
  const { title, content } = req.body;
  try {
    const note = await Note.create({ user: req.user, title, content });
    res.status(201).json(note);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getNotes = async (req, res) => {
  const notes = await Note.find({ user: req.user });
  res.json(notes);
};

exports.updateNote = async (req, res) => {
  const { id } = req.params;
  const note = await Note.findOneAndUpdate(
    { _id: id, user: req.user },
    req.body,
    { new: true }
  );
  if (!note) return res.sendStatus(404);
  res.json(note);
};

exports.deleteNote = async (req, res) => {
  const { id } = req.params;
  const note = await Note.findOneAndDelete({ _id: id, user: req.user });
  if (!note) return res.sendStatus(404);
  res.json({ message: 'Note deleted' });
};

exports.getNoteById = async (req, res) => {
  const { id } = req.params;
  try {
    const note = await Note.findOne({ _id: id, user: req.user });
    if (!note) {
      return res.status(404).json({ error: 'Note not found' });
    }
    res.json(note);
  } catch (err) {
    console.error('Get Note by ID Error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};