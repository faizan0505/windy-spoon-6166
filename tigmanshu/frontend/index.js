const express = require("express");
const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("HELLO WORLD");
});

require("dotenv").config();

// const redis = require("redis");
const { createClient } = require("redis");

const client = createClient({
  password: "tigmanshu",
  socket: {
    host: "redis-14399.c301.ap-south-1-1.ec2.cloud.redislabs.com",
    port: 14399,
  },
});

// client.on("error", (err) => {
//   console.log("Error " + err);
// });

client.connect();

client.set("NAME", "PUNIT");

app.listen(8000, () => {
  console.log("Server is running at port 8000");
});
