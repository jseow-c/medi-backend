const axios = require("axios");
const misc = require("../misc");

const { headers, fullOverwrite } = misc;

exports.list = async (req, res, data) => {
  return res.json(data);
};

exports.text = async (req, res, data) => {
  const title = req.body.title;
  const text = req.body.text;

  if (title in data) {
    const url = "https://api.ciscospark.com/v1/messages";
    const options = { headers };
    const postData = {
      roomId: data[title].id,
      text
    };

    const response = await axios.post(url, postData, options);
    const id = response.data.id;

    return res.json({ title, id, text });
  } else res.send(`Room Does Not Exist - ${title}`);
};

exports.markD = async (req, res, data) => {
  const title = req.body.title;
  const markdown = req.body.markdown;

  if (title in data) {
    const url = "https://api.ciscospark.com/v1/messages";
    const options = { headers };
    const postData = {
      roomId: data[title].id,
      markdown
    };

    const response = await axios.post(url, postData, options);
    const id = response.data.id;

    return res.json({ title, id, markdown });
  } else res.send(`Room Does Not Exist - ${title}`);
};
