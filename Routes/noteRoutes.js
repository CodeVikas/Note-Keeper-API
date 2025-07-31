const express = require("express");
const auth = require("../Middleware/authMiddleware");
const {
  createNote,
  getNoteById,
  getNotes,
  updateNote,
  deleteNote,
} = require("../Controller/noteController");

const router = express.Router();
router.use(auth);

router.post("/", createNote);
router.get("/:id", getNoteById);
router.get("/", getNotes);
router.put("/:id", updateNote);
router.delete("/:id", deleteNote);

module.exports = router;
