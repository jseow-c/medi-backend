const misc = require("../../misc");

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
  const newData = { ...data, medicine, payment };
  overwrite(newData);
  return res.json({ medicine, payment });
};

exports.status_set = async (req, res, data) => {
  const status = req.body.status;
  const newData = { ...data, status };
  overwrite(newData);
  return res.json({ status });
};

exports.timing_get = async (req, res, data) => {
  return res.json(data.timing);
};
