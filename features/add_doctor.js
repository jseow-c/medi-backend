/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
const { BotkitConversation } = require("botkit");

module.exports = function(controller) {
  const ADD_DOC_DIALOG = "add_doc_dialog";
  const convo = new BotkitConversation(ADD_DOC_DIALOG, controller);
  convo.addMessage(
    "Below are the types of doctors:\n1) Orthopedist\n2) Neurologist\n3) Plastic Surgeon\n4) Endocrinologist",
    "default"
  );
  convo.addQuestion(
    "Please indicate which type of doctor you are requesting for.",
    [
      {
        pattern: "1|Orthopedist|orthopedist|ortho",
        handler: async (response, convo, bot) => {
          await convo.setVar("doctor", "Orthopedist");
          await convo.gotoThread("thread_unavailable");
        }
      },
      {
        pattern: "2|Neurologist|neurologist|neuro",
        handler: async (response, convo, bot) => {
          await convo.setVar("doctor", "Neurologist");
          await convo.gotoThread("thread_unavailable");
        }
      },
      {
        pattern: "3|Plastic Surgeon|plastic surgeon|plastic",
        handler: async (response, convo, bot) => {
          await convo.setVar("doctor", "Plastic Surgeon");
          await convo.gotoThread("thread_available");
        }
      },
      {
        pattern: "4|Endocrinologist|endocrinologist|endo",
        handler: async (response, convo, bot) => {
          await convo.setVar("doctor", "Endocrinologist");
          await convo.gotoThread("thread_unavailable");
        }
      },
      {
        default: true,
        handler: async (response, convo, bot) => {
          await convo.gotoThread("bad_response");
        }
      }
    ],
    "answer_1",
    "default"
  );

  convo.addMessage("Looking for a {{vars.doctor}}...", "thread_unavailable");
  convo.addMessage(
    {
      text: "No {{vars.doctor}} found to be available...",
      action: "complete"
    },
    "thread_unavailable"
  );
  convo.addMessage("Looking for a {{vars.doctor}}...", "thread_available");
  convo.addMessage(
    {
      text: "Do not understand what you mean...",
      action: "complete"
    },
    "bad_response"
  );
  convo.addMessage(
    {
      text: "Roger. But no one else is free. Please try again.",
      action: "complete"
    },
    "bad_ending"
  );
  convo.addMessage(
    {
      text: "Hi **Sebastian**, your help is requested here.",
      markdown: "Hi **Sebastian**, your help is requested here.",
      action: "complete"
    },
    "good_ending"
  );
  convo.addQuestion(
    "Sebastian Ma is available. Should I proceed to add him? (Yes/No)",
    [
      {
        pattern: "yes|Yes|YES|y|Y",
        handler: async (response, convo, bot) => {
          await bot.say("Adding Sebastian Ma to the conversation...");
          // const room = await bot.api.rooms.get();
          console.log(convo.channel, response.channel, bot.channel);
          // Adding Sebastian here
          await bot.api.memberships.create({
            roomId: convo.vars.channel,
            personEmail: "sebma@cisco.com"
          });
          await convo.gotoThread("good_ending");
        }
      },
      {
        pattern: "no|No|NO|n|Y",
        handler: async (response, convo, bot) => {
          await convo.gotoThread("bad_ending");
        }
      },
      {
        default: true,
        handler: async (response, convo, bot) => {
          await convo.gotoThread("bad_response");
        }
      }
    ],
    "answer_2",
    "thread_available"
  );
  controller.addDialog(convo);

  // adding doctor
  controller.hears(
    async message => {
      const trimMsg = message.text.trim().toLowerCase();
      if (trimMsg && (trimMsg === "add doctor" || trimMsg === "add doc"))
        return true;
      else return false;
    },
    ["message"],
    async (bot, message) => {
      await bot.beginDialog(ADD_DOC_DIALOG);
    }
  );
};
