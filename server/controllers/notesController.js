const Note = require("../models/note")

const fetchNotes = async (req, res) => {
    const notes = await Note.find({user: req.user._id})
    res.json({ notes })
}

const fetchNote = async (req, res) => {

    const noteId = req.params.id

    const note = await Note.findById({_id: noteId, user: req.user._id })
    res.json({ note })
}

const createNote = async (req, res) => {

    const { title, body } = req.body

    const note = await Note.create({
        title,
        body,
        user: req.user._id
    })

    res.json({ note })
}

const updateNote = async (req, res) => {
    const noteId = req.params.id

    const { title, body } = req.body

    const note = await Note.findOneAndUpdate({_id: noteId, user: req.user._id}, {
        title,
        body
    })

    const updatedNote = await Note.findById(noteId)

    res.json({ updatedNote })
}

const deleteNote = async (req, res) => {

    const noteId = req.params.id

    const note = await Note.findByIdAndDelete({_id : noteId, user :req.user._id})

    if (note) {
        res.json({ delete: "deletion successfull" })
    } else {
        res.json({ delete: "error" })
    }
}

module.exports = {
    fetchNotes,
    fetchNote,
    createNote,
    updateNote,
    deleteNote
};