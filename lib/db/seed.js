const Project = require("./Project");
const imagesJSON = require("./images.json");
const projects = require("./projects.json");

console.log("=======================================================");
console.log(Project);
console.log("=======================================================");
console.log(images);
console.log("=======================================================");
console.log(projects);
console.log("=======================================================");

const populatedProjects = projects.map((p) => {
  let newImages = imagesJSON.map((i) => {
    // set newImages equal to correct image source ("all images within images.json with property "project" = current project.map.name")
    console.log(i);
    let image = images.find((newimg) => i === newimg._id);
    return image;
  });
  console.log("=======================================================");
  console.log(newImages);
  console.log("=======================================================");
  p.images = newImages.filter((img) => img != undefined);
  return p;
});

Project.deleteMany({}).then(() => {
  Project.create(populatedProjects);
});
