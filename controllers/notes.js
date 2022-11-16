const Note = require("../models/note");

const listNotes = async (req, res) => {
    const notes = await Note.find({ author: res.locals.user._id });
    return res.render("index", {notes});
}

const createNote = async (req, res) => {
    const {body} = req.body;
    try {
        await Note.create({body, author: res.locals.user._id});
        return res.status(201).json({success: true});
    } catch (err) {
        console.log(err);
        return res.status(500).json({success: false});
    }
}

const deleteNote = async (req, res) => {
    await Note.findByIdAndDelete(req.params.id);
    return res.status(201).json({success: true});
}

module.exports = {
    listNotes,
    createNote,
    deleteNote
}