import express from "express";
import bodyParser from "body-parser";

import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({extended: true}));

app.listen(port, () => {
    console.log(`The server is running on port ${port}.`);
})

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/views/index.ejs");
})
