const express = require("express");
const app = express();
const port = 4000;

app.get("/", (req, res) => res.send("Hello World!"));

app.use("/auth", require("./routes/auth"));
//Get token by id 
app.use("/token", require("./routes/token"));
//Orders
app.use("/orders", require("./routes/orders"));
//categories
app.use("/categories", require("./routes/categories"));

app.listen(port, () => console.log(`Quick api listening on port ${port}!`));
