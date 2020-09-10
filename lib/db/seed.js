const Project = require("./Project")
const images = require("./images.json")
const projects = require("./project.json")

console.log("=======================================================")
console.log(Project);
console.log("=======================================================")
console.log(images);
console.log("=======================================================")
console.log(projects);
console.log("=======================================================")

const poppedProjects = projects.map((p) => {
    let newImages = p.images.map((i) => {
        console.log(i);
        let image = images.find((newimg) => i === newimg._id);
        return image;
    })
    console.log("=======================================================")
    console.log(newImages)
    console.log("=======================================================")
    p.images = newImages.filter((img) => img != undefined);
    return p;
});

Project.deleteMany({}).then (() => {
    House.create(poppedProjects)
})

