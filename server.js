const express = require("express");
const server = express();

const morgan = require("morgan");
const cors = require("cors");
const cronJob = require("cron").CronJob;

const searchRouter = require("./routes/search-router.js");
const { insertLatestVideos } = require("./process");

// Middleware
server.use(cors());
server.use(morgan("dev"));
server.use(express.json());

// Routers
server.use("/search", searchRouter);

//Routes
server.get("/", (req, res) => {
  res.status(200).json({ hello: "Healthy!" });
});

const job = new cronJob(
    '20 * * * * *',
    insertLatestVideos,
    null,
    true,
);

job.start();

module.exports = server;
