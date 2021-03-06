//  __   __  ___        ___
// |__) /  \  |  |__/ |  |
// |__) \__/  |  |  \ |  |

// This is the main file for the moh-bot bot.

// Import Botkit's core features
const { Botkit } = require("botkit");
const { BotkitCMSHelper } = require("botkit-plugin-cms");

// Import a platform-specific adapter for webex.

const { WebexAdapter } = require("botbuilder-adapter-webex");

const { MongoDbStorage } = require("botbuilder-storage-mongodb");

//  Import localtunnel to expose this to Internet
const localtunnel = require("localtunnel");

// Load process.env values from .env file
require("dotenv").config();

let storage = null;
if (process.env.MONGO_URI) {
  storage = mongoStorage = new MongoDbStorage({
    url: process.env.MONGO_URI
  });
}

// Start a LocalTunnel

exports.startBot = async () => {
  tunnel = await localtunnel({ port: process.env.PORT });

  // the assigned public url for your tunnel
  // i.e. https://abcdefgjhij.localtunnel.me
  console.log(`Tunnel URL is ${tunnel.url}`);

  const adapter = new WebexAdapter({
    // REMOVE THIS OPTION AFTER YOU HAVE CONFIGURED YOUR APP!
    enable_incomplete: true,

    access_token: process.env.WEBEX_KEY,
    // public_address: process.env.WEBEX_PUBLIC_ADDRESS
    public_address: tunnel.url
  });

  const controller = new Botkit({
    webhook_uri: "/api/messages",

    adapter: adapter,

    storage
  });

  if (process.env.cms_uri) {
    controller.usePlugin(
      new BotkitCMSHelper({
        uri: process.env.cms_uri,
        token: process.env.cms_token
      })
    );
  }

  // Once the bot has booted up its internal services, you can use them to do stuff.
  controller.ready(() => {
    // load traditional developer-created local custom feature modules
    controller.loadModules(__dirname + "/features");

    /* catch-all that uses the CMS to trigger dialogs */
    if (controller.plugins.cms) {
      controller.on("message,direct_message", async (bot, message) => {
        let results = false;
        results = await controller.plugins.cms.testTrigger(bot, message);

        if (results !== false) {
          // do not continue middleware!
          return false;
        }
      });
    }
  });

  controller.webserver.get("/", (req, res) => {
    res.send(`This app is running Botkit ${controller.version}.`);
  });

  tunnel.on("close", () => {
    // tunnels are closed
    console.log("Tunnels are closed again!");
  });
};
