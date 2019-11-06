// load express module
require("dotenv").config();
const express = require("express");
const cors = require("cors");

// start bot
const bot = require("./serveo-bot");
bot.startBot();

// keep bot alive
const cron = require("./main/cron");
cron.startCron();

// start express app
const app = express();
app.use(cors());

// use jsonParser
app.use(express.json());

//load from router
const indexRouter = require("./main/router");
app.use("/", indexRouter);

// Listening for Express Server
app.listen(process.env.SERVER_PORT, function() {
  console.log(`Listening on port ${process.env.SERVER_PORT}!`);
});
