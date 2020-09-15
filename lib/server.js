const express = require("express");
const Project = require("./db/Project");
const app = express();
var bodyParser = require("body-parser");

/*__________________________________________________________________________________

 $$$  $$$    $$    $$$$  $$$$$$ $$$$$$ $$$$$$  
$$ $$$$ $$  $$$$  $$       $$   $$     $$   $$  $$
$$  $$  $$ $$  $$  $$$$    $$   $$$$   $$$$$$  
$$  $$  $$ $$$$$$     $$   $$   $$     $$  $$   $$
$$      $$ $$  $$  $$$$    $$   $$$$$$ $$   $$ 
__________________________________________________________________________________*/

app.set("port", process.env.PORT || 3000);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  console.log("FIRED! redirect");
  res.redirect("/project");
});

/*__________________________________________________________________________________

$$$$$$  $$$$$$   $$$   $$$$$        
$$   $$ $$      $$ $$  $$  $$  $$    
$$$$$$  $$$$   $$   $$ $$  $$       
$$  $$  $$     $$$$$$$ $$  $$  $$    
$$   $$ $$$$$$ $$   $$ $$$$$        
__________________________________________________________________________________*/
// READ: FIRST FOUND PROJECT

app.get("/project", async (req, res) => {
  try {
    let projects = await Project.find();
    console.log(projects);
    if (projects.length > 0) {
      res.status(200).json(projects);
    } else {
      res.status(404).send("PROJECTS NOT FOUND");
    }
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: e });
  }
});

//__________________________________________________________________________________
// READ: PROJECT WITH SPECIFIC NAME

app.get("/project/:name", async (req, res) => {
  try {
    let projects = await Project.findOne({ name: request.params.name });
    console.log(projects);
    if (projects) {
      res.status(200).json(projects);
    } else {
      res.status(404).send("PROJECTS NOT FOUND");
    }
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: e });
  }
});

/*__________________________________________________________________________________

$$  $$ $$$$$  $$$$$    $$$  $$$$$$ $$$$$$  
$$  $$ $$  $$ $$  $$  $$ $$   $$   $$      $$
$$  $$ $$$$$  $$  $$ $$   $$  $$   $$$$   
$$  $$ $$     $$  $$ $$$$$$$  $$   $$      $$
 $$$$  $$     $$$$$  $$   $$  $$   $$$$$$  
__________________________________________________________________________________*/

// Update a single property of a project

app.post("/project/:name/item", (req, res) => {
  Project.findOneAndUpdate(
    req.params.name,
    { $push: { items: req.body } },
    { new: true }
  ).then((project) => {
    res.json(project);
  });
});

/*__________________________________________________________________________________

 $$$$  $$$$$$  $$$$$$   $$$  $$$$$$ $$$$$$
$$  $$ $$   $$ $$      $$ $$   $$   $$      $$
$$     $$$$$$  $$$$   $$   $$  $$   $$$$
$$  $$ $$  $$  $$     $$$$$$$  $$   $$      $$
 $$$$  $$   $$ $$$$$$ $$   $$  $$   $$$$$$
__________________________________________________________________________________*/

app.post("/project", (req, res) => {
  let project = req.body;
  console.log(project);
  Project.create(project).then((projectRes) => {
    console.log(projectRes);
  });
  res.json(project);
});

/*__________________________________________________________________________________

$$     $$$$$$  $$$$  $$$$$$ $$$$$$ $$   $$ 
$$       $$   $$       $$   $$     $$$  $$  $$
$$       $$    $$$$    $$   $$$$   $$ $ $$ 
$$       $$       $$   $$   $$     $$  $$$  $$
$$$$$$ $$$$$$  $$$$    $$   $$$$$$ $$   $$ 
__________________________________________________________________________________*/

app.listen(app.get("port"), () => {
  console.log(`✅ PORT: ${app.get("port")} 🌟`);
});
