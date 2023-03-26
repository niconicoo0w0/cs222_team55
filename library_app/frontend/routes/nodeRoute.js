const express = require("express");
const router = express.Router();
const Note = require("../models/noteModel");

router.route("/create").post((req, res) => {
    const title = req.body.title;
    const authors = req.body.authors;
    const count = req.body.count;
    const publication_date = req.body.publication_date;
    const newNote = new Note({
        title,
        authors,
        count,
        publication_date
    })

    newNote.save();
})
module.exports = router;