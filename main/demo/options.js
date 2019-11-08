const WEBEX_ACCESS_TOKEN = process.env.WEBEX_ADMIN_TOKEN;
const WEBEX_BOT_ACCESS_TOKEN = process.env.WEBEX_KEY;

exports.webexHeaders = { Authorization: `Bearer ${WEBEX_ACCESS_TOKEN}` };
exports.webexBotHeaders = { Authorization: `Bearer ${WEBEX_BOT_ACCESS_TOKEN}` };
exports.webexBaseUrl = process.env.WEBEX_URL;
