const express = require("express");
const path = require("path");
const app = express(); // create express app

// add middleware
// app.use(express.static("public"));
// or
app.get("/", (req, res) => {
    // res.sendFile(path.join(__dirname, "public", "index.html"));
    res.sendFile(path.join(__dirname, 'build/index.html'));
});

// start express server on port 2000
app.listen(2000, () => {
    console.log("server started on port 2000");
});
