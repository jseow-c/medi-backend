const axios = require("axios");
const CronJob = require("cron").CronJob;
const cronInterval = "0 */5 * * * *";
const keepBotAlive = () => {
  const ACCESS_TOKEN = process.env.WEBEX_ADMIN_TOKEN;
  const url = `${process.env.WEBEX_URL}/messages`;
  const options = { headers: { Authorization: `Bearer ${ACCESS_TOKEN}` } };
  const postData = {
    toPersonEmail: "drstrange@webex.bot",
    text: "sample"
  };
  axios.post(url, postData, options);
};

exports.startCron = () => {
  new CronJob(cronInterval, keepBotAlive, null, true, "Asia/Singapore");
};
