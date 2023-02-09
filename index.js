const express = require("express");
const app = express();
const port = 4000;

app.get("/", (req, res) => res.send("Hello World!"));

app.use("/auth", require("./routes/auth"));
//Get token by id 
app.use("/token", require("./routes/token"));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
