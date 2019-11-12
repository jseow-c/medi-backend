const misc = require("../../misc");
const options = require("../options");

const axios = require("axios");

const { webexBaseUrl, webexBotHeaders } = options;

const { fullOverwrite } = misc;

const overwrite = fullOverwrite("demo.json");

const webexOverwrite = fullOverwrite("data.json");

exports.patient_get = async (req, res, data) => {
  return res.json(data);
};

exports.patient_set = async (req, res, data) => {
  for (let key of Object.keys(req.body)) {
    data[key] = req.body[key];
  }
  overwrite(data);
  return res.json(req.body);
};

exports.step_set = async (req, res, data) => {
  const step = req.body.step;
  const date = new Date();
  let newTiming;
  if (step === 0) {
    newTiming = [date];
  } else if (data.timing.length > step) {
    newTiming = data.timing.slice(0, step);
    newTiming.push(date);
  } else {
    newTiming = data.timing.slice();
    for (let i = 0; i <= step - data.timing.length; i++) {
      newTiming.push(date);
    }
  }
  data.step = step;
  data.timing = newTiming;
  overwrite(data);
  return res.send(`${step}`);
};

exports.medicine_set = async (req, res, data, medicineData) => {
  const medicine = req.body.medicine;
  const payment = medicine.reduce((acc, cur) => acc + medicineData[cur], 0);
  data.medicine = medicine;
  data.payment = payment;
  overwrite(data);
  return res.json({ medicine, payment });
};

exports.status_set = async (req, res, data) => {
  const status = req.body.status;
  data.status = status;
  overwrite(data);
  return res.json({ status });
};

exports.initial_set = async (req, res, data) => {
  const reason = req.body.reason;
  const country = req.body.country;
  const accident = req.body.accident;
  const police = req.body.police;
  data.reason = reason;
  data.country = country;
  data.accident = accident;
  data.police = police;
  overwrite(data);
  return res.json({ reason, country, accident, police });
};

exports.timing_get = async (req, res, data) => {
  return res.json(data.timing);
};

exports.message_set_and_get = async (req, res, data, headers) => {
  const url = `${webexBaseUrl}/messages?roomId=${data.roomId}`;
  console.log(url);
  const options = { headers };
  const response = await axios.get(url, options);
  data.message = response.data.items;
  console.log("got the messages", data.message[0]);
  overwrite(data);
  return res.json(data.message);
};

exports.room_clear_all = async (req, res, data) => {
  const url = `${webexBaseUrl}/rooms`;
  const options = { headers: webexBotHeaders };
  const rooms = await axios.get(url, options);
  for (let room of rooms.data.items) {
    console.log(room.title);
    if (room.title.startsWith("MOH -")) {
      console.log(`Deleting room - ${room.title}`);
      const roomUrl = `${webexBaseUrl}/rooms/${room.id}`;
      await axios.delete(roomUrl, options);
      delete data[room.title];
    }
  }
  webexOverwrite(data);
  return res.send("All MOH demo rooms cleared.");
};

exports.token_set = async (req, res, header) => {
  const token = req.body.token;
  header.Authorization = `Bearer ${token}`;
  return res.json({ token });
};
