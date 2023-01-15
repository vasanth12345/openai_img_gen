const express = require("express");
const dotenv = require("dotenv").config();
const path = require("path");
const app = express();
const port = process.env.PORT || 5000;

//use body
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "public")));

app.use("/openai", require("./Routes/openAiRoutes"));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
