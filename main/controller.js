const model = require("./model");
const misc = require("./misc");
const memController = require("./controller/membership");
const roomController = require("./controller/room");
const msgController = require("./controller/message");

const { headers } = misc;

// initialize data
let data;
model(headers).then(response => {
  data = response;
});

// membership controllers
exports.mem_create = async (req, res) => memController.create(req, res, data);
exports.mem_delete = async (req, res) => memController.delete(req, res, data);

// room controllers
exports.room_list = async (req, res) => roomController.list(req, res, data);
exports.room_create = async (req, res) => roomController.create(req, res, data);
exports.room_delete = async (req, res) => roomController.delete(req, res, data);

// message controllers
exports.msg_text = async (req, res) => msgController.text(req, res, data);
exports.msg_markD = async (req, res) => msgController.markD(req, res, data);

// convert specific message to markdown
