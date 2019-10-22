const axios = require("axios");
const misc = require("../misc");

const { headers, fullOverwrite } = misc;

exports.list = async (req, res, data) => {
  return res.json(data);
};

exports.create = async (req, res, data) => {
  const title = req.body.title;

  if (title in data) {
    res.send(`Room Exist - ${title}:${data[title].id}`);
  } else {
    const url = "https://api.ciscospark.com/v1/rooms";
    const options = { headers };
    const postData = { title };

    const response = await axios.post(url, postData, options);
    const id = response.data.id;
    const peopleUrl = `https://api.ciscospark.com/v1/memberships?roomId=${id}`;
    const people = await axios.get(peopleUrl, options);
    let memberships = {};
    for (let person of people.data.items) {
      memberships[person.personEmail] = {
        email: person.personEmail,
        id: person.id
      };
    }
    data[title] = { id, title, memberships };
    fullOverwrite(data);

    return res.json(data[title]);
  }
};

exports.delete = async (req, res, data) => {
  const title = req.body.title;

  if (!title in data) {
    res.send(`Room Does Not Exist - ${title}`);
  } else {
    const titleData = JSON.parse(JSON.stringify(data[title]));
    const url = `https://api.ciscospark.com/v1/rooms/${data[title].id}`;
    const options = { headers };

    await axios.delete(url, options);
    delete data[title];
    fullOverwrite(data);

    return res.json(titleData);
  }
};
