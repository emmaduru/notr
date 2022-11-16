const { listNotes, createNote, deleteNote } = require("../controllers/notes");
const { protect } = require("../middleware/authMiddleware");

const router = require("express").Router();

router.route("/").get(protect, listNotes);
router.route("/add").post(protect, createNote);
router.route("/:id").delete(protect, deleteNote);

module.exports = router;