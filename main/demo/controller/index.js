const misc = require("../../misc");
const options = require("../options");

const axios = require("axios");

const { webexBaseUrl, webexHeaders } = options;

const { fullOverwrite } = misc;

const overwrite = fullOverwrite("demo.json");

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

exports.timing_get = async (req, res, data) => {
  return res.json(data.timing);
};

exports.message_set_and_get = async (req, res, data) => {
  const url = `${webexBaseUrl}/messages?roomId=${data.roomId}`;
  const options = { headers: webexHeaders };
  console.log(url, options);
  const response = await axios.get(url, options);
  data.message = response.data.items;
  overwrite(data);
  return res.json(data.message);
};
