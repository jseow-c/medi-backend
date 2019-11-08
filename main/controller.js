const model = require("./model");
const memController = require("./webex/controller/membership");
const roomController = require("./webex/controller/room");
const msgController = require("./webex/controller/message");
const personController = require("./intercorp/controller/person");
const faceController = require("./intercorp/controller/face");
const infoController = require("./patient/controller/info");
const demoController = require("./demo/controller/index");

// initialize data
let webexData, intercorpData, patientData, demoData, medicineData;
model().then(response => {
  webexData = response.webexData;
  intercorpData = response.intercorpData;
  patientData = response.patientData;
  demoData = response.demoData;
  medicineData = response.medicineData;
});

// Webex Membership Controllers
exports.mem_create = (req, res) => memController.create(req, res, webexData);
exports.mem_delete = (req, res) => memController.delete(req, res, webexData);

// Webex Room Controllers
exports.room_list = (req, res) => roomController.list(req, res, webexData);
exports.room_create = (req, res) => roomController.create(req, res, webexData);
exports.room_delete = (req, res) => roomController.delete(req, res, webexData);

// Webex Message Controllers
exports.msg_text = (req, res) => msgController.text(req, res, webexData);
exports.msg_markD = (req, res) => msgController.markD(req, res, webexData);

// Intercorp Person Controllers
exports.person_list = (req, res) =>
  personController.list(req, res, intercorpData);
exports.person_create = (req, res) =>
  personController.create(req, res, intercorpData);
exports.person_delete = (req, res) =>
  personController.delete(req, res, intercorpData);

// Intercorp Face Controllers
exports.face_create = (req, res) =>
  faceController.create(req, res, intercorpData);
exports.face_enroll = (req, res) =>
  faceController.enroll(req, res, intercorpData);
exports.face_erase = (req, res) =>
  faceController.erase(req, res, intercorpData);
exports.face_compare = (req, res) =>
  faceController.compare(req, res, intercorpData);

// Patient Data
exports.patient_get = (req, res) =>
  infoController.get(req, res, patientData, demoData);
exports.patient_markdown = (req, res) =>
  infoController.markD(req, res, patientData, demoData);

// Demo Data
exports.demo_patient_get = (req, res) =>
  demoController.patient_get(req, res, demoData);
exports.demo_patient_set = (req, res) =>
  demoController.patient_set(req, res, demoData);
exports.demo_step_set = (req, res) =>
  demoController.step_set(req, res, demoData);
exports.demo_medicine_set = (req, res) =>
  demoController.medicine_set(req, res, demoData, medicineData);
exports.demo_status_set = (req, res) =>
  demoController.status_set(req, res, demoData);
exports.demo_timing_get = (req, res) =>
  demoController.timing_get(req, res, demoData);
exports.demo_message_set_and_get = (req, res) =>
  demoController.message_set_and_get(req, res, demoData);
exports.demo_room_clear_all = (req, res) =>
  demoController.room_clear_all(req, res, webexData);
