const  express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
app.use(express.json());
require("dotenv").config();
const mongoose = require("mongoose");
const { authenticate } = require('./auth/authenticate');

async function main() {
    await mongoose.connect(process.env.DB_CONNECTION_STRING);
    console.log("Connected to MongoDB");
}
main().catch(console.error);

const port = process.env.PORT || 3100;
app.use("/api/siginup", require("./routes/siginup"));
app.use("/api/login", require("./routes/login"));
app.use("/api/refresh-token", require("./routes/refrehToken"));
app.use("/api/siginout", require("./routes/siginout"));
app.use("/api/todos", authenticate, require("./routes/todos"));
app.use("/api/user", authenticate, require("./routes/user"));


app.get("/", (req, res) => {
    res.send("Is fine");
});
app.listen(port, () => {
    console.log("Server is running.");
})
