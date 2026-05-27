import express from "express";
import bodyParser from "body-parser";

import { dirname } from "path";
import { fileURLToPath } from "url";
import { get } from "http";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;
let taskList = [];

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("index", { tasks: taskList });
})

app.listen(port, () => {
    console.log(`The server is running on port ${port}.`);
})

app.post("/submit-task", (req, res) => {
    if (req.body.newTask) {
        const newTaskObject = {
            text: req.body.newTask,
            priority: "none"
        };
        taskList.push(newTaskObject);
    }
    res.redirect("/");
});

app.post("/delete/:id", (req, res) => {
    taskList.splice(req.params.id, 1);
    res.redirect("/");
});

app.post("/update-priority/:id", (req, res) => {
    const targetIndex = req.params.id;
    const newPriority = req.query.level;
    if (taskList[targetIndex]) {
        taskList[targetIndex].priority = newPriority;
    }
    res.redirect("/");
});