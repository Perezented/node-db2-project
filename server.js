const express = require("express");

const server = express();

const carsRouter = require("./cars/carsRouter");

server.use(express.json());
server.get("/", (req, res) => {
    res.status(200).json({
        message: "home slash for the server",
    });
});

server.use("/api/cars", carsRouter);
module.exports = server;
