/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
const axios = require("axios");
const { BotkitConversation } = require("botkit");

module.exports = function(controller) {
  const ISSUE_MED_DIALOG = "issue_med_dialog";
  const convo = new BotkitConversation(ISSUE_MED_DIALOG, controller);
  convo.addMessage(
    "Below are some medicine to issue:\n1) Bacitracin\n2) Loperamide\n3) Bismuth Subsalicylate\n4) Neosporin\n5) End Conversation",
    "default"
  );
  convo.addQuestion(
    "Please indicate which type of medicine you would like to issue.",
    [
      {
        pattern: "1|Bacitracin|bacitracin",
        handler: async (response, convo, bot) => {
          const medicine = convo.vars.medicine || [];
          if (!medicine.includes("Bacitracin")) medicine.push("Bacitracin");
          await convo.setVar("medicine", medicine);
          await convo.gotoThread("default");
        }
      },
      {
        pattern: "2|Loperamide|loperamide",
        handler: async (response, convo, bot) => {
          const medicine = convo.vars.medicine || [];
          if (!medicine.includes("Loperamide")) medicine.push("Loperamide");
          await convo.setVar("medicine", medicine);
          await convo.gotoThread("default");
        }
      },
      {
        pattern: "3|Bismuth Subsalicylate|bismuth subsalicylate",
        handler: async (response, convo, bot) => {
          const medicine = convo.vars.medicine || [];
          if (!medicine.includes("Bismuth Subsalicylate"))
            medicine.push("Bismuth Subsalicylate");
          await convo.setVar("medicine", medicine);
          await convo.gotoThread("default");
        }
      },
      {
        pattern: "4|Neosporin|neosporin",
        handler: async (response, convo, bot) => {
          const medicine = convo.vars.medicine || [];
          if (!medicine.includes("Neosporin")) medicine.push("Neosporin");
          await convo.setVar("medicine", medicine);
          await convo.gotoThread("default");
        }
      },
      {
        pattern: "5|End|end",
        handler: async (response, convo, bot) => {
          const medicine_string = convo.vars.medicine.join(",");
          await convo.setVar("medicine_string", medicine_string);
          await convo.gotoThread("thread_end");
        }
      },
      {
        default: true,
        handler: async (response, convo, bot) => {
          await bot.say("I do not understand what you are saying...");
          await convo.gotoThread("default");
        }
      }
    ],
    "answer_1",
    "default"
  );
  convo.addMessage(
    {
      text: "You are issuing the following: {{vars.medicine_string}}.",
      action: "complete"
    },
    "thread_end"
  );
  controller.afterDialog(convo, async (bot, results) => {
    // use results of dialog here
    let medicine = results.medicine;
    // add it back to demo.json
    const url = `http://localhost:${process.env.SERVER_PORT}/demo/medicine`;
    const options = { "Content-Type": "application/json" };
    const data = { medicine };
    await axios.post(url, data, options);
  });
  controller.addDialog(convo);

  // adding medicine
  controller.hears(
    async message => {
      const trimMsg = message.text.trim().toLowerCase();
      if (trimMsg && (trimMsg === "issue medicine" || trimMsg === "issue med"))
        return true;
      else return false;
    },
    ["message"],
    async (bot, message) => {
      await bot.beginDialog(ISSUE_MED_DIALOG);
    }
  );
};
