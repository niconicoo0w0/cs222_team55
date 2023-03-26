const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

app.use(cors());
app.use(express.json());

// connect to mongoose
mongoose.connect("mongodb+srv://kaiwenr2:kwr2#1108UIUC@cluster0.bg8pwkr.mongodb.net/CS222/Books");

// require route
app.use("/", require("./routes/noteRoute"));

app.listen(3001, function() {
    console.log("express server is running on port 3001");
});