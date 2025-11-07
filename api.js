const express = require("express");
const path = require("path");
const api = express();

// Serve static files from the public directory
api.use(express.static(path.join(__dirname, "public")));

// Serve index.html for the root route
api.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

module.exports = api;