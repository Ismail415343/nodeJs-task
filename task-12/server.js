const express = require("express")
const connectDb = require("./config/db")

const userRoutes = require("./routes/userRoutes")

const app = express();
const port = 3000;

app.use(express.json());

connectDb();

app.use("/", userRoutes);


app.listen(port, ()=>{
    console.log(`app is running on the ${port} port`)
})