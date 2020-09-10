const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
    id: String,
    name: String,
    link: String,
    project: String
})

const Project = mongoose.model(
    "Project",
    new mongoose.Schema({
    _id: String,
    name: String,
    description: String,
    link: String,
    images: [imageSchema]
    }) 
);

module.exports = Project;