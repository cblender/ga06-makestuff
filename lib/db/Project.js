const mongoose = require("./connection.js");

const projectSchema = new mongoose.Schema({
  name: String,
  description: String,
  link: String,
  images: [Object],
});

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;
