/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
const axios = require("axios");

module.exports = function(controller) {
  // give info of patient
  controller.hears(
    async message => {
      const trimMsg = message.text.trim().toLowerCase();
      if (trimMsg && trimMsg === "info") return true;
      else return false;
    },
    ["message", "direct_message"],
    async (bot, message) => {
      const url = `http://localhost:${process.env.SERVER_PORT}/patient/markdown`;
      const options = { "Content-Type": "application/json" };
      const response = await axios.post(url, options);
      await bot.reply(message, { markdown: response.data });
    }
  );
};
