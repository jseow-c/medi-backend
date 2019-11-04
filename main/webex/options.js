const ACCESS_TOKEN = process.env.WEBEX_KEY;

exports.headers = { Authorization: `Bearer ${ACCESS_TOKEN}` };
exports.baseUrl = process.env.WEBEX_URL;
