const axios = require("axios");
const misc = require("../../misc");
const options = require("../options");

const { fullOverwrite } = misc;

const { baseUrl, headers } = options;

const overwrite = fullOverwrite("data.json");

exports.list = async (req, res, data) => {
  return res.json(data);
};

exports.create = async (req, res, data) => {
  const title = req.body.title;

  if (title in data) {
    res.send(`Room Exist - ${title}:${data[title].id}`);
  } else {
    const url = `${baseUrl}/rooms`;
    const options = { headers };
    const postData = { title };

    const response = await axios.post(url, postData, options);
    const id = response.data.id;
    const peopleUrl = `${baseUrl}/memberships?roomId=${id}`;
    const people = await axios.get(peopleUrl, options);
    let memberships = {};
    for (let person of people.data.items) {
      memberships[person.personEmail] = {
        email: person.personEmail,
        id: person.id
      };
    }
    data[title] = { id, title, memberships };
    overwrite(data);

    return res.json(data[title]);
  }
};

exports.delete = async (req, res, data) => {
  const title = req.body.title;
  const titleString = `${title}`;
  console.log(title, req.body);

  if (titleString === "undefined" || !title) {
    console.log("No title found to delete");
    return res.status(500).send("Provide a valid room");
  } else if (!title in data) {
    return res.status(500).send(`Room Does Not Exist - ${title}`);
  } else {
    console.log(`Deleting the room - ${title}`);
    const titleData = JSON.parse(JSON.stringify(data[title]));
    console.log(`Deleting the roomID - ${data[title].id}`);
    const url = `${baseUrl}/rooms/${data[title].id}`;
    const options = { headers };

    await axios.delete(url, options);
    delete data[title];
    overwrite(data);

    return res.json(titleData);
  }
};
