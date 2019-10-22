// Model Files
const misc = require("./misc");
const axios = require("axios");

module.exports = async headers => {
  const url = "https://api.ciscospark.com/v1/rooms";
  const options = { headers };
  // get rooms
  const rooms = await axios.get(url, options);
  let data = {};
  for (let room of rooms.data.items) {
    const peopleUrl = `https://api.ciscospark.com/v1/memberships?roomId=${room.id}`;
    const people = await axios.get(peopleUrl, options);
    let memberships = {};
    for (let person of people.data.items) {
      memberships[person.personEmail] = {
        email: person.personEmail,
        id: person.id
      };
    }
    data[room.title] = {
      id: room.id,
      title: room.title,
      memberships
    };
  }

  await misc.writeFile(data, "data.json");

  return data;
};
