const express = require("express");
const router = express.Router();

const controller = require("./controller");

router.get("/room", controller.room_list);
router.post("/room", controller.room_create);
router.delete("/room", controller.room_delete);
router.post("/membership", controller.mem_create);
router.delete("/membership", controller.mem_delete);
router.post("/message/text", controller.msg_text);
router.post("/message/markdown", controller.msg_markD);

module.exports = router;
