/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
const axios = require("axios");

module.exports = function(controller) {
  // end payment
  controller.hears(
    async message => {
      const trimMsg = message.text.trim().toLowerCase();
      if (trimMsg && trimMsg === "end payment") return true;
      else return false;
    },
    ["message"],
    async (bot, message) => {
      // add it back to demo.json
      const url = `http://localhost:${process.env.SERVER_PORT}/demo/status`;
      const options = { "Content-Type": "application/json" };
      const data = { status: true };
      await axios.post(url, data, options);
      await bot.reply(message, { text: "Roger. Payment completed." });
    }
  );
};
