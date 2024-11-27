const express = require("express");
const app = express();
const cors = require("cors");
const rootRouter = require("./routes/index.js");
const port = 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.send("Hello there sexy fellow"));
app.use("/api/v1", rootRouter);
app.listen(port, () => console.log(`server started at port ${port}`));
