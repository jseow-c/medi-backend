const axios = require("axios");
const misc = require("../../misc");
const options = require("../options");

const { fullOverwrite } = misc;

const { baseUrl, headers } = options;

const overwrite = fullOverwrite("data.json");

exports.create = async (req, res, data) => {
  const title = req.body.title;
  const email = req.body.email;

  if (title in data) {
    try {
      const url = `${baseUrl}/memberships`;
      const options = { headers };
      const postData = {
        roomId: data[title].id,
        personEmail: email,
        isModerator: false
      };
      console.log(url, options, postData);
      const response = await axios.post(url, postData, options);
      const id = response.data.id;
      data[title].memberships[email] = { email, id };
    } catch (error) {
      console.log(error);
    }
    overwrite(data);

    return res.json(data[title].memberships[email]);
  } else return res.status(500).send("Room not found.");
};

exports.delete = async (req, res, data) => {
  const title = req.body.title;
  const email = req.body.email;

  if (title in data && email in data[title].memberships) {
    const membershipData = JSON.parse(
      JSON.stringify(data[title].memberships[email])
    );
    const id = membershipData.id;
    const url = `${baseUrl}/memberships/${id}`;
    const options = { headers };
    await axios.delete(url, options);
    delete data[title].memberships[email];
    overwrite(data);

    return res.json(membershipData);
  } else return res.status(500).send("Room and Email combination not found.");
};
