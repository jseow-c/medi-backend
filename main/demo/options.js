const WEBEX_ACCESS_TOKEN = process.env.WEBEX_ADMIN_TOKEN;

exports.webexHeaders = { Authorization: `Bearer ${WEBEX_ACCESS_TOKEN}` };
exports.webexBaseUrl = process.env.WEBEX_URL;
