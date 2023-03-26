const mongoose = require("mongoose");

const noteSchema = {
    title: String,
    authors: String,
    count: Int16Array,
    publication_date: string
}

const Note = mongoose.model("Note", noteSchema);

module.exports = Note;
