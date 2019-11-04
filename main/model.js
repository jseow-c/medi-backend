// Model Files
const misc = require("./misc");
const axios = require("axios");
const webexOptions = require("./webex/options");
const intercorpOptions = require("./intercorp/options");

const { readFile, writeFile } = misc;

const getWebexData = async _ => {
  const url = `${webexOptions.baseUrl}/rooms`;
  const options = { headers: webexOptions.headers };
  // get rooms
  const rooms = await axios.get(url, options);
  let data = {};
  for (let room of rooms.data.items) {
    const peopleUrl = `${webexOptions.baseUrl}/memberships?roomId=${room.id}`;
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

  writeFile(data, "data.json");
  return data;
};

const getPatientData = async _ => {
  const rawBuffer = await readFile("patient.json");
  return JSON.parse(rawBuffer);
};

const getDemoData = async _ => {
  const rawBuffer = await readFile("demo.json");
  return JSON.parse(rawBuffer);
};

const getMedicineData = async _ => {
  const rawBuffer = await readFile("medicine.json");
  return JSON.parse(rawBuffer);
};

const getIntercorpData = async _ => {
  // get or create collection
  const id = process.env.COLLECTION_ID;
  const name = process.env.COLLECTION_NAME;
  const url = `${intercorpOptions.baseUrl}/collections`;
  const options = { headers: intercorpOptions.headers };
  const collections = await axios.get(url, options);
  const envCollection = collections.data.response.filter(
    item => item.id === id
  );
  if (envCollection.length === 0) {
    const createCollectionUrl = `${intercorpOptions.baseUrl}/collection`;
    await axios.post(createCollectionUrl, { id, name }, options);
  }
  // get persons in collection
  const personUrl = `${intercorpOptions.baseUrl}/persons/${id}`;
  const personsResponse = await axios.get(personUrl, options);
  return personsResponse.data.response.reduce((acc, cur) => {
    acc[cur.name] = { name, id: cur.person_id };
    return acc;
  }, {});
};

module.exports = async _ => {
  // get webex data
  const webexData = await getWebexData();
  // get intercorp data
  const intercorpData = await getIntercorpData();
  // get patient data
  const patientData = await getPatientData();
  // get demo data
  const demoData = await getDemoData();
  // get medicine data
  const medicineData = await getMedicineData();

  return { webexData, intercorpData, patientData, demoData, medicineData };
};
