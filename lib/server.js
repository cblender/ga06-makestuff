const express = require("express");
const Project = require("./db/Project");
const { response } = require("express");
const { request } = require("http");
const app = express();

app.set("port", process.env.PORT || 8080);

app.get("/", (req, res) => {
    response.redirect("/project");
});

app.get("/project", async (req, res) => {
    try {
        let projects = await Project.find()
            console.log(projects);
            if (projects.length > 0) {
                response.status(200).json(projects);
            }
            else {
                response.status(404).send("PROJECTS NOT FOUND");
            }
    }
    catch (e) {
        console.log(e);
        return response.status(500).json({error: e});
    }
});

app.get("/project/:name", (req, res) => {
    try {
        let projects = Project.findOne({ name: request.params.name })
        .then((projects) => {
            console.log(projects);
            if (projects) {
                return response.status(200).json(projects);
            }
            else {
                return response.status(404).send("PROJECTS NOT FOUND")
            }
        });
    }
    catch (e) {
        return response.status(500).json({error: e});
    }
});

app.post("/project", (req, res) => {
    let project = req.body;
    console.log(project);
    Project.create(project)
    .then((projectRes) => {
        console.log(projectRes);
    });
    response.json(project);
});

app.listen(app.get("port"), () => {
  console.log(`✅ PORT: ${app.get("port")} 🌟`);
});